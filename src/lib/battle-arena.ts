import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type Unsubscribe,
} from "firebase/firestore";
import { onValue, push, ref, runTransaction, set, update } from "firebase/database";

import { quizBank } from "@/lib/bangladesh-learning";
import { getFirebaseDb, getFirebaseRtdb, firebaseEnabled } from "@/lib/firebase";

export type BattleFormat = "quiz" | "debate";
export type BattleScale = "student-vs-student" | "team-vs-team" | "school-vs-school" | "district-vs-district";
export type BattleStatus = "draft" | "invited" | "accepted" | "countdown" | "live" | "judging" | "finished";
export type BattleSide = "for" | "against";
export type BattleRole = "host" | "challenger" | "judge" | "audience" | "spectator";

export interface BattleQuestion {
  id: string;
  roundId: string;
  roundLabel: string;
  subject: string;
  prompt: string;
  options: string[];
  answer: number;
  explain: string;
  timeLimit: number;
  powerUp?: "double-score" | "shield" | "skip" | "freeze";
}

export interface BattleRoundPlan {
  id: string;
  label: string;
  description: string;
  duration: number;
  questions: BattleQuestion[];
}

export interface BattleParticipant {
  id: string;
  name: string;
  avatar: string;
  schoolId: string | null;
  schoolName: string;
  district: string;
  role: BattleRole;
  side: BattleSide;
  elo: number;
  score: number;
  streak: number;
  isMain: boolean;
  isOnline: boolean;
  deviceId: string;
}

export interface BattleRoom {
  id: string;
  code: string;
  title: string;
  format: BattleFormat;
  scale: BattleScale;
  status: BattleStatus;
  hostId: string;
  hostName: string;
  hostSchoolId: string | null;
  hostSchoolName: string;
  hostDistrict: string;
  challengerSchoolId: string | null;
  challengerSchoolName: string;
  challengerDistrict: string;
  invitedSchoolName: string;
  totalRounds: number;
  currentRoundIndex: number;
  currentQuestionIndex: number;
  countdownEndsAt: number | null;
  roundEndsAt: number | null;
  questionSeed: number;
  deckVersion: string;
  judges: string[];
  createdAt: number;
  updatedAt: number;
  winnerId: string | null;
  winnerLabel: string | null;
  debateTopic: string;
  debateSideAssignment: Record<string, BattleSide>;
  participantIds: string[];
}

export interface BattleLiveState {
  status: BattleStatus;
  roundIndex: number;
  questionIndex: number;
  countdownEndsAt: number | null;
  roundEndsAt: number | null;
  scores: Record<string, number>;
  roundScores: Record<string, number>;
  streaks: Record<string, number>;
  audienceCount: number;
  spectatorCount: number;
  reactions: Record<string, number>;
  poll: { prompt: string; options: string[]; votes: Record<string, number> } | null;
  speakerQueue: string[];
  activeSpeakerId: string | null;
  activePowerUps: Record<string, string[]>;
  winnerId: string | null;
}

export interface BattleChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  createdAt: number;
  role: BattleRole;
}

export interface BattleSignal {
  id: string;
  kind: "offer" | "answer" | "ice" | "ready" | "speaker-change" | "mute" | "unmute";
  senderId: string;
  createdAt: number;
  payload: Record<string, unknown>;
}

export interface BattleAntiCheatEvent {
  id: string;
  type: "visibility" | "copy" | "paste" | "blur" | "contextmenu" | "keydown" | "device" | "screenshot" | "camera";
  severity: "info" | "warning" | "critical";
  message: string;
  createdAt: number;
}

const STORAGE_PREFIX = "epathshala:battle";

function readLocalValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}:${key}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocalValue<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${STORAGE_PREFIX}:${key}`, JSON.stringify(value));
  window.dispatchEvent(new Event(`epathshala:${STORAGE_PREFIX}:${key}`));
}

function subscribeLocalValue<T>(key: string, getSnapshot: () => T, onChange: (value: T) => void) {
  onChange(getSnapshot());
  const listener = () => onChange(getSnapshot());
  window.addEventListener(`epathshala:${STORAGE_PREFIX}:${key}`, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(`epathshala:${STORAGE_PREFIX}:${key}`, listener);
    window.removeEventListener("storage", listener);
  };
}

function stringToSeed(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], seedText: string) {
  const result = [...items];
  const random = mulberry32(stringToSeed(seedText));
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function randomId(prefix = "battle") {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

function makeBattleCode() {
  return crypto.randomUUID().slice(0, 8).toUpperCase();
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function asArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function normalizeRoom(input: Partial<BattleRoom> & Pick<BattleRoom, "id">): BattleRoom {
  return {
    id: input.id,
    code: asString(input.code, makeBattleCode()),
    title: asString(input.title, "National Battle Arena"),
    format: input.format === "debate" ? "debate" : "quiz",
    scale:
      input.scale === "team-vs-team" || input.scale === "school-vs-school" || input.scale === "district-vs-district"
        ? input.scale
        : "student-vs-student",
    status:
      input.status === "invited" ||
      input.status === "accepted" ||
      input.status === "countdown" ||
      input.status === "live" ||
      input.status === "judging" ||
      input.status === "finished"
        ? input.status
        : "draft",
    hostId: asString(input.hostId, ""),
    hostName: asString(input.hostName, "Host"),
    hostSchoolId: input.hostSchoolId ?? null,
    hostSchoolName: asString(input.hostSchoolName, "Host School"),
    hostDistrict: asString(input.hostDistrict, "Bangladesh"),
    challengerSchoolId: input.challengerSchoolId ?? null,
    challengerSchoolName: asString(input.challengerSchoolName, "Challenger School"),
    challengerDistrict: asString(input.challengerDistrict, "Bangladesh"),
    invitedSchoolName: asString(input.invitedSchoolName, "Invited School"),
    totalRounds: asNumber(input.totalRounds, 5),
    currentRoundIndex: asNumber(input.currentRoundIndex, 0),
    currentQuestionIndex: asNumber(input.currentQuestionIndex, 0),
    countdownEndsAt: input.countdownEndsAt ?? null,
    roundEndsAt: input.roundEndsAt ?? null,
    questionSeed: asNumber(input.questionSeed, Date.now()),
    deckVersion: asString(input.deckVersion, "v1"),
    judges: asArray(input.judges),
    createdAt: asNumber(input.createdAt, Date.now()),
    updatedAt: asNumber(input.updatedAt, Date.now()),
    winnerId: input.winnerId ?? null,
    winnerLabel: input.winnerLabel ?? null,
    debateTopic: asString(input.debateTopic, "Education should be guided more by competition than pressure."),
    debateSideAssignment:
      input.debateSideAssignment && typeof input.debateSideAssignment === "object" ? (input.debateSideAssignment as Record<string, BattleSide>) : {},
    participantIds: asArray(input.participantIds),
  };
}

function normalizeLive(input: Partial<BattleLiveState> = {}): BattleLiveState {
  return {
    status:
      input.status === "invited" ||
      input.status === "accepted" ||
      input.status === "countdown" ||
      input.status === "live" ||
      input.status === "judging" ||
      input.status === "finished"
        ? input.status
        : "draft",
    roundIndex: asNumber(input.roundIndex, 0),
    questionIndex: asNumber(input.questionIndex, 0),
    countdownEndsAt: input.countdownEndsAt ?? null,
    roundEndsAt: input.roundEndsAt ?? null,
    scores: input.scores ?? {},
    roundScores: input.roundScores ?? {},
    streaks: input.streaks ?? {},
    audienceCount: asNumber(input.audienceCount, 0),
    spectatorCount: asNumber(input.spectatorCount, 0),
    reactions: input.reactions ?? {},
    poll: input.poll ?? null,
    speakerQueue: input.speakerQueue ?? [],
    activeSpeakerId: input.activeSpeakerId ?? null,
    activePowerUps: input.activePowerUps ?? {},
    winnerId: input.winnerId ?? null,
  };
}

export function buildBattleDeck(seedText: string, format: BattleFormat, scale: BattleScale): BattleRoundPlan[] {
  const pool = buildQuestionPool(format, scale);
  const rounds = [
    { id: "round-1", label: "General Knowledge", description: "National knowledge and current affairs", duration: 75 },
    { id: "round-2", label: "Science", description: "Core science reasoning and quick recall", duration: 75 },
    { id: "round-3", label: "Mathematics", description: "Competitive arithmetic and logic", duration: 75 },
    { id: "round-4", label: "ICT", description: "Digital literacy and tech awareness", duration: 75 },
    { id: "round-5", label: "Rapid Fire", description: "Fast-paced mixed questions", duration: 45 },
  ] satisfies Array<Omit<BattleRoundPlan, "questions">>;

  return rounds.map((round, roundIndex) => {
    const questions = shuffle(
      pool.filter((question) => question.roundLabel === round.label || round.label === "Rapid Fire"),
      `${seedText}:${round.id}:${roundIndex}`,
    ).slice(0, 5);
    return { ...round, questions };
  });
}

function buildQuestionPool(format: BattleFormat, scale: BattleScale): BattleQuestion[] {
  const baseTime = format === "debate" ? 60 : 30;
  const schoolFocus = scale === "district-vs-district" ? "district" : scale === "school-vs-school" ? "school" : "student";
  const questions: BattleQuestion[] = [
    {
      id: "gk-1",
      roundId: "round-1",
      roundLabel: "General Knowledge",
      subject: "General Knowledge",
      prompt: "What is the capital of Bangladesh?",
      options: ["Dhaka", "Chattogram", "Khulna", "Rajshahi"],
      answer: 0,
      explain: "Dhaka is the capital city of Bangladesh.",
      timeLimit: baseTime,
    },
    {
      id: "gk-2",
      roundId: "round-1",
      roundLabel: "General Knowledge",
      subject: "General Knowledge",
      prompt: "Which is the national flower of Bangladesh?",
      options: ["Rose", "Shapla", "Lily", "Sunflower"],
      answer: 1,
      explain: "Shapla, or the water lily, is the national flower.",
      timeLimit: baseTime,
    },
    {
      id: "science-1",
      roundId: "round-2",
      roundLabel: "Science",
      subject: "Science",
      prompt: "Which part of a plant makes food?",
      options: ["Root", "Stem", "Leaf", "Seed"],
      answer: 2,
      explain: "Leaves make food through photosynthesis.",
      timeLimit: baseTime,
    },
    {
      id: "science-2",
      roundId: "round-2",
      roundLabel: "Science",
      subject: "Science",
      prompt: "Which planet do we live on?",
      options: ["Mars", "Earth", "Venus", "Jupiter"],
      answer: 1,
      explain: "Humans live on Earth.",
      timeLimit: baseTime,
    },
    {
      id: "math-1",
      roundId: "round-3",
      roundLabel: "Mathematics",
      subject: "Mathematics",
      prompt: "What is 18 + 7?",
      options: ["23", "24", "25", "26"],
      answer: 2,
      explain: "18 + 7 = 25.",
      timeLimit: baseTime,
    },
    {
      id: "math-2",
      roundId: "round-3",
      roundLabel: "Mathematics",
      subject: "Mathematics",
      prompt: "What is 12 × 4?",
      options: ["36", "40", "44", "48"],
      answer: 1,
      explain: "12 × 4 = 48.",
      timeLimit: baseTime,
    },
    {
      id: "ict-1",
      roundId: "round-4",
      roundLabel: "ICT",
      subject: "ICT",
      prompt: "Which device is used to input text?",
      options: ["Monitor", "Keyboard", "Speaker", "Printer"],
      answer: 1,
      explain: "A keyboard is an input device.",
      timeLimit: baseTime,
    },
    {
      id: "ict-2",
      roundId: "round-4",
      roundLabel: "ICT",
      subject: "ICT",
      prompt: "Which file format is commonly used for web pages?",
      options: ["HTML", "MP3", "PDF", "PNG"],
      answer: 0,
      explain: "HTML is the language of web pages.",
      timeLimit: baseTime,
    },
    {
      id: "rf-1",
      roundId: "round-5",
      roundLabel: "Rapid Fire",
      subject: "Mixed",
      prompt: "Bangladesh gained independence in which year?",
      options: ["1947", "1952", "1971", "1990"],
      answer: 2,
      explain: "Bangladesh became independent in 1971.",
      timeLimit: 20,
    },
    {
      id: "rf-2",
      roundId: "round-5",
      roundLabel: "Rapid Fire",
      subject: "Mixed",
      prompt: "Which gas do humans breathe in to survive?",
      options: ["Carbon dioxide", "Oxygen", "Hydrogen", "Nitrogen"],
      answer: 1,
      explain: "Humans need oxygen to breathe.",
      timeLimit: 20,
    },
    {
      id: "rf-3",
      roundId: "round-5",
      roundLabel: "Rapid Fire",
      subject: "Mixed",
      prompt: `A ${schoolFocus} can compete with which arena setup?`,
      options: ["Quiz", "Debate", "Both", "Neither"],
      answer: 2,
      explain: "This platform supports both quiz and debate arenas.",
      timeLimit: 20,
    },
    {
      id: "rf-4",
      roundId: "round-5",
      roundLabel: "Rapid Fire",
      subject: "Mixed",
      prompt: "Which symbol best represents a tournament champion?",
      options: ["Trophy", "Pencil", "Clock", "Ruler"],
      answer: 0,
      explain: "A trophy is a common champion symbol.",
      timeLimit: 20,
    },
  ];

  return questions;
}

async function writeBattleRoomLocal(room: BattleRoom) {
  const rooms = readLocalValue<BattleRoom[]>("rooms", []);
  const next = [room, ...rooms.filter((item) => item.id !== room.id)];
  writeLocalValue("rooms", next);
  return room;
}

export async function createBattleRoom(input: Omit<BattleRoom, "id" | "code" | "createdAt" | "updatedAt" | "status" | "currentRoundIndex" | "currentQuestionIndex" | "countdownEndsAt" | "roundEndsAt" | "winnerId" | "winnerLabel" | "participantIds">) {
  const room: BattleRoom = normalizeRoom({
    id: randomId("room"),
    code: makeBattleCode(),
    status: "draft",
    currentRoundIndex: 0,
    currentQuestionIndex: 0,
    countdownEndsAt: null,
    roundEndsAt: null,
    winnerId: null,
    winnerLabel: null,
    participantIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ...input,
  });

  if (!firebaseEnabled) {
    return writeBattleRoomLocal(room);
  }

  const db = getFirebaseDb();
  const rtdb = getFirebaseRtdb();
  if (!db || !rtdb) return room;

  await setDoc(doc(db, "battleRooms", room.id), room);
  await set(ref(rtdb, `battleRooms/${room.id}/live`), normalizeLive({ status: room.status }));
  return room;
}

export async function patchBattleRoom(roomId: string, patch: Partial<BattleRoom>) {
  if (!firebaseEnabled) {
    const rooms = readLocalValue<BattleRoom[]>("rooms", []);
    const next = rooms.map((room) => (room.id === roomId ? normalizeRoom({ ...room, ...patch }) : room));
    writeLocalValue("rooms", next);
    return next.find((room) => room.id === roomId) ?? null;
  }

  const db = getFirebaseDb();
  if (!db) return null;
  await updateDoc(doc(db, "battleRooms", roomId), {
    ...patch,
    updatedAt: Date.now(),
  });
  return null;
}

export async function joinBattleRoom(roomId: string, participant: BattleParticipant) {
  if (!firebaseEnabled) {
    const rooms = readLocalValue<BattleRoom[]>("rooms", []);
    const next = rooms.map((room) => {
      if (room.id !== roomId) return room;
      return normalizeRoom({
        ...room,
        participantIds: [...new Set([...(room.participantIds ?? []), participant.id])],
        challengerSchoolName: room.challengerSchoolName || participant.schoolName,
        challengerSchoolId: room.challengerSchoolId ?? participant.schoolId,
        challengerDistrict: room.challengerDistrict || participant.district,
        status: room.status === "draft" ? "accepted" : room.status,
        updatedAt: Date.now(),
      });
    });
    writeLocalValue("rooms", next);
    return;
  }

  const db = getFirebaseDb();
  if (!db) return;
  const refRoom = doc(db, "battleRooms", roomId);
  await updateDoc(refRoom, {
    participantIds: [...new Set([participant.id])],
    challengerSchoolName: participant.schoolName,
    challengerSchoolId: participant.schoolId,
    challengerDistrict: participant.district,
    status: "accepted",
    updatedAt: Date.now(),
  });
}

export async function startBattleCountdown(roomId: string, seconds = 10) {
  const countdownEndsAt = Date.now() + seconds * 1000;
  if (!firebaseEnabled) {
    const rooms = readLocalValue<BattleRoom[]>("rooms", []);
    const next = rooms.map((room) => (room.id === roomId ? normalizeRoom({ ...room, status: "countdown", countdownEndsAt, updatedAt: Date.now() }) : room));
    writeLocalValue("rooms", next);
    return;
  }

  const db = getFirebaseDb();
  const rtdb = getFirebaseRtdb();
  if (!db || !rtdb) return;
  await updateDoc(doc(db, "battleRooms", roomId), { status: "countdown", countdownEndsAt, updatedAt: Date.now() });
  await update(ref(rtdb, `battleRooms/${roomId}/live`), normalizeLive({ status: "countdown", countdownEndsAt }));
}

export async function startBattleRound(roomId: string, roundIndex: number, questionIndex = 0) {
  const roundEndsAt = Date.now() + 75 * 1000;
  if (!firebaseEnabled) {
    const rooms = readLocalValue<BattleRoom[]>("rooms", []);
    const next = rooms.map((room) =>
      room.id === roomId ? normalizeRoom({ ...room, status: "live", currentRoundIndex: roundIndex, currentQuestionIndex: questionIndex, roundEndsAt, updatedAt: Date.now() }) : room,
    );
    writeLocalValue("rooms", next);
    return;
  }

  const db = getFirebaseDb();
  const rtdb = getFirebaseRtdb();
  if (!db || !rtdb) return;
  await updateDoc(doc(db, "battleRooms", roomId), {
    status: "live",
    currentRoundIndex: roundIndex,
    currentQuestionIndex: questionIndex,
    roundEndsAt,
    updatedAt: Date.now(),
  });
  await update(ref(rtdb, `battleRooms/${roomId}/live`), normalizeLive({ status: "live", roundIndex, questionIndex, roundEndsAt }));
}

export async function finishBattleRoom(roomId: string, winnerId: string | null, winnerLabel: string | null) {
  if (!firebaseEnabled) {
    const rooms = readLocalValue<BattleRoom[]>("rooms", []);
    const next = rooms.map((room) => (room.id === roomId ? normalizeRoom({ ...room, status: "finished", winnerId, winnerLabel, updatedAt: Date.now() }) : room));
    writeLocalValue("rooms", next);
    return;
  }

  const db = getFirebaseDb();
  const rtdb = getFirebaseRtdb();
  if (!db || !rtdb) return;
  await updateDoc(doc(db, "battleRooms", roomId), { status: "finished", winnerId, winnerLabel, updatedAt: Date.now() });
  await update(ref(rtdb, `battleRooms/${roomId}/live`), normalizeLive({ status: "finished", winnerId }));
}

export function listenBattleRooms(onChange: (rooms: BattleRoom[]) => void): Unsubscribe | (() => void) {
  if (!firebaseEnabled) {
    return subscribeLocalValue("rooms", () => readLocalValue<BattleRoom[]>("rooms", []).map((room) => normalizeRoom(room)), onChange);
  }

  const db = getFirebaseDb();
  if (!db) return () => {};
  return onSnapshot(query(collection(db, "battleRooms"), orderBy("createdAt", "desc"), limit(24)), (snapshot) => {
    onChange(snapshot.docs.map((entry) => normalizeRoom({ id: entry.id, ...(entry.data() as Partial<BattleRoom>) })));
  });
}

export function listenBattleRoom(roomId: string, onChange: (room: BattleRoom | null) => void): Unsubscribe | (() => void) {
  if (!firebaseEnabled) {
    return subscribeLocalValue(
      `room:${roomId}`,
      () => readLocalValue<BattleRoom[]>("rooms", []).find((room) => room.id === roomId) ?? null,
      onChange,
    );
  }

  const db = getFirebaseDb();
  if (!db) return () => {};
  return onSnapshot(doc(db, "battleRooms", roomId), (snapshot) => {
    if (!snapshot.exists()) {
      onChange(null);
      return;
    }
    onChange(normalizeRoom({ id: snapshot.id, ...(snapshot.data() as Partial<BattleRoom>) }));
  });
}

export function listenBattleLive(roomId: string, onChange: (state: BattleLiveState) => void): Unsubscribe | (() => void) {
  if (!firebaseEnabled) {
    return subscribeLocalValue(
      `live:${roomId}`,
      () => readLocalValue<BattleLiveState>(`live:${roomId}`, normalizeLive()),
      onChange,
    );
  }

  const rtdb = getFirebaseRtdb();
  if (!rtdb) return () => {};
  return onValue(ref(rtdb, `battleRooms/${roomId}/live`), (snapshot) => {
    onChange(normalizeLive(snapshot.val() ?? {}));
  });
}

export async function setBattleLiveState(roomId: string, patch: Partial<BattleLiveState>) {
  if (!firebaseEnabled) {
    const current = readLocalValue<BattleLiveState>(`live:${roomId}`, normalizeLive());
    const next = normalizeLive({ ...current, ...patch });
    writeLocalValue(`live:${roomId}`, next);
    return next;
  }

  const rtdb = getFirebaseRtdb();
  if (!rtdb) return null;
  const next = normalizeLive(patch);
  await update(ref(rtdb, `battleRooms/${roomId}/live`), next);
  return next;
}

export async function incrementBattleScore(roomId: string, participantId: string, amount: number) {
  if (!firebaseEnabled) {
    const current = readLocalValue<BattleLiveState>(`live:${roomId}`, normalizeLive());
    const next = normalizeLive({
      ...current,
      scores: {
        ...current.scores,
        [participantId]: (current.scores[participantId] ?? 0) + amount,
      },
    });
    writeLocalValue(`live:${roomId}`, next);
    return next;
  }

  const rtdb = getFirebaseRtdb();
  if (!rtdb) return null;
  const scoreRef = ref(rtdb, `battleRooms/${roomId}/live/scores/${participantId}`);
  await runTransaction(scoreRef, (current) => (typeof current === "number" ? current + amount : amount));
  return null;
}

export async function appendBattleChat(roomId: string, message: Omit<BattleChatMessage, "id" | "createdAt">) {
  if (!firebaseEnabled) {
    const messages = readLocalValue<BattleChatMessage[]>(`chat:${roomId}`, []);
    const next = [{ ...message, id: randomId("chat"), createdAt: Date.now() }, ...messages].slice(0, 100);
    writeLocalValue(`chat:${roomId}`, next);
    return;
  }

  const db = getFirebaseDb();
  if (!db) return;
  await addDoc(collection(db, "battleRooms", roomId, "chat"), {
    ...message,
    createdAt: Date.now(),
    updatedAt: serverTimestamp(),
  });
}

export function listenBattleChat(roomId: string, onChange: (messages: BattleChatMessage[]) => void): Unsubscribe | (() => void) {
  if (!firebaseEnabled) {
    return subscribeLocalValue(`chat:${roomId}`, () => readLocalValue<BattleChatMessage[]>(`chat:${roomId}`, []), onChange);
  }

  const db = getFirebaseDb();
  if (!db) return () => {};
  return onSnapshot(query(collection(db, "battleRooms", roomId, "chat"), orderBy("createdAt", "asc"), limit(80)), (snapshot) => {
    onChange(
      snapshot.docs.map((entry) => ({
        id: entry.id,
        senderId: asString(entry.data().senderId, ""),
        senderName: asString(entry.data().senderName, "Spectator"),
        senderAvatar: asString(entry.data().senderAvatar, "💬"),
        text: asString(entry.data().text, ""),
        createdAt: asNumber(entry.data().createdAt, Date.now()),
        role: (entry.data().role as BattleRole) ?? "spectator",
      })),
    );
  });
}

export async function appendBattleSignal(roomId: string, signal: Omit<BattleSignal, "id" | "createdAt">) {
  if (!firebaseEnabled) {
    const signals = readLocalValue<BattleSignal[]>(`signals:${roomId}`, []);
    const next = [{ ...signal, id: randomId("signal"), createdAt: Date.now() }, ...signals].slice(0, 50);
    writeLocalValue(`signals:${roomId}`, next);
    return;
  }

  const db = getFirebaseDb();
  if (!db) return;
  await addDoc(collection(db, "battleRooms", roomId, "signals"), {
    ...signal,
    createdAt: Date.now(),
  });
}

export function listenBattleSignals(roomId: string, onChange: (signals: BattleSignal[]) => void): Unsubscribe | (() => void) {
  if (!firebaseEnabled) {
    return subscribeLocalValue(`signals:${roomId}`, () => readLocalValue<BattleSignal[]>(`signals:${roomId}`, []), onChange);
  }

  const db = getFirebaseDb();
  if (!db) return () => {};
  return onSnapshot(query(collection(db, "battleRooms", roomId, "signals"), orderBy("createdAt", "asc"), limit(80)), (snapshot) => {
    onChange(
      snapshot.docs.map((entry) => ({
        id: entry.id,
        kind: (entry.data().kind as BattleSignal["kind"]) ?? "ready",
        senderId: asString(entry.data().senderId, ""),
        createdAt: asNumber(entry.data().createdAt, Date.now()),
        payload: (entry.data().payload as Record<string, unknown>) ?? {},
      })),
    );
  });
}

export async function appendBattleAntiCheat(roomId: string, event: Omit<BattleAntiCheatEvent, "id" | "createdAt">) {
  if (!firebaseEnabled) {
    const events = readLocalValue<BattleAntiCheatEvent[]>(`cheat:${roomId}`, []);
    const next = [{ ...event, id: randomId("flag"), createdAt: Date.now() }, ...events].slice(0, 100);
    writeLocalValue(`cheat:${roomId}`, next);
    return;
  }

  const db = getFirebaseDb();
  if (!db) return;
  await addDoc(collection(db, "battleRooms", roomId, "antiCheat"), {
    ...event,
    createdAt: Date.now(),
  });
}

export function listenBattleAntiCheat(roomId: string, onChange: (events: BattleAntiCheatEvent[]) => void): Unsubscribe | (() => void) {
  if (!firebaseEnabled) {
    return subscribeLocalValue(`cheat:${roomId}`, () => readLocalValue<BattleAntiCheatEvent[]>(`cheat:${roomId}`, []), onChange);
  }

  const db = getFirebaseDb();
  if (!db) return () => {};
  return onSnapshot(query(collection(db, "battleRooms", roomId, "antiCheat"), orderBy("createdAt", "desc"), limit(80)), (snapshot) => {
    onChange(
      snapshot.docs.map((entry) => ({
        id: entry.id,
        type: (entry.data().type as BattleAntiCheatEvent["type"]) ?? "visibility",
        severity: (entry.data().severity as BattleAntiCheatEvent["severity"]) ?? "info",
        message: asString(entry.data().message, ""),
        createdAt: asNumber(entry.data().createdAt, Date.now()),
      })),
    );
  });
}

export async function updateBattleAudience(roomId: string, audienceCount: number, spectatorCount: number) {
  if (!firebaseEnabled) {
    const current = readLocalValue<BattleLiveState>(`live:${roomId}`, normalizeLive());
    const next = normalizeLive({ ...current, audienceCount, spectatorCount });
    writeLocalValue(`live:${roomId}`, next);
    return;
  }

  const rtdb = getFirebaseRtdb();
  if (!rtdb) return;
  await update(ref(rtdb, `battleRooms/${roomId}/live`), { audienceCount, spectatorCount });
}

export function getTopBattleSchools() {
  const schoolRows = [
    { name: "Dhaka Residential Model College", district: "Dhaka", points: 9810, badge: "Diamond School" },
    { name: "Chittagong Collegiate School", district: "Chattogram", points: 9425, badge: "Platinum School" },
    { name: "BCSIR School & College", district: "Dhaka", points: 9180, badge: "Gold School" },
    { name: "Rangpur Cantonment Public School", district: "Rangpur", points: 8895, badge: "Silver School" },
  ];

  return schoolRows;
}

export function getTopBattleStudents() {
  return [
    { name: "Fahim Hasan", school: "Dhaka Residential Model College", rating: 1785, nationalRank: 45, districtRank: 2, schoolRank: 1 },
    { name: "Nafisa Rahman", school: "BCSIR School & College", rating: 1742, nationalRank: 62, districtRank: 5, schoolRank: 1 },
    { name: "Sabbir Hossain", school: "BCSIR School & College", rating: 1698, nationalRank: 84, districtRank: 7, schoolRank: 2 },
    { name: "Mim Akter", school: "Rangpur Cantonment Public School", rating: 1653, nationalRank: 106, districtRank: 1, schoolRank: 1 },
  ];
}

export function getLatestBattleDeckPreview(format: BattleFormat, scale: BattleScale, seedText = "preview") {
  return buildBattleDeck(seedText, format, scale);
}

export function isBattleFirebaseReady() {
  return firebaseEnabled;
}

