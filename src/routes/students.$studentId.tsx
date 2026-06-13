import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Download,
  QrCode,
  School2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import {
  createVerificationUrl,
  ensureEcosystemSeed,
  getStudentById,
  getSchoolById,
  listenSchools,
  listenStudents,
  pseudoQrSvgDataUrl,
} from "@/lib/ecosystem";

export const Route = createFileRoute("/students/$studentId")({
  head: ({ params }) => ({ meta: [{ title: `Student Verification · ${params.studentId}` }] }),
  component: StudentVerificationPage,
});

function StudentVerificationPage() {
  ensureEcosystemSeed();
  const { studentId } = Route.useParams();
  const [student, setStudent] = useState(() => getStudentById(studentId));
  const [school, setSchool] = useState(() => (student ? getSchoolById(student.schoolId) : null));
  const verificationUrl = createVerificationUrl(studentId);
  const [qr, setQr] = useState(() => pseudoQrSvgDataUrl(verificationUrl));

  useEffect(
    () =>
      listenStudents((items) =>
        setStudent(
          items.find((item) => item.studentId === studentId || item.id === studentId) ?? null,
        ),
      ),
    [studentId],
  );
  useEffect(() => {
    if (!student) {
      setSchool(null);
      return;
    }
    return listenSchools((schools) => {
      setSchool(
        schools.find(
          (item) => item.id === student.schoolId || item.schoolCode === student.schoolCode,
        ) ?? null,
      );
    });
  }, [student]);

  useEffect(() => {
    let active = true;
    void QRCode.toDataURL(verificationUrl, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 240,
    }).then((value) => {
      if (active) setQr(value);
    });
    return () => {
      active = false;
    };
  }, [verificationUrl]);

  const exportPdf = () => {
    if (!student) return;
    const win = window.open("", "_blank", "width=1200,height=900");
    if (!win) return;
    win.document.write(renderVerificationHtml(student, school, qr, verificationUrl));
    win.document.close();
    win.focus();
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8">
        <Link
          to="/students"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> নিবন্ধনে ফিরুন
        </Link>

        {student ? (
          <>
            <section className="glass-strong rounded-[2rem] p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
                    <ShieldCheck className="h-3.5 w-3.5" /> যাচাই পাতা
                  </div>
                  <h1 className="mt-3 text-3xl font-bold md:text-5xl">{student.fullName}</h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    শিক্ষার্থী আইডি: {student.studentId} ·{" "}
                    {student.status === "Valid Student" ? "যাচাইকৃত শিক্ষার্থী" : student.status}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <MiniStat label="শ্রেণি" value={student.classLevel.toString()} />
                  <MiniStat label="রোল" value={student.roll} />
                  <MiniStat label="শাখা" value={student.section} />
                  <MiniStat label="রক্ত" value={student.bloodGroup} />
                </div>
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
              <div className="rounded-[2.2rem] bg-[linear-gradient(135deg,#0f172a_0%,#0ea5e9_60%,#22c55e_100%)] p-6 text-white shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] opacity-80">
                      Smart ID Card
                    </div>
                    <h2 className="mt-2 text-2xl font-bold">{student.fullName}</h2>
                    <div className="mt-1 text-sm opacity-90">{student.schoolName}</div>
                  </div>
                  <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-white/15 text-4xl backdrop-blur">
                    {isImageData(student.photo) ? (
                      <img
                        src={student.photo}
                        alt={student.fullName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      student.photo
                    )}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-[1fr_auto] gap-4">
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="opacity-70">স্কুল কোড:</span> {student.schoolCode}
                    </p>
                    <p>
                      <span className="opacity-70">শ্রেণি:</span> {student.classLevel}
                    </p>
                    <p>
                      <span className="opacity-70">শাখা:</span> {student.section}
                    </p>
                    <p>
                      <span className="opacity-70">রোল:</span> {student.roll}
                    </p>
                    <p>
                      <span className="opacity-70">স্ট্যাটাস:</span>{" "}
                      {student.status === "Valid Student" ? "যাচাইকৃত শিক্ষার্থী" : student.status}
                    </p>
                  </div>
                  <img src={qr} alt="QR code" className="h-32 w-32 rounded-2xl bg-white p-2" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="glass rounded-[2rem] p-6">
                  <div className="flex items-center gap-2">
                    <School2 className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold">স্কুল যাচাই</h2>
                  </div>
                  <div className="mt-4 text-sm leading-6 text-muted-foreground">
                    {school ? (
                      <>
                        <p className="font-semibold text-foreground">{school.schoolName}</p>
                        <p>
                          {school.schoolCode} ·{" "}
                          {school.verificationStatus === "Verified Institution"
                            ? "যাচাইকৃত প্রতিষ্ঠান"
                            : "অপেক্ষমাণ"}
                        </p>
                        <p>{school.address}</p>
                      </>
                    ) : (
                      <p>স্কুল পাওয়া যায়নি।</p>
                    )}
                  </div>
                </div>

                <div className="glass rounded-[2rem] p-6">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-brand-orange" />
                    <h2 className="text-xl font-bold">অর্জন ও ইতিহাস</h2>
                  </div>
                  <div className="mt-4 space-y-2">
                    {student.achievements.map((item) => (
                      <div key={item} className="rounded-2xl bg-brand-orange/10 px-3 py-2 text-sm">
                        {item}
                      </div>
                    ))}
                    {student.competitionHistory.map((item) => (
                      <div key={item} className="rounded-2xl bg-brand-blue/10 px-3 py-2 text-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-[2rem] p-6">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-brand-green" />
                    <h2 className="text-xl font-bold">স্ট্যাটাস চেক</h2>
                  </div>
                  <div className="mt-4 flex items-center gap-2 rounded-3xl bg-brand-green/10 px-4 py-3 text-sm font-semibold">
                    <ShieldCheck className="h-4 w-4" />
                    {student.status === "Valid Student" ? "যাচাইকৃত শিক্ষার্থী" : student.status}
                  </div>
                  {student.status === "Suspended" ? (
                    <div className="mt-3 flex items-center gap-2 rounded-2xl bg-destructive/10 px-4 py-3 text-sm">
                      <ShieldAlert className="h-4 w-4" /> স্থগিত অ্যাকাউন্ট প্রশাসনিক পর্যালোচনা
                      চায়।
                    </div>
                  ) : null}
                </div>
              </div>
            </section>

            <section className="glass-strong rounded-[2rem] p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    QR verification
                  </div>
                  <h2 className="text-2xl font-bold">প্রোফাইল যাচাই পাতা</h2>
                  <p className="text-sm text-muted-foreground">
                    QR কোড সরাসরি এই যাচাই পাতায় খুলবে।
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={exportPdf}
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-2.5 text-sm font-semibold text-white shadow-soft"
                  >
                    <Download className="h-4 w-4" /> PDF ডাউনলোড
                  </button>
                  <a
                    href={verificationUrl}
                    className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted/70"
                  >
                    <QrCode className="h-4 w-4" /> লিংক
                  </a>
                </div>
              </div>
              <div className="mt-4 rounded-3xl border border-border bg-background/80 p-4 text-sm text-muted-foreground">
                যাচাই URL: <span className="font-semibold text-foreground">{verificationUrl}</span>
              </div>
            </section>
          </>
        ) : (
          <div className="glass-strong rounded-[2rem] p-8 text-sm text-muted-foreground">
            Student not found.
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

function renderVerificationHtml(
  student: NonNullable<ReturnType<typeof getStudentById>>,
  school: ReturnType<typeof getSchoolById> | null,
  qr: string,
  verificationUrl: string,
) {
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${student.fullName}</title>
      <style>
        @page { size: A4 portrait; margin: 0; }
        html, body { margin: 0; padding: 0; width: 100%; height: 100%; font-family: system-ui, sans-serif; }
        body { background: #e8f3ff; }
        .sheet { width: 100vw; min-height: 100vh; padding: 32px; box-sizing: border-box; }
        .card {
          min-height: calc(100vh - 64px);
          border-radius: 28px;
          overflow: hidden;
          color: white;
          background: linear-gradient(135deg, #0f172a 0%, #0ea5e9 60%, #22c55e 100%);
          box-shadow: 0 16px 40px rgba(0,0,0,.14);
          padding: 28px;
        }
        .row { display: flex; justify-content: space-between; gap: 16px; }
        .photo { width: 84px; height: 84px; display: grid; place-items: center; background: rgba(255,255,255,.15); border-radius: 22px; font-size: 40px; overflow: hidden; }
        .photo img { width: 100%; height: 100%; object-fit: cover; }
        img { width: 124px; height: 124px; border-radius: 18px; background: white; padding: 6px; }
        .badge { display: inline-flex; align-items: center; gap: 8px; border-radius: 999px; padding: 6px 12px; background: rgba(255,255,255,.14); font-size: 12px; }
        .panel { margin-top: 22px; border-radius: 24px; background: rgba(255,255,255,.12); padding: 20px; }
      </style>
    </head>
    <body>
      <div class="sheet">
        <div class="card">
          <div class="badge">Verified Student</div>
          <div class="row" style="margin-top:18px">
            <div>
              <div style="font-size:30px;font-weight:800">${student.fullName}</div>
              <div style="margin-top:6px;opacity:.9">${student.schoolName}</div>
              <div style="margin-top:4px;opacity:.8">Student ID: ${student.studentId}</div>
            </div>
            <div class="photo">${isImageData(student.photo) ? `<img src="${student.photo}" alt="${student.fullName}" />` : student.photo}</div>
          </div>
          <div class="row panel" style="align-items:center">
            <div style="font-size:15px;line-height:1.8">
              <div><span style="opacity:.75">School Code:</span> ${student.schoolCode}</div>
              <div><span style="opacity:.75">Class:</span> ${student.classLevel}</div>
              <div><span style="opacity:.75">Section:</span> ${student.section}</div>
              <div><span style="opacity:.75">Roll:</span> ${student.roll}</div>
              <div><span style="opacity:.75">Status:</span> ${student.status}</div>
              ${school ? `<div><span style="opacity:.75">Institution:</span> ${school.verificationStatus}</div>` : ""}
            </div>
            <img src="${qr}" alt="QR code" />
          </div>
          <div class="panel" style="font-size:13px;line-height:1.7">
            <div><strong>Guardian:</strong> ${student.guardianName}</div>
            <div><strong>Guardian Phone:</strong> ${student.guardianPhone}</div>
            <div><strong>Blood Group:</strong> ${student.bloodGroup}</div>
            <div><strong>Verification URL:</strong> ${verificationUrl}</div>
          </div>
        </div>
      </div>
    </body>
  </html>`;
}
