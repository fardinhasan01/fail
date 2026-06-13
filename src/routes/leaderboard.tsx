import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Crown, Medal, School2, Sparkles, Star, Trophy, Users } from "lucide-react";
import { useMemo } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { ensureEcosystemSeed, getSchools, getStudents } from "@/lib/ecosystem";
import { useUser } from "@/lib/user-store";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({ meta: [{ title: "জাতীয় লিডারবোর্ড · E-পাঠশালা" }] }),
  component: Leaderboard,
});

function Leaderboard() {
  ensureEcosystemSeed();
  const user = useUser();
  const schools = getSchools();
  const students = getStudents();

  const schoolBoard = useMemo(
    () =>
      [...schools]
        .map((school) => ({
          name: school.schoolName,
          subtitle: `${school.district} · ${school.verificationStatus}`,
          score: school.students * 2 + school.teachers * 8 + school.achievements.length * 120 + school.competitionRankings.length * 90,
          school,
        }))
        .sort((a, b) => b.score - a.score),
    [schools],
  );

  const studentBoard = useMemo(
    () =>
      [...students]
        .map((student) => ({
          name: student.fullName,
          subtitle: `${student.schoolName} · Class ${student.classLevel}`,
          score: student.achievements.length * 120 + student.competitionHistory.length * 95 + Number(student.roll || 0),
          student,
        }))
        .sort((a, b) => b.score - a.score),
    [students],
  );

  const topMetrics = [
    { label: "Top Schools", value: schoolBoard.length.toString() },
    { label: "Top Students", value: studentBoard.length.toString() },
    { label: "Badges", value: String(user.badges.length) },
    { label: "XP", value: user.xp.toLocaleString() },
  ];

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8">
        <header className="glass-strong rounded-[2rem] p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-3 py-1.5 text-xs font-semibold text-brand-orange">
                <Crown className="h-3.5 w-3.5" /> National Education Leaderboard
              </div>
              <h1 className="text-3xl font-bold md:text-5xl">Rank by student, school, district and innovation</h1>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                Trophies, badges and scoreboards now reflect the whole ecosystem, not just a single classroom.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {topMetrics.map((item) => (
                <Metric key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[1fr_0.95fr]">
          <div className="glass-strong rounded-[2rem] p-6">
            <div className="flex items-center gap-2">
              <School2 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Top Schools</h2>
            </div>
            <div className="mt-4 space-y-2">
              {schoolBoard.map((row, index) => (
                <BoardRow
                  key={row.name}
                  rank={index + 1}
                  name={row.name}
                  subtitle={row.subtitle}
                  score={row.score}
                  accent={index === 0 ? "bg-brand-yellow" : index === 1 ? "bg-brand-orange/40" : index === 2 ? "bg-brand-blue/25" : "bg-muted"}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass rounded-[2rem] p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-brand-blue" />
                <h2 className="text-xl font-bold">Top Students</h2>
              </div>
              <div className="mt-4 space-y-2">
                {studentBoard.slice(0, 5).map((row, index) => (
                  <BoardRow
                    key={row.name}
                    rank={index + 1}
                    name={row.name}
                    subtitle={row.subtitle}
                    score={row.score}
                    accent={index === 0 ? "bg-brand-green" : index === 1 ? "bg-brand-orange/40" : "bg-muted"}
                  />
                ))}
              </div>
            </div>

            <div className="glass rounded-[2rem] p-6">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-brand-orange" />
                <h2 className="text-xl font-bold">Badge wall</h2>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {user.badges.map((badge) => (
                  <span key={badge} className="rounded-full bg-gradient-sunny px-3 py-1.5 text-sm font-medium text-white shadow-soft">
                    🏅 {badge}
                  </span>
                ))}
              </div>
              <Link to="/students" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Add students to leaderboard <Sparkles className="h-4 w-4" />
              </Link>
            </div>

            <div className="glass rounded-[2rem] p-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-brand-green" />
                <h2 className="text-xl font-bold">Ranking notes</h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                <li>• Schools rank by students, teachers, achievements and competition performance.</li>
                <li>• Students rank by achievements and competition history.</li>
                <li>• District and division views can be extended in the same data layer.</li>
              </ul>
              <Link to="/competitions" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                View competition rankings <Star className="h-4 w-4" />
              </Link>
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

function BoardRow({
  rank,
  name,
  subtitle,
  score,
  accent,
}: {
  rank: number;
  name: string;
  subtitle: string;
  score: number;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/80 p-3">
      <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${accent}`}>{rank}</div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold">{name}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
      <div className="flex items-center gap-1 font-bold">
        <Medal className="h-4 w-4" /> {score}
      </div>
    </div>
  );
}
