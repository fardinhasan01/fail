import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  MapPinned,
  School2,
  Sparkles,
  Trophy,
} from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { ensureEcosystemSeed, getSchoolById, getStudentsBySchool } from "@/lib/ecosystem";

export const Route = createFileRoute("/schools/$schoolId")({
  head: ({ params }) => ({ meta: [{ title: `স্কুল প্রোফাইল · ${params.schoolId}` }] }),
  component: SchoolProfilePage,
});

function SchoolProfilePage() {
  ensureEcosystemSeed();
  const { schoolId } = Route.useParams();
  const school = getSchoolById(schoolId);
  const students = school ? getStudentsBySchool(school.id) : [];

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8">
        <Link
          to="/school"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> স্কুল তালিকায় ফিরুন
        </Link>

        {school ? (
          <>
            <section className="glass-strong rounded-[2rem] p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-[1.5rem] bg-gradient-hero text-3xl text-white shadow-soft">
                    {isImageData(school.logo) ? (
                      <img
                        src={school.logo}
                        alt={school.schoolName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      school.logo
                    )}
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
                      <BadgeCheck className="h-3.5 w-3.5" />{" "}
                      {school.verificationStatus === "Verified Institution"
                        ? "যাচাইকৃত প্রতিষ্ঠান"
                        : "অপেক্ষমাণ"}
                    </div>
                    <h1 className="mt-3 text-3xl font-bold md:text-5xl">{school.schoolName}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                      স্কুল কোড: {school.schoolCode} · সিরিয়াল: {school.schoolSerialNumber} · EIIN:{" "}
                      {school.eiinNumber}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <MiniStat label="শিক্ষার্থী" value={school.students.toLocaleString()} />
                  <MiniStat label="শিক্ষক" value={school.teachers.toString()} />
                  <MiniStat label="জেলা" value={school.district} />
                  <MiniStat label="বিভাগ" value={school.division} />
                </div>
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="glass rounded-[2rem] p-6">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">স্কুল ড্যাশবোর্ড</h2>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {[
                    "Students",
                    "Teachers",
                    "Notices",
                    "Events",
                    "Results",
                    "Attendance",
                    "Competitions",
                    "Analytics",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-border bg-background/80 p-4"
                    >
                      <div className="font-semibold">{item}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        স্কুল ড্যাশবোর্ড থেকে {item.toLowerCase()} পরিচালনা করুন।
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="glass rounded-[2rem] p-6">
                  <div className="flex items-center gap-2">
                    <MapPinned className="h-5 w-5 text-brand-blue" />
                    <h2 className="text-xl font-bold">স্কুলের বিবরণ</h2>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">প্রধান শিক্ষক:</span> {school.principal}
                    </p>
                    <p>
                      <span className="font-semibold">ফোন:</span> {school.phone}
                    </p>
                    <p>
                      <span className="font-semibold">ঠিকানা:</span> {school.address}
                    </p>
                    <p>
                      <span className="font-semibold">পরিচিতি:</span> {school.about}
                    </p>
                  </div>
                </div>
                <div className="glass rounded-[2rem] p-6">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-brand-orange" />
                    <h2 className="text-xl font-bold">র‍্যাংকিং ও অর্জন</h2>
                  </div>
                  <div className="mt-4 space-y-2">
                    {school.achievements.map((item) => (
                      <div key={item} className="rounded-2xl bg-brand-orange/10 px-3 py-2 text-sm">
                        {item}
                      </div>
                    ))}
                    {school.competitionRankings.map((item) => (
                      <div key={item} className="rounded-2xl bg-brand-blue/10 px-3 py-2 text-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="glass-strong rounded-[2rem] p-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">গ্যালারি ও স্কুল পরিচয়</h2>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {school.gallery.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-border bg-background/80 p-4"
                    >
                      <div className="text-2xl">🖼️</div>
                      <div className="mt-2 font-semibold">{item}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-strong rounded-[2rem] p-6">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-brand-green" />
                  <h2 className="text-xl font-bold">এই স্কুলের শিক্ষার্থী</h2>
                </div>
                <div className="mt-4 space-y-3">
                  {students.map((student) => (
                    <Link
                      key={student.id}
                      to="/students/$studentId"
                      params={{ studentId: student.studentId }}
                      className="block rounded-3xl border border-border bg-background/80 p-4 transition-all hover:bg-muted/60"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold">{student.fullName}</div>
                          <div className="text-xs text-muted-foreground">
                            শ্রেণি {student.classLevel} · শাখা {student.section} · রোল{" "}
                            {student.roll}
                          </div>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${student.status === "Valid Student" ? "bg-brand-green text-white" : "bg-muted text-muted-foreground"}`}
                        >
                          {student.status === "Valid Student"
                            ? "যাচাইকৃত শিক্ষার্থী"
                            : student.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                  {!students.length ? (
                    <div className="rounded-3xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                      এখানে এখনো কোনো শিক্ষার্থী নেই।
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="glass-strong rounded-[2rem] p-8 text-sm text-muted-foreground">
            স্কুল পাওয়া যায়নি।
          </div>
        )}
      </div>
    </AppShell>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/80 p-4 text-center shadow-soft backdrop-blur">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-bold">{value}</div>
    </div>
  );
}

function isImageData(value: string) {
  return /^data:image\//i.test(value) || /^https?:\/\//i.test(value);
}
