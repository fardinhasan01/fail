import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Expand, ExternalLink, Gamepad2, RefreshCw, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { cn } from "@/lib/utils";

const GAMES = [
  {
    id: "runbd",
    name: "Bangla Run (RunBD)",
    url: "https://runbd.netlify.app",
    description: "দৌড়াও এবং বাংলা শেখো! একটি মজার ও শিক্ষামূলক রানার গেম।",
    icon: Gamepad2,
    gradient: "from-pink-500 via-rose-500 to-red-500",
  },
  {
    id: "alphabet-adventure",
    name: "Alphabet Adventure Land",
    url: "https://alphabet-adventure-land--tahsinnurtonoy2.replit.app",
    description: "ইংরেজি বর্ণমালার রোমাঞ্চকর জগৎ! খেলো আর শেখো অক্ষরের জাদু।",
    icon: Sparkles,
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
  },
  {
    id: "bangla-kids-learn",
    name: "Bangla Kids Learn",
    url: "https://bangla-kids-learn--abulbasar8290.replit.app",
    description: "ছোট সোনামণিদের জন্য সহজ ও আকর্ষণীয় উপায়ে বাংলা বর্ণমালা ও শব্দ শেখা।",
    icon: BookOpen,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
];

export const Route = createFileRoute("/special-game")({
  head: () => ({ meta: [{ title: "Special Games · E-পাঠশালা" }] }),
  component: SpecialGamePage,
});

function SpecialGamePage() {
  const [selectedGame, setSelectedGame] = useState(GAMES[0]);
  const [refreshKey, setRefreshKey] = useState(0);
  const frameWrapRef = useRef<HTMLDivElement | null>(null);

  async function enterFullscreen() {
    if (!frameWrapRef.current?.requestFullscreen) return;
    await frameWrapRef.current.requestFullscreen().catch(() => {});
  }

  function handleRefresh() {
    setRefreshKey((prev) => prev + 1);
  }

  const ActiveIcon = selectedGame.icon;

  return (
    <AppShell>
      <div className="px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-6">
        {/* Header section */}
        <header className="glass-strong rounded-[2rem] p-6 md:p-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
              <Gamepad2 className="h-3.5 w-3.5 text-brand-orange" /> special games
            </div>
            <h1 className="text-3xl md:text-5xl font-bold">মজার স্পেশাল গেমস</h1>
            <p className="max-w-2xl text-sm md:text-base text-muted-foreground">
              খেলে খেলে শেখার এক দারুণ আনন্দ! নিচের গেমগুলো সরাসরি ই-পাঠশালাতেই খেলো।
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70 cursor-pointer transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              রিলোড গেম
            </button>
            <button
              type="button"
              onClick={() => void enterFullscreen()}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 font-semibold text-white shadow-soft cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Expand className="h-4 w-4" />
              ফুলস্ক্রিন
            </button>
            <a
              href={selectedGame.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              নতুন ট্যাবে খেলো
            </a>
          </div>
        </header>

        {/* Game selection selector */}
        <div className="grid gap-4 sm:grid-cols-3">
          {GAMES.map((game) => {
            const GameIcon = game.icon;
            const isSelected = game.id === selectedGame.id;
            return (
              <button
                key={game.id}
                type="button"
                onClick={() => {
                  setSelectedGame(game);
                  setRefreshKey(0); // Reset reload key on switch
                }}
                className={cn(
                  "relative overflow-hidden text-left p-5 rounded-[2rem] border transition-all duration-300 shadow-soft cursor-pointer flex flex-col justify-between min-h-[140px]",
                  isSelected
                    ? "bg-white border-primary shadow-glow ring-2 ring-primary/20 scale-[1.02]"
                    : "bg-white/70 border-border hover:bg-white hover:border-muted-foreground/30 hover:scale-[1.01]"
                )}
              >
                {/* Background accent glow */}
                <div
                  className={cn(
                    "absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl opacity-10 bg-gradient-to-br transition-all duration-300",
                    game.gradient
                  )}
                />

                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base md:text-lg tracking-tight">
                      {game.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {game.description}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "p-3 rounded-2xl bg-gradient-to-br text-white shrink-0",
                      game.gradient
                    )}
                  >
                    <GameIcon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full animate-pulse",
                      isSelected ? "bg-emerald-500" : "bg-muted-foreground/30"
                    )}
                  />
                  <span className={isSelected ? "text-primary font-bold" : "text-muted-foreground font-normal"}>
                    {isSelected ? "বর্তমানে চলছে" : "খেলতে ক্লিক করো"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Game iframe player */}
        <section
          ref={frameWrapRef}
          className="relative overflow-hidden rounded-[2rem] border border-border bg-black shadow-soft transition-all duration-300"
          style={{ minHeight: "calc(100vh - 220px)" }}
        >
          {/* Top border decor */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-hero z-10" />
          
          <iframe
            key={refreshKey}
            src={selectedGame.url}
            title={selectedGame.name}
            className="block h-[calc(100vh-220px)] w-full bg-black"
            allow="fullscreen; autoplay; clipboard-read; clipboard-write"
            allowFullScreen
            referrerPolicy="no-referrer"
          />
        </section>
      </div>
    </AppShell>
  );
}
