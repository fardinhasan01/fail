import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Download,
  IdCard,
  Link2,
  QrCode,
  School2,
  ShieldCheck,
  Sparkles,
  UserRoundPlus,
} from "lucide-react";
import QRCode from "qrcode";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import {
  createStudentId,
  createVerificationUrl,
  ensureEcosystemSeed,
  getSchools,
  getStudents,
  listenSchools,
  listenStudents,
  pseudoQrSvgDataUrl,
  saveStudent,
  type StudentRecord,
} from "@/lib/ecosystem";

export const Route = createFileRoute("/students")({
  head: () => ({ meta: [{ title: "Student Registration · E-পাঠশালা" }] }),
  component: Students,
});

function Students() {
  ensureEcosystemSeed();
  const [schools, setSchools] = useState(() => getSchools());
  const [students, setStudents] = useState<StudentRecord[]>(getStudents());
  const [schoolCode, setSchoolCode] = useState("EP-2026-001245");
  const [statusMessage, setStatusMessage] = useState("একটি যাচাইকৃত স্কুল বেছে নিন।");
  const [form, setForm] = useState({
    fullName: "",
    photo: "🧑‍🎓",
    classLevel: 8,
    section: "A",
    roll: "",
    bloodGroup: "B+",
    contact: "",
    guardianName: "",
    guardianRelation: "Father",
    guardianPhone: "",
  });

  useEffect(() => listenSchools(setSchools), []);
  useEffect(() => listenStudents(setStudents), []);

  const selectedSchool = useMemo(
    () =>
      schools.find(
        (school) => school.schoolCode === schoolCode.trim() || school.id === schoolCode.trim(),
      ) ?? null,
    [schools, schoolCode],
  );
  const schoolVerified = Boolean(selectedSchool?.verified);
  const newestStudent = students[0];
  const selectedSchoolName = selectedSchool ? normalizeSchoolName(selectedSchool.schoolName) : "";

  const setStudentPhotoFromFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const value = typeof reader.result === "string" ? reader.result : form.photo;
      setForm((current) => ({ ...current, photo: value }));
    };
    reader.readAsDataURL(file);
  };

  const registerStudent = () => {
    if (!selectedSchool || !schoolVerified) {
      setStatusMessage("শুধু যাচাইকৃত স্কুলই শিক্ষার্থী নিবন্ধন করতে পারে।");
      return;
    }
    if (
      !form.fullName.trim() ||
      !form.roll.trim() ||
      !form.contact.trim() ||
      !form.guardianName.trim()
    ) {
      setStatusMessage("শিক্ষার্থী ও অভিভাবকের প্রয়োজনীয় তথ্য পূরণ করুন।");
      return;
    }

    const studentId = createStudentId();
    const record: StudentRecord = {
      id: studentId,
      schoolId: selectedSchool.id,
      schoolCode: selectedSchool.schoolCode,
      schoolName: normalizeSchoolName(selectedSchool.schoolName),
      fullName: form.fullName.trim(),
      photo: form.photo.trim() || "🧑‍🎓",
      classLevel: form.classLevel,
      section: form.section.trim() || "A",
      roll: form.roll.trim(),
      studentId,
      bloodGroup: form.bloodGroup.trim() || "N/A",
      contact: form.contact.trim(),
      guardianName: form.guardianName.trim(),
      guardianRelation: form.guardianRelation.trim() || "Guardian",
      guardianPhone: form.guardianPhone.trim(),
      status: "Valid Student",
      achievements: [],
      competitionHistory: [],
      academicRecords: [{ term: "Registration", gpa: "N/A", remark: "New account created" }],
    };

    const saved = saveStudent(record);
    const next = [saved, ...students.filter((student) => student.id !== saved.id)];
    setStudents(next);
    setStatusMessage(
      `${normalizeSchoolName(selectedSchool.schoolName)}-এ শিক্ষার্থীটি যাচাইকৃতভাবে যুক্ত হয়েছে।`,
    );
    setForm({
      fullName: "",
      photo: "🧑‍🎓",
      classLevel: 8,
      section: "A",
      roll: "",
      bloodGroup: "B+",
      contact: "",
      guardianName: "",
      guardianRelation: "Father",
      guardianPhone: "",
    });
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8">
        <header className="glass-strong rounded-[2rem] p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1.5 text-xs font-semibold text-brand-blue">
                <ShieldCheck className="h-3.5 w-3.5" /> শিক্ষার্থী নিবন্ধন ও যাচাই
              </div>
              <h1 className="text-3xl font-bold md:text-5xl">
                স্কুল বেছে নিন, কোড যাচাই করুন, শিক্ষার্থী অ্যাকাউন্ট তৈরি করুন
              </h1>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                শিক্ষার্থীর রেকর্ড স্কুল, অভিভাবক এবং ডিজিটাল আইডির সঙ্গে যুক্ত থাকে। যাচাইকৃত স্কুল
                থেকেই নতুন অ্যাকাউন্ট তৈরি হয়।
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Metric label="শিক্ষার্থী" value={students.length.toString()} />
              <Metric label="যাচাইকৃত" value={schoolVerified ? "হ্যাঁ" : "না"} />
            </div>
          </div>
        </header>

        <section className="grid gap-5 xl:grid-cols-[1fr_0.95fr]">
          <div className="space-y-4">
            <div className="glass rounded-[2rem] p-5 md:p-6">
              <div className="flex items-center gap-2">
                <UserRoundPlus className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">নিবন্ধন ধাপ</h2>
              </div>
              <div className="mt-4 grid gap-2 md:grid-cols-6">
                {[
                  "স্কুল বাছাই",
                  "কোড যাচাই",
                  "শিক্ষার্থী তথ্য",
                  "অভিভাবক তথ্য",
                  "তৎক্ষণাৎ যাচাই",
                  "অ্যাকাউন্ট তৈরি",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="rounded-2xl border border-border bg-background/80 p-3 text-center text-xs font-semibold"
                  >
                    <div className="mx-auto mb-2 grid h-7 w-7 place-items-center rounded-full bg-gradient-hero text-white">
                      {index + 1}
                    </div>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-strong rounded-[2rem] p-5 md:p-6">
              <div className="flex items-center gap-2">
                <School2 className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">স্কুল যুক্ত করুন</h2>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <label className="space-y-1.5 text-sm font-medium md:col-span-2">
                  <span>স্কুল কোড</span>
                  <input
                    value={schoolCode}
                    onChange={(event) => setSchoolCode(event.target.value)}
                    placeholder="EP-2026-001245"
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
                  />
                </label>
                <Field
                  label="শিক্ষার্থীর নাম"
                  value={form.fullName}
                  onChange={(value) => setForm((current) => ({ ...current, fullName: value }))}
                  placeholder="নাম লিখুন"
                />
                <Field
                  label="ফটো/ইমোজি"
                  value={form.photo}
                  onChange={(value) => setForm((current) => ({ ...current, photo: value }))}
                  placeholder="🧑‍🎓"
                />
                <label className="space-y-1.5 text-sm font-medium md:col-span-2">
                  <span>ছবি আপলোড</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => setStudentPhotoFromFile(event.target.files?.[0] ?? null)}
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground"
                  />
                </label>
                <Field
                  label="শ্রেণি"
                  value={String(form.classLevel)}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, classLevel: Number(value) || 1 }))
                  }
                  placeholder="8"
                />
                <Field
                  label="শাখা"
                  value={form.section}
                  onChange={(value) => setForm((current) => ({ ...current, section: value }))}
                  placeholder="A"
                />
                <Field
                  label="রোল"
                  value={form.roll}
                  onChange={(value) => setForm((current) => ({ ...current, roll: value }))}
                  placeholder="14"
                />
                <Field
                  label="রক্তের গ্রুপ"
                  value={form.bloodGroup}
                  onChange={(value) => setForm((current) => ({ ...current, bloodGroup: value }))}
                  placeholder="B+"
                />
                <Field
                  label="যোগাযোগ"
                  value={form.contact}
                  onChange={(value) => setForm((current) => ({ ...current, contact: value }))}
                  placeholder="01711..."
                />
                <Field
                  label="অভিভাবকের নাম"
                  value={form.guardianName}
                  onChange={(value) => setForm((current) => ({ ...current, guardianName: value }))}
                  placeholder="অভিভাবকের নাম"
                />
                <Field
                  label="অভিভাবকের সম্পর্ক"
                  value={form.guardianRelation}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, guardianRelation: value }))
                  }
                  placeholder="Father"
                />
                <div className="md:col-span-2">
                  <Field
                    label="অভিভাবকের ফোন"
                    value={form.guardianPhone}
                    onChange={(value) =>
                      setForm((current) => ({ ...current, guardianPhone: value }))
                    }
                    placeholder="01911..."
                  />
                </div>
              </div>

              {selectedSchool ? (
                <div
                  className={`mt-4 rounded-3xl p-4 text-sm ${selectedSchool.verified ? "bg-brand-green/10 text-foreground" : "bg-amber-100 text-foreground"}`}
                >
                  <div className="font-semibold">{selectedSchoolName}</div>
                  <div className="mt-1">
                    {selectedSchool.schoolCode} ·{" "}
                    {selectedSchool.verificationStatus === "Verified Institution"
                      ? "যাচাইকৃত প্রতিষ্ঠান"
                      : "অপেক্ষমাণ"}
                  </div>
                </div>
              ) : (
                <div className="mt-4 rounded-3xl bg-destructive/10 p-4 text-sm">
                  স্কুল কোড পাওয়া যায়নি।
                </div>
              )}

              <button
                type="button"
                onClick={registerStudent}
                className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 text-sm font-semibold text-white shadow-soft"
              >
                <UserRoundPlus className="h-4 w-4" />
                শিক্ষার্থী অ্যাকাউন্ট তৈরি করুন
              </button>
              <p className="mt-3 text-sm text-muted-foreground">{statusMessage}</p>
            </div>

            <div className="glass rounded-[2rem] p-5 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">Registered students</h2>
                  <p className="text-sm text-muted-foreground">
                    সর্বশেষ অ্যাকাউন্টগুলো আগে দেখানো হয়।
                  </p>
                </div>
                <Sparkles className="h-5 w-5 text-brand-orange" />
              </div>
              <div className="mt-4 space-y-3">
                {students.map((student) => (
                  <Link
                    key={student.id}
                    to="/students/$studentId"
                    params={{ studentId: student.studentId }}
                    className="block rounded-3xl border border-border bg-background/80 p-4 transition-all hover:bg-muted/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">{student.fullName}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {normalizeSchoolName(student.schoolName)} · শ্রেণি {student.classLevel} ·
                          শাখা {student.section} · রোল {student.roll}
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
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <DigitalCard student={newestStudent ?? null} />

            <div className="glass-strong rounded-[2rem] p-6">
              <div className="flex items-center gap-2">
                <IdCard className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">নিবন্ধন নিয়ম</h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                <li>• প্রথমে স্কুল বেছে নিন।</li>
                <li>• স্কুল কোড ঠিকভাবে দিন।</li>
                <li>• অভিভাবকের তথ্য বাধ্যতামূলক।</li>
                <li>• যাচাইকৃত স্কুলই নতুন শিক্ষার্থী তৈরি করতে পারে।</li>
                <li>• QR কোড সরাসরি শিক্ষার্থী যাচাই পাতায় নিয়ে যাবে।</li>
              </ul>
              <Link
                to="/smart-board"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <Link2 className="h-4 w-4" /> শিক্ষার্থী ও স্কুল খুঁজুন
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function DigitalCard({ student }: { student: StudentRecord | null }) {
  const preview: StudentRecord = student ?? {
    studentId: "EP-STU-000000",
    fullName: "Student Name",
    schoolName: "Kachua Govt. Pilot High School",
    classLevel: 8,
    section: "A",
    roll: "14",
    photo: "🧑‍🎓",
    status: "Valid Student" as const,
    achievements: ["Achievement 1", "Achievement 2"],
    bloodGroup: "B+",
    schoolCode: "EP-2026-001245",
    guardianName: "Guardian Name",
    guardianPhone: "01711-000000",
    guardianRelation: "Father",
    contact: "01711-000000",
    competitionHistory: [],
    academicRecords: [],
    id: "preview",
    schoolId: "school-kachua",
  };
  const verificationUrl = createVerificationUrl(preview.studentId);
  const [qr, setQr] = useState<string>(pseudoQrSvgDataUrl(verificationUrl));

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
    const win = window.open("", "_blank", "width=1200,height=900");
    if (!win) return;
    win.document.write(renderIdCardHtml(preview, qr, verificationUrl));
    win.document.close();
    win.focus();
  };

  return (
    <div className="glass-strong rounded-[2rem] p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Digital Student ID
          </div>
          <h2 className="text-2xl font-bold">{preview.fullName}</h2>
        </div>
        <QrCode className="h-6 w-6 text-primary" />
      </div>

      <div className="mt-4 rounded-[2rem] bg-[linear-gradient(135deg,#0f172a_0%,#0ea5e9_60%,#22c55e_100%)] p-5 text-white shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] opacity-80">Front Side</div>
            <div className="mt-2 text-2xl font-bold">{normalizeSchoolName(preview.schoolName)}</div>
            <div className="mt-1 text-sm opacity-90">School Code: {preview.schoolCode}</div>
          </div>
          <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-white/15 text-4xl backdrop-blur">
            {isImageData(preview.photo) ? (
              <img
                src={preview.photo}
                alt={preview.fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              preview.photo
            )}
          </div>
        </div>
        <div className="mt-5 grid grid-cols-[1fr_auto] gap-4">
          <div className="space-y-2 text-sm">
            <p>
              <span className="opacity-70">Name:</span> {preview.fullName}
            </p>
            <p>
              <span className="opacity-70">Class:</span> {preview.classLevel}
            </p>
            <p>
              <span className="opacity-70">Section:</span> {preview.section}
            </p>
            <p>
              <span className="opacity-70">Roll:</span> {preview.roll}
            </p>
            <p>
              <span className="opacity-70">Status:</span>{" "}
              {preview.status === "Valid Student" ? "যাচাইকৃত শিক্ষার্থী" : preview.status}
            </p>
          </div>
          <img src={qr} alt="QR code" className="h-32 w-32 rounded-2xl bg-white p-2" />
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border border-border bg-background/80 p-4">
          <div className="text-sm font-semibold">Back side</div>
          <div className="mt-2 text-xs leading-6 text-muted-foreground">
            অভিভাবক: {preview.guardianName}
            <br />
            যোগাযোগ: {preview.contact}
            <br />
            রক্তের গ্রুপ: {preview.bloodGroup}
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-background/80 p-4">
          <div className="text-sm font-semibold">QR যাচাই</div>
          <div className="mt-2 text-xs leading-6 text-muted-foreground">
            QR কোড বা সরাসরি লিংক থেকে যাচাই পাতায় যান।
            <br />
            <a href={verificationUrl} className="font-semibold text-primary">
              {verificationUrl}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={exportPdf}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-2.5 text-sm font-semibold text-white shadow-soft"
        >
          <Download className="h-4 w-4" /> PDF ডাউনলোড
        </button>
        <Link
          to="/smart-board"
          className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted/70"
        >
          <BadgeCheck className="h-4 w-4" /> শিক্ষার্থী খুঁজুন
        </Link>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="space-y-1.5 text-sm font-medium">
      <span>{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
      />
    </label>
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

function isImageData(value: string) {
  return /^data:image\//i.test(value) || /^https?:\/\//i.test(value);
}

function normalizeSchoolName(name: string) {
  return /dhaka\s+residential/i.test(name) ? "Kachua Govt. Pilot High School" : name;
}

function renderIdCardHtml(student: StudentRecord, qr: string, verificationUrl: string) {
  const schoolName = normalizeSchoolName(student.schoolName);
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${student.fullName}</title>
      <style>
        @page { size: A4 portrait; margin: 0; }
        html, body { margin: 0; padding: 0; width: 100%; height: 100%; font-family: system-ui, sans-serif; }
        body { background: #e8f3ff; }
        .sheet { width: 100vw; min-height: 100vh; padding: 32px; box-sizing: border-box; display: grid; gap: 20px; }
        .card { border-radius: 28px; overflow: hidden; box-shadow: 0 16px 40px rgba(0,0,0,.14); }
        .front {
          color: white;
          background: linear-gradient(135deg, #0f172a 0%, #0ea5e9 60%, #22c55e 100%);
          padding: 28px;
        }
        .back {
          background: white;
          padding: 24px;
        }
        .row { display: flex; justify-content: space-between; gap: 16px; }
        .photo { width: 84px; height: 84px; display: grid; place-items: center; background: rgba(255,255,255,.15); border-radius: 22px; font-size: 40px; }
        .photo img { width: 100%; height: 100%; object-fit: cover; padding: 0; border-radius: 22px; }
        img { width: 124px; height: 124px; border-radius: 18px; background: white; padding: 6px; }
        .label { opacity: .75; }
      </style>
    </head>
    <body>
      <div class="sheet">
        <div class="card front">
          <div class="row">
            <div>
              <div style="font-size:12px;letter-spacing:.25em;text-transform:uppercase;opacity:.8">Front Side</div>
              <div style="font-size:30px;font-weight:800;margin-top:8px">${schoolName}</div>
              <div style="margin-top:4px;font-size:14px">School Code: ${student.schoolCode}</div>
            </div>
            <div class="photo">${isImageData(student.photo) ? `<img src="${student.photo}" alt="${student.fullName}" />` : student.photo}</div>
          </div>
          <div class="row" style="margin-top:28px;align-items:center">
            <div style="font-size:15px;line-height:1.8">
              <div><span class="label">Name:</span> ${student.fullName}</div>
              <div><span class="label">Class:</span> ${student.classLevel}</div>
              <div><span class="label">Section:</span> ${student.section}</div>
              <div><span class="label">Roll:</span> ${student.roll}</div>
              <div><span class="label">Status:</span> ${student.status}</div>
            </div>
            <img src="${qr}" alt="QR code" />
          </div>
        </div>
        <div class="card back">
          <div style="font-size:20px;font-weight:800">Back Side</div>
          <div style="margin-top:12px;font-size:14px;line-height:1.8">
            <div><span class="label">Student ID:</span> ${student.studentId}</div>
            <div><span class="label">Guardian:</span> ${student.guardianName}</div>
            <div><span class="label">Guardian Phone:</span> ${student.guardianPhone}</div>
            <div><span class="label">Blood Group:</span> ${student.bloodGroup}</div>
            <div><span class="label">Verification URL:</span> ${verificationUrl}</div>
          </div>
        </div>
      </div>
    </body>
  </html>`;
}
