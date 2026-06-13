import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  Bomb,
  CheckCircle2,
  Copy,
  Crown,
  Download,
  Flame,
  Mic2,
  Pause,
  Play,
  RotateCcw,
  ScanSearch,
  Share2,
  ShieldAlert,
  SkipForward,
  Sparkles,
  TimerReset,
  Trophy,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { onValue, ref } from "firebase/database";

import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  buildCertificate,
  createBattleRoom,
  endBattle,
  flagSuspicious,
  findBattleRoomByCode,
  getRoundLabel,
  joinBattleRoom,
  listenBattleFeed,
  listenBattleHistory,
  listenBattleLive,
  listenBattleQuestions,
  listenBattleRoom,
  listenBattleTeams,
  pauseBattle,
  removeTeam,
  resumeBattle,
  setTeamReady,
  skipQuestion,
  startBattleMatch,
  startCountdown,
  submitBattleAnswer,
  syncBattleMirror,
  type BattleFeedItem,
  type BattleHistoryDoc,
  type BattlePublicState,
  type BattleQuestionDoc,
  type BattleRoundType,
  type BattleRoomDoc,
  type BattleSide,
  type BattleTeamDoc,
} from "@/lib/competition-battle";
import { getFirebaseRtdb } from "@/lib/firebase";
import { useUser } from "@/lib/user-store";
import { cn } from "@/lib/utils";

type CompetitionSearch = {
  room?: string;
};

export const Route = createFileRoute("/competitions")({
  validateSearch: (search: Record<string, unknown>): CompetitionSearch => ({
    room: typeof search.room === "string" && search.room.trim() ? search.room.trim() : undefined,
  }),
  head: () => ({ meta: [{ title: "E-পাঠশালা Competition · Real-time Quiz Battle" }] }),
  component: CompetitionPage,
});

function CompetitionPage() {
  const user = useUser();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [roomId, setRoomId] = useState(search.room ?? "");
  const [selectedRoom, setSelectedRoom] = useState<BattleRoomDoc | null>(null);
  const [live, setLive] = useState<BattlePublicState | null>(null);
  const [questions, setQuestions] = useState<BattleQuestionDoc[]>([]);
  const [teams, setTeams] = useState<BattleTeamDoc[]>([]);
  const [history, setHistory] = useState<BattleHistoryDoc[]>([]);
  const [feed, setFeed] = useState<BattleFeedItem[]>([]);
  const [serverOffset, setServerOffset] = useState(0);
  const [createForm, setCreateForm] = useState({
    roomLabel: "QUIZ ROOM",
    title: "E-পাঠশালা Live Quiz Battle",
    teamAName: "Team Aurora",
    teamBName: "Team Bengal",
    classLevel: String(user.class),
    roundType: "standard" as BattleRoundType,
    totalQuestions: "10",
  });
  const [joinForm, setJoinForm] = useState({
    roomCode: "",
    side: "B" as BattleSide,
    role: "member" as "captain" | "member" | "spectator",
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [matchMessage, setMatchMessage] = useState("Waiting for a room to load.");
  const [copyState, setCopyState] = useState<"idle" | "done">("idle");

  useEffect(() => {
    const value = search.room ?? "";
    setRoomId(value);
  }, [search.room]);

  useEffect(() => {
    const rtdb = getFirebaseRtdb();
    if (!rtdb) return;
    try {
      return onValue(
        ref(rtdb, ".info/serverTimeOffset"),
        (snapshot) => {
          const offset = typeof snapshot.val() === "number" ? snapshot.val() : 0;
          setServerOffset(offset);
        },
        () => {
          setServerOffset(0);
        },
      );
    } catch {
      setServerOffset(0);
      return;
    }
  }, []);

  useEffect(() => {
    if (!roomId) {
      setSelectedRoom(null);
      setLive(null);
      setQuestions([]);
      setTeams([]);
      setHistory([]);
      setFeed([]);
      return;
    }

    const unsubRoom = listenBattleRoom(roomId, setSelectedRoom);
    const unsubLive = listenBattleLive(roomId, setLive);
    const unsubQuestions = listenBattleQuestions(roomId, setQuestions);
    const unsubTeams = listenBattleTeams(roomId, setTeams);
    const unsubHistory = listenBattleHistory(roomId, setHistory);
    const unsubFeed = listenBattleFeed(roomId, setFeed);

    return () => {
      unsubRoom();
      unsubLive();
      unsubQuestions();
      unsubTeams();
      unsubHistory();
      unsubFeed();
    };
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;
    const room = selectedRoom;
    const currentTeam = teams.find((team) =>
      team.members.some((member) => member.uid === user.uid),
    );
    const currentSide = currentTeam?.side ?? null;
    if (!room || !currentSide) return;

    const suspicious = async (
      type: "visibility" | "copy" | "paste" | "contextmenu" | "keydown",
      message: string,
    ) => {
      await flagSuspicious(roomId, currentSide, message);
      setMatchMessage(message);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        void suspicious("visibility", `${currentTeam.name}: tab switched away from the battle.`);
      }
    };
    const onCopy = () => void suspicious("copy", `${currentTeam.name}: copy attempt detected.`);
    const onPaste = () => void suspicious("paste", `${currentTeam.name}: paste attempt detected.`);
    const onContext = () =>
      void suspicious("contextmenu", `${currentTeam.name}: context menu blocked.`);
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Tab" ||
        (event.ctrlKey && (event.key.toLowerCase() === "c" || event.key.toLowerCase() === "v"))
      ) {
        void suspicious("keydown", `${currentTeam.name}: suspicious shortcut usage.`);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("copy", onCopy);
    document.addEventListener("paste", onPaste);
    document.addEventListener("contextmenu", onContext);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("paste", onPaste);
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [roomId, selectedRoom, teams, user.uid]);

  useEffect(() => {
    if (!selectedRoom) return;
    setMatchMessage(matchCopy(selectedRoom, live, questions, teams, user.uid));
  }, [selectedRoom, live, questions, teams, user.uid]);

  const myTeam = useMemo(
    () => teams.find((team) => team.members.some((member) => member.uid === user.uid)),
    [teams, user.uid],
  );
  const mySide = myTeam?.side ?? null;
  const currentQuestion = useMemo(() => {
    if (!selectedRoom) return null;
    return questions.find((question) => question.id === selectedRoom.currentQuestionId) ?? null;
  }, [questions, selectedRoom]);
  const currentTime = Date.now() + serverOffset;
  const remainingMs = live?.questionEndsAt ? Math.max(0, live.questionEndsAt - currentTime) : 0;
  const remainingSeconds = Math.ceil(remainingMs / 1000);
  const roomPhase = selectedRoom?.phase ?? live?.phase ?? "draft";
  const isHost = selectedRoom?.hostId === user.uid;
  const isTeamCaptain = Boolean(
    myTeam?.members.find((member) => member.uid === user.uid && member.role === "captain"),
  );
  const canControl = isHost || isTeamCaptain;
  const currentFeed = feed.length ? feed : (live?.activityFeed ?? []);
  const progress =
    selectedRoom && selectedRoom.totalQuestions > 0
      ? ((selectedRoom.currentQuestionIndex + (roomPhase === "finished" ? 0 : 1)) /
          selectedRoom.totalQuestions) *
        100
      : 0;
  const scoreboard = live?.scores ?? { A: 0, B: 0 };
  const readyA = live?.readySides.A ?? false;
  const readyB = live?.readySides.B ?? false;
  const questionLocked = live?.lockState === "locked" || live?.lockState === "second-chance";
  const answerAllowedSide = live?.allowedSide ?? mySide;
  const canAnswer =
    roomPhase === "live" &&
    Boolean(myTeam) &&
    (!answerAllowedSide || answerAllowedSide === mySide || live?.lockState === "open");
  const timerLabel =
    roomPhase === "countdown"
      ? "Match starting"
      : roomPhase === "finished"
        ? "Battle closed"
        : `${remainingSeconds.toString().padStart(2, "0")}s`;
  const winnerLabel =
    live?.winnerSide === "A"
      ? (selectedRoom?.teamAName ?? "Team A")
      : live?.winnerSide === "B"
        ? (selectedRoom?.teamBName ?? "Team B")
        : "Tie";
  const certificate = selectedRoom ? buildCertificate(selectedRoom, history[0] ?? null) : null;
  const roomShareUrl =
    selectedRoom && typeof window !== "undefined"
      ? `${window.location.origin}/competitions?room=${selectedRoom.id}`
      : "";

  const handleCreateRoom = async () => {
    const created = await createBattleRoom({
      host: user,
      roomLabel: createForm.roomLabel,
      title: createForm.title,
      teamAName: createForm.teamAName,
      teamBName: createForm.teamBName,
      classLevel: Number(createForm.classLevel) || user.class,
      roundType: createForm.roundType,
      totalQuestions: Number(createForm.totalQuestions) || 10,
    });
    setRoomId(created.id);
    await navigate({ to: "/competitions", search: { room: created.id } });
  };

  const handleJoinRoom = async () => {
    const token = roomId.trim();
    if (!token) return;
    const resolvedRoomId = (await findBattleRoomByCode(token)) ?? token;
    await joinBattleRoom(resolvedRoomId, user, joinForm.side, joinForm.role);
    setRoomId(resolvedRoomId);
    await navigate({ to: "/competitions", search: { room: resolvedRoomId } });
  };

  const handleReady = async (ready: boolean) => {
    if (!mySide || !selectedRoom) return;
    await setTeamReady(selectedRoom.id, mySide, ready);
  };

  const handleStartCountdown = async () => {
    if (!selectedRoom) return;
    await startCountdown(selectedRoom.id, 10);
  };

  const handleStartMatch = async () => {
    if (!selectedRoom) return;
    await startBattleMatch(selectedRoom.id);
  };

  const handleSubmitAnswer = async (answerIndex: number) => {
    if (!selectedRoom || !mySide) return;
    setSelectedAnswer(answerIndex);
    const result = await submitBattleAnswer({
      roomId: selectedRoom.id,
      user,
      side: mySide,
      answerIndex,
    });
    if (result && result.accepted === false) {
      setMatchMessage("That answer could not be submitted right now.");
    }
  };

  const handleDownloadCertificate = () => {
    if (!certificate || !selectedRoom) return;
    const blob = new Blob([certificate], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${selectedRoom.code}-certificate.svg`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyInvite = async () => {
    if (!selectedRoom) return;
    const link = `${window.location.origin}/competitions?room=${encodeURIComponent(selectedRoom.id)}`;
    await navigator.clipboard.writeText(`Join room ${selectedRoom.code}: ${link}`);
    setCopyState("done");
    window.setTimeout(() => setCopyState("idle"), 1800);
  };

  const handleAdvanceToNext = async () => {
    if (!selectedRoom) return;
    await skipQuestion(selectedRoom.id);
  };

  const handleEndBattle = async () => {
    if (!selectedRoom) return;
    await endBattle(selectedRoom.id);
  };

  const handlePause = async () => {
    if (!selectedRoom) return;
    await pauseBattle(selectedRoom.id);
  };

  const handleResume = async () => {
    if (!selectedRoom) return;
    await resumeBattle(selectedRoom.id);
  };

  const handleRemoveTeam = async (side: BattleSide) => {
    if (!selectedRoom) return;
    await removeTeam(selectedRoom.id, side);
  };

  const handleSync = async () => {
    if (!selectedRoom) return;
    await syncBattleMirror(selectedRoom.id);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8">
        <section className="overflow-hidden rounded-[2rem] border border-white/40 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_rgba(255,255,255,0.65)_35%,_rgba(15,23,42,0.07)_100%)] p-6 shadow-[0_20px_80px_rgba(15,23,42,0.18)] backdrop-blur md:p-8">
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <Badge className="inline-flex w-fit gap-2 rounded-full bg-brand-orange/10 px-3 py-1.5 text-brand-orange">
                <Sparkles className="h-3.5 w-3.5" />
                লাইভ টিভি কুইজ battle
              </Badge>
              <h1 className="max-w-3xl text-3xl font-black tracking-tight md:text-5xl">
                E-PATHSHALA real-time team vs team quiz battle
              </h1>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                প্রতিটি room server-driven, Firestore + Realtime Database synced, captain-led teams,
                locked answers, second-chance play, scoreboard animation, আর instant champion
                selection-এর জন্য তৈরি।
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="rounded-full px-3 py-1.5">
                  রুম: {selectedRoom?.code ?? "নতুন battle তৈরি করুন"}
                </Badge>
                <Badge variant="secondary" className="rounded-full px-3 py-1.5">
                  ধাপ: {roomPhase}
                </Badge>
                <Badge variant="secondary" className="rounded-full px-3 py-1.5">
                  {selectedRoom ? getRoundLabel(selectedRoom.roundType) : "কোনো battle লোড হয়নি"}
                </Badge>
              </div>
              <div className="grid gap-3 sm:grid-cols-4">
                <Metric label="Score" value={`${scoreboard.A} - ${scoreboard.B}`} />
                <Metric label="Ready" value={`${readyA ? 1 : 0} / ${readyB ? 1 : 0}`} />
                <Metric label="Timer" value={timerLabel} />
                <Metric
                  label="Questions"
                  value={
                    selectedRoom
                      ? `${selectedRoom.currentQuestionIndex + 1}/${selectedRoom.totalQuestions}`
                      : "0/0"
                  }
                />
              </div>
            </div>

            <div className="grid gap-3">
              <Card className="border-white/60 bg-white/80 shadow-soft backdrop-blur">
                <CardHeader className="pb-3">
                  <CardDescription>লাইভ room</CardDescription>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Crown className="h-5 w-5 text-brand-orange" />
                    {selectedRoom?.title ?? "আপনার room তৈরি করুন"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-3xl bg-background/90 p-4">
                    <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Room link
                    </div>
                    <div className="mt-1 break-all text-sm font-semibold">
                      {roomShareUrl || "তৈরির পরে শেয়ার করুন"}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={handleCopyInvite} variant="outline" className="rounded-2xl">
                      {copyState === "done" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      {copyState === "done" ? "কপি হয়েছে" : "ইনভাইট কপি করুন"}
                    </Button>
                    <Button onClick={handleSync} variant="outline" className="rounded-2xl">
                      <RotateCcw className="h-4 w-4" />
                      Sync
                    </Button>
                    <Button
                      onClick={handleEndBattle}
                      variant="destructive"
                      disabled={!canControl}
                      className="rounded-2xl"
                    >
                      <Bomb className="h-4 w-4" />
                      ম্যাচ শেষ
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-soft">
                <CardHeader className="pb-2">
                  <CardDescription className="text-white/65">লাইভ scoreboard</CardDescription>
                  <CardTitle className="text-2xl">
                    {selectedRoom?.teamAName ?? "Team A"} বনাম {selectedRoom?.teamBName ?? "Team B"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <ScoreTile
                      title={selectedRoom?.teamAName ?? "Team A"}
                      score={scoreboard.A}
                      accent="from-cyan-400 to-blue-600"
                    />
                    <ScoreTile
                      title={selectedRoom?.teamBName ?? "Team B"}
                      score={scoreboard.B}
                      accent="from-fuchsia-400 to-rose-600"
                    />
                  </div>
                  <Progress value={progress} className="h-2 bg-white/10" />
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>{matchMessage}</span>
                    <span>{selectedRoom?.roomLabel ?? "প্রতিযোগিতা room"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {!selectedRoom ? (
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <Card className="rounded-[2rem] border-white/60 bg-white/85 shadow-soft">
              <CardHeader>
                <CardDescription>লাইভ room তৈরি করুন</CardDescription>
                <CardTitle className="text-2xl">battle room তৈরি করুন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field label="Room label">
                  <Input
                    value={createForm.roomLabel}
                    onChange={(event) =>
                      setCreateForm((current) => ({ ...current, roomLabel: event.target.value }))
                    }
                  />
                </Field>
                <Field label="Battle title">
                  <Input
                    value={createForm.title}
                    onChange={(event) =>
                      setCreateForm((current) => ({ ...current, title: event.target.value }))
                    }
                  />
                </Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Team A">
                    <Input
                      value={createForm.teamAName}
                      onChange={(event) =>
                        setCreateForm((current) => ({ ...current, teamAName: event.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Team B">
                    <Input
                      value={createForm.teamBName}
                      onChange={(event) =>
                        setCreateForm((current) => ({ ...current, teamBName: event.target.value }))
                      }
                    />
                  </Field>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Field label="Class">
                    <Select
                      value={createForm.classLevel}
                      onValueChange={(value) =>
                        setCreateForm((current) => ({ ...current, classLevel: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, index) => String(index + 1)).map(
                          (value) => (
                            <SelectItem key={value} value={value}>
                              Class {value}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Round type">
                    <Select
                      value={createForm.roundType}
                      onValueChange={(value) =>
                        setCreateForm((current) => ({
                          ...current,
                          roundType: value as BattleRoundType,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="rapid-fire">Rapid Fire</SelectItem>
                        <SelectItem value="power">Power Round</SelectItem>
                        <SelectItem value="sudden-death">Sudden Death</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Questions">
                    <Input
                      value={createForm.totalQuestions}
                      onChange={(event) =>
                        setCreateForm((current) => ({
                          ...current,
                          totalQuestions: event.target.value,
                        }))
                      }
                    />
                  </Field>
                </div>
                <Button
                  onClick={handleCreateRoom}
                  className="w-full rounded-2xl bg-gradient-to-r from-slate-950 to-slate-700 py-6 text-base font-semibold text-white"
                >
                  রুম তৈরি করুন
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="rounded-[2rem] border-white/60 bg-white/85 shadow-soft">
                <CardHeader>
                  <CardDescription>লাইভ room-এ join করুন</CardDescription>
                  <CardTitle className="text-2xl">ইনভাইট গ্রহণ করুন</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Field label="Room ID">
                    <Input
                      value={roomId}
                      onChange={(event) => setRoomId(event.target.value)}
                      placeholder="QUIZ-728194 or room id"
                    />
                  </Field>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Join as">
                      <Select
                        value={joinForm.side}
                        onValueChange={(value) =>
                          setJoinForm((current) => ({ ...current, side: value as BattleSide }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="B">Team B</SelectItem>
                          <SelectItem value="A">Team A</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Role">
                      <Select
                        value={joinForm.role}
                        onValueChange={(value) =>
                          setJoinForm((current) => ({
                            ...current,
                            role: value as "captain" | "member" | "spectator",
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="captain">Captain</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="spectator">Spectator</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <Button
                    onClick={handleJoinRoom}
                    className="w-full rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 py-6 text-base font-semibold text-white"
                  >
                    রুমে যোগ দিন
                    <Share2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-white/60 bg-gradient-to-br from-amber-50 to-white shadow-soft">
                <CardHeader>
                  <CardDescription>প্রতিযোগিতার ধাপ</CardDescription>
                  <CardTitle className="text-2xl">Battle sequence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "Battle তৈরি",
                    "Team invite",
                    "Match accept",
                    "একই room-এ প্রবেশ",
                    "Ready check",
                    "10-second countdown",
                    "একই প্রশ্ন live",
                    "চ্যাম্পিয়ন + certificate",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3"
                    >
                      <div className="grid h-7 w-7 place-items-center rounded-full bg-slate-950 text-xs font-bold text-white">
                        {index + 1}
                      </div>
                      <div className="font-medium text-slate-800">{item}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <Card className="rounded-[2rem] border-white/60 bg-white/85 shadow-soft">
                <CardHeader>
                  <CardDescription>ম্যাচ room</CardDescription>
                  <CardTitle className="text-2xl">{selectedRoom.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 lg:grid-cols-2">
                    <TeamPanel
                      team={teams.find((team) => team.side === "A")}
                      room={selectedRoom}
                      side="A"
                      currentUserId={user.uid}
                    />
                    <TeamPanel
                      team={teams.find((team) => team.side === "B")}
                      room={selectedRoom}
                      side="B"
                      currentUserId={user.uid}
                    />
                  </div>
                  <Separator />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => void handleReady(!readyA || !readyB)}
                      variant="outline"
                      className="rounded-2xl"
                    >
                      <TimerReset className="h-4 w-4" />
                      Ready / Unready
                    </Button>
                    <Button
                      onClick={handleStartCountdown}
                      disabled={!canControl}
                      className="rounded-2xl bg-brand-orange text-white"
                    >
                      <Zap className="h-4 w-4" />
                      10s countdown শুরু
                    </Button>
                    <Button
                      onClick={handleStartMatch}
                      variant="outline"
                      disabled={!canControl}
                      className="rounded-2xl"
                    >
                      <Play className="h-4 w-4" />
                      ম্যাচ শুরু
                    </Button>
                    <Button
                      onClick={handlePause}
                      variant="outline"
                      disabled={!canControl}
                      className="rounded-2xl"
                    >
                      <Pause className="h-4 w-4" />
                      Pause
                    </Button>
                    <Button
                      onClick={handleResume}
                      variant="outline"
                      disabled={!canControl}
                      className="rounded-2xl"
                    >
                      <Play className="h-4 w-4" />
                      Resume
                    </Button>
                    <Button
                      onClick={handleAdvanceToNext}
                      variant="outline"
                      disabled={!canControl}
                      className="rounded-2xl"
                    >
                      <SkipForward className="h-4 w-4" />
                      প্রশ্ন স্কিপ
                    </Button>
                    <Button
                      onClick={() => void handleRemoveTeam("B")}
                      variant="destructive"
                      disabled={!canControl}
                      className="rounded-2xl"
                    >
                      <Ban className="h-4 w-4" />
                      Team B সরান
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-white/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-soft">
                <CardHeader>
                  <CardDescription className="text-white/65">প্রশ্ন sync</CardDescription>
                  <CardTitle className="text-2xl">
                    প্রশ্ন {selectedRoom.currentQuestionIndex + 1} / {selectedRoom.totalQuestions}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {roomPhase === "countdown" ? (
                    <CountdownPanel room={selectedRoom} live={live} />
                  ) : currentQuestion ? (
                    <>
                      <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                        <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.28em] text-white/50">
                          <span>{currentQuestion.subject}</span>
                          <span>{getRoundLabel(selectedRoom.roundType)}</span>
                        </div>
                        <h3 className="mt-4 text-2xl font-bold leading-tight text-white">
                          {currentQuestion.prompt}
                        </h3>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        {currentQuestion.options.map((option, index) => {
                          const isSelected = selectedAnswer === index;
                          const disabled = !canAnswer || questionLocked;
                          return (
                            <button
                              key={option}
                              type="button"
                              disabled={disabled}
                              onClick={() => void handleSubmitAnswer(index)}
                              className={cn(
                                "rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40",
                                isSelected && "ring-2 ring-cyan-300",
                              )}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-semibold text-white/90">
                                  {String.fromCharCode(65 + index)}. {option}
                                </span>
                                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                                  {canAnswer ? "উত্তর দিন" : questionLocked ? "Locked" : "Wait"}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                        <Badge variant="secondary" className="rounded-full bg-white/10 text-white">
                          Timer synced
                        </Badge>
                        <Badge variant="secondary" className="rounded-full bg-white/10 text-white">
                          First answer locks
                        </Badge>
                        <Badge variant="secondary" className="rounded-full bg-white/10 text-white">
                          Second chance
                        </Badge>
                        <Badge variant="secondary" className="rounded-full bg-white/10 text-white">
                          Speed bonus
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-center text-white/70">
                      প্রথম প্রশ্নের জন্য অপেক্ষা করুন।
                    </div>
                  )}
                </CardContent>
              </Card>

              {roomPhase === "finished" && selectedRoom ? (
                <Card className="rounded-[2rem] border-white/60 bg-white/85 shadow-soft">
                  <CardHeader>
                    <CardDescription>ফলাফল</CardDescription>
                    <CardTitle className="text-2xl">{winnerLabel} চ্যাম্পিয়ন</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <ResultsBox
                        label={selectedRoom.teamAName}
                        score={scoreboard.A}
                        history={history[0]}
                        side="A"
                      />
                      <ResultsBox
                        label={selectedRoom.teamBName}
                        score={scoreboard.B}
                        history={history[0]}
                        side="B"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={handleDownloadCertificate}
                        className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                      >
                        <Download className="h-4 w-4" />
                        সার্টিফিকেট ডাউনলোড
                      </Button>
                      <Button
                        onClick={() => void handleSync()}
                        variant="outline"
                        className="rounded-2xl"
                      >
                        <ScanSearch className="h-4 w-4" />
                        Server থেকে রিফ্রেশ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>

            <div className="space-y-6">
              <Card className="rounded-[2rem] border-white/60 bg-white/85 shadow-soft">
                <CardHeader>
                  <CardDescription>অ্যাক্টিভিটি ফিড</CardDescription>
                  <CardTitle className="text-2xl">লাইভ tournament feed</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentFeed.length ? (
                    currentFeed.slice(0, 10).map((item) => <FeedRow key={item.id} item={item} />)
                  ) : (
                    <div className="rounded-2xl bg-muted/40 p-4 text-sm text-muted-foreground">
                      লাইভ আপডেট এখানে দেখাবে।
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-white/60 bg-white/85 shadow-soft">
                <CardHeader>
                  <CardDescription>Anti-cheat</CardDescription>
                  <CardTitle className="text-2xl">Suspicion monitor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="rounded-2xl bg-amber-50 p-4 text-amber-900">
                    Tab switching, copy/paste, context menu, and keyboard shortcuts realtime-এ লগ
                    হয়।
                  </div>
                  <div className="grid gap-2">
                    {(selectedRoom.suspiciousSides.length
                      ? selectedRoom.suspiciousSides
                      : ["A", "B"]
                    ).map((side) => (
                      <div
                        key={side}
                        className="flex items-center justify-between rounded-2xl bg-muted/50 px-4 py-3"
                      >
                        <span>
                          {side === "A" ? selectedRoom.teamAName : selectedRoom.teamBName}
                        </span>
                        <ShieldAlert className="h-4 w-4 text-brand-orange" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-white/60 bg-white/85 shadow-soft">
                <CardHeader>
                  <CardDescription>Battle stats</CardDescription>
                  <CardTitle className="text-2xl">Question analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <StatLine label="Question timer" value={`${selectedRoom.questionTimeLimit}s`} />
                  <StatLine label="Phase" value={roomPhase} />
                  <StatLine label="Allowed side" value={live?.allowedSide ?? "both"} />
                  <StatLine label="First answer" value={live?.firstAnswerSide ?? "none"} />
                  <StatLine label="Second chance" value={live?.secondChanceSide ?? "none"} />
                  <StatLine
                    label="Captain"
                    value={
                      myTeam?.members.find((member) => member.role === "captain")?.name ??
                      "not joined"
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function matchCopy(
  room: BattleRoomDoc,
  live: BattlePublicState | null,
  questions: BattleQuestionDoc[],
  teams: BattleTeamDoc[],
  userId: string,
) {
  if (!live) return `Room ${room.code} is connecting.`;
  if (live.phase === "countdown")
    return `Countdown running for ${room.teamAName} vs ${room.teamBName}.`;
  if (live.phase === "live") {
    const current = questions.find((question) => question.id === room.currentQuestionId);
    if (!current) return `Battle live in ${room.title}.`;
    if (live.lockState === "second-chance") {
      const allowed = teams.find((team) => team.side === live.secondChanceSide);
      return `${allowed?.name ?? "Team"} has the second chance.`;
    }
    if (live.lockState === "resolved") return "Question resolved. Loading the next one.";
    return `Question ${current.index + 1} is live: ${current.subject}`;
  }
  if (live.phase === "finished") {
    return live.winnerSide
      ? `${live.winnerSide === "A" ? room.teamAName : room.teamBName} have won the match.`
      : "The battle ended in a tie.";
  }
  const joined = teams.find((team) => team.members.some((member) => member.uid === userId));
  if (!joined) return "Join as a team to unlock live answering.";
  return `${joined.name} is ready for the room.`;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/80 p-4 text-center shadow-soft backdrop-blur">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-bold">{value}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function TeamPanel({
  team,
  room,
  side,
  currentUserId,
}: {
  team: BattleTeamDoc | undefined;
  room: BattleRoomDoc;
  side: BattleSide;
  currentUserId: string;
}) {
  const title = side === "A" ? room.teamAName : room.teamBName;
  return (
    <div className="rounded-[1.5rem] border border-border bg-background/85 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {side === "A" ? "Team A" : "Team B"}
          </div>
          <div className="mt-1 text-lg font-bold">{team?.name ?? title}</div>
        </div>
        <Badge
          className={cn(
            "rounded-full bg-gradient-to-r text-white",
            side === "A" ? "from-cyan-500 to-blue-600" : "from-fuchsia-500 to-rose-600",
          )}
        >
          {team?.ready ? "Ready" : "Waiting"}
        </Badge>
      </div>
      <div className="mt-3 space-y-2">
        {(team?.members ?? []).length ? (
          team?.members.map((member) => (
            <div
              key={member.uid}
              className="flex items-center justify-between rounded-2xl bg-muted/40 px-3 py-2 text-sm"
            >
              <div className="flex items-center gap-2">
                <span>{member.avatar}</span>
                <span className={cn("font-medium", member.uid === currentUserId && "text-primary")}>
                  {member.name}
                </span>
              </div>
              <Badge
                variant="outline"
                className="rounded-full text-[10px] uppercase tracking-[0.2em]"
              >
                {member.role}
              </Badge>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border px-3 py-4 text-sm text-muted-foreground">
            Invite a team member to join the room.
          </div>
        )}
      </div>
    </div>
  );
}

function CountdownPanel({ room, live }: { room: BattleRoomDoc; live: BattlePublicState | null }) {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const tick = () => {
      const endsAt = live?.countdownEndsAt ?? room.countdownEndsAt ?? Date.now();
      const next = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setSeconds(next);
    };
    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [live?.countdownEndsAt, room.countdownEndsAt]);

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-center">
      <div className="text-xs uppercase tracking-[0.35em] text-white/50">Countdown</div>
      <div className="mt-3 text-7xl font-black text-white">{seconds}</div>
      <div className="mt-2 text-sm text-white/60">Both teams are entering the same room now.</div>
    </div>
  );
}

function ScoreTile({ title, score, accent }: { title: string; score: number; accent: string }) {
  return (
    <div className={`rounded-[1.5rem] bg-gradient-to-r ${accent} p-4 text-white shadow-lg`}>
      <div className="text-xs uppercase tracking-[0.3em] text-white/75">{title}</div>
      <div className="mt-2 text-4xl font-black">{score}</div>
    </div>
  );
}

function FeedRow({ item }: { item: BattleFeedItem }) {
  return (
    <div className="rounded-2xl bg-muted/40 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FeedIcon type={item.type} />
          <span className="text-sm font-semibold">{item.message}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
      {item.pointsDelta !== 0 ? (
        <div
          className={cn(
            "mt-2 text-xs font-semibold",
            item.pointsDelta > 0 ? "text-brand-green" : "text-destructive",
          )}
        >
          {item.pointsDelta > 0 ? `+${item.pointsDelta}` : item.pointsDelta} points
        </div>
      ) : null}
    </div>
  );
}

function FeedIcon({ type }: { type: BattleFeedItem["type"] }) {
  if (type === "correct") return <CheckCircle2 className="h-4 w-4 text-brand-green" />;
  if (type === "incorrect") return <AlertTriangle className="h-4 w-4 text-destructive" />;
  if (type === "warning") return <ShieldAlert className="h-4 w-4 text-brand-orange" />;
  if (type === "score") return <Trophy className="h-4 w-4 text-brand-orange" />;
  return <Sparkles className="h-4 w-4 text-primary" />;
}

function ResultsBox({
  label,
  score,
  history,
  side,
}: {
  label: string;
  score: number;
  history?: BattleHistoryDoc | null;
  side: BattleSide;
}) {
  const correct = side === "A" ? (history?.correctA ?? 0) : (history?.correctB ?? 0);
  const wrong = side === "A" ? (history?.wrongA ?? 0) : (history?.wrongB ?? 0);
  const speed = side === "A" ? (history?.speedA ?? 0) : (history?.speedB ?? 0);
  const accuracy = side === "A" ? (history?.accuracyA ?? 0) : (history?.accuracyB ?? 0);
  return (
    <div className="rounded-3xl bg-muted/30 p-4">
      <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
      <div className="mt-2 text-4xl font-black">{score}</div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
        <div>Correct: {correct}</div>
        <div>Wrong: {wrong}</div>
        <div>Speed bonus: {speed}</div>
        <div>Accuracy: {accuracy}%</div>
      </div>
    </div>
  );
}

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-muted/40 px-4 py-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
