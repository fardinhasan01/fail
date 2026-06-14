import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Flame,
  GraduationCap,
  MapPinned,
  MessageCircleHeart,
  Play,
  School2,
  Search,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Video,
} from "lucide-react";
import { useEffect, useRef, type ComponentType, type ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { activityBank, liveClasses } from "@/lib/bangladesh-learning";
import { subjects } from "@/lib/subjects";
import { useUser } from "@/lib/user-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "ড্যাশবোর্ড · E-পাঠশালা" }] }),
  component: Dashboard,
});

function Dashboard() {
  const user = useUser();
  const introAudioRef = useRef<HTMLAudioElement | null>(null);
  
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "সুপ্রভাত (শুভ সকাল)";
    if (h < 17) return "শুভ অপরাহ্ন";
    return "শুভ সন্ধ্যা";
  })();

  const topSubjects = subjects.slice(0, 4);
  const roleLabel =
    user.role === "student" ? "শিক্ষার্থী" : user.role === "teacher" ? "শিক্ষক" : "অভিভাবক";
  const schoolLabel = user.schoolName ?? "Verified school pending";

  useEffect(() => {
    const audio = introAudioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  }, []);

  return (
    <AppShell>
      <audio ref={introAudioRef} src="/assets/dashboard-intro.mp3" preload="auto" autoPlay />
      
      {/* Heavenly themed container */}
      <div className="px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-6 relative">
        
        {/* Sky-aurora background blur graphics */}
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl -z-10 animate-float" />
        <div className="absolute top-48 right-10 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl -z-10" style={{ animationDelay: "2s" }} />

        {/* Heavenly Welcome Header */}
        <header className="relative overflow-hidden rounded-[2.5rem] border border-amber-200/40 bg-[linear-gradient(135deg,#e0f2fe_0%,#eef2ff_48%,#fef3c7_100%)] p-6 md:p-10 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Sparkly sky elements */}
          <div className="absolute right-12 top-6 text-amber-400/50 animate-float text-3xl">✨</div>
          <div className="absolute left-1/3 bottom-4 text-sky-400/50 animate-float text-2xl" style={{ animationDelay: "1s" }}>🌟</div>
          <div className="absolute right-1/4 bottom-8 text-indigo-400/40 animate-float text-xl" style={{ animationDelay: "2s" }}>⭐</div>

          <div className="space-y-3 relative z-10">
            <p className="text-sky-700 text-xs md:text-sm font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-500 animate-spin" /> {greeting}
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-none">
              {user.name} <span className="text-3xl md:text-4xl inline-block animate-bounce">{user.avatar}</span>
            </h1>
            <p className="text-slate-600 font-medium text-xs md:text-sm">
              আজ কী নতুন শিখবে? শ্রেণি {user.class} · {roleLabel}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 relative z-10">
            <Link
              to="/school"
              className="px-5 py-3.5 rounded-2xl bg-white/90 border border-slate-100 font-semibold shadow-soft hover:bg-white text-slate-700 hover:shadow-glow flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <School2 className="w-4 h-4 text-sky-500" /> স্কুল ড্যাশবোর্ড
            </Link>
            <Link
              to="/bani"
              className="px-5 py-3.5 rounded-2xl bg-gradient-hero text-white font-semibold shadow-soft hover:shadow-glow flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircleHeart className="w-4 h-4" /> সহায়িকা AI
            </Link>
          </div>
        </header>

        {/* Heavenly Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<Flame className="w-5 h-5" />}
            label="স্ট্রিক"
            value={`${user.streak} দিন`}
            grad="from-amber-400 to-orange-500"
            glowColor="rgba(245,158,11,0.25)"
          />
          <StatCard
            icon={<Star className="w-5 h-5" />}
            label="XP পয়েন্ট"
            value={user.xp.toLocaleString()}
            grad="from-indigo-400 to-violet-600"
            glowColor="rgba(99,102,241,0.2)"
          />
          <StatCard
            icon={<Trophy className="w-5 h-5" />}
            label="কারেন্ট লেভেল"
            value={user.level.toString()}
            grad="from-pink-400 to-fuchsia-600"
            glowColor="rgba(236,72,153,0.2)"
          />
          <StatCard
            icon={<Target className="w-5 h-5" />}
            label="অর্জন কয়েন"
            value={user.coins.toString()}
            grad="from-yellow-400 to-amber-500"
            glowColor="rgba(251,191,36,0.25)"
          />
        </div>

        {/* School Link & Navigation Panels */}
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          
          {/* School Home Cloud card */}
          <div className="glass-strong rounded-[2.5rem] border border-white/60 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden bg-white/70 backdrop-blur-md">
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-emerald-100/20 rounded-full blur-2xl -z-10" />
            
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 text-xs font-bold text-emerald-700 shadow-sm">
                  <School2 className="h-3.5 w-3.5 text-emerald-500 animate-pulse" /> {schoolLabel}
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">Your school-linked learning home</h2>
                <p className="text-xs md:text-sm leading-relaxed text-slate-600">
                  ই-পাঠশালা ন্যাশনাল ইকোসিস্টেমের সাথে সংযুক্ত হয়ে স্কুল রেজিস্ট্রেশন করো, স্টুডেন্ট আইডি কার্ড সংগ্রহ করো এবং বিভিন্ন জাতীয় প্রতিযোগিতায় অংশ নাও।
                </p>
              </div>
              <Link
                to="/students"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 text-xs md:text-sm font-semibold text-white shadow-soft hover:scale-[1.02] transition-transform"
              >
                <GraduationCap className="w-4 h-4" /> Student ID কার্ড
              </Link>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3">
              <DashLink to="/school" label="স্কুল" icon={School2} color="text-sky-500 bg-sky-50" />
              <DashLink to="/smart-board" label="স্মার্ট বোর্ড" icon={Search} color="text-violet-500 bg-violet-50" />
              <DashLink to="/competitions" label="প্রতিযোগিতা" icon={Trophy} color="text-amber-500 bg-amber-50" />
            </div>
          </div>

          {/* Quick Hub Navigation Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to="/classmates"
              className="glass rounded-3xl p-5 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 bg-white/80 border-white/60 relative overflow-hidden"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white grid place-items-center shadow-soft mb-3.5">
                <Users className="w-5 h-5" />
              </div>
              <div className="font-bold text-base md:text-lg text-slate-800">সহপাঠী আড্ডাখানা</div>
              <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                ক্লাসভিত্তিক চ্যাটরুম, গ্রুপ স্টাডি নোট শেয়ারিং এবং সহপাঠীদের সাথে পোল সেশন।
              </div>
            </Link>
            <Link
              to="/live-class"
              className="glass rounded-3xl p-5 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 bg-white/80 border-white/60 relative overflow-hidden"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 text-white grid place-items-center shadow-soft mb-3.5">
                <Video className="w-5 h-5" />
              </div>
              <div className="font-bold text-base md:text-lg text-slate-800">লাইভ ভিডিও ক্লাস</div>
              <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                {liveClasses.find((room) => room.classLevel === user.class)?.time ??
                  "সাপ্তাহিক সময়সূচি"} · সরাসরি শিক্ষকের কাছে প্রশ্ন ও ক্লাস।
              </div>
            </Link>
            <Link
              to="/library"
              className="glass rounded-3xl p-5 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 bg-white/80 border-white/60 relative overflow-hidden"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 text-white grid place-items-center shadow-soft mb-3.5">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="font-bold text-base md:text-lg text-slate-800">ভিডিও লাইব্রেরি</div>
              <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                সহজ ব্যাখ্যা সম্বলিত শিক্ষামূলক YouTube টিউটোরিয়াল ও চমৎকার reels ক্লিপ।
              </div>
            </Link>
            <Link
              to="/bangladesh-map"
              className="glass rounded-3xl p-5 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 bg-white/80 border-white/60 relative overflow-hidden"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white grid place-items-center shadow-soft mb-3.5">
                <MapPinned className="w-5 h-5" />
              </div>
              <div className="font-bold text-base md:text-lg text-slate-800">ইন্টারেক্টিভ মানচিত্র</div>
              <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                গুগল ম্যাপে বাংলাদেশের নদী, ঐতিহাসিক স্থান, এবং বিভাগসমূহ ঘুরে দেখো।
              </div>
            </Link>
          </div>
        </section>

        {/* Learning Progress Section */}
        <section className="glass-strong rounded-[2.5rem] border border-white/60 p-6 md:p-8 bg-white/70 backdrop-blur-md">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg md:text-xl font-black text-slate-800 flex items-center gap-2">
              <Play className="w-5 h-5 text-indigo-500 animate-pulse" /> পড়াশোনা চালিয়ে যাও
            </h2>
            <Link
              to="/subjects"
              className="text-xs md:text-sm font-bold text-primary hover:underline flex items-center gap-1"
            >
              সব বিষয় দেখুন <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topSubjects.slice(0, 3).map((s) => (
              <Link
                key={s.slug}
                to="/subjects/$slug"
                params={{ slug: s.slug }}
                className={`${s.gradient} rounded-3xl p-5 text-white shadow-soft hover:shadow-glow hover:scale-[1.02] transition-all relative overflow-hidden`}
              >
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 rotate-45 pointer-events-none" />
                
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{s.emoji}</span>
                  <span className="text-[10px] font-bold bg-white/20 backdrop-blur-lg px-2.5 py-1 rounded-full">
                    {s.progress}% সম্পন্ন
                  </span>
                </div>
                <div className="font-bold text-lg">{s.name}</div>
                <div className="text-xs opacity-90 mb-3">
                  পাঠ {Math.floor((s.lessons * s.progress) / 100) + 1}
                </div>
                <div className="h-1.5 bg-white/25 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Lower Info Grid: Daily Plan & Live info */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* AI Plan Card */}
          <div className="lg:col-span-2 glass rounded-[2.5rem] border border-white/60 bg-white/70 backdrop-blur-md p-6 shadow-soft">
            <h2 className="text-lg md:text-xl font-black text-slate-800 flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-500 animate-spin" /> আজকের AI পড়ার পরিকল্পনা
            </h2>
            <ul className="space-y-2">
              {[
                { t: "গুণের অনুশীলন ৬×", time: "১০ মিনিট", subj: "গণিত", done: true },
                {
                  t: "পড়ো: দুষ্ট বিড়াল (অধ্যায় ৩)",
                  time: "১২ মিনিট",
                  subj: "ইংরেজি",
                  done: true,
                },
                { t: "দেখো: জলচক্র 🌧️", time: "৮ মিনিট", subj: "বিজ্ঞান", done: false },
                { t: "কুইজ: বিশ্বের রাজধানী", time: "৬ মিনিট", subj: "সাধারণ জ্ঞান", done: false },
                {
                  t: "সহায়িকা AI-এর সাথে ৫ মিনিট চ্যাট",
                  time: "৫ মিনিট",
                  subj: "সহায়ক",
                  done: false,
                },
              ].map((task, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-white/60 transition-colors"
                >
                  <span
                    className={cn(
                      "w-6 h-6 rounded-full grid place-items-center text-xs border shrink-0 transition-colors",
                      task.done ? "bg-emerald-500 border-emerald-500 text-white font-bold" : "border-slate-300"
                    )}
                  >
                    {task.done ? "✓" : ""}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div
                      className={cn(
                        "font-semibold text-xs md:text-sm text-slate-800",
                        task.done && "line-through text-slate-400"
                      )}
                    >
                      {task.t}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {task.subj} · {task.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right sidebar info */}
          <div className="space-y-4">
            
            {/* Badges card */}
            <div className="glass rounded-[2rem] border border-white/60 bg-white/70 backdrop-blur-md p-6 shadow-soft">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3.5">
                <Trophy className="w-5 h-5 text-amber-500 animate-bounce" /> সাম্প্রতিক অর্জিত ব্যাজ
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.badges.map((b) => (
                  <span
                    key={b}
                    className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-xs font-bold text-white shadow-soft"
                  >
                    🏅 {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Upcoming Live Classes Card */}
            <div className="glass rounded-[2rem] border border-white/60 bg-white/70 backdrop-blur-md p-6 shadow-soft">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-sky-500" /> আসন্ন লাইভ ক্লাস
              </h3>
              <div className="bg-gradient-to-r from-sky-400 to-indigo-500 rounded-2xl p-4 text-white shadow-soft relative overflow-hidden">
                <div className="text-[10px] font-bold opacity-80 uppercase tracking-wider">
                  {liveClasses.find((room) => room.classLevel === user.class)?.time ??
                    "আগামীকাল · ১০:০০ AM"}
                </div>
                <div className="font-black mt-1 text-sm md:text-base leading-snug">
                  {liveClasses.find((room) => room.classLevel === user.class)?.title ??
                    "লাইভ লার্নিং রুম"}
                </div>
                <div className="text-xs opacity-90 mt-1 font-semibold">
                  {liveClasses.find((room) => room.classLevel === user.class)?.teacher ??
                    "শিক্ষকের সঙ্গে"} · শ্রেণি {user.class}
                </div>
                
                <Link
                  to="/live-class"
                  className="mt-3.5 inline-flex px-4 py-2 rounded-xl bg-white text-indigo-600 text-xs font-bold shadow-soft hover:scale-[1.03] transition-transform"
                >
                  এখনই যোগ দাও
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* subjects overview grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-black text-slate-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" /> বিষয়ভিত্তিক অনুশীলন
            </h2>
            <Link to="/subjects" className="text-xs md:text-sm font-bold text-primary hover:underline">
              সব বিষয় দেখুন
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topSubjects.map((s) => (
              <Link
                key={s.slug}
                to="/subjects/$slug"
                params={{ slug: s.slug }}
                className="glass rounded-2xl p-4 md:p-5 bg-white/80 border-white/60 hover:shadow-glow hover:-translate-y-1 transition-all duration-350"
              >
                <div
                  className={`${s.gradient} w-11 h-11 rounded-xl grid place-items-center text-2xl mb-3 shadow-soft`}
                >
                  {s.emoji}
                </div>
                <div className="font-bold text-slate-855 text-sm md:text-base">{s.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.lessons} লেসন</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Daily Mission Streaks panel */}
        <section className="glass-strong rounded-[2.5rem] border border-white/60 bg-white/70 backdrop-blur-md p-6 md:p-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg md:text-xl font-black text-slate-800">আজকের লার্নিং মিশন</h2>
              <p className="text-xs md:text-sm text-slate-500">
                সহজ শিক্ষামূলক মিশন শেষ করো এবং XP অর্জন করো।
              </p>
            </div>
            <Link to="/quiz" className="text-xs md:text-sm font-bold text-primary hover:underline">
              কুইজ বোর্ড খুলুন
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-3">
            {activityBank
              .filter((item) => item.classLevel === user.class)
              .slice(0, 3)
              .map((item) =>
                item.external ? (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="glass rounded-2xl p-4 bg-white/90 border-slate-100 hover:shadow-soft hover:scale-[1.01] transition-all"
                  >
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <div className="font-bold text-sm text-slate-800">{item.title}</div>
                    <div className="text-xs text-slate-500 mt-1 leading-relaxed">{item.subtitle}</div>
                  </a>
                ) : (
                  <Link
                    key={item.id}
                    to={item.href as "/quiz" | "/live-class" | "/library" | "/bangladesh-map"}
                    className="glass rounded-2xl p-4 bg-white/90 border-slate-100 hover:shadow-soft hover:scale-[1.01] transition-all"
                  >
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <div className="font-bold text-sm text-slate-800">{item.title}</div>
                    <div className="text-xs text-slate-500 mt-1 leading-relaxed">{item.subtitle}</div>
                  </Link>
                ),
              )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function StatCard({
  icon,
  label,
  value,
  grad,
  glowColor,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  grad: string;
  glowColor: string;
}) {
  return (
    <div
      className="glass rounded-2xl p-4 flex items-center gap-3 bg-white/80 border-white/60 shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
      style={{ boxShadow: `0 8px 30px ${glowColor}` }}
    >
      <div
        className={`bg-gradient-to-br ${grad} w-10 h-10 rounded-xl grid place-items-center text-white shadow-soft shrink-0`}
      >
        {icon}
      </div>
      <div>
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 leading-none">{label}</div>
        <div className="font-black text-slate-800 text-base md:text-lg mt-1">{value}</div>
      </div>
    </div>
  );
}

function DashLink({
  to,
  label,
  icon: Icon,
  color,
}: {
  to: "/school" | "/smart-board" | "/competitions";
  label: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-white/70 bg-white/90 p-4 text-center shadow-soft hover:shadow-glow hover:scale-[1.02] transition-transform flex flex-col items-center justify-center gap-1.5"
    >
      <div className={cn("p-2 rounded-xl shrink-0", color)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-xs font-bold text-slate-700">{label}</div>
    </Link>
  );
}
