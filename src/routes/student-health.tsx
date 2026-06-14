import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  CheckCircle2,
  Droplet,
  Flame,
  Heart,
  Moon,
  Pause,
  Play,
  RotateCcw,
  Smile,
  Sparkles,
  Timer,
  Tv,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/student-health")({
  head: () => ({ meta: [{ title: "শিক্ষার্থী স্বাস্থ্য ও মন · E-পাঠশালা" }] }),
  component: StudentHealthPage,
});

// Mock Exercise Data
const EXERCISES = [
  {
    id: "jumping-jacks",
    name: "জাম্পিং জ্যাকস (Jumping Jacks)",
    duration: 30,
    calories: 12,
    benefits: "পুরো শরীরের রক্তসঞ্চালন বৃদ্ধি করে এবং হৃদযন্ত্র সতেজ রাখে।",
    instructions: "১. সোজা হয়ে দাঁড়াও।\n২. লাফ দেওয়ার সাথে সাথে পা দুটি দুই পাশে ছড়িয়ে দাও এবং হাত দুটি মাথার উপর তোলো।\n৩. পুনরায় লাফ দিয়ে শুরুর অবস্থানে ফিরে এসো।",
  },
  {
    id: "squats",
    name: "উঠবস (Squats)",
    duration: 30,
    calories: 10,
    benefits: "পায়ের পেশি ও মেরুদণ্ডের শক্তি বৃদ্ধি করে।",
    instructions: "১. পা দুটি কাঁধের সমান দূরত্বে ফাঁক করে দাঁড়াও।\n২. চেয়ারে বসার মতো করে নিতম্ব পেছনে নিয়ে হাঁটু ভাঁজ করো।\n৩. পিঠ সোজা রেখে ধীরে ধীরে আগের অবস্থানে ফিরে এসো।",
  },
  {
    id: "plank",
    name: "প্ল্যাঙ্ক (Plank)",
    duration: 30,
    calories: 8,
    benefits: "পেট ও পিঠের পেশি মজবুত করে এবং শারীরিক গঠন উন্নত করে।",
    instructions: "১. উপুড় হয়ে কনুই ও পায়ের আঙুলের ওপর ভর দাও।\n২. মাথা থেকে গোড়ালি পর্যন্ত শরীরকে সোজা লাইনে রাখো।\n৩. পেট ও কোমর শক্ত করে ধরে রাখো।",
  },
  {
    id: "high-knees",
    name: "হাই নিজ (High Knees)",
    duration: 30,
    calories: 15,
    benefits: "সহজে মেদ কমাতে সাহায্য করে ও স্ট্যামিনা বাড়ায়।",
    instructions: "১. জায়গায় দাঁড়িয়ে সোজা হয়ে হাঁটার গতি বাড়াও।\n২. হাঁটু যথাসম্ভব বুকের কাছে উঁচুতে তোলো।\n৩. হাতের কনুই ভাঁজ করে পায়ের সাথে মিলিয়ে নাড়াও।",
  },
];

// Mock Yoga Poses Data
const YOGA_POSES = [
  {
    id: "lotus-pose",
    name: "পদ্মাসন (Lotus Pose)",
    duration: 60,
    benefits: "মানসিক প্রশান্তি আনে, মনোযোগ বৃদ্ধি করে এবং অবসাদ দূর করে।",
    instructions: "১. মেঝেতে পা ছড়িয়ে বসো।\n২. ডান পা ভেঙে বাঁ উরুর ওপর এবং বাঁ পা ভেঙে ডান উরুর ওপর রাখো।\n৩. মেরুদণ্ড সোজা রেখে হাত হাঁটুতে জ্ঞানমুদ্রায় স্থাপন করো এবং চোখ বন্ধ করে গভীর শ্বাস নাও।",
  },
  {
    id: "cobra-pose",
    name: "ভুজঙ্গাসন (Cobra Pose)",
    duration: 30,
    benefits: "পিঠের নমনীয়তা বাড়ায় ও ফুসফুসের কার্যক্ষমতা বৃদ্ধি করে।",
    instructions: "১. উপুড় হয়ে শুয়ে পড়ো এবং হাত বুকের দুপাশে রাখো।\n২. হাতের ওপর চাপ দিয়ে বুক ও মাথা ওপরের দিকে তোলো।\n৩. কনুই সামান্য ভাঁজ রেখে ওপরের দিকে তাকাও ও শ্বাস ধরে রাখো।",
  },
  {
    id: "tree-pose",
    name: "বৃক্ষাসন (Tree Pose)",
    duration: 30,
    benefits: "শরীরের ভারসাম্য বজায় রাখা ও একাগ্রতা বৃদ্ধিতে দারুণ কার্যকরী।",
    instructions: "১. সোজা হয়ে দাঁড়াও।\n২. ডান পা মুড়ে বাঁ পায়ের উরুর ভেতরের অংশে স্থাপন করো।\n৩. হাত দুটি মাথার ওপরে জোড় করে নমস্কার ভঙ্গিতে দাঁড়াও এবং স্থির দৃষ্টিতে তাকাও।",
  },
  {
    id: "child-pose",
    name: "বালাসন (Child's Pose)",
    duration: 45,
    benefits: "মানসিক ক্লান্তি দূর করে, ঘাড় ও পিঠের টান কমায়।",
    instructions: "১. হাঁটু মুড়ে গোড়ালির ওপর বসো (বজ্রাসন)।\n২. শ্বাস ছাড়তে ছাড়তে সামনে ঝুঁকে কপাল মেঝেতে ছোঁয়াও।\n৩. হাত দুটি সামনের দিকে সোজা করে প্রসারিত করো এবং রিল্যাক্স করো।",
  },
];

// Daily challenges list
const CHALLENGES = [
  "আজ অন্তত ৮ গ্লাস পানি পান করো। 💧",
  "৫ মিনিট চোখ বন্ধ করে দীর্ঘশ্বাসের ব্যায়াম করো। 🧘",
  "১ ঘণ্টা কম স্ক্রিন বা মোবাইল ব্যবহার করার চেষ্টা করো। 📱",
  "রাতে দ্রুত ঘুমাতে যাওয়ার চ্যালেঞ্জ নাও (অন্তত ৮ ঘণ্টা ঘুম)। 😴",
  "১০ মিনিট টানা দ্রুত হাঁটো বা দৌড়াও। 🏃",
  "২টি স্বাস্থ্যকর ফল বা সবজি আহারে যোগ করো। 🍎",
];

function StudentHealthPage() {
  // States for Mood Tracker
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // States for Habit Loggers - Loaded from localStorage if available
  const [waterCount, setWaterCount] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("health:water");
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  const [sleepCount, setSleepCount] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("health:sleep");
      return saved ? parseFloat(saved) : 8;
    }
    return 8;
  });
  const [screenCount, setScreenCount] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("health:screen");
      return saved ? parseFloat(saved) : 2;
    }
    return 2;
  });

  // States for Breathing Coach
  const [breathState, setBreathState] = useState<"inhate" | "hold" | "exhale" | "hold2">("inhate");
  const [breathTimer, setBreathTimer] = useState<number>(4);

  // States for Exercise/Yoga Timer
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerLeft, setTimerLeft] = useState<number>(30);
  const [activeItem, setActiveItem] = useState<{ id: string; name: string; duration: number } | null>(null);
  const [viewMode, setViewMode] = useState<"exercise" | "yoga">("exercise");

  // States for Daily Challenge - Loaded from localStorage
  const [challengeIdx, setChallengeIdx] = useState<number>(0);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const today = new Date().toDateString();
      const savedDate = localStorage.getItem("health:challengeDate");
      const savedStatus = localStorage.getItem("health:challengeCompleted");
      return savedDate === today && savedStatus === "true";
    }
    return false;
  });
  const [streakCount, setStreakCount] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("health:streak");
      return saved ? parseInt(saved, 10) : 3;
    }
    return 3;
  });
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Load random challenge once on mount
  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * CHALLENGES.length);
    setChallengeIdx(randomIdx);
  }, []);

  // Sync state to localStorage & dispatch custom event to sync AppShell notifications
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("health:water", waterCount.toString());
      window.dispatchEvent(new Event("health-update"));
    }
  }, [waterCount]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("health:sleep", sleepCount.toString());
      window.dispatchEvent(new Event("health-update"));
    }
  }, [sleepCount]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("health:screen", screenCount.toString());
      window.dispatchEvent(new Event("health-update"));
    }
  }, [screenCount]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const today = new Date().toDateString();
      localStorage.setItem("health:challengeDate", today);
      localStorage.setItem("health:challengeCompleted", challengeCompleted ? "true" : "false");
      localStorage.setItem("health:streak", streakCount.toString());
      window.dispatchEvent(new Event("health-update"));
    }
  }, [challengeCompleted, streakCount]);

  // Breathing Coach cycle logic
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathTimer((prev) => {
        if (prev <= 1) {
          // Change breathing state
          setBreathState((currentState) => {
            switch (currentState) {
              case "inhate":
                return "hold";
              case "hold":
                return "exhale";
              case "exhale":
                return "hold2";
              case "hold2":
              default:
                return "inhate";
            }
          });
          return 4; // Reset to 4s for each phase
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Exercise Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && timerLeft > 0) {
      interval = setInterval(() => {
        setTimerLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerLeft === 0 && timerActive) {
      setTimerActive(false);
      // Play a simple browser synth speech alert if supported
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance("ব্যায়াম সম্পন্ন হয়েছে! চমৎকার কাজ করেছ।");
        utterance.lang = "bn-BD";
        window.speechSynthesis.speak(utterance);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerLeft]);

  function startTimer(item: { id: string; name: string; duration: number }) {
    setActiveItem(item);
    setTimerLeft(item.duration);
    setTimerActive(true);
  }

  function resetTimer() {
    if (activeItem) {
      setTimerLeft(activeItem.duration);
    }
    setTimerActive(false);
  }

  function handleCompleteChallenge() {
    setChallengeCompleted(true);
    setStreakCount((prev) => prev + 1);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  }

  // Calculate Health Status Recommendation
  const getMoodResponse = () => {
    switch (selectedMood) {
      case "happy":
        return {
          title: "দারুণ আনন্দ!",
          text: "তোমার ভেতরের এই ইতিবাচক শক্তি ও হাসি আজ পড়াশোনায় কাজে লাগাও। বন্ধুদের সাথে কিছু ভালো মুহূর্ত ভাগাভাগি করো!",
          color: "border-emerald-200 bg-emerald-50 text-emerald-800",
        };
      case "calm":
        return {
          title: "প্রশান্ত মন!",
          text: "এই শান্ত ভাবটি পড়াশোনায় মনোযোগ দেওয়ার সবচেয়ে ভালো সময়। মনকে স্থির রাখতে ১-২ মিনিট ধ্যান করতে পারো।",
          color: "border-blue-200 bg-blue-50 text-blue-800",
        };
      case "stressed":
        return {
          title: "একটু রিল্যাক্স হওয়া যাক!",
          text: "ক্লান্তি ভাব দূর করতে স্ক্রিন বা বই বন্ধ করো। নিচে থাকা ৫ মিনিটের গভীর শ্বাস-প্রশ্বাসের ব্যায়ামটি ট্রাই করো।",
          color: "border-amber-200 bg-amber-50 text-amber-800",
        };
      case "sleepy":
        return {
          title: "ঘুম ও বিশ্রামের প্রয়োজন!",
          text: "পর্যাপ্ত ঘুম ছাড়া আমাদের মস্তিষ্ক কাজ করতে পারে না। কিছুক্ষণ বিশ্রাম নাও এবং রাতে অন্তত ৮ ঘণ্টা ঘুম নিশ্চিত করো।",
          color: "border-indigo-200 bg-indigo-50 text-indigo-800",
        };
      case "sad":
        return {
          title: "মন খারাপ? এটা স্বাভাবিক!",
          text: "মন খারাপ থাকা অপরাধ নয়। তোমার প্রিয় মানুষের সাথে কথা বলো, অথবা নিজের পছন্দের একটি কাজ করে সময় কাটাও।",
          color: "border-rose-200 bg-rose-50 text-rose-800",
        };
      default:
        return null;
    }
  };

  const moodFeedback = getMoodResponse();

  return (
    <AppShell>
      {/* Confetti Animation Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
          <div className="text-center p-8 bg-white rounded-[2rem] border border-border shadow-glow max-w-sm animate-float">
            <Sparkles className="h-16 w-16 text-brand-orange mx-auto animate-pulse" />
            <h2 className="text-2xl font-bold mt-4 text-primary">চ্যালেঞ্জ সফল!</h2>
            <p className="text-sm text-muted-foreground mt-2">
              তোমার আজকের স্বাস্থ্য অভ্যাস সম্পন্ন হয়েছে। প্লাস ওয়ান দিন স্ট্রিক যুক্ত হলো!
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-hero text-white font-bold rounded-full text-sm">
              🔥 {streakCount} দিনের স্ট্রিক!
            </div>
          </div>
          {/* Mock CSS confetti particles */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3.5 h-3.5 rounded-full animate-bounce"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                backgroundColor: ["#3b82f6", "#ec4899", "#10b981", "#f59e0b", "#8b5cf6"][i % 5],
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      )}

      <div className="px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <header className="rounded-[2.25rem] border border-white/60 bg-[linear-gradient(135deg,#eafbf5_0%,#f0f9ff_60%,#fdf4ff_100%)] shadow-soft overflow-hidden">
          <div className="p-6 md:p-8 lg:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs md:text-sm font-semibold shadow-soft text-emerald-700">
                <Activity className="h-4 w-4 text-emerald-500" />
                শিক্ষার্থী সুস্বাস্থ্য ও মেন্টাল ওয়েলবিয়িং
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                  স্বাস্থ্য ও মনন
                </h1>
                <p className="max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
                  সুস্থ দেহ ও সতেজ মনই আমাদের শেখার সেরা জ্বালানি। তোমার মানসিক অবস্থা ট্র্যাক করো, শ্বাস-প্রশ্বাসের অনুশীলন করো এবং মজাদার ব্যায়ামের অভ্যাস তৈরি করো।
                </p>
              </div>
            </div>
            
            {/* Streak Counter */}
            <div className="rounded-[2rem] bg-white border border-border p-6 shadow-soft text-center shrink-0 min-w-[160px] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-hero" />
              <div className="text-4xl">🔥</div>
              <div className="text-2xl font-bold mt-2">{streakCount} দিন</div>
              <div className="text-xs text-muted-foreground mt-1">সুস্থ জীবনযাত্রা স্ট্রিক</div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Panel: Mood Tracker & Habit Trackers */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Mood Tracker */}
            <section className="bg-white border border-border rounded-[2rem] p-6 shadow-soft space-y-4">
              <div className="flex items-center gap-2">
                <Smile className="h-5 w-5 text-brand-orange" />
                <h2 className="text-xl font-bold">আজকের মন কেমন?</h2>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                তোমার মানসিক অবস্থা নির্বাচন করো। প্রতিটি নির্বাচন তোমাকে কিছু দিকনির্দেশনা দেবে।
              </p>
              
              <div className="grid grid-cols-5 gap-3">
                {[
                  { id: "happy", emoji: "😆", name: "মজার" },
                  { id: "calm", emoji: "😌", name: "শান্ত" },
                  { id: "stressed", emoji: "😵", name: "ক্লান্ত" },
                  { id: "sleepy", emoji: "😴", name: "ঘুম ঘুম" },
                  { id: "sad", emoji: "😢", name: "খারাপ" },
                ].map((mood) => (
                  <button
                    key={mood.id}
                    type="button"
                    onClick={() => setSelectedMood(mood.id)}
                    className={cn(
                      "p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer",
                      selectedMood === mood.id
                        ? "border-primary bg-primary/5 text-primary scale-[1.05] ring-2 ring-primary/20"
                        : "border-border hover:bg-muted/40 hover:scale-[1.02]"
                    )}
                  >
                    <span className="text-2xl md:text-3xl">{mood.emoji}</span>
                    <span className="text-xs font-semibold">{mood.name}</span>
                  </button>
                ))}
              </div>

              {/* Mood Feedback Display */}
              {moodFeedback && (
                <div className={cn("p-4 rounded-2xl border transition-all duration-300", moodFeedback.color)}>
                  <h3 className="font-bold text-sm flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" />
                    {moodFeedback.title}
                  </h3>
                  <p className="text-xs md:text-sm mt-1 leading-relaxed">{moodFeedback.text}</p>
                </div>
              )}
            </section>

            {/* Daily Habit Loggers */}
            <section className="bg-white border border-border rounded-[2rem] p-6 shadow-soft space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <h2 className="text-xl font-bold">আজকের স্বাস্থ্য ডায়েরি</h2>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                তোমার পানি পান, ঘুম এবং স্ক্রিন টাইম মেপে নিয়মানুবর্তিতা বজায় রাখো।
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                {/* Water log */}
                <div className="p-4 rounded-2xl border border-border bg-sky-50/20 flex flex-col justify-between min-h-[140px]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm text-foreground">পানি পান</h3>
                      <p className="text-[10px] text-muted-foreground">লক্ষ্য: ৮ গ্লাস (২ লি.)</p>
                    </div>
                    <Droplet className="h-5 w-5 text-sky-500 animate-pulse" />
                  </div>
                  <div className="my-3 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setWaterCount(Math.max(0, waterCount - 1))}
                      className="w-8 h-8 rounded-full border border-border bg-white flex items-center justify-center font-bold text-lg hover:bg-muted/50 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-2xl font-black text-sky-600">{waterCount} / 8</span>
                    <button
                      onClick={() => setWaterCount(Math.min(15, waterCount + 1))}
                      className="w-8 h-8 rounded-full border border-border bg-white flex items-center justify-center font-bold text-lg hover:bg-muted/50 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  {/* Wave Progress */}
                  <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-500 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (waterCount / 8) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Sleep log */}
                <div className="p-4 rounded-2xl border border-border bg-indigo-50/10 flex flex-col justify-between min-h-[140px]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm text-foreground">ঘুমের সময়</h3>
                      <p className="text-[10px] text-muted-foreground">আদর্শ: ৭-৯ ঘণ্টা</p>
                    </div>
                    <Moon className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div className="my-2 text-center">
                    <span className="text-2xl font-black text-indigo-600">{sleepCount} ঘণ্টা</span>
                    <input
                      type="range"
                      min="4"
                      max="12"
                      step="0.5"
                      value={sleepCount}
                      onChange={(e) => setSleepCount(parseFloat(e.target.value))}
                      className="w-full mt-2 accent-indigo-600 cursor-pointer"
                    />
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-semibold text-center py-1 rounded-lg",
                      sleepCount >= 7 && sleepCount <= 9
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    )}
                  >
                    {sleepCount >= 7 && sleepCount <= 9 ? "আদর্শ ঘুম হয়েছে" : "ঘুম পরিমিত নয়"}
                  </span>
                </div>

                {/* Screen Time log */}
                <div className="p-4 rounded-2xl border border-border bg-rose-50/10 flex flex-col justify-between min-h-[140px]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm text-foreground">স্ক্রিন টাইম</h3>
                      <p className="text-[10px] text-muted-foreground">সীমা: ৩ ঘণ্টার কম</p>
                    </div>
                    <Tv className="h-5 w-5 text-rose-500" />
                  </div>
                  <div className="my-3 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setScreenCount(Math.max(0, screenCount - 0.5))}
                      className="w-8 h-8 rounded-full border border-border bg-white flex items-center justify-center font-bold hover:bg-muted/50 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-2xl font-black text-rose-600">{screenCount}h</span>
                    <button
                      onClick={() => setScreenCount(Math.min(16, screenCount + 0.5))}
                      className="w-8 h-8 rounded-full border border-border bg-white flex items-center justify-center font-bold hover:bg-muted/50 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-semibold text-center py-1 rounded-lg",
                      screenCount <= 3 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                    )}
                  >
                    {screenCount <= 3 ? "নিরাপদ স্ক্রিন টাইম" : "স্ক্রিন টাইম বেশি!"}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Panel: Interactive Deep Breathing Coach */}
          <div className="space-y-6">
            <section className="bg-white border border-border rounded-[2rem] p-6 shadow-soft flex flex-col justify-between min-h-[360px] relative overflow-hidden">
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-sky-500 animate-pulse" />
                <h2 className="text-xl font-bold">মন শান্ত করার গাইড</h2>
              </div>
              <p className="text-xs text-muted-foreground">
                ফুসফুস সতেজ ও মাথা ঠান্ডা করতে গভীর শ্বাস-প্রশ্বাসের ৪-৪-৪ রিদমটি অনুসরণ করো।
              </p>

              {/* Breathing Circle Visualizer */}
              <div className="my-6 flex flex-col items-center justify-center relative">
                {/* outer glow rings */}
                <div
                  className={cn(
                    "absolute rounded-full border border-sky-200/50 bg-sky-100/30 transition-all duration-[4000ms] ease-in-out",
                    breathState === "inhate" ? "w-44 h-44 scale-100 opacity-80" : "",
                    breathState === "hold" ? "w-48 h-48 scale-105 opacity-60" : "",
                    breathState === "exhale" ? "w-32 h-32 scale-75 opacity-40" : "",
                    breathState === "hold2" ? "w-28 h-28 scale-[0.7] opacity-20" : ""
                  )}
                />
                
                {/* inner animated circle */}
                <div
                  className={cn(
                    "w-36 h-36 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 shadow-glow flex flex-col items-center justify-center text-white transition-all duration-[4000ms] ease-in-out",
                    breathState === "inhate" ? "scale-100" : "",
                    breathState === "hold" ? "scale-105 ring-4 ring-sky-300/30" : "",
                    breathState === "exhale" ? "scale-75" : "",
                    breathState === "hold2" ? "scale-[0.7]" : ""
                  )}
                >
                  <span className="text-sm font-bold tracking-wider uppercase">
                    {breathState === "inhate" && "নিঃশ্বাস নাও"}
                    {breathState === "hold" && "ধরে রাখো"}
                    {breathState === "exhale" && "নিঃশ্বাস ছাড়ো"}
                    {breathState === "hold2" && "ধরে রাখো"}
                  </span>
                  <span className="text-3xl font-black mt-1.5">{breathTimer}s</span>
                </div>
              </div>

              {/* Instructive State Alert */}
              <div className="bg-sky-50 border border-sky-100 text-sky-800 text-xs md:text-sm p-3.5 rounded-2xl text-center leading-relaxed">
                {breathState === "inhate" && "নাক দিয়ে গভীরভাবে শ্বাস ভেতরে টেনে নাও..."}
                {breathState === "hold" && "শান্তভাবে বুক ফুলিয়ে শ্বাস ধরে রাখো..."}
                {breathState === "exhale" && "ধীরে ধীরে মুখ দিয়ে বাতাস বাইরে বের করে দাও..."}
                {breathState === "hold2" && "পুনরায় শ্বাস নেওয়ার আগে একটু স্থির থাকো..."}
              </div>
            </section>
          </div>
        </div>

        {/* Daily Challenge Card */}
        <section className="bg-gradient-hero rounded-[2rem] p-6 md:p-8 text-white shadow-soft relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -right-6 -top-6 w-48 h-48 bg-brand-yellow/10 rounded-full blur-2xl" />
          
          <div className="space-y-2 relative z-10 text-center md:text-left">
            <span className="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              আজকের সুস্বাস্থ্য চ্যালেঞ্জ
            </span>
            <h2 className="text-xl md:text-3xl font-bold">{CHALLENGES[challengeIdx]}</h2>
            <p className="text-xs md:text-sm opacity-85">
              চ্যালেঞ্জটি সম্পূর্ণ করার পর ডানদিকের বাটনে ক্লিক করে তোমার স্ট্রিক ধরে রাখো!
            </p>
          </div>

          <button
            onClick={handleCompleteChallenge}
            disabled={challengeCompleted}
            className={cn(
              "px-8 py-4 rounded-[1.5rem] font-bold shadow-soft transition-all shrink-0 cursor-pointer active:scale-95 text-sm md:text-base relative z-10",
              challengeCompleted
                ? "bg-white/20 text-white/70 border border-white/30 cursor-not-allowed"
                : "bg-white text-primary hover:bg-white/90 hover:scale-[1.03]"
            )}
          >
            {challengeCompleted ? "চ্যালেঞ্জ সম্পন্ন হয়েছে!" : "সম্পন্ন করেছি! 🎉"}
          </button>
        </section>

        {/* Workout / Yoga Timer and Guides */}
        <section className="bg-white border border-border rounded-[2rem] p-6 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div className="flex items-center gap-2.5">
              <Timer className="h-5.5 w-5.5 text-brand-purple animate-pulse" />
              <div>
                <h2 className="text-xl font-bold">শারীরিক কসরত ও যোগাসন গাইড</h2>
                <p className="text-xs text-muted-foreground">শরীর সুস্থ রাখতে প্রতিদিন অন্তত ৫-১০ মিনিট ব্যায়ামের অভ্যাস করো।</p>
              </div>
            </div>
            
            {/* View Switcher */}
            <div className="inline-flex rounded-xl bg-muted p-1">
              <button
                onClick={() => setViewMode("exercise")}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer",
                  viewMode === "exercise" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                ব্যায়াম (Exercises)
              </button>
              <button
                onClick={() => setViewMode("yoga")}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer",
                  viewMode === "yoga" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                যোগাসন (Yoga Poses)
              </button>
            </div>
          </div>

          {/* Active Timer Dashboard Panel (Conditional) */}
          {activeItem && (
            <div className="rounded-[1.75rem] border border-brand-purple/20 bg-brand-purple/5 p-5 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-purple">চলমান টাইমার</span>
                <h3 className="text-lg font-bold text-foreground">{activeItem.name}</h3>
                <p className="text-xs text-muted-foreground">শ্বাস স্বাভাবিক রাখো এবং সঠিক ভঙ্গি বজায় রাখো।</p>
              </div>

              {/* Timer Count */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-black tracking-tight text-brand-purple font-mono">
                    {Math.floor(timerLeft / 60)}:{(timerLeft % 60).toString().padStart(2, "0")}
                  </div>
                  <span className="text-[10px] text-muted-foreground">সময় বাকি</span>
                </div>
                
                {/* Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setTimerActive(!timerActive)}
                    className="p-3 bg-brand-purple text-white rounded-2xl hover:bg-brand-purple/90 shadow-soft cursor-pointer transition-colors"
                  >
                    {timerActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="p-3 border border-border bg-white text-muted-foreground hover:bg-muted/70 rounded-2xl shadow-soft cursor-pointer transition-colors"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Items Grid */}
          <div className="grid gap-5 sm:grid-cols-2">
            {(viewMode === "exercise" ? EXERCISES : YOGA_POSES).map((item) => (
              <div
                key={item.id}
                className={cn(
                  "p-5 rounded-2xl border transition-all hover:shadow-soft flex flex-col justify-between min-h-[220px]",
                  activeItem?.id === item.id
                    ? "border-brand-purple ring-2 ring-brand-purple/10 bg-white"
                    : "border-border bg-white/40"
                )}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-base md:text-lg text-foreground">{item.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full font-semibold">
                      <Timer className="h-3.5 w-3.5 text-brand-purple" />
                      {item.duration}s
                    </div>
                  </div>
                  
                  {/* Calories burn tag for Exercises */}
                  {"calories" in item && (
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md">
                      <Flame className="h-3 w-3" />
                      ~{(item as any).calories} ক্যালরি ক্ষয়
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
                    উপকারিতা: {item.benefits}
                  </p>
                  
                  {/* Instruction Accordion-like text */}
                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground block mb-1">
                      কীভাবে করবে:
                    </span>
                    <p className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
                      {item.instructions}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">টাইমার দিয়ে অনুশীলন করো</span>
                  <button
                    onClick={() => startTimer(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-hero text-white text-xs font-bold rounded-xl shadow-soft cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                  >
                    <Play className="h-3.5 w-3.5" />
                    শুরু করো
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
