import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppShell } from "./AppShell-C4H10nur.mjs";
import { q as quizBank } from "./bangladesh-learning-B2a6UQS-.mjs";
import { s as saveQuizScore, a as saveCertificate } from "./firebase-data-BtoO4O4A.mjs";
import { c as useAuth, u as useUser } from "./router-D2rIulYA.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase.mjs";
import { S as Sparkles, q as Maximize2, r as Volume2, s as VolumeX, m as Clock3, T as Trophy, t as CircleCheck, Z as Zap, R as RotateCcw, u as ShieldCheck, A as Award } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "node:crypto";
import "node:process";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/zod.mjs";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/vercel__oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/idb.mjs";
import "../_libs/firebase__webchannel-wrapper.mjs";
import "../_libs/@grpc/grpc-js.mjs";
import "process";
import "tls";
import "net";
import "events";
import "http2";
import "http";
import "url";
import "dns";
import "zlib";
import "../_libs/@grpc/proto-loader.mjs";
import "../_libs/lodash.camelcase.mjs";
import "../_libs/protobufjs.mjs";
import "../_libs/protobufjs__aspromise.mjs";
import "../_libs/protobufjs__base64.mjs";
import "../_libs/protobufjs__eventemitter.mjs";
import "../_libs/protobufjs__float.mjs";
import "../_libs/@protobufjs/inquire.mjs";
import "../_libs/protobufjs__utf8.mjs";
import "../_libs/protobufjs__pool.mjs";
import "../_libs/long.mjs";
import "../_libs/protobufjs__codegen.mjs";
import "../_libs/protobufjs__fetch.mjs";
import "../_libs/protobufjs__path.mjs";
const SUBJECTS = [{
  label: "সব বিষয়",
  value: "all"
}, {
  label: "গণিত",
  value: "গণিত"
}, {
  label: "ইংরেজি",
  value: "ইংরেজি"
}, {
  label: "বাংলা",
  value: "বাংলা"
}, {
  label: "বিজ্ঞান",
  value: "বিজ্ঞান"
}, {
  label: "বাংলাদেশ & গ্লোবাল স্টাডিজ",
  value: "সাধারণ জ্ঞান"
}];
function Games() {
  const auth = useAuth();
  const user = useUser();
  const boardRef = reactExports.useRef(null);
  const completeGuardRef = reactExports.useRef(false);
  const soundEnabledRef = reactExports.useRef(true);
  const [selectedClass, setSelectedClass] = reactExports.useState(user.class);
  const [selectedSubject, setSelectedSubject] = reactExports.useState("all");
  const [questionCount, setQuestionCount] = reactExports.useState(10);
  const [timeLimit, setTimeLimit] = reactExports.useState(15);
  const [audioEnabled, setAudioEnabled] = reactExports.useState(true);
  const [questions, setQuestions] = reactExports.useState(() => buildQuestions(user.class, "all", 10));
  const [index, setIndex] = reactExports.useState(0);
  const [selectedAnswer, setSelectedAnswer] = reactExports.useState(null);
  const [secondsLeft, setSecondsLeft] = reactExports.useState(timeLimit);
  const [score, setScore] = reactExports.useState(0);
  const [correctCount, setCorrectCount] = reactExports.useState(0);
  const [feedback, setFeedback] = reactExports.useState(null);
  const [finished, setFinished] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const question = questions[index];
  reactExports.useMemo(() => {
    if (!questions.length) return 0;
    let count = 0;
    for (let i = 0; i < index; i += 1) {
      if (questions[i]?.__correct && questions[i].__answeredCorrect) count += 1;
      else count = 0;
    }
    return count;
  }, [index, questions]);
  reactExports.useEffect(() => {
    setQuestions(buildQuestions(selectedClass, selectedSubject, questionCount));
    setIndex(0);
    setSelectedAnswer(null);
    setSecondsLeft(timeLimit);
    setScore(0);
    setCorrectCount(0);
    setFeedback(null);
    setFinished(false);
    setSubmitted(false);
    completeGuardRef.current = false;
  }, [questionCount, selectedClass, selectedSubject, timeLimit]);
  reactExports.useEffect(() => {
    if (finished || !question || selectedAnswer !== null) return;
    setSecondsLeft(timeLimit);
  }, [finished, index, question, selectedAnswer, timeLimit]);
  reactExports.useEffect(() => {
    if (finished || selectedAnswer !== null || !question) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          void handleAnswer(-1);
          return 0;
        }
        return current - 1;
      });
    }, 1e3);
    return () => window.clearInterval(timer);
  }, [finished, question, selectedAnswer]);
  reactExports.useEffect(() => {
    if (finished || submitted || !auth.profile.uid) return;
    if (index < questions.length) return;
    setFinished(true);
  }, [auth.profile.uid, finished, index, questions.length, submitted]);
  reactExports.useEffect(() => {
    if (!finished || completeGuardRef.current) return;
    completeGuardRef.current = true;
    const percent2 = questions.length ? Math.round(correctCount / questions.length * 100) : 0;
    const streakBonus = Math.max(0, correctCount - 1) * 2;
    void saveQuizCompletion(percent2, score, questions.length, streakBonus);
  }, [correctCount, finished, questions.length, score]);
  async function saveQuizCompletion(percent2, finalScore, total, streakBonus) {
    const subjectLabel = selectedSubject === "all" ? "Mixed subject" : selectedSubject;
    await saveQuizScore({
      userId: auth.profile.uid,
      userName: auth.profile.name,
      classLevel: selectedClass,
      subject: subjectLabel,
      mode: "fullscreen-quiz",
      score: finalScore,
      total,
      accuracy: percent2,
      streakBonus
    });
    const xpGain = Math.max(25, finalScore * 8 + streakBonus * 3);
    const coinGain = Math.max(5, Math.floor(percent2 / 10) + streakBonus);
    await auth.awardProgress({
      xp: xpGain,
      coins: coinGain,
      lessonsCompleted: percent2 >= 80 ? 1 : 0,
      badges: percent2 >= 80 ? [`${subjectLabel} Champ`] : []
    });
    if (percent2 >= 80) {
      await saveCertificate({
        userId: auth.profile.uid,
        userName: auth.profile.name,
        classLevel: selectedClass,
        title: `Certificate of Excellence in ${subjectLabel}`,
        subject: subjectLabel,
        score: finalScore,
        total
      });
    }
    setSubmitted(true);
  }
  function playSound(ok) {
    if (!audioEnabled || !soundEnabledRef.current || typeof window === "undefined") return;
    const audioContext = new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = ok ? 880 : 220;
    gain.gain.value = 0.08;
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.16);
  }
  async function handleAnswer(choice) {
    if (!question || selectedAnswer !== null || finished) return;
    const correct = choice === question.answer;
    const nextQuestions = questions.slice();
    nextQuestions[index] = {
      ...question,
      __correct: true,
      __answeredCorrect: correct
    };
    setQuestions(nextQuestions);
    setSelectedAnswer(choice);
    setFeedback({
      correct,
      text: correct ? "দারুণ! তুমি সঠিক উত্তর দিয়েছ।" : `সঠিক উত্তর: ${question.options[question.answer]}`
    });
    playSound(correct);
    const timeBonus = Math.max(0, timeLimit - secondsLeft);
    const streakBonus = correct ? Math.max(1, Math.min(5, Math.floor(index / 2) + 1)) : 0;
    const earned = correct ? 10 + streakBonus + Math.floor(timeBonus / 4) : 0;
    if (correct) setCorrectCount((current) => current + 1);
    setScore((current) => current + earned);
    window.setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex((current) => current + 1);
        setSelectedAnswer(null);
        setFeedback(null);
      } else {
        setFinished(true);
      }
    }, 1200);
  }
  async function enterFullscreen() {
    if (!boardRef.current?.requestFullscreen) return;
    await boardRef.current.requestFullscreen().catch(() => {
    });
  }
  function restart() {
    setQuestions(buildQuestions(selectedClass, selectedSubject, questionCount));
    setIndex(0);
    setSelectedAnswer(null);
    setSecondsLeft(timeLimit);
    setScore(0);
    setCorrectCount(0);
    setFeedback(null);
    setFinished(false);
    setSubmitted(false);
    completeGuardRef.current = false;
  }
  const percent = questions.length ? Math.round(correctCount / questions.length * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: boardRef, className: "min-h-[calc(100vh-2rem)] px-4 md:px-8 py-6 md:py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "glass-strong rounded-[2rem] p-5 md:p-6 flex flex-col gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-brand-orange" }),
            " fullscreen quiz arena"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-3xl md:text-5xl font-bold leading-tight", children: "Bangladesh curriculum game mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-3xl text-sm md:text-base text-muted-foreground", children: "প্রতি প্রশ্নে সময়সীমা আছে, answer feedback instant, score save হয় Firebase-এ, আর high score হলে certificate auto-generate হয়।" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void enterFullscreen(), className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 text-white font-semibold shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-4 w-4" }),
            "Full screen"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setAudioEnabled((current) => !current), className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70", children: [
            audioEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "h-4 w-4" }),
            "Sound ",
            audioEnabled ? "on" : "off"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "h-4 w-4" }), label: "Timer", value: `${secondsLeft}s` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" }), label: "Score", value: score.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }), label: "Accuracy", value: `${percent}%` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }), label: "Streak", value: `${Math.max(0, correctCount - 1)}` })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 lg:grid-cols-[1.1fr_0.9fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-5 md:p-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Control, { label: "Class", value: selectedClass.toString(), onChange: (value) => setSelectedClass(Number(value)), options: Array.from({
            length: 10
          }, (_, idx) => `${idx + 1}`) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Control, { label: "Subject", value: selectedSubject, onChange: (value) => setSelectedSubject(value), options: SUBJECTS.map((item) => item.value), optionsLabel: SUBJECTS.map((item) => item.label) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Control, { label: "Questions", value: questionCount.toString(), onChange: (value) => setQuestionCount(Number(value)), options: ["5", "10", "15", "20"] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[1fr_auto] items-center gap-3 rounded-3xl bg-muted/50 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-[0.24em] text-muted-foreground", children: [
              "Question ",
              index + 1,
              " / ",
              questions.length
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 text-xl md:text-3xl font-bold leading-tight", children: question?.prompt ?? "No question" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: restart, className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
            "Restart"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-gradient-hero transition-all", style: {
          width: `${questions.length ? (index + 1) / questions.length * 100 : 0}%`
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: question?.options.map((option, optionIndex) => {
          const isCorrect = optionIndex === question.answer;
          const isPicked = selectedAnswer === optionIndex;
          const reveal = selectedAnswer !== null;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: reveal, onClick: () => void handleAnswer(optionIndex), className: `w-full rounded-2xl border-2 p-4 text-left transition-all ${reveal && isCorrect ? "border-brand-green bg-brand-green/10" : reveal && isPicked && !isCorrect ? "border-destructive bg-destructive/10" : "border-border bg-background hover:border-primary hover:bg-muted/60"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: option }),
            reveal && isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-brand-green" }) : null
          ] }) }, option);
        }) }),
        feedback ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl p-4 text-sm ${feedback.correct ? "bg-brand-green/10" : "bg-destructive/10"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            feedback.correct ? "Correct" : "Try again",
            ":"
          ] }),
          " ",
          feedback.text
        ] }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-brand-orange" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Time limit per question is mandatory. Auto-next runs when the timer ends." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: "Game rules" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-muted px-3 py-1 text-xs font-semibold", children: selectedClass })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• 10–30 second timers, based on your setting." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Correct streaks add bonus points." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• 80%+ opens certificate creation automatically." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Scores save to Firebase or the local demo store." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-3", children: "Live summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TinyStat, { title: "Correct", value: `${correctCount}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TinyStat, { title: "Streak bonus", value: `${Math.max(0, correctCount - 1)}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TinyStat, { title: "Timer", value: `${secondsLeft}s` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TinyStat, { title: "Accuracy", value: `${percent}%` })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-3", children: "Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 font-medium", children: [
                "Time per question: ",
                timeLimit,
                "s"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 10, max: 30, step: 5, value: timeLimit, onChange: (event) => setTimeLimit(Number(event.target.value)), className: "w-full" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Audio feedback" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setAudioEnabled((current) => !current), className: "rounded-full bg-muted px-3 py-1.5 font-medium", children: audioEnabled ? "Enabled" : "Disabled" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/certificates", className: "glass rounded-[2rem] p-5 flex items-center justify-between gap-3 hover:shadow-soft transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: "Achievement certificates" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "View generated certificates and download as PDF." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-primary" })
        ] })
      ] })
    ] }),
    finished ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-strong rounded-[2rem] p-6 md:p-8 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5 text-brand-orange" }),
            " final score"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl md:text-4xl font-bold", children: "Quiz complete" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[1.5rem] bg-gradient-hero px-6 py-5 text-white shadow-glow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] opacity-80", children: "score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold", children: score }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm opacity-85", children: [
            "out of ",
            questions.length * 15
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResultCard, { label: "Accuracy", value: `${percent}%` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResultCard, { label: "Correct answers", value: `${correctCount}/${questions.length}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResultCard, { label: "Firebase", value: auth.firebaseReady ? "Enabled" : "Local demo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: restart, className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 font-semibold text-white shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
          "Play again"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/certificates", className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4" }),
          "Open certificates"
        ] })
      ] })
    ] }) : null
  ] }) }) });
}
function buildQuestions(classLevel, subject, count) {
  const filtered = quizBank.filter((question) => question.classLevel === classLevel && (subject === "all" || question.subject === subject));
  const pool = filtered.length ? filtered : quizBank.filter((question) => question.classLevel === classLevel);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
function Stat({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-background/80 p-4 shadow-soft border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
      icon,
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-bold", children: value })
  ] });
}
function TinyStat({
  title,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-muted/60 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xl font-bold", children: value })
  ] });
}
function ResultCard({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-muted/50 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-bold", children: value })
  ] });
}
function Control({
  label,
  value,
  onChange,
  options,
  optionsLabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value, onChange: (event) => onChange(event.target.value), className: "w-full rounded-2xl border border-border bg-background px-4 py-3 font-medium outline-none", children: options.map((option, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option, children: optionsLabel?.[index] ?? option }, option)) })
  ] });
}
export {
  Games as component
};
