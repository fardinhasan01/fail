import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Search, School2, Sparkles, Users, Trophy } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { ensureEcosystemSeed, searchCatalog } from "@/lib/ecosystem";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Advanced Search · E-পাঠশালা" }] }),
  component: SearchPage,
});

function SearchPage() {
  ensureEcosystemSeed();
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchCatalog(query), [query]);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8">
        <section className="glass-strong rounded-[2rem] p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1.5 text-xs font-semibold text-brand-blue">
                <Search className="h-3.5 w-3.5" /> Advanced Search Engine
              </div>
              <h1 className="text-3xl font-bold md:text-5xl">Search schools, students, books, competitions and more</h1>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                Instant suggestions across the full ecosystem. Find exactly what you need with one query.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Metric label="Results" value={results.length.toString()} />
              <Metric label="Scope" value="Global" />
            </div>
          </div>

          <div className="mt-5 rounded-[2rem] border border-input bg-background px-4 py-4 shadow-soft">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search schools, students, books, competition titles, teachers, notes, projects..."
                className="w-full bg-transparent text-base outline-none"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-strong rounded-[2rem] p-6">
            <h2 className="text-2xl font-bold">Instant results</h2>
            <div className="mt-4 space-y-3">
              {results.map((item) => (
                <Link key={`${item.type}-${item.title}`} to={item.href as never} className="block rounded-3xl border border-border bg-background/80 p-4 transition-all hover:bg-muted/60">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-hero text-white">
                        {iconForType(item.type)}
                      </div>
                      <div>
                        <div className="font-semibold">{item.title}</div>
                        <div className="mt-1 text-xs text-muted-foreground">{item.subtitle}</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
                      {item.type}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            {results.length === 0 ? <div className="mt-4 rounded-3xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">No matches yet. Try school name, student name, book topic, or competition category.</div> : null}
          </div>

          <div className="space-y-4">
            <div className="glass rounded-[2rem] p-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Search suggestions</h2>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Dhaka Residential", "EP-2026", "Fahim Hasan", "Science Fair", "Class 8 book", "Debate"].map((item) => (
                  <button key={item} type="button" onClick={() => setQuery(item)} className="rounded-full bg-brand-orange/10 px-3 py-2 text-xs font-semibold text-brand-orange">
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-[2rem] p-6">
              <div className="flex items-center gap-2">
                <School2 className="h-5 w-5 text-brand-blue" />
                <h2 className="text-xl font-bold">Supported scopes</h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                <li>• Schools and profiles</li>
                <li>• Students and ID cards</li>
                <li>• Books and library shelves</li>
                <li>• Competitions and rankings</li>
                <li>• Teachers, notes and projects</li>
              </ul>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-semibold">
                <Badge label="Books" />
                <Badge label="Students" />
                <Badge label="Schools" />
                <Badge label="Competitions" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/80 p-4 text-center shadow-soft backdrop-blur">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-bold">{value}</div>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return <div className="rounded-2xl bg-brand-orange/10 px-3 py-2 text-center text-brand-orange">{label}</div>;
}

function iconForType(type: string) {
  if (type === "School") return <School2 className="h-5 w-5" />;
  if (type === "Student") return <Users className="h-5 w-5" />;
  if (type === "Competition") return <Trophy className="h-5 w-5" />;
  return <BookOpen className="h-5 w-5" />;
}
