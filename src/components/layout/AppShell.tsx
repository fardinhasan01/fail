import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  BookOpen,
  Brain,
  DoorOpen,
  Droplet,
  Flame,
  Home,
  GraduationCap,
  MessageCircleHeart,
  Moon,
  Palette,
  School2,
  ScrollText,
  Swords,
  Search,
  Tv,
  Users,
  Trophy,
  Video,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useAuth, useRequireAuth } from "@/lib/user-store";
import { cn } from "@/lib/utils";
import { VoiceOrb } from "@/components/layout/VoiceOrb";

const nav = [
  { to: "/dashboard", label: "শুরু", icon: Home },
  { to: "/school", label: "স্কুল", icon: School2 },
  { to: "/students", label: "ছাত্র", icon: GraduationCap },
  { to: "/competitions", label: "প্রতিযোগিতা", icon: Trophy },
  { to: "/subjects", label: "বিষয়", icon: BookOpen },
  { to: "/smart-board", label: "স্মার্ট  বোর্ড", icon: Palette },
  { to: "/bani", label: "সহায়ক", icon: MessageCircleHeart },
  { to: "/student-health", label: "স্বাস্থ্য", icon: Activity },
  { to: "/quiz", label: "কুইজ", icon: Brain },
  { to: "/special-game", label: "Special Game", icon: Swords },
  { to: "/classmates", label: "ক্লাসমেট", icon: Users },
  { to: "/live-class", label: "লাইভ", icon: Video },
  { to: "/books", label: "বই", icon: BookOpen },
  { to: "/certificates", label: "সার্টিফিকেট", icon: ScrollText },
  { to: "/leaderboard", label: "র‍্যাঙ্ক", icon: Trophy },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const auth = useRequireAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = auth.profile;

  const [openReminders, setOpenReminders] = useState(false);
  const [dismissedList, setDismissedList] = useState<string[]>([]);
  const [healthStats, setHealthStats] = useState({
    water: 0,
    sleep: 8,
    screen: 2,
    challengeCompleted: false,
  });

  const loadStats = () => {
    if (typeof window !== "undefined") {
      const water = parseInt(localStorage.getItem("health:water") || "0", 10);
      const sleep = parseFloat(localStorage.getItem("health:sleep") || "8");
      const screen = parseFloat(localStorage.getItem("health:screen") || "2");
      const today = new Date().toDateString();
      const savedDate = localStorage.getItem("health:challengeDate");
      const challengeCompleted =
        savedDate === today && localStorage.getItem("health:challengeCompleted") === "true";
      setHealthStats({ water, sleep, screen, challengeCompleted });
    }
  };

  useEffect(() => {
    loadStats();
    if (typeof window !== "undefined") {
      window.addEventListener("health-update", loadStats);
      return () => window.removeEventListener("health-update", loadStats);
    }
  }, []);

  if (auth.loading) {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <div className="glass-strong rounded-[2rem] p-8 text-center max-w-md w-full">
          <div className="text-4xl mb-3 animate-float">📚</div>
          <h1 className="text-2xl font-bold">তোমার স্কুল লোড হচ্ছে</h1>
          <p className="text-sm text-muted-foreground mt-2">
            সেশন যাচাই করা হচ্ছে, একটু অপেক্ষা করো।
          </p>
        </div>
      </div>
    );
  }

  // Create notifications items
  const notifications = [];
  if (healthStats.water < 8) {
    notifications.push({
      id: "water",
      icon: Droplet,
      iconColor: "text-sky-500",
      bgClass: "bg-sky-50/50 border-sky-100",
      text: `পানির রিমাইন্ডার: আজকে মাত্র ${healthStats.water} গ্লাস পানি পান করেছ। অন্তত ৮ গ্লাস পূর্ণ করো।`,
      link: "/student-health",
      btnText: "পানি পান করো",
    });
  }
  if (healthStats.sleep < 7) {
    notifications.push({
      id: "sleep",
      icon: Moon,
      iconColor: "text-indigo-500",
      bgClass: "bg-indigo-50/50 border-indigo-100",
      text: `ঘুমের রিমাইন্ডার: কাল রাতে পর্যাপ্ত ঘুম হয়নি (${healthStats.sleep} ঘণ্টা)। আজ জলদি ঘুমাও।`,
      link: "/student-health",
      btnText: "ডিটেইলস",
    });
  }
  if (healthStats.screen > 3) {
    notifications.push({
      id: "screen",
      icon: Tv,
      iconColor: "text-rose-500",
      bgClass: "bg-rose-50/50 border-rose-100",
      text: `স্ক্রিন টাইম বেশি (${healthStats.screen}h)! ৫ মিনিট চোখ বন্ধ করে রিল্যাক্স করো।`,
      link: "/student-health",
      btnText: "ব্যায়াম করো",
    });
  }
  if (!healthStats.challengeCompleted) {
    notifications.push({
      id: "challenge",
      icon: Trophy,
      iconColor: "text-amber-500",
      bgClass: "bg-amber-50/50 border-amber-100",
      text: "আজকের সুস্বাস্থ্য চ্যালেঞ্জ এখনও সম্পূর্ণ করোনি! চ্যালেঞ্জ দেখে নাও।",
      link: "/student-health",
      btnText: "চ্যালেঞ্জ সম্পন্ন",
    });
  }
  if (user && user.streak > 0) {
    notifications.push({
      id: "streak",
      icon: Flame,
      iconColor: "text-orange-500",
      bgClass: "bg-orange-50/50 border-orange-100",
      text: `তোমার ${user.streak} দিনের পড়ার স্ট্রিক সচল আছে! কুইজ খেলে স্ট্রিক ধরে রাখো।`,
      link: "/quiz",
      btnText: "কুইজে যাও",
    });
  }

  const activeNotifications = notifications.filter((n) => !dismissedList.includes(n.id));

  const dismissNotification = (id: string) => {
    setDismissedList((prev) => [...prev, id]);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex w-64 flex-col gap-2 p-4 sticky top-0 h-screen">
        <Link to="/dashboard" className="flex items-center gap-2 px-3 py-4">
          <img
            src="/assets/e-pathshala-logo.png"
            alt="E-পাঠশালা"
            className="w-12 h-12 rounded-2xl object-cover shadow-glow bg-white"
          />
          <div>
            <div className="font-display font-bold text-lg leading-none">E-পাঠশালা</div>
            <div className="text-xs text-muted-foreground">ডিজিটাল শেখার স্কুল</div>
          </div>
        </Link>

        <nav className="flex flex-col gap-1 mt-2">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-gradient-hero text-white shadow-soft"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto glass rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-orange grid place-items-center text-2xl">
              {user.avatar}
            </div>
            <div className="min-w-0">
              <div className="font-semibold truncate">{user.name}</div>
              <div className="text-xs text-muted-foreground">
                Class {user.class} · {user.role.charAt(0).toUpperCase() + user.role.slice(1)} · Lv{" "}
                {user.level}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1">🔥 {user.streak}d</span>
            <span className="flex items-center gap-1">⭐ {user.xp}</span>
            <span className="flex items-center gap-1">🪙 {user.coins}</span>
          </div>
          <button
            type="button"
            onClick={() => void auth.signOut()}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted/80 transition-colors"
          >
            <DoorOpen className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 pb-24 lg:pb-8">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-40 glass-strong rounded-2xl px-2 py-2 flex items-center justify-around overflow-x-auto">
        {nav.slice(0, 8).map((item) => {
          const Icon = item.icon;
          const active = pathname === item.to || pathname.startsWith(item.to + "/");
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-medium shrink-0",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Floating Actions (Reminders + Jarvis Voice Orb) */}
      <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 flex flex-col gap-3">
        <VoiceOrb />
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenReminders((prev) => !prev)}
            className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-hero text-white shadow-glow hover:scale-[1.05] active:scale-[0.95] cursor-pointer flex items-center justify-center transition-all"
          >
            <Bell
              className={cn(
                "w-5 h-5 md:w-6 md:h-6",
                activeNotifications.length > 0 && "animate-bounce",
              )}
            />
            {activeNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {activeNotifications.length}
              </span>
            )}
          </button>

          {/* Reminders Panel Overlay */}
          {openReminders && (
            <div className="absolute right-0 bottom-16 md:bottom-20 w-[300px] md:w-[340px] max-h-[420px] glass-strong rounded-[2rem] border border-border shadow-glow p-5 flex flex-col gap-4 text-foreground animate-in slide-in-from-bottom-5 fade-in duration-200 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-border pb-2.5">
                <div className="flex items-center gap-2">
                  <Bell className="h-4.5 w-4.5 text-primary animate-pulse" />
                  <h3 className="font-bold text-sm md:text-base">রিমাইন্ডার সেন্টার</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenReminders(false)}
                  className="p-1 hover:bg-muted rounded-full cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {activeNotifications.length === 0 ? (
                  <div className="py-8 text-center text-xs md:text-sm text-muted-foreground flex flex-col items-center gap-2">
                    <span className="text-3xl">🎉</span>
                    <p className="font-semibold text-emerald-600">সব কাজ সম্পন্ন হয়েছে!</p>
                    <p className="text-[10px]">অসাধারণ! তুমি একদম সুস্থ ও সচল লাইফস্টাইলে আছো।</p>
                  </div>
                ) : (
                  activeNotifications.map((notif) => {
                    const NotifIcon = notif.icon;
                    return (
                      <div
                        key={notif.id}
                        className={cn(
                          "p-3 rounded-2xl border text-xs flex flex-col gap-2.5",
                          notif.bgClass,
                        )}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex items-start gap-2">
                            <div
                              className={cn(
                                "p-1.5 rounded-lg bg-white shadow-soft shrink-0",
                                notif.iconColor,
                              )}
                            >
                              <NotifIcon className="h-3.5 w-3.5" />
                            </div>
                            <p className="font-medium leading-relaxed text-[11px] md:text-xs">
                              {notif.text}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => dismissNotification(notif.id)}
                            className="text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="flex justify-end gap-1.5">
                          <Link
                            to={notif.link}
                            onClick={() => setOpenReminders(false)}
                            className="px-3 py-1 bg-white hover:bg-muted border border-border rounded-xl text-[10px] font-bold text-primary transition-colors flex items-center"
                          >
                            {notif.btnText}
                          </Link>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Overall Student Info Card */}
              <div className="bg-primary/5 rounded-2xl border border-primary/10 p-3 text-center">
                <span className="text-[9px] uppercase tracking-wider text-primary font-bold block mb-1">
                  ছাত্র প্রোফাইল
                </span>
                <p className="text-xs font-bold text-foreground">
                  লেভেল {user.level} • {user.xp} XP
                </p>
                <div className="w-full bg-muted h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-350"
                    style={{ width: `${Math.min(100, ((user.xp % 250) / 250) * 100)}%` }}
                  />
                </div>
                <span className="text-[8px] text-muted-foreground block mt-1">
                  পরবর্তী লেভেলে যেতে আরও {250 - (user.xp % 250)} XP প্রয়োজন
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="fixed left-1/2 -translate-x-1/2 bottom-20 lg:bottom-4 z-30 pointer-events-none">
        <div className="pointer-events-auto glass-strong px-4 py-2 rounded-full text-[11px] md:text-xs text-muted-foreground shadow-soft text-center">
          Created &amp; Developed by Kachua Govt Pilot High School Team, E-পাঠশালা, The learning
          platform.
        </div>
      </footer>
    </div>
  );
}
