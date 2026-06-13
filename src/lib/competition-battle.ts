import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  type Unsubscribe,
  type DocumentData,
  runTransaction,
  addDoc,
  increment,
} from "firebase/firestore";
import {
  get,
  onValue,
  ref,
  runTransaction as rtdbTransaction,
  set,
  update,
} from "firebase/database";
import { httpsCallable } from "firebase/functions";

import { quizBank } from "@/lib/bangladesh-learning";
import {
  getFirebaseDb,
  getFirebaseFunctions,
  getFirebaseRtdb,
  firebaseEnabled,
} from "@/lib/firebase";
import type { UserState } from "@/lib/user-store";

export type BattleSide = "A" | "B";
export type BattleRoundType = "standard" | "rapid-fire" | "power" | "sudden-death";
export type BattlePhase =
  | "draft"
  | "invited"
  | "accepted"
  | "ready"
  | "countdown"
  | "live"
  | "paused"
  | "finished";
export type ParticipantRole = "captain" | "member" | "spectator";
export type QuestionState = "open" | "locked" | "second-chance" | "resolved";
export type BattleRoomCode = `ROOM-${string}`;

export interface BattleRoomDoc {
  id: string;
  code: string;
  title: string;
  roomLabel: string;
  hostId: string;
  hostName: string;
  hostSchoolId: string | null;
  hostSchoolName: string;
  hostAvatar: string;
  teamAName: string;
  teamBName: string;
  teamAId: string;
  teamBId: string;
  teamACaptainId: string;
  teamBCaptainId: string | null;
  teamAColor: string;
  teamBColor: string;
  roundType: BattleRoundType;
  totalQuestions: number;
  classLevel: number;
  questionIds: string[];
  phase: BattlePhase;
  currentQuestionId: string | null;
  currentQuestionIndex: number;
  countdownEndsAt: number | null;
  questionStartedAt: number | null;
  questionEndsAt: number | null;
  questionTimeLimit: number;
  allowedSide: BattleSide | null;
  lockState: QuestionState;
  lockedBy: BattleSide | null;
  secondChanceSide: BattleSide | null;
  firstAnswerSide: BattleSide | null;
  firstAnswerCorrect: boolean | null;
  scores: Record<BattleSide, number>;
  correctCounts: Record<BattleSide, number>;
  wrongCounts: Record<BattleSide, number>;
  speedBonuses: Record<BattleSide, number>;
  readySides: Record<BattleSide, boolean>;
  winnerSide: BattleSide | null;
  winnerLabel: string | null;
  suspiciousSides: BattleSide[];
  updatedAt: number;
  createdAt: number;
}

export interface BattleQuestionDoc {
  id: string;
  roomId: string;
  index: number;
  subject: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  roundType: BattleRoundType;
  timeLimit: number;
  points: number;
  speedWindow: number;
}

export interface BattleTeamDoc {
  id: string;
  roomId: string;
  side: BattleSide;
  name: string;
  captainId: string;
  captainName: string;
  captainAvatar: string;
  schoolId: string | null;
  schoolName: string;
  color: string;
  ready: boolean;
  joinedAt: number;
  points: number;
  correct: number;
  wrong: number;
  speedBonus: number;
  members: Array<{
    uid: string;
    name: string;
    avatar: string;
    role: ParticipantRole;
    schoolId: string | null;
    schoolName: string;
    joinedAt: number;
    lastSeenAt: number;
    ready: boolean;
    isOnline: boolean;
  }>;
}

export interface BattleFeedItem {
  id: string;
  roomId: string;
  side: BattleSide | "SYSTEM";
  type: "info" | "correct" | "incorrect" | "score" | "warning" | "state";
  message: string;
  pointsDelta: number;
  createdAt: number;
}

export interface BattleParticipantDoc {
  id: string;
  roomId: string;
  uid: string;
  side: BattleSide | "SPECTATOR";
  role: ParticipantRole;
  name: string;
  avatar: string;
  schoolId: string | null;
  schoolName: string;
  ready: boolean;
  joinedAt: number;
  lastSeenAt: number;
  isOnline: boolean;
}

export interface BattleScoreDoc {
  id: string;
  roomId: string;
  side: BattleSide;
  score: number;
  correct: number;
  wrong: number;
  speedBonus: number;
  updatedAt: number;
}

export interface BattleEventDoc extends BattleFeedItem {
  kind: "room" | "team" | "question" | "answer" | "score" | "system";
  phase: BattlePhase | "loading";
}

export interface BattleHistoryDoc {
  id: string;
  roomId: string;
  winnerSide: BattleSide | null;
  winnerLabel: string | null;
  teamAName: string;
  teamBName: string;
  scoreA: number;
  scoreB: number;
  correctA: number;
  correctB: number;
  wrongA: number;
  wrongB: number;
  speedA: number;
  speedB: number;
  accuracyA: number;
  accuracyB: number;
  questionCount: number;
  classLevel: number;
  roundType: BattleRoundType;
  endedAt: number;
}

export interface BattlePublicState {
  phase: BattlePhase;
  currentQuestionId: string | null;
  currentQuestionIndex: number;
  countdownEndsAt: number | null;
  questionStartedAt: number | null;
  questionEndsAt: number | null;
  questionTimeLimit: number;
  lockState: QuestionState;
  lockedBy: BattleSide | null;
  firstAnswerSide: BattleSide | null;
  firstAnswerCorrect: boolean | null;
  secondChanceSide: BattleSide | null;
  allowedSide: BattleSide | null;
  scores: Record<BattleSide, number>;
  correctCounts: Record<BattleSide, number>;
  wrongCounts: Record<BattleSide, number>;
  speedBonuses: Record<BattleSide, number>;
  readySides: Record<BattleSide, boolean>;
  winnerSide: BattleSide | null;
  winnerLabel: string | null;
  suspiciousSides: BattleSide[];
  activityFeed: BattleFeedItem[];
  serverNow: number;
}

const LOCAL_PREFIX = "epathshala:competition-battle";
const DEFAULT_COLORS: Record<BattleSide, string> = {
  A: "from-cyan-500 to-blue-600",
  B: "from-fuchsia-500 to-rose-600",
};
const MAX_TEAM_MEMBERS = 12;
let rtdbTransportDisabled = false;

function roomSeed(roomCode: string) {
  let hash = 2166136261;
  for (let index = 0; index < roomCode.length; index += 1) {
    hash ^= roomCode.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededShuffle<T>(values: T[], seedText: string) {
  const next = [...values];
  let seed = roomSeed(seedText);
  const random = () => {
    seed += 0x6d2b79f5;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

function randomId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

function makeRoomCode(): BattleRoomCode {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `ROOM-${digits}` as BattleRoomCode;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function now() {
  return Date.now();
}

function scoreBonusForElapsed(roundType: BattleRoundType, elapsedMs: number) {
  const seconds = elapsedMs / 1000;
  const base = roundType === "rapid-fire" ? 2 : roundType === "power" ? 1.5 : 1;
  if (seconds <= 3) return Math.round(5 * base);
  if (seconds <= 6) return Math.round(3 * base);
  if (seconds <= 10) return Math.round(1 * base);
  return 0;
}

function questionPointsForRound(roundType: BattleRoundType) {
  if (roundType === "rapid-fire") return 20;
  if (roundType === "power") return 20;
  return 10;
}

function timeLimitForRound(roundType: BattleRoundType) {
  if (roundType === "rapid-fire") return 5;
  if (roundType === "power") return 10;
  if (roundType === "sudden-death") return 8;
  return 10;
}

function normalizeFeedItem(item: Partial<BattleFeedItem>): BattleFeedItem {
  return {
    id: item.id ?? randomId("feed"),
    roomId: item.roomId ?? "",
    side: item.side ?? "SYSTEM",
    type: item.type ?? "info",
    message: item.message ?? "",
    pointsDelta: item.pointsDelta ?? 0,
    createdAt: item.createdAt ?? now(),
  };
}

function normalizeEventItem(item: Partial<BattleEventDoc>): BattleEventDoc {
  const base = normalizeFeedItem(item);
  return {
    ...base,
    kind: item.kind ?? "system",
    phase: item.phase ?? "loading",
  };
}

function createLocalStore<T>(key: string, fallback: T) {
  return {
    read(): T {
      if (typeof window === "undefined") return fallback;
      try {
        const raw = localStorage.getItem(`${LOCAL_PREFIX}:${key}`);
        return raw ? (JSON.parse(raw) as T) : fallback;
      } catch {
        return fallback;
      }
    },
    write(value: T) {
      if (typeof window === "undefined") return;
      localStorage.setItem(`${LOCAL_PREFIX}:${key}`, JSON.stringify(value));
      window.dispatchEvent(new Event(`epathshala:${LOCAL_PREFIX}:${key}`));
    },
    listen(onChange: (value: T) => void) {
      onChange(this.read());
      const listener = () => onChange(this.read());
      window.addEventListener(`epathshala:${LOCAL_PREFIX}:${key}`, listener);
      window.addEventListener("storage", listener);
      return () => {
        window.removeEventListener(`epathshala:${LOCAL_PREFIX}:${key}`, listener);
        window.removeEventListener("storage", listener);
      };
    },
  };
}

function parseRoomData(id: string, data: DocumentData | undefined): BattleRoomDoc {
  const base: BattleRoomDoc = {
    id,
    code: typeof data?.code === "string" && data.code ? data.code : makeRoomCode(),
    title: typeof data?.title === "string" && data.title ? data.title : "Quiz Battle",
    roomLabel:
      typeof data?.roomLabel === "string" && data.roomLabel ? data.roomLabel : "Live Battle Room",
    hostId: typeof data?.hostId === "string" ? data.hostId : "",
    hostName: typeof data?.hostName === "string" ? data.hostName : "Host",
    hostSchoolId: typeof data?.hostSchoolId === "string" ? data.hostSchoolId : null,
    hostSchoolName: typeof data?.hostSchoolName === "string" ? data.hostSchoolName : "Host School",
    hostAvatar: typeof data?.hostAvatar === "string" ? data.hostAvatar : "👑",
    teamAName: typeof data?.teamAName === "string" ? data.teamAName : "Team A",
    teamBName: typeof data?.teamBName === "string" ? data.teamBName : "Team B",
    teamAId: typeof data?.teamAId === "string" ? data.teamAId : `${id}-A`,
    teamBId: typeof data?.teamBId === "string" ? data.teamBId : `${id}-B`,
    teamACaptainId: typeof data?.teamACaptainId === "string" ? data.teamACaptainId : "",
    teamBCaptainId: typeof data?.teamBCaptainId === "string" ? data.teamBCaptainId : null,
    teamAColor: typeof data?.teamAColor === "string" ? data.teamAColor : DEFAULT_COLORS.A,
    teamBColor: typeof data?.teamBColor === "string" ? data.teamBColor : DEFAULT_COLORS.B,
    roundType:
      data?.roundType === "rapid-fire" ||
      data?.roundType === "power" ||
      data?.roundType === "sudden-death"
        ? data.roundType
        : "standard",
    totalQuestions: typeof data?.totalQuestions === "number" ? data.totalQuestions : 20,
    classLevel: typeof data?.classLevel === "number" ? data.classLevel : 3,
    questionIds: Array.isArray(data?.questionIds)
      ? data.questionIds.filter((item: unknown): item is string => typeof item === "string")
      : [],
    phase:
      data?.phase === "invited" ||
      data?.phase === "accepted" ||
      data?.phase === "ready" ||
      data?.phase === "countdown" ||
      data?.phase === "live" ||
      data?.phase === "paused" ||
      data?.phase === "finished"
        ? data.phase
        : "draft",
    currentQuestionId: typeof data?.currentQuestionId === "string" ? data.currentQuestionId : null,
    currentQuestionIndex:
      typeof data?.currentQuestionIndex === "number" ? data.currentQuestionIndex : 0,
    countdownEndsAt: typeof data?.countdownEndsAt === "number" ? data.countdownEndsAt : null,
    questionStartedAt: typeof data?.questionStartedAt === "number" ? data.questionStartedAt : null,
    questionEndsAt: typeof data?.questionEndsAt === "number" ? data.questionEndsAt : null,
    questionTimeLimit: typeof data?.questionTimeLimit === "number" ? data.questionTimeLimit : 10,
    allowedSide: data?.allowedSide === "A" || data?.allowedSide === "B" ? data.allowedSide : null,
    lockState:
      data?.lockState === "open" ||
      data?.lockState === "locked" ||
      data?.lockState === "second-chance" ||
      data?.lockState === "resolved"
        ? data.lockState
        : "open",
    lockedBy: data?.lockedBy === "A" || data?.lockedBy === "B" ? data.lockedBy : null,
    secondChanceSide:
      data?.secondChanceSide === "A" || data?.secondChanceSide === "B"
        ? data.secondChanceSide
        : null,
    firstAnswerSide:
      data?.firstAnswerSide === "A" || data?.firstAnswerSide === "B" ? data.firstAnswerSide : null,
    firstAnswerCorrect:
      typeof data?.firstAnswerCorrect === "boolean" ? data.firstAnswerCorrect : null,
    scores: {
      A: typeof data?.scores?.A === "number" ? data.scores.A : 0,
      B: typeof data?.scores?.B === "number" ? data.scores.B : 0,
    },
    correctCounts: {
      A: typeof data?.correctCounts?.A === "number" ? data.correctCounts.A : 0,
      B: typeof data?.correctCounts?.B === "number" ? data.correctCounts.B : 0,
    },
    wrongCounts: {
      A: typeof data?.wrongCounts?.A === "number" ? data.wrongCounts.A : 0,
      B: typeof data?.wrongCounts?.B === "number" ? data.wrongCounts.B : 0,
    },
    speedBonuses: {
      A: typeof data?.speedBonuses?.A === "number" ? data.speedBonuses.A : 0,
      B: typeof data?.speedBonuses?.B === "number" ? data.speedBonuses.B : 0,
    },
    readySides: {
      A: Boolean(data?.readySides?.A),
      B: Boolean(data?.readySides?.B),
    },
    winnerSide: data?.winnerSide === "A" || data?.winnerSide === "B" ? data.winnerSide : null,
    winnerLabel: typeof data?.winnerLabel === "string" ? data.winnerLabel : null,
    suspiciousSides: Array.isArray(data?.suspiciousSides)
      ? data.suspiciousSides.filter(
          (item: unknown): item is BattleSide => item === "A" || item === "B",
        )
      : [],
    updatedAt: typeof data?.updatedAt === "number" ? data.updatedAt : now(),
    createdAt: typeof data?.createdAt === "number" ? data.createdAt : now(),
  };
  return base;
}

function parseQuestionData(id: string, data: DocumentData | undefined): BattleQuestionDoc {
  return {
    id,
    roomId: typeof data?.roomId === "string" ? data.roomId : "",
    index: typeof data?.index === "number" ? data.index : 0,
    subject: typeof data?.subject === "string" ? data.subject : "সাধারণ জ্ঞান",
    prompt: typeof data?.prompt === "string" ? data.prompt : "",
    options: Array.isArray(data?.options)
      ? data.options.filter((item: unknown): item is string => typeof item === "string")
      : [],
    answerIndex: typeof data?.answerIndex === "number" ? data.answerIndex : 0,
    explanation: typeof data?.explanation === "string" ? data.explanation : "",
    roundType:
      data?.roundType === "rapid-fire" ||
      data?.roundType === "power" ||
      data?.roundType === "sudden-death"
        ? data.roundType
        : "standard",
    timeLimit: typeof data?.timeLimit === "number" ? data.timeLimit : 10,
    points: typeof data?.points === "number" ? data.points : 10,
    speedWindow: typeof data?.speedWindow === "number" ? data.speedWindow : 10,
  };
}

function buildDeck(
  roomId: string,
  classLevel: number,
  roundType: BattleRoundType,
  totalQuestions: number,
) {
  const filtered = quizBank.filter((question) => question.classLevel === classLevel);
  const source = filtered.length ? filtered : quizBank;
  const shuffled = seededShuffle(source, `${roomId}:${classLevel}:${roundType}`);
  return shuffled.slice(0, totalQuestions).map((question, index) => {
    const timeLimit = timeLimitForRound(roundType);
    return {
      id: `${roomId}-q-${index + 1}`,
      roomId,
      index,
      subject: question.subject,
      prompt: question.prompt,
      options: question.options,
      answerIndex: question.answer,
      explanation: question.explain,
      roundType,
      timeLimit,
      points: questionPointsForRound(roundType),
      speedWindow: timeLimit,
    } satisfies BattleQuestionDoc;
  });
}

function roomLocalKey(roomId: string) {
  return `room:${roomId}`;
}

function liveLocalKey(roomId: string) {
  return `live:${roomId}`;
}

function questionsLocalKey(roomId: string) {
  return `questions:${roomId}`;
}

function teamsLocalKey(roomId: string) {
  return `teams:${roomId}`;
}

function participantsLocalKey(roomId: string) {
  return `participants:${roomId}`;
}

function scoresLocalKey(roomId: string) {
  return `scores:${roomId}`;
}

function historyLocalKey(roomId: string) {
  return `history:${roomId}`;
}

function feedLocalKey(roomId: string) {
  return `feed:${roomId}`;
}

function eventsLocalKey(roomId: string) {
  return `events:${roomId}`;
}

function buildLocalState(room: BattleRoomDoc): BattlePublicState {
  return {
    phase: room.phase,
    currentQuestionId: room.currentQuestionId,
    currentQuestionIndex: room.currentQuestionIndex,
    countdownEndsAt: room.countdownEndsAt,
    questionStartedAt: room.questionStartedAt,
    questionEndsAt: room.questionEndsAt,
    questionTimeLimit: room.questionTimeLimit,
    lockState: room.lockState,
    lockedBy: room.lockedBy,
    firstAnswerSide: room.firstAnswerSide,
    firstAnswerCorrect: room.firstAnswerCorrect,
    secondChanceSide: room.secondChanceSide,
    allowedSide: room.allowedSide,
    scores: room.scores,
    correctCounts: room.correctCounts,
    wrongCounts: room.wrongCounts,
    speedBonuses: room.speedBonuses,
    readySides: room.readySides,
    winnerSide: room.winnerSide,
    winnerLabel: room.winnerLabel,
    suspiciousSides: room.suspiciousSides,
    activityFeed: [],
    serverNow: now(),
  };
}

function buildPublicStateFromRoom(
  room: BattleRoomDoc,
  activityFeed: BattleFeedItem[] = [],
): BattlePublicState {
  return {
    phase: room.phase,
    currentQuestionId: room.currentQuestionId,
    currentQuestionIndex: room.currentQuestionIndex,
    countdownEndsAt: room.countdownEndsAt,
    questionStartedAt: room.questionStartedAt,
    questionEndsAt: room.questionEndsAt,
    questionTimeLimit: room.questionTimeLimit,
    lockState: room.lockState,
    lockedBy: room.lockedBy,
    firstAnswerSide: room.firstAnswerSide,
    firstAnswerCorrect: room.firstAnswerCorrect,
    secondChanceSide: room.secondChanceSide,
    allowedSide: room.allowedSide,
    scores: room.scores,
    correctCounts: room.correctCounts,
    wrongCounts: room.wrongCounts,
    speedBonuses: room.speedBonuses,
    readySides: room.readySides,
    winnerSide: room.winnerSide,
    winnerLabel: room.winnerLabel,
    suspiciousSides: room.suspiciousSides,
    activityFeed,
    serverNow: now(),
  };
}

function getLiveRoomRef(roomId: string) {
  if (!firebaseEnabled || rtdbTransportDisabled) return null;
  const rtdb = getFirebaseRtdb();
  return rtdb ? ref(rtdb, `battleRooms/${roomId}/live`) : null;
}

async function writeLiveRoom(roomId: string, payload: Record<string, unknown>) {
  const liveRef = getLiveRoomRef(roomId);
  if (!liveRef) return false;
  try {
    await set(liveRef, payload);
    return true;
  } catch {
    rtdbTransportDisabled = true;
    return false;
  }
}

async function updateLiveRoom(roomId: string, patch: Record<string, unknown>) {
  const liveRef = getLiveRoomRef(roomId);
  if (!liveRef) return false;
  try {
    await update(liveRef, patch);
    return true;
  } catch {
    rtdbTransportDisabled = true;
    return false;
  }
}

async function mirrorLiveState(roomId: string) {
  if (!firebaseEnabled) return;
  const db = getFirebaseDb();
  if (!db) return;
  const roomSnap = await getDoc(doc(db, "rooms", roomId));
  if (!roomSnap.exists()) return;
  const room = parseRoomData(roomSnap.id, roomSnap.data());
  const questionDocs = await getDocs(
    query(collection(db, "questions"), where("roomId", "==", roomId), orderBy("index", "asc")),
  );
  const currentQuestion =
    questionDocs.docs
      .map((entry) => parseQuestionData(entry.id, entry.data()))
      .find((item) => item.id === room.currentQuestionId) ?? null;
  const eventDocs = await getDocs(
    query(
      collection(db, "events"),
      where("roomId", "==", roomId),
      orderBy("createdAt", "desc"),
      limit(30),
    ),
  );
  const feed = eventDocs.docs.map((entry) =>
    normalizeFeedItem({
      ...(entry.data() as DocumentData),
      id: entry.id,
      roomId,
    }),
  );
  await writeLiveRoom(roomId, {
    ...buildPublicStateFromRoom(room, feed),
    activityFeed: feed,
    currentQuestion: currentQuestion
      ? {
          id: currentQuestion.id,
          index: currentQuestion.index,
          roomId: currentQuestion.roomId,
          subject: currentQuestion.subject,
          prompt: currentQuestion.prompt,
          options: currentQuestion.options,
          timeLimit: currentQuestion.timeLimit,
          points: currentQuestion.points,
          speedWindow: currentQuestion.speedWindow,
        }
      : null,
  });
}

async function mirrorLocal(
  room: BattleRoomDoc,
  questions: BattleQuestionDoc[],
  feed: BattleFeedItem[] = [],
) {
  const roomStore = createLocalStore(roomLocalKey(room.id), room);
  const liveStore = createLocalStore(liveLocalKey(room.id), buildLocalState(room));
  const questionStore = createLocalStore(questionsLocalKey(room.id), questions);
  roomStore.write(room);
  liveStore.write({ ...buildLocalState(room), activityFeed: feed });
  questionStore.write(questions);
  createLocalStore(teamsLocalKey(room.id), []).write([]);
  createLocalStore(participantsLocalKey(room.id), []).write([]);
  createLocalStore(scoresLocalKey(room.id), []).write([]);
  createLocalStore(historyLocalKey(room.id), []).write([]);
  createLocalStore(feedLocalKey(room.id), feed);
  createLocalStore(
    eventsLocalKey(room.id),
    feed.map((item) => normalizeEventItem({ ...item, kind: "system", phase: room.phase })),
  ).write(feed.map((item) => normalizeEventItem({ ...item, kind: "system", phase: room.phase })));
}

async function callBattleFunction<T>(name: string, payload: Record<string, unknown>) {
  const functions = getFirebaseFunctions();
  if (!functions) return null;
  try {
    const callable = httpsCallable(functions, name);
    const result = await callable(payload);
    return result.data as T;
  } catch {
    return null;
  }
}

export function listenBattleRoom(
  roomId: string,
  onChange: (room: BattleRoomDoc | null) => void,
): Unsubscribe | (() => void) {
  if (!firebaseEnabled) {
    return createLocalStore(roomLocalKey(roomId), null as BattleRoomDoc | null).listen(onChange);
  }
  const db = getFirebaseDb();
  if (!db) return () => {};
  return onSnapshot(doc(db, "rooms", roomId), (snapshot) =>
    onChange(snapshot.exists() ? parseRoomData(snapshot.id, snapshot.data()) : null),
  );
}

export async function findBattleRoomByCode(code: string) {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return null;
  if (!firebaseEnabled) {
    const room = createLocalStore<BattleRoomDoc[]>("rooms", [])
      .read()
      .find(
        (item) => item.code.toUpperCase() === normalized || item.id.toUpperCase() === normalized,
      );
    return room?.id ?? null;
  }
  const db = getFirebaseDb();
  if (!db) return null;
  const snapshot = await getDocs(
    query(collection(db, "rooms"), where("code", "==", normalized), limit(1)),
  );
  if (snapshot.docs[0]) return snapshot.docs[0].id;
  const byId = await getDoc(doc(db, "rooms", normalized));
  return byId.exists() ? byId.id : null;
}

export function listenBattleLive(
  roomId: string,
  onChange: (state: BattlePublicState | null) => void,
): Unsubscribe | (() => void) {
  if (!firebaseEnabled) {
    return createLocalStore(liveLocalKey(roomId), null as BattlePublicState | null).listen(
      onChange,
    );
  }
  const db = getFirebaseDb();
  const fallbackUnsub =
    db != null
      ? onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
          if (!rtdbTransportDisabled) return;
          onChange(
            snapshot.exists()
              ? buildPublicStateFromRoom(parseRoomData(snapshot.id, snapshot.data()))
              : null,
          );
        })
      : () => {};

  const liveRef = getLiveRoomRef(roomId);
  if (!liveRef) {
    return fallbackUnsub;
  }

  const liveUnsub = onValue(
    liveRef,
    (snapshot) => {
      onChange(snapshot.exists() ? (snapshot.val() as BattlePublicState) : null);
    },
    () => {
      rtdbTransportDisabled = true;
      if (db) {
        void getDoc(doc(db, "rooms", roomId))
          .then((snapshot) => {
            onChange(
              snapshot.exists()
                ? buildPublicStateFromRoom(parseRoomData(snapshot.id, snapshot.data()))
                : null,
            );
          })
          .catch(() => onChange(null));
      } else {
        onChange(null);
      }
    },
  );

  return () => {
    fallbackUnsub();
    liveUnsub();
  };
}

export function listenBattleQuestions(
  roomId: string,
  onChange: (questions: BattleQuestionDoc[]) => void,
): Unsubscribe | (() => void) {
  if (!firebaseEnabled) {
    return createLocalStore(questionsLocalKey(roomId), []).listen(onChange);
  }
  const db = getFirebaseDb();
  if (!db) return () => {};
  return onSnapshot(
    query(collection(db, "questions"), where("roomId", "==", roomId), orderBy("index", "asc")),
    (snapshot) => {
      onChange(snapshot.docs.map((entry) => parseQuestionData(entry.id, entry.data())));
    },
  );
}

export function listenBattleTeams(
  roomId: string,
  onChange: (teams: BattleTeamDoc[]) => void,
): Unsubscribe | (() => void) {
  if (!firebaseEnabled) {
    return createLocalStore(teamsLocalKey(roomId), []).listen(onChange);
  }
  const db = getFirebaseDb();
  if (!db) return () => {};
  return onSnapshot(
    query(collection(db, "teams"), where("roomId", "==", roomId), orderBy("joinedAt", "asc")),
    (snapshot) => {
      onChange(snapshot.docs.map((entry) => entry.data() as BattleTeamDoc));
    },
  );
}

export function listenBattleHistory(
  roomId: string,
  onChange: (records: BattleHistoryDoc[]) => void,
): Unsubscribe | (() => void) {
  if (!firebaseEnabled) {
    return createLocalStore(historyLocalKey(roomId), []).listen(onChange);
  }
  const db = getFirebaseDb();
  if (!db) return () => {};
  return onSnapshot(
    query(
      collection(db, "battle_history"),
      where("roomId", "==", roomId),
      orderBy("endedAt", "desc"),
      limit(10),
    ),
    (snapshot) => {
      onChange(snapshot.docs.map((entry) => entry.data() as BattleHistoryDoc));
    },
  );
}

export function listenBattleFeed(
  roomId: string,
  onChange: (feed: BattleFeedItem[]) => void,
): Unsubscribe | (() => void) {
  if (!firebaseEnabled) {
    return createLocalStore(feedLocalKey(roomId), []).listen(onChange);
  }
  const db = getFirebaseDb();
  if (!db) return () => {};
  return onSnapshot(
    query(
      collection(db, "events"),
      where("roomId", "==", roomId),
      orderBy("createdAt", "desc"),
      limit(40),
    ),
    (snapshot) => {
      onChange(
        snapshot.docs.map((entry) =>
          normalizeFeedItem({
            ...(entry.data() as DocumentData),
            id: entry.id,
            roomId,
          }),
        ),
      );
    },
  );
}

export function listenBattleEvents(
  roomId: string,
  onChange: (events: BattleEventDoc[]) => void,
): Unsubscribe | (() => void) {
  if (!firebaseEnabled) {
    return createLocalStore(eventsLocalKey(roomId), []).listen(onChange);
  }
  const db = getFirebaseDb();
  if (!db) return () => {};
  return onSnapshot(
    query(
      collection(db, "events"),
      where("roomId", "==", roomId),
      orderBy("createdAt", "desc"),
      limit(60),
    ),
    (snapshot) => {
      onChange(
        snapshot.docs.map((entry) =>
          normalizeEventItem({
            ...(entry.data() as DocumentData),
            id: entry.id,
            roomId,
          }),
        ),
      );
    },
  );
}

export async function createBattleRoom(input: {
  host: Pick<UserState, "uid" | "name" | "avatar" | "schoolId" | "schoolName">;
  roomLabel: string;
  title: string;
  teamAName: string;
  teamBName: string;
  classLevel: number;
  roundType: BattleRoundType;
  totalQuestions: number;
}) {
  const roomId = randomId("room");
  const code = makeRoomCode();
  const deck = buildDeck(
    roomId,
    input.classLevel,
    input.roundType,
    clamp(input.totalQuestions, 5, 20),
  );
  const questionIds = deck.map((item) => item.id);
  const room: BattleRoomDoc = {
    id: roomId,
    code,
    title: input.title,
    roomLabel: input.roomLabel,
    hostId: input.host.uid,
    hostName: input.host.name,
    hostSchoolId: input.host.schoolId,
    hostSchoolName: input.host.schoolName ?? "Unknown school",
    hostAvatar: input.host.avatar,
    teamAName: input.teamAName,
    teamBName: input.teamBName,
    teamAId: `${roomId}-team-a`,
    teamBId: `${roomId}-team-b`,
    teamACaptainId: input.host.uid,
    teamBCaptainId: null,
    teamAColor: DEFAULT_COLORS.A,
    teamBColor: DEFAULT_COLORS.B,
    roundType: input.roundType,
    totalQuestions: deck.length,
    classLevel: input.classLevel,
    questionIds,
    phase: "invited",
    currentQuestionId: questionIds[0] ?? null,
    currentQuestionIndex: 0,
    countdownEndsAt: null,
    questionStartedAt: null,
    questionEndsAt: null,
    questionTimeLimit: timeLimitForRound(input.roundType),
    allowedSide: null,
    lockState: "open",
    lockedBy: null,
    secondChanceSide: null,
    firstAnswerSide: null,
    firstAnswerCorrect: null,
    scores: { A: 0, B: 0 },
    correctCounts: { A: 0, B: 0 },
    wrongCounts: { A: 0, B: 0 },
    speedBonuses: { A: 0, B: 0 },
    readySides: { A: false, B: false },
    winnerSide: null,
    winnerLabel: null,
    suspiciousSides: [],
    updatedAt: now(),
    createdAt: now(),
  };
  const roomEvent = normalizeEventItem({
    roomId,
    side: "SYSTEM",
    type: "state",
    kind: "room",
    phase: "invited",
    message: `${room.teamAName} vs ${room.teamBName}`,
    pointsDelta: 0,
  });

  if (!firebaseEnabled) {
    const rooms = createLocalStore<BattleRoomDoc[]>("rooms", []).read();
    createLocalStore<BattleRoomDoc[]>("rooms", [
      room,
      ...rooms.filter((item) => item.id !== room.id),
    ]).write([room, ...rooms.filter((item) => item.id !== room.id)]);
    mirrorLocal(room, deck, [roomEvent]);
    return room;
  }

  const db = getFirebaseDb();
  if (!db) return room;

  const batch = writeBatch(db);
  batch.set(doc(db, "rooms", roomId), room);
  batch.set(doc(db, "matches", roomId), {
    roomId,
    roomLabel: input.roomLabel,
    title: input.title,
    code,
    hostId: input.host.uid,
    hostName: input.host.name,
    classLevel: input.classLevel,
    roundType: input.roundType,
    totalQuestions: deck.length,
    status: "invited",
    createdAt: now(),
    updatedAt: now(),
  });
  batch.set(doc(db, "participants", `${roomId}-${input.host.uid}`), {
    id: `${roomId}-${input.host.uid}`,
    roomId,
    uid: input.host.uid,
    side: "A",
    role: "captain",
    name: input.host.name,
    avatar: input.host.avatar,
    schoolId: input.host.schoolId,
    schoolName: input.host.schoolName ?? "Unknown school",
    ready: false,
    joinedAt: now(),
    lastSeenAt: now(),
    isOnline: true,
  } satisfies BattleParticipantDoc);
  batch.set(doc(db, "scores", `${roomId}-A`), {
    id: `${roomId}-A`,
    roomId,
    side: "A",
    score: 0,
    correct: 0,
    wrong: 0,
    speedBonus: 0,
    updatedAt: now(),
  } satisfies BattleScoreDoc);
  batch.set(doc(db, "scores", `${roomId}-B`), {
    id: `${roomId}-B`,
    roomId,
    side: "B",
    score: 0,
    correct: 0,
    wrong: 0,
    speedBonus: 0,
    updatedAt: now(),
  } satisfies BattleScoreDoc);
  deck.forEach((question) => {
    batch.set(doc(db, "questions", question.id), question);
  });
  batch.set(doc(db, "teams", room.teamAId), {
    id: room.teamAId,
    roomId,
    side: "A",
    name: room.teamAName,
    captainId: input.host.uid,
    captainName: input.host.name,
    captainAvatar: input.host.avatar,
    schoolId: input.host.schoolId,
    schoolName: input.host.schoolName ?? "Unknown school",
    color: room.teamAColor,
    ready: false,
    joinedAt: now(),
    points: 0,
    correct: 0,
    wrong: 0,
    speedBonus: 0,
    members: [
      {
        uid: input.host.uid,
        name: input.host.name,
        avatar: input.host.avatar,
        role: "captain",
        schoolId: input.host.schoolId,
        schoolName: input.host.schoolName ?? "Unknown school",
        joinedAt: now(),
        lastSeenAt: now(),
        ready: false,
        isOnline: true,
      },
    ],
  } satisfies BattleTeamDoc);
  batch.set(doc(db, "teams", room.teamBId), {
    id: room.teamBId,
    roomId,
    side: "B",
    name: room.teamBName,
    captainId: "",
    captainName: "",
    captainAvatar: "🏫",
    schoolId: null,
    schoolName: room.teamBName,
    color: room.teamBColor,
    ready: false,
    joinedAt: now(),
    points: 0,
    correct: 0,
    wrong: 0,
    speedBonus: 0,
    members: [],
  } satisfies BattleTeamDoc);
  batch.set(doc(db, "events", roomEvent.id), roomEvent);
  await batch.commit();
  await writeLiveRoom(roomId, {
    ...buildPublicStateFromRoom(room, [roomEvent]),
    activityFeed: [roomEvent],
    currentQuestion: deck[0]
      ? {
          id: deck[0].id,
          index: deck[0].index,
          roomId,
          subject: deck[0].subject,
          prompt: deck[0].prompt,
          options: deck[0].options,
          timeLimit: deck[0].timeLimit,
          points: deck[0].points,
          speedWindow: deck[0].speedWindow,
        }
      : null,
  });
  return room;
}

async function updateRoomAndMirror(
  roomId: string,
  patch: Partial<BattleRoomDoc>,
  note?: BattleFeedItem[],
) {
  if (!firebaseEnabled) {
    const rooms = createLocalStore<BattleRoomDoc[]>("rooms", []).read();
    const next = rooms.map((room) =>
      room.id === roomId ? { ...room, ...patch, updatedAt: now() } : room,
    );
    const room = next.find((item) => item.id === roomId) ?? null;
    createLocalStore<BattleRoomDoc[]>("rooms", []).write(next);
    if (room) {
      const questions = createLocalStore<BattleQuestionDoc[]>(questionsLocalKey(roomId), []).read();
      const live = {
        ...buildLocalState(room),
        activityFeed: note ?? createLocalStore<BattleFeedItem[]>(feedLocalKey(roomId), []).read(),
        serverNow: now(),
      };
      createLocalStore(liveLocalKey(roomId), live).write(live);
    }
    if (note) createLocalStore(feedLocalKey(roomId), note).write(note);
    return room;
  }

  const db = getFirebaseDb();
  if (!db) return null;
  await updateDoc(doc(db, "rooms", roomId), {
    ...patch,
    updatedAt: now(),
  });
  await mirrorLiveState(roomId);
  if (note?.length) {
    const batch = writeBatch(db);
    note.forEach((entry) =>
      batch.set(
        doc(db, "events", entry.id),
        normalizeEventItem({ ...entry, roomId, phase: patch.phase ?? "loading", kind: "system" }),
      ),
    );
    await batch.commit();
  }
  return null;
}

export async function joinBattleRoom(
  roomId: string,
  user: UserState,
  side: BattleSide,
  role: ParticipantRole = "member",
) {
  const participant: BattleParticipantDoc = {
    id: `${roomId}-${user.uid}`,
    roomId,
    uid: user.uid,
    side: role === "spectator" ? "SPECTATOR" : side,
    role,
    name: user.name,
    avatar: user.avatar,
    schoolId: user.schoolId,
    schoolName: user.schoolName ?? "Unknown school",
    ready: false,
    joinedAt: now(),
    lastSeenAt: now(),
    isOnline: true,
  };

  if (!firebaseEnabled) {
    const rooms = createLocalStore<BattleRoomDoc[]>("rooms", []).read();
    const room = rooms.find((item) => item.id === roomId);
    if (!room) return { accepted: false, reason: "room-missing" };
    const teams = createLocalStore<BattleTeamDoc[]>(teamsLocalKey(roomId), []).read();
    const participants = createLocalStore<BattleParticipantDoc[]>(
      participantsLocalKey(roomId),
      [],
    ).read();
    const nextParticipants = [...participants.filter((item) => item.uid !== user.uid), participant];
    createLocalStore(participantsLocalKey(roomId), nextParticipants).write(nextParticipants);
    const nextTeams = teams.map((team) => {
      if (team.roomId !== roomId || team.side !== side || role === "spectator") return team;
      if (
        !team.members.some((member) => member.uid === user.uid) &&
        team.members.length >= MAX_TEAM_MEMBERS
      )
        return team;
      const member = {
        uid: user.uid,
        name: user.name,
        avatar: user.avatar,
        role,
        schoolId: user.schoolId,
        schoolName: user.schoolName ?? "Unknown school",
        joinedAt: now(),
        lastSeenAt: now(),
        ready: false,
        isOnline: true,
      };
      const members = team.members.filter((existing) => existing.uid !== user.uid).concat(member);
      return {
        ...team,
        members,
        ready: false,
        captainId: role === "captain" ? user.uid : team.captainId,
        captainName: role === "captain" ? user.name : team.captainName,
        captainAvatar: role === "captain" ? user.avatar : team.captainAvatar,
        joinedAt: now(),
      };
    });
    createLocalStore(teamsLocalKey(roomId), nextTeams).write(nextTeams);
    const nextRooms = rooms.map((current) =>
      current.id === roomId
        ? {
            ...current,
            phase: current.phase === "draft" ? "invited" : "accepted",
            teamACaptainId: side === "A" && role === "captain" ? user.uid : current.teamACaptainId,
            teamBCaptainId: side === "B" && role === "captain" ? user.uid : current.teamBCaptainId,
            readySides: { ...current.readySides, [side]: false },
            updatedAt: now(),
          }
        : current,
    );
    createLocalStore<BattleRoomDoc[]>("rooms", nextRooms).write(nextRooms);
    const nextEvents = [
      normalizeEventItem({
        roomId,
        side: role === "spectator" ? "SYSTEM" : side,
        type: "info",
        kind: "team",
        phase: room.phase,
        message:
          role === "spectator"
            ? `${user.name} joined as spectator.`
            : `${user.name} joined Team ${side}.`,
        pointsDelta: 0,
      }),
      ...createLocalStore<BattleFeedItem[]>(feedLocalKey(roomId), []).read(),
    ].slice(0, 30);
    createLocalStore(feedLocalKey(roomId), nextEvents).write(nextEvents);
    createLocalStore(
      eventsLocalKey(roomId),
      nextEvents.map((item) => normalizeEventItem({ ...item, phase: room.phase })),
    ).write(nextEvents.map((item) => normalizeEventItem({ ...item, phase: room.phase })));
    return { accepted: true, roomId };
  }

  const db = getFirebaseDb();
  if (!db) return { accepted: false, reason: "firebase-unavailable" };
  const roomRef = doc(db, "rooms", roomId);
  const teamRef =
    role === "spectator"
      ? null
      : doc(db, "teams", `${roomId}-${side === "A" ? "team-a" : "team-b"}`);
  const participantRef = doc(db, "participants", participant.id);

  const result = await runTransaction(db, async (transaction) => {
    const roomSnap = await transaction.get(roomRef);
    if (!roomSnap.exists()) return { accepted: false, reason: "room-missing" };
    const room = parseRoomData(roomSnap.id, roomSnap.data());

    if (role !== "spectator") {
      if (!teamRef) return { accepted: false, reason: "team-missing" };
      const teamSnap = await transaction.get(teamRef);
      const team = teamSnap.exists()
        ? (teamSnap.data() as BattleTeamDoc)
        : {
            id: teamRef.id,
            roomId,
            side,
            name: side === "A" ? room.teamAName : room.teamBName,
            captainId: "",
            captainName: "",
            captainAvatar: "🏫",
            schoolId: null,
            schoolName: side === "A" ? room.teamAName : room.teamBName,
            color: side === "A" ? room.teamAColor : room.teamBColor,
            ready: false,
            joinedAt: now(),
            points: 0,
            correct: 0,
            wrong: 0,
            speedBonus: 0,
            members: [],
          };
      const otherSide = side === "A" ? "B" : "A";
      const otherTeamRef = doc(db, "teams", `${roomId}-${otherSide === "A" ? "team-a" : "team-b"}`);
      const otherTeamSnap = await transaction.get(otherTeamRef);
      const otherTeam = otherTeamSnap.exists() ? (otherTeamSnap.data() as BattleTeamDoc) : null;
      const existingMember = team.members.find((member) => member.uid === user.uid);
      if (!existingMember && team.members.length >= MAX_TEAM_MEMBERS) {
        return { accepted: false, reason: "team-full" };
      }
      const member = {
        uid: user.uid,
        name: user.name,
        avatar: user.avatar,
        role,
        schoolId: user.schoolId,
        schoolName: user.schoolName ?? "Unknown school",
        joinedAt: now(),
        lastSeenAt: now(),
        ready: false,
        isOnline: true,
      };
      const members = team.members.filter((item) => item.uid !== user.uid).concat(member);
      const nextPhase =
        members.length > 0 && (otherTeam?.members?.length ?? 0) > 0
          ? "accepted"
          : room.phase === "draft"
            ? "invited"
            : room.phase;
      transaction.set(participantRef, participant);
      transaction.set(teamRef, {
        ...team,
        members,
        ready: false,
        captainId: role === "captain" ? user.uid : team.captainId,
        captainName: role === "captain" ? user.name : team.captainName,
        captainAvatar: role === "captain" ? user.avatar : team.captainAvatar,
        joinedAt: now(),
      });
      transaction.update(roomRef, {
        phase: nextPhase,
        teamACaptainId: side === "A" && role === "captain" ? user.uid : room.teamACaptainId,
        teamBCaptainId: side === "B" && role === "captain" ? user.uid : room.teamBCaptainId,
        readySides: { ...room.readySides, [side]: false },
        updatedAt: now(),
      });
      transaction.set(doc(db, "scores", `${roomId}-${side}`), {
        id: `${roomId}-${side}`,
        roomId,
        side,
        score: room.scores[side],
        correct: room.correctCounts[side],
        wrong: room.wrongCounts[side],
        speedBonus: room.speedBonuses[side],
        updatedAt: now(),
      } satisfies BattleScoreDoc);
      transaction.set(
        doc(db, "events", randomId("event")),
        normalizeEventItem({
          roomId,
          side,
          type: "info",
          kind: "team",
          phase: nextPhase,
          message: `${user.name} joined Team ${side}.`,
          pointsDelta: 0,
        }),
      );
    } else {
      transaction.set(participantRef, participant);
      transaction.update(roomRef, { updatedAt: now() });
      transaction.set(
        doc(db, "events", randomId("event")),
        normalizeEventItem({
          roomId,
          side: "SYSTEM",
          type: "info",
          kind: "team",
          phase: room.phase,
          message: `${user.name} joined as a spectator.`,
          pointsDelta: 0,
        }),
      );
    }
    return { accepted: true, roomId };
  });

  await mirrorLiveState(roomId);
  return result;
}

export async function setTeamReady(roomId: string, side: BattleSide, ready: boolean) {
  if (!firebaseEnabled) {
    const rooms = createLocalStore<BattleRoomDoc[]>("rooms", []).read();
    const teams = createLocalStore<BattleTeamDoc[]>(teamsLocalKey(roomId), []).read();
    const nextTeams = teams.map((team) =>
      team.roomId === roomId && team.side === side ? { ...team, ready } : team,
    );
    createLocalStore(teamsLocalKey(roomId), nextTeams).write(nextTeams);
    const nextRooms = rooms.map((room) =>
      room.id === roomId
        ? {
            ...room,
            readySides: { ...room.readySides, [side]: ready },
            phase:
              { ...room.readySides, [side]: ready }.A && { ...room.readySides, [side]: ready }.B
                ? "ready"
                : room.phase === "ready" && !ready
                  ? "accepted"
                  : room.phase,
            updatedAt: now(),
          }
        : room,
    );
    createLocalStore<BattleRoomDoc[]>("rooms", nextRooms).write(nextRooms);
    const room = nextRooms.find((item) => item.id === roomId);
    if (room)
      createLocalStore(liveLocalKey(roomId), { ...buildLocalState(room), serverNow: now() }).write({
        ...buildLocalState(room),
        serverNow: now(),
      });
    return;
  }
  const db = getFirebaseDb();
  if (!db) return;
  const roomRef = doc(db, "rooms", roomId);
  const teamRef = doc(db, "teams", `${roomId}-${side === "A" ? "team-a" : "team-b"}`);
  const roomSnap = await getDoc(roomRef);
  if (!roomSnap.exists()) return;
  const room = parseRoomData(roomId, roomSnap.data());
  const nextReady = { ...room.readySides, [side]: ready };
  await updateDoc(teamRef, { ready, updatedAt: now() });
  await updateDoc(roomRef, {
    [`readySides.${side}`]: ready,
    phase:
      nextReady.A && nextReady.B
        ? "ready"
        : room.phase === "ready" && !ready
          ? "accepted"
          : room.phase,
    updatedAt: now(),
  });
  await updateDoc(doc(db, "participants", `${roomId}-${side}`), { ready, lastSeenAt: now() }).catch(
    () => {},
  );
  await mirrorLiveState(roomId);
}

export async function startCountdown(roomId: string, seconds = 10) {
  const countdownEndsAt = now() + seconds * 1000;
  if (!firebaseEnabled) {
    const rooms = createLocalStore<BattleRoomDoc[]>("rooms", []).read();
    const nextRooms = rooms.map((room) =>
      room.id === roomId && room.readySides.A && room.readySides.B
        ? { ...room, phase: "countdown", countdownEndsAt, updatedAt: now() }
        : room,
    );
    createLocalStore<BattleRoomDoc[]>("rooms", nextRooms).write(nextRooms);
    const room = nextRooms.find((item) => item.id === roomId);
    if (room)
      createLocalStore(liveLocalKey(roomId), { ...buildLocalState(room), serverNow: now() }).write({
        ...buildLocalState(room),
        serverNow: now(),
      });
    return;
  }
  const db = getFirebaseDb();
  if (!db) return;
  const roomRef = doc(db, "rooms", roomId);
  const roomSnap = await getDoc(roomRef);
  if (!roomSnap.exists()) return;
  const room = parseRoomData(roomId, roomSnap.data());
  if (!room.readySides.A || !room.readySides.B) return;
  await updateDoc(roomRef, { phase: "countdown", countdownEndsAt, updatedAt: now() });
  await mirrorLiveState(roomId);
}

async function loadQuestionByIndex(roomId: string, index: number) {
  const db = getFirebaseDb();
  if (!db) return null;
  const snap = await getDocs(
    query(
      collection(db, "questions"),
      where("roomId", "==", roomId),
      where("index", "==", index),
      limit(1),
    ),
  );
  if (!snap.docs[0]) return null;
  return parseQuestionData(snap.docs[0].id, snap.docs[0].data());
}

async function loadQuestionForRoom(room: BattleRoomDoc, index: number) {
  const db = getFirebaseDb();
  if (!db) return null;
  const questionId = room.questionIds[index];
  if (questionId) {
    const snap = await getDoc(doc(db, "questions", questionId));
    if (snap.exists()) return parseQuestionData(snap.id, snap.data());
  }
  return loadQuestionByIndex(room.id, index);
}

async function advanceToQuestion(roomId: string, nextIndex: number) {
  const db = getFirebaseDb();
  if (!db) return null;
  const roomRef = doc(db, "rooms", roomId);
  const roomSnap = await getDoc(roomRef);
  if (!roomSnap.exists()) return null;
  const room = parseRoomData(roomId, roomSnap.data());
  const question = await loadQuestionForRoom(room, nextIndex);
  if (!question) {
    const roomTeams = await getDocs(query(collection(db, "teams"), where("roomId", "==", roomId)));
    const teamDocs = roomTeams.docs.map((entry) => entry.data() as BattleTeamDoc);
    const winnerSide =
      room.scores.A === room.scores.B ? null : room.scores.A > room.scores.B ? "A" : "B";
    const winnerLabel =
      winnerSide === "A" ? room.teamAName : winnerSide === "B" ? room.teamBName : "Tie";
    const history: BattleHistoryDoc = {
      id: randomId("history"),
      roomId,
      winnerSide,
      winnerLabel,
      teamAName: room.teamAName,
      teamBName: room.teamBName,
      scoreA: room.scores.A,
      scoreB: room.scores.B,
      correctA: room.correctCounts.A,
      correctB: room.correctCounts.B,
      wrongA: room.wrongCounts.A,
      wrongB: room.wrongCounts.B,
      speedA: room.speedBonuses.A,
      speedB: room.speedBonuses.B,
      accuracyA:
        room.correctCounts.A + room.wrongCounts.A > 0
          ? Math.round((room.correctCounts.A / (room.correctCounts.A + room.wrongCounts.A)) * 100)
          : 0,
      accuracyB:
        room.correctCounts.B + room.wrongCounts.B > 0
          ? Math.round((room.correctCounts.B / (room.correctCounts.B + room.wrongCounts.B)) * 100)
          : 0,
      questionCount: room.totalQuestions,
      classLevel: room.classLevel,
      roundType: room.roundType,
      endedAt: now(),
    };
    await updateDoc(roomRef, {
      phase: "finished",
      winnerSide,
      winnerLabel,
      currentQuestionId: null,
      questionEndsAt: null,
      questionStartedAt: null,
      updatedAt: now(),
    });
    await setDoc(doc(db, "battle_history", history.id), history);
    await mirrorLiveState(roomId);
    return { history, teamDocs };
  }
  await updateDoc(roomRef, {
    phase: "live",
    currentQuestionId: question.id,
    currentQuestionIndex: nextIndex,
    questionTimeLimit: question.timeLimit,
    questionStartedAt: now(),
    questionEndsAt: now() + question.timeLimit * 1000,
    allowedSide: null,
    lockState: "open",
    lockedBy: null,
    secondChanceSide: null,
    firstAnswerSide: null,
    firstAnswerCorrect: null,
    updatedAt: now(),
  });
  await mirrorLiveState(roomId);
  return { question };
}

export async function startBattleMatch(roomId: string) {
  if (!firebaseEnabled) {
    const rooms = createLocalStore<BattleRoomDoc[]>("rooms", []).read();
    const nextRooms = rooms.map((room) => {
      if (room.id !== roomId) return room;
      if (room.phase === "countdown" && room.countdownEndsAt && room.countdownEndsAt > now())
        return room;
      return {
        ...room,
        phase: "live",
        currentQuestionIndex: room.currentQuestionIndex ?? 0,
        currentQuestionId:
          room.questionIds[room.currentQuestionIndex] ?? room.questionIds[0] ?? null,
        questionStartedAt: now(),
        questionEndsAt: now() + room.questionTimeLimit * 1000,
        lockState: "open",
        lockedBy: null,
        secondChanceSide: null,
        firstAnswerSide: null,
        firstAnswerCorrect: null,
        countdownEndsAt: null,
        updatedAt: now(),
      };
    });
    createLocalStore<BattleRoomDoc[]>("rooms", nextRooms).write(nextRooms);
    const room = nextRooms.find((item) => item.id === roomId);
    if (room)
      createLocalStore(liveLocalKey(roomId), { ...buildLocalState(room), serverNow: now() }).write({
        ...buildLocalState(room),
        serverNow: now(),
      });
    return;
  }
  const db = getFirebaseDb();
  if (!db) return;
  const roomSnap = await getDoc(doc(db, "rooms", roomId));
  if (!roomSnap.exists()) return;
  const room = parseRoomData(roomId, roomSnap.data());
  if (room.phase === "countdown" && room.countdownEndsAt && room.countdownEndsAt > now()) return;
  const currentQuestionId =
    room.questionIds[room.currentQuestionIndex] ?? room.questionIds[0] ?? null;
  await updateDoc(doc(db, "rooms", roomId), {
    phase: "live",
    currentQuestionIndex: room.currentQuestionIndex ?? 0,
    currentQuestionId,
    questionStartedAt: now(),
    questionEndsAt: now() + room.questionTimeLimit * 1000,
    questionTimeLimit: timeLimitForRound(room.roundType),
    lockState: "open",
    lockedBy: null,
    secondChanceSide: null,
    firstAnswerSide: null,
    firstAnswerCorrect: null,
    countdownEndsAt: null,
    updatedAt: now(),
  });
  await mirrorLiveState(roomId);
}

export async function pauseBattle(roomId: string) {
  await updateRoomAndMirror(roomId, { phase: "paused" });
}

export async function resumeBattle(roomId: string) {
  await updateRoomAndMirror(roomId, { phase: "live" });
}

export async function skipQuestion(roomId: string) {
  if (!firebaseEnabled) {
    const rooms = createLocalStore<BattleRoomDoc[]>("rooms", []).read();
    const room = rooms.find((item) => item.id === roomId);
    if (!room) return;
    const nextIndex = room.currentQuestionIndex + 1;
    const nextRooms = rooms.map((item) =>
      item.id === roomId
        ? {
            ...item,
            currentQuestionIndex: nextIndex,
            currentQuestionId: item.questionIds[nextIndex] ?? null,
            questionStartedAt: now(),
            questionEndsAt: now() + item.questionTimeLimit * 1000,
            lockState: "open",
            lockedBy: null,
            secondChanceSide: null,
            firstAnswerSide: null,
            firstAnswerCorrect: null,
            updatedAt: now(),
          }
        : item,
    );
    createLocalStore<BattleRoomDoc[]>("rooms", nextRooms).write(nextRooms);
    return;
  }
  const db = getFirebaseDb();
  if (!db) return;
  const roomSnap = await getDoc(doc(db, "rooms", roomId));
  if (!roomSnap.exists()) return;
  const room = parseRoomData(roomId, roomSnap.data());
  await advanceToQuestion(roomId, room.currentQuestionIndex + 1);
}

export async function removeTeam(roomId: string, side: BattleSide) {
  if (!firebaseEnabled) {
    const teams = createLocalStore<BattleTeamDoc[]>(teamsLocalKey(roomId), []).read();
    createLocalStore<BattleTeamDoc[]>(
      teamsLocalKey(roomId),
      teams.filter((team) => team.side !== side),
    ).write(teams.filter((team) => team.side !== side));
    return;
  }
  const db = getFirebaseDb();
  if (!db) return;
  const teamId = `${roomId}-${side === "A" ? "team-a" : "team-b"}`;
  await updateDoc(doc(db, "teams", teamId), { members: [], ready: false });
  await mirrorLiveState(roomId);
}

export async function endBattle(roomId: string) {
  if (!firebaseEnabled) {
    const rooms = createLocalStore<BattleRoomDoc[]>("rooms", []).read();
    const nextRooms = rooms.map((room) =>
      room.id === roomId ? { ...room, phase: "finished", updatedAt: now() } : room,
    );
    createLocalStore<BattleRoomDoc[]>("rooms", nextRooms).write(nextRooms);
    return;
  }
  const db = getFirebaseDb();
  if (!db) return;
  const roomSnap = await getDoc(doc(db, "rooms", roomId));
  if (!roomSnap.exists()) return;
  const room = parseRoomData(roomId, roomSnap.data());
  const winnerSide =
    room.scores.A === room.scores.B ? null : room.scores.A > room.scores.B ? "A" : "B";
  const winnerLabel =
    winnerSide === "A" ? room.teamAName : winnerSide === "B" ? room.teamBName : "Tie";
  await updateDoc(doc(db, "rooms", roomId), {
    phase: "finished",
    winnerSide,
    winnerLabel,
    updatedAt: now(),
  });
  await mirrorLiveState(roomId);
}

export async function submitBattleAnswer(input: {
  roomId: string;
  user: UserState;
  side: BattleSide;
  answerIndex: number;
}) {
  if (!firebaseEnabled) {
    const rooms = createLocalStore<BattleRoomDoc[]>("rooms", []).read();
    const room = rooms.find((item) => item.id === input.roomId);
    const questions = createLocalStore<BattleQuestionDoc[]>(
      questionsLocalKey(input.roomId),
      [],
    ).read();
    if (!room) return { accepted: false, reason: "room-missing" };
    const question = questions.find((item) => item.id === room.currentQuestionId);
    if (!question) return { accepted: false, reason: "question-missing" };
    const elapsedMs = now() - (room.questionStartedAt ?? now());
    const isCorrect = input.answerIndex === question.answerIndex;
    const base = question.points;
    const bonus = isCorrect ? scoreBonusForElapsed(room.roundType, elapsedMs) : 0;
    const feed: BattleFeedItem[] = createLocalStore(feedLocalKey(input.roomId), []).read();
    const nextFeed = [...feed];
    const nextRoom: BattleRoomDoc = { ...room };
    if (room.lockState === "open" || room.lockState === "second-chance") {
      if (!room.lockedBy) {
        nextRoom.lockedBy = input.side;
        nextRoom.firstAnswerSide = input.side;
        nextRoom.firstAnswerCorrect = isCorrect;
        nextRoom.lockState = isCorrect ? "resolved" : "second-chance";
        nextRoom.allowedSide = isCorrect ? null : input.side === "A" ? "B" : "A";
        nextRoom.secondChanceSide = isCorrect ? null : input.side === "A" ? "B" : "A";
        nextRoom.questionEndsAt = now() + (isCorrect ? 1800 : 10000);
        nextRoom.scores[input.side] = nextRoom.scores[input.side] + (isCorrect ? base + bonus : -5);
        nextRoom.correctCounts[input.side] =
          nextRoom.correctCounts[input.side] + (isCorrect ? 1 : 0);
        nextRoom.wrongCounts[input.side] = nextRoom.wrongCounts[input.side] + (isCorrect ? 0 : 1);
        nextRoom.speedBonuses[input.side] = nextRoom.speedBonuses[input.side] + bonus;
        nextFeed.unshift(
          normalizeFeedItem({
            roomId: input.roomId,
            side: input.side,
            type: isCorrect ? "correct" : "incorrect",
            message: isCorrect
              ? `${input.user.name} answered first and correct.`
              : `${input.user.name} answered incorrectly. Second chance unlocked.`,
            pointsDelta: isCorrect ? base + bonus : -5,
          }),
        );
        if (isCorrect || room.roundType === "sudden-death") {
          const nextIndex = room.currentQuestionIndex + 1;
          const nextQuestion = questions.find((item) => item.index === nextIndex) ?? null;
          if (nextQuestion) {
            nextRoom.currentQuestionId = nextQuestion.id;
            nextRoom.currentQuestionIndex = nextIndex;
            nextRoom.lockState = "open";
            nextRoom.lockedBy = null;
            nextRoom.secondChanceSide = null;
            nextRoom.firstAnswerSide = null;
            nextRoom.firstAnswerCorrect = null;
            nextRoom.questionStartedAt = now();
            nextRoom.questionEndsAt = now() + nextQuestion.timeLimit * 1000;
            nextRoom.questionTimeLimit = nextQuestion.timeLimit;
            nextRoom.allowedSide = null;
            nextFeed.unshift(
              normalizeFeedItem({
                roomId: input.roomId,
                side: "SYSTEM",
                type: "state",
                message: `Question ${nextIndex + 1} loaded.`,
              }),
            );
          } else {
            nextRoom.phase = "finished";
            nextRoom.winnerSide =
              nextRoom.scores.A === nextRoom.scores.B
                ? null
                : nextRoom.scores.A > nextRoom.scores.B
                  ? "A"
                  : "B";
            nextRoom.winnerLabel =
              nextRoom.winnerSide === "A"
                ? nextRoom.teamAName
                : nextRoom.winnerSide === "B"
                  ? nextRoom.teamBName
                  : "Tie";
          }
        }
      } else if (room.secondChanceSide === input.side) {
        if (isCorrect) {
          nextRoom.lockState = "resolved";
          nextRoom.firstAnswerSide = room.firstAnswerSide;
          nextRoom.firstAnswerCorrect = false;
          nextRoom.scores[input.side] = nextRoom.scores[input.side] + base + bonus;
          nextRoom.correctCounts[input.side] = nextRoom.correctCounts[input.side] + 1;
          nextRoom.speedBonuses[input.side] = nextRoom.speedBonuses[input.side] + bonus;
          nextFeed.unshift(
            normalizeFeedItem({
              roomId: input.roomId,
              side: input.side,
              type: "correct",
              message: `${input.user.name} rescued the question correctly.`,
              pointsDelta: base + bonus,
            }),
          );
        } else {
          nextRoom.lockState = "resolved";
          nextRoom.wrongCounts[input.side] = nextRoom.wrongCounts[input.side] + 1;
          nextFeed.unshift(
            normalizeFeedItem({
              roomId: input.roomId,
              side: input.side,
              type: "incorrect",
              message: `${input.user.name} also missed it.`,
              pointsDelta: 0,
            }),
          );
        }

        const nextIndex = room.currentQuestionIndex + 1;
        const nextQuestion = questions.find((item) => item.index === nextIndex) ?? null;
        if (nextQuestion) {
          nextRoom.currentQuestionId = nextQuestion.id;
          nextRoom.currentQuestionIndex = nextIndex;
          nextRoom.lockState = "open";
          nextRoom.lockedBy = null;
          nextRoom.secondChanceSide = null;
          nextRoom.firstAnswerSide = null;
          nextRoom.firstAnswerCorrect = null;
          nextRoom.questionStartedAt = now();
          nextRoom.questionEndsAt = now() + nextQuestion.timeLimit * 1000;
          nextRoom.questionTimeLimit = nextQuestion.timeLimit;
          nextRoom.allowedSide = null;
        } else {
          nextRoom.phase = "finished";
          nextRoom.winnerSide =
            nextRoom.scores.A === nextRoom.scores.B
              ? null
              : nextRoom.scores.A > nextRoom.scores.B
                ? "A"
                : "B";
          nextRoom.winnerLabel =
            nextRoom.winnerSide === "A"
              ? nextRoom.teamAName
              : nextRoom.winnerSide === "B"
                ? nextRoom.teamBName
                : "Tie";
        }
      } else {
        return { accepted: false, reason: "locked" };
      }
    }
    createLocalStore<BattleRoomDoc[]>(
      `rooms`,
      rooms.map((item) => (item.id === input.roomId ? nextRoom : item)),
    ).write(rooms.map((item) => (item.id === input.roomId ? nextRoom : item)));
    createLocalStore(feedLocalKey(input.roomId), nextFeed.slice(0, 30)).write(
      nextFeed.slice(0, 30),
    );
    createLocalStore(scoresLocalKey(input.roomId), [
      {
        id: `${input.roomId}-A`,
        roomId: input.roomId,
        side: "A",
        score: nextRoom.scores.A,
        correct: nextRoom.correctCounts.A,
        wrong: nextRoom.wrongCounts.A,
        speedBonus: nextRoom.speedBonuses.A,
        updatedAt: now(),
      },
      {
        id: `${input.roomId}-B`,
        roomId: input.roomId,
        side: "B",
        score: nextRoom.scores.B,
        correct: nextRoom.correctCounts.B,
        wrong: nextRoom.wrongCounts.B,
        speedBonus: nextRoom.speedBonuses.B,
        updatedAt: now(),
      },
    ] satisfies BattleScoreDoc[]).write([
      {
        id: `${input.roomId}-A`,
        roomId: input.roomId,
        side: "A",
        score: nextRoom.scores.A,
        correct: nextRoom.correctCounts.A,
        wrong: nextRoom.wrongCounts.A,
        speedBonus: nextRoom.speedBonuses.A,
        updatedAt: now(),
      },
      {
        id: `${input.roomId}-B`,
        roomId: input.roomId,
        side: "B",
        score: nextRoom.scores.B,
        correct: nextRoom.correctCounts.B,
        wrong: nextRoom.wrongCounts.B,
        speedBonus: nextRoom.speedBonuses.B,
        updatedAt: now(),
      },
    ]);
    createLocalStore(
      eventsLocalKey(input.roomId),
      nextFeed.map((item) =>
        normalizeEventItem({ ...item, kind: "answer", phase: nextRoom.phase }),
      ),
    ).write(
      nextFeed.map((item) =>
        normalizeEventItem({ ...item, kind: "answer", phase: nextRoom.phase }),
      ),
    );
    createLocalStore(liveLocalKey(input.roomId), {
      ...buildLocalState(nextRoom),
      activityFeed: nextFeed.slice(0, 30),
      serverNow: now(),
    }).write({
      ...buildLocalState(nextRoom),
      activityFeed: nextFeed.slice(0, 30),
      serverNow: now(),
    });
    return {
      accepted: true,
      correct: isCorrect,
      pointsDelta: isCorrect ? base + bonus : -5,
      feed: nextFeed.slice(0, 30),
    };
  }

  const db = getFirebaseDb();
  if (!db) return { accepted: false, reason: "firebase-unavailable" };
  const roomRef = doc(db, "rooms", input.roomId);
  const result = await runTransaction(db, async (transaction) => {
    const roomSnap = await transaction.get(roomRef);
    if (!roomSnap.exists()) return { accepted: false, reason: "room-missing" };
    const room = parseRoomData(roomSnap.id, roomSnap.data());
    if (room.phase !== "live" && room.phase !== "countdown" && room.phase !== "ready") {
      return { accepted: false, reason: "inactive" };
    }

    const teamRef = doc(db, "teams", `${input.roomId}-${input.side === "A" ? "team-a" : "team-b"}`);
    const teamSnap = await transaction.get(teamRef);
    const team = teamSnap.exists() ? (teamSnap.data() as BattleTeamDoc) : null;
    if (!team) return { accepted: false, reason: "team-missing" };

    const questionRef = doc(db, "questions", room.currentQuestionId ?? "");
    const questionSnap = await transaction.get(questionRef);
    if (!questionSnap.exists()) return { accepted: false, reason: "question-missing" };
    const question = parseQuestionData(questionSnap.id, questionSnap.data());

    const elapsedMs = now() - (room.questionStartedAt ?? now());
    const isCorrect = input.answerIndex === question.answerIndex;
    const base = question.points;
    const bonus = isCorrect ? scoreBonusForElapsed(room.roundType, elapsedMs) : 0;
    const pointsDelta = isCorrect ? base + bonus : room.lockState === "second-chance" ? 0 : -5;
    const nextScores = { ...room.scores };
    const nextCorrect = { ...room.correctCounts };
    const nextWrong = { ...room.wrongCounts };
    const nextSpeed = { ...room.speedBonuses };
    const roomPatch: Partial<BattleRoomDoc> = { updatedAt: now() };
    const eventId = randomId("event");

    if (room.lockState === "open" && !room.lockedBy) {
      roomPatch.lockedBy = input.side;
      roomPatch.firstAnswerSide = input.side;
      roomPatch.firstAnswerCorrect = isCorrect;
      roomPatch.lockState = isCorrect ? "resolved" : "second-chance";
      roomPatch.allowedSide = isCorrect ? null : input.side === "A" ? "B" : "A";
      roomPatch.secondChanceSide = isCorrect ? null : input.side === "A" ? "B" : "A";
      nextScores[input.side] += pointsDelta;
      nextCorrect[input.side] += isCorrect ? 1 : 0;
      nextWrong[input.side] += isCorrect ? 0 : 1;
      nextSpeed[input.side] += bonus;
    } else if (room.lockState === "second-chance" && room.secondChanceSide === input.side) {
      roomPatch.lockState = "resolved";
      if (isCorrect) {
        nextScores[input.side] += pointsDelta;
        nextCorrect[input.side] += 1;
        nextSpeed[input.side] += bonus;
      } else {
        nextWrong[input.side] += 1;
      }
    } else {
      return { accepted: false, reason: "locked" };
    }

    roomPatch.scores = nextScores;
    roomPatch.correctCounts = nextCorrect;
    roomPatch.wrongCounts = nextWrong;
    roomPatch.speedBonuses = nextSpeed;

    transaction.update(roomRef, roomPatch);
    transaction.update(teamRef, {
      points: nextScores[input.side],
      correct: nextCorrect[input.side],
      wrong: nextWrong[input.side],
      speedBonus: nextSpeed[input.side],
      ready: team.ready,
    });
    transaction.set(doc(db, "scores", `${input.roomId}-${input.side}`), {
      id: `${input.roomId}-${input.side}`,
      roomId: input.roomId,
      side: input.side,
      score: nextScores[input.side],
      correct: nextCorrect[input.side],
      wrong: nextWrong[input.side],
      speedBonus: nextSpeed[input.side],
      updatedAt: now(),
    } satisfies BattleScoreDoc);
    transaction.set(
      doc(db, "events", eventId),
      normalizeEventItem({
        roomId: input.roomId,
        side: input.side,
        type: isCorrect ? "correct" : "incorrect",
        kind: "answer",
        phase: room.phase,
        message: isCorrect
          ? room.lockState === "second-chance"
            ? `${input.user.name} answered the second chance correctly.`
            : `${input.user.name} answered first and correct.`
          : room.lockState === "second-chance"
            ? `${input.user.name} missed the second chance.`
            : `${input.user.name} answered incorrectly.`,
        pointsDelta,
      }),
    );

    const shouldAdvance = isCorrect || (room.lockState === "second-chance" && !isCorrect);
    if (shouldAdvance) {
      const nextIndex = room.currentQuestionIndex + 1;
      const nextQuestionId = room.questionIds[nextIndex];
      const nextQuestionSnap = nextQuestionId
        ? await transaction.get(doc(db, "questions", nextQuestionId))
        : null;
      const resolvedNextQuestion = nextQuestionSnap?.exists()
        ? parseQuestionData(nextQuestionSnap.id, nextQuestionSnap.data())
        : null;
      if (resolvedNextQuestion) {
        roomPatch.currentQuestionId = resolvedNextQuestion.id;
        roomPatch.currentQuestionIndex = nextIndex;
        roomPatch.lockState = "open";
        roomPatch.lockedBy = null;
        roomPatch.secondChanceSide = null;
        roomPatch.firstAnswerSide = null;
        roomPatch.firstAnswerCorrect = null;
        roomPatch.allowedSide = null;
        roomPatch.questionStartedAt = now();
        roomPatch.questionEndsAt = now() + resolvedNextQuestion.timeLimit * 1000;
        roomPatch.questionTimeLimit = resolvedNextQuestion.timeLimit;
        roomPatch.phase = "live";
        transaction.update(roomRef, roomPatch);
        transaction.set(
          doc(db, "events", randomId("event")),
          normalizeEventItem({
            roomId: input.roomId,
            side: "SYSTEM",
            type: "state",
            kind: "question",
            phase: "live",
            message: `Question ${nextIndex + 1} loaded.`,
            pointsDelta: 0,
          }),
        );
      } else {
        const finalScores = nextScores;
        const winnerSide =
          finalScores.A === finalScores.B ? null : finalScores.A > finalScores.B ? "A" : "B";
        const winnerLabel =
          winnerSide === "A" ? room.teamAName : winnerSide === "B" ? room.teamBName : "Tie";
        roomPatch.phase = "finished";
        roomPatch.winnerSide = winnerSide;
        roomPatch.winnerLabel = winnerLabel;
        roomPatch.currentQuestionId = null;
        roomPatch.questionEndsAt = null;
        roomPatch.questionStartedAt = null;
        transaction.update(roomRef, roomPatch);
        transaction.set(doc(db, "battle_history", randomId("history")), {
          roomId: input.roomId,
          winnerSide,
          winnerLabel,
          teamAName: room.teamAName,
          teamBName: room.teamBName,
          scoreA: finalScores.A,
          scoreB: finalScores.B,
          correctA: nextCorrect.A,
          correctB: nextCorrect.B,
          wrongA: nextWrong.A,
          wrongB: nextWrong.B,
          speedA: nextSpeed.A,
          speedB: nextSpeed.B,
          accuracyA:
            nextCorrect.A + nextWrong.A > 0
              ? Math.round((nextCorrect.A / (nextCorrect.A + nextWrong.A)) * 100)
              : 0,
          accuracyB:
            nextCorrect.B + nextWrong.B > 0
              ? Math.round((nextCorrect.B / (nextCorrect.B + nextWrong.B)) * 100)
              : 0,
          questionCount: room.totalQuestions,
          classLevel: room.classLevel,
          roundType: room.roundType,
          endedAt: now(),
        } satisfies BattleHistoryDoc);
        transaction.set(
          doc(db, "events", randomId("event")),
          normalizeEventItem({
            roomId: input.roomId,
            side: "SYSTEM",
            type: "state",
            kind: "system",
            phase: "finished",
            message: winnerSide ? `${winnerLabel} wins the battle.` : "Battle ended in a tie.",
            pointsDelta: 0,
          }),
        );
      }
    }

    return { accepted: true, correct: isCorrect, pointsDelta };
  });

  await mirrorLiveState(input.roomId);
  return result;
}

export async function flagSuspicious(roomId: string, side: BattleSide, message: string) {
  if (!firebaseEnabled) {
    const rooms = createLocalStore<BattleRoomDoc[]>("rooms", []).read();
    const nextRooms = rooms.map((room) =>
      room.id === roomId && !room.suspiciousSides.includes(side)
        ? { ...room, suspiciousSides: [...room.suspiciousSides, side], updatedAt: now() }
        : room,
    );
    createLocalStore<BattleRoomDoc[]>("rooms", nextRooms).write(nextRooms);
    const feed = createLocalStore<BattleFeedItem[]>(feedLocalKey(roomId), []).read();
    const nextFeed = [
      normalizeFeedItem({ roomId, side, type: "warning", message, pointsDelta: 0 }),
      ...feed,
    ].slice(0, 30);
    createLocalStore(feedLocalKey(roomId), nextFeed).write(nextFeed);
    createLocalStore(
      eventsLocalKey(roomId),
      nextFeed.map((item) => normalizeEventItem({ ...item, kind: "system", phase: "live" })),
    ).write(nextFeed.map((item) => normalizeEventItem({ ...item, kind: "system", phase: "live" })));
    return;
  }
  const db = getFirebaseDb();
  if (!db) return;
  await addDoc(
    collection(db, "events"),
    normalizeEventItem({
      roomId,
      side,
      type: "warning",
      kind: "system",
      phase: "live",
      message,
      pointsDelta: 0,
    }),
  );
}

export async function syncBattleMirror(roomId: string) {
  if (!firebaseEnabled) return;
  await mirrorLiveState(roomId);
}

export function getRoundLabel(roundType: BattleRoundType) {
  if (roundType === "rapid-fire") return "Rapid Fire";
  if (roundType === "power") return "Power Round";
  if (roundType === "sudden-death") return "Sudden Death";
  return "Standard Round";
}

export function buildCertificate(room: BattleRoomDoc, history?: BattleHistoryDoc | null) {
  const winnerSide = history?.winnerSide ?? room.winnerSide;
  const winnerLabel = history?.winnerLabel ?? room.winnerLabel ?? "Tie";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="840" viewBox="0 0 1200 840">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" x2="1">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="840" fill="url(#bg)"/>
  <rect x="40" y="40" width="1120" height="760" rx="36" fill="none" stroke="url(#gold)" stroke-width="4"/>
  <text x="600" y="155" fill="#fef3c7" font-family="Arial, sans-serif" font-size="36" text-anchor="middle">E-PATHSHALA QUIZ BATTLE CERTIFICATE</text>
  <text x="600" y="260" fill="#ffffff" font-family="Arial, sans-serif" font-size="52" font-weight="700" text-anchor="middle">${winnerLabel}</text>
  <text x="600" y="330" fill="#d1d5db" font-family="Arial, sans-serif" font-size="24" text-anchor="middle">Winner of ${room.title}</text>
  <text x="600" y="390" fill="#d1d5db" font-family="Arial, sans-serif" font-size="22" text-anchor="middle">${room.teamAName} vs ${room.teamBName}</text>
  <text x="600" y="450" fill="#d1d5db" font-family="Arial, sans-serif" font-size="22" text-anchor="middle">Room ${room.code} • ${getRoundLabel(room.roundType)} • Class ${room.classLevel}</text>
  <text x="600" y="540" fill="#fef3c7" font-family="Arial, sans-serif" font-size="24" text-anchor="middle">Final Score</text>
  <text x="600" y="595" fill="#ffffff" font-family="Arial, sans-serif" font-size="42" font-weight="700" text-anchor="middle">${history ? `${history.scoreA} - ${history.scoreB}` : `${room.scores.A} - ${room.scores.B}`}</text>
  <text x="600" y="670" fill="#9ca3af" font-family="Arial, sans-serif" font-size="18" text-anchor="middle">Certified by the Competition Section</text>
  <text x="600" y="710" fill="#9ca3af" font-family="Arial, sans-serif" font-size="16" text-anchor="middle">Winner: ${winnerSide ?? "Tie"}</text>
</svg>`;
}
