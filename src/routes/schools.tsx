import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  FolderPlus,
  Globe,
  LayoutDashboard,
  LibraryBig,
  School2,
  ShieldCheck,
  Sparkles,
  Search,
  Trophy,
  UserRoundPlus,
  Users,
  WandSparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import {
  getCompetitions,
  createSchoolCode,
  createSchoolSerialNumber,
  ensureEcosystemSeed,
  getSchools,
  getSocialPosts,
  getStudents,
  libraryItems,
  listenSchools,
  saveSchool,
  type SchoolRecord,
} from "@/lib/ecosystem";

export const Route = createFileRoute("/schools")({
  head: () => ({ meta: [{ title: "স্কুল · E-পাঠশালা" }] }),
  component: Schools,
});

export function Schools() {
  ensureEcosystemSeed();
  const [schools, setSchools] = useState<SchoolRecord[]>(getSchools());
  const students = getStudents();
  const competitions = getCompetitions();
  const posts = getSocialPosts();
  const [form, setForm] = useState(() => ({
    schoolName: "",
    eiinNumber: "",
    address: "",
    principal: "",
    phone: "",
    district: "Dhaka",
    division: "Dhaka",
    logo: "🏫",
    about: "",
  }));
  const [selectedSchoolCode, setSelectedSchoolCode] = useState(schools[0]?.schoolCode ?? "");

  useEffect(() => listenSchools(setSchools), []);

  const selectedSchool = useMemo(
    () =>
      schools.find(
        (school) => school.schoolCode === selectedSchoolCode || school.id === selectedSchoolCode,
      ) ?? schools[0],
    [schools, selectedSchoolCode],
  );

  const verifiedCount = schools.filter((school) => school.verified).length;

  const setSchoolLogoFromFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const value = typeof reader.result === "string" ? reader.result : form.logo;
      setForm((current) => ({ ...current, logo: value }));
    };
    reader.readAsDataURL(file);
  };

  const handleRegister = () => {
    if (!form.schoolName.trim() || !form.eiinNumber.trim()) return;
    const schoolCode = createSchoolCode();
    const school: SchoolRecord = {
      id: `school-${schoolCode.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      schoolCode,
      schoolSerialNumber: createSchoolSerialNumber(),
      verified: true,
      verificationStatus: "Verified Institution",
      schoolName: form.schoolName.trim(),
      eiinNumber: form.eiinNumber.trim(),
      logo: form.logo.trim() || "🏫",
      address: form.address.trim() || "Bangladesh",
      principal: form.principal.trim() || "Principal",
      phone: form.phone.trim() || "N/A",
      district: form.district.trim() || "Dhaka",
      division: form.division.trim() || "Dhaka",
      students: 0,
      teachers: 0,
      achievements: [],
      competitionRankings: [],
      gallery: [],
      about: form.about.trim() || "New school account registered in E-পাঠশালা.",
    };
    const next = [saveSchool(school), ...schools.filter((item) => item.id !== school.id)];
    setSchools(next);
    setSelectedSchoolCode(school.schoolCode);
    setForm({
      schoolName: "",
      eiinNumber: "",
      address: "",
      principal: "",
      phone: "",
      district: "Dhaka",
      division: "Dhaka",
      logo: "🏫",
      about: "",
    });
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8">
        <header className="glass-strong rounded-[2rem] p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1.5 text-xs font-semibold text-brand-blue">
                <ShieldCheck className="h-3.5 w-3.5" /> স্কুল অ্যাকাউন্ট সিস্টেম
              </div>
              <h1 className="text-3xl font-bold md:text-5xl">
                স্কুল নিবন্ধন, প্রোফাইল আর ইকোসিস্টেম এক পাতায়
              </h1>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                প্রতিটি স্কুল এখন সরাসরি যাচাইকৃতভাবে যুক্ত হয়, আর নিচে ছাত্র, প্রতিযোগিতা,
                লাইব্রেরি আর জাতীয় শিক্ষার পুরো চিত্র একসঙ্গে দেখা যায়।
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Metric label="স্কুল" value={schools.length.toString()} />
              <Metric label="যাচাইকৃত" value={verifiedCount.toString()} />
              <Metric label="ছাত্র" value={students.length.toString()} />
              <Metric label="প্রতিযোগিতা" value={competitions.length.toString()} />
            </div>
          </div>
        </header>

        <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            <div className="glass rounded-[2rem] p-5 md:p-6">
              <div className="flex items-center gap-2">
                <FolderPlus className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">স্কুল নিবন্ধন করুন</h2>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <Field
                  label="স্কুলের নাম"
                  value={form.schoolName}
                  onChange={(value) => setForm((current) => ({ ...current, schoolName: value }))}
                  placeholder="Dhaka Residential Model College"
                />
                <Field
                  label="EIIN নম্বর"
                  value={form.eiinNumber}
                  onChange={(value) => setForm((current) => ({ ...current, eiinNumber: value }))}
                  placeholder="109876"
                />
                <Field
                  label="প্রধান শিক্ষক"
                  value={form.principal}
                  onChange={(value) => setForm((current) => ({ ...current, principal: value }))}
                  placeholder="Principal name"
                />
                <Field
                  label="ফোন"
                  value={form.phone}
                  onChange={(value) => setForm((current) => ({ ...current, phone: value }))}
                  placeholder="+880..."
                />
                <Field
                  label="জেলা"
                  value={form.district}
                  onChange={(value) => setForm((current) => ({ ...current, district: value }))}
                  placeholder="Dhaka"
                />
                <Field
                  label="বিভাগ"
                  value={form.division}
                  onChange={(value) => setForm((current) => ({ ...current, division: value }))}
                  placeholder="Dhaka"
                />
                <label className="space-y-1.5 text-sm font-medium">
                  <span>লোগো আপলোড</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => setSchoolLogoFromFile(event.target.files?.[0] ?? null)}
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground"
                  />
                </label>
                <div className="md:col-span-2">
                  <Field
                    label="ঠিকানা"
                    value={form.address}
                    onChange={(value) => setForm((current) => ({ ...current, address: value }))}
                    placeholder="Campus address"
                  />
                </div>
                <div className="md:col-span-2">
                  <Field
                    label="স্কুল পরিচিতি"
                    value={form.about}
                    onChange={(value) => setForm((current) => ({ ...current, about: value }))}
                    placeholder="Short school profile"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleRegister}
                className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 text-sm font-semibold text-white shadow-soft"
              >
                <UserRoundPlus className="h-4 w-4" />
                স্কুল অ্যাকাউন্ট তৈরি করুন
              </button>
            </div>

            <div className="glass rounded-[2rem] p-5 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">যাচাইকৃত স্কুল</h2>
                  <p className="text-sm text-muted-foreground">
                    নতুন স্কুল যোগ হলেই সেটি যাচাইকৃত হিসেবে লাইভ হয়।
                  </p>
                </div>
                <BadgeCheck className="h-5 w-5 text-brand-green" />
              </div>
              <div className="mt-4 space-y-3">
                {schools.map((school) => (
                  <button
                    key={school.id}
                    type="button"
                    onClick={() => setSelectedSchoolCode(school.schoolCode)}
                    className={`w-full rounded-3xl border p-4 text-left transition-all ${
                      selectedSchool?.id === school.id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background/80 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero text-2xl text-white shadow-soft">
                        {school.logo}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="truncate font-semibold">{school.schoolName}</div>
                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${school.verified ? "bg-brand-green text-white" : "bg-muted text-muted-foreground"}`}
                          >
                            {school.verificationStatus === "Verified Institution"
                              ? "যাচাইকৃত"
                              : "অপেক্ষমাণ"}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {school.schoolCode} · EIIN {school.eiinNumber} · শিক্ষার্থী{" "}
                          {school.students.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {selectedSchool ? (
              <SchoolProfileCard school={selectedSchool} />
            ) : (
              <div className="glass-strong rounded-[2rem] p-6 text-sm text-muted-foreground">
                No school found.
              </div>
            )}

            <div className="glass-strong rounded-[2rem] p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold">School dashboard access</h3>
                  <p className="text-sm text-muted-foreground">
                    Students, teachers, notices, events, results and analytics.
                  </p>
                </div>
                <LayoutDashboard className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {["Students", "Teachers", "Notices", "Events", "Results", "Attendance"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-border bg-background/80 p-4"
                    >
                      <div className="font-semibold">{item}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        স্কুল ড্যাশবোর্ড থেকে {item.toLowerCase()} পরিচালনা করুন।
                      </div>
                    </div>
                  ),
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/students"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-blue px-4 py-2.5 text-sm font-semibold text-white shadow-soft"
                >
                  <School2 className="h-4 w-4" /> Register students
                </Link>
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted/70"
                >
                  <BookOpen className="h-4 w-4" /> Search profiles
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-strong rounded-[2rem] p-6 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Ecosystem overview
                </div>
                <h2 className="text-2xl font-bold">জাতীয় শিক্ষা ইকোসিস্টেম</h2>
              </div>
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <MiniCard
                title="Verified school flow"
                description="স্কুল কোড, সিরিয়াল, প্রোফাইল এবং লাইভ যাচাইকরণ।"
                icon={ShieldCheck}
                href="/school"
              />
              <MiniCard
                title="Digital student IDs"
                description="QR verification, school tags আর PDF-ready ID card।"
                icon={WandSparkles}
                href="/students"
              />
              <MiniCard
                title="Competition arena"
                description="Quiz, debate, olympiad আর team battle একসাথে।"
                icon={Trophy}
                href="/competitions"
              />
              <MiniCard
                title="Library + search"
                description="Bookshelf, notes, AR model আর smart search।"
                icon={LibraryBig}
                href="/library"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass rounded-[2rem] p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-brand-blue" />
                <h3 className="text-xl font-bold">সাম্প্রতিক activity</h3>
              </div>
              <div className="mt-4 space-y-3">
                {posts.slice(0, 3).map((post) => (
                  <div key={post.id} className="rounded-2xl bg-background/80 p-4">
                    <div className="text-sm font-semibold">{post.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {post.author} · {post.schoolName}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-[2rem] p-6">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-brand-orange" />
                <h3 className="text-xl font-bold">লাইব্রেরি ঝলক</h3>
              </div>
              <div className="mt-4 space-y-3">
                {libraryItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="rounded-2xl border border-border bg-white/80 p-4">
                    <div className="text-sm font-semibold">{item.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.category} · {item.level}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/library"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                লাইব্রেরি খুলুন <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function SchoolProfileCard({ school }: { school: SchoolRecord }) {
  return (
    <div className="glass-strong rounded-[2rem] p-6 md:p-8">
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
              <CheckCircle2 className="h-3.5 w-3.5" />{" "}
              {school.verificationStatus === "Verified Institution"
                ? "যাচাইকৃত প্রতিষ্ঠান"
                : "অপেক্ষমাণ"}
            </div>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">{school.schoolName}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              স্কুল কোড: {school.schoolCode} · সিরিয়াল: {school.schoolSerialNumber}
            </p>
          </div>
        </div>
        <Link
          to="/schools/$schoolId"
          params={{ schoolId: school.id }}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-2.5 text-sm font-semibold text-white shadow-soft"
        >
          সম্পূর্ণ প্রোফাইল
        </Link>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <Info label="শিক্ষার্থী" value={school.students.toLocaleString()} />
        <Info label="শিক্ষক" value={school.teachers.toString()} />
        <Info label="EIIN" value={school.eiinNumber} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl bg-background/80 p-5">
          <h3 className="font-bold">স্কুল পরিচিতি</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{school.about}</p>
          <div className="mt-4 text-sm">
            <span className="font-semibold">প্রধান শিক্ষক:</span> {school.principal}
          </div>
          <div className="text-sm">
            <span className="font-semibold">ঠিকানা:</span> {school.address}
          </div>
          <div className="text-sm">
            <span className="font-semibold">জেলা/বিভাগ:</span> {school.district}, {school.division}
          </div>
        </div>

        <div className="rounded-3xl bg-background/80 p-5">
          <h3 className="font-bold">অর্জন</h3>
          <div className="mt-3 space-y-2">
            {school.achievements.map((item) => (
              <div key={item} className="rounded-2xl bg-brand-orange/10 px-3 py-2 text-sm">
                {item}
              </div>
            ))}
          </div>
          <h3 className="mt-5 font-bold">র‍্যাংকিং</h3>
          <div className="mt-3 space-y-2">
            {school.competitionRankings.map((item) => (
              <div key={item} className="rounded-2xl bg-brand-blue/10 px-3 py-2 text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-border bg-background/80 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-bold">{value}</div>
    </div>
  );
}

function MiniCard({
  title,
  description,
  icon: Icon,
  href,
}: {
  title: string;
  description: string;
  icon: typeof ShieldCheck;
  href: string;
}) {
  return (
    <Link
      to={href as never}
      className="rounded-[1.6rem] border border-white/60 bg-white/80 p-4 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-hero text-white">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="font-semibold">{title}</div>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
}

function isImageData(value: string) {
  return /^data:image\//i.test(value) || /^https?:\/\//i.test(value);
}
