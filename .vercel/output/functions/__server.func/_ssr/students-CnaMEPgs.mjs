import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { Q as QRCode } from "../_libs/qrcode.mjs";
import { e as ensureEcosystemSeed, g as getSchools, a as getStudents, l as listenSchools, b as listenStudents, A as AppShell, c as saveStudent, d as createVerificationUrl, p as pseudoQrSvgDataUrl, f as createStudentId } from "./router-9Ny0xRmp.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__database.mjs";
import "../_libs/firebase__functions.mjs";
import { c as ShieldCheck, U as UserRoundPlus, d as University, S as Sparkles, I as IdCard, w as Link2, Q as QrCode, x as Download, B as BadgeCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/dijkstrajs.mjs";
import "fs";
import "../_libs/pngjs.mjs";
import "assert";
import "zlib";
import "buffer";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "node:crypto";
import "node:process";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/zod.mjs";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/vercel__oidc.mjs";
import "path";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/idb.mjs";
import "../_libs/firebase__webchannel-wrapper.mjs";
import "../_libs/@grpc/grpc-js.mjs";
import "process";
import "tls";
import "net";
import "events";
import "http2";
import "http";
import "url";
import "dns";
import "../_libs/@grpc/proto-loader.mjs";
import "../_libs/lodash.camelcase.mjs";
import "../_libs/protobufjs.mjs";
import "../_libs/protobufjs__aspromise.mjs";
import "../_libs/protobufjs__base64.mjs";
import "../_libs/protobufjs__eventemitter.mjs";
import "../_libs/protobufjs__float.mjs";
import "../_libs/@protobufjs/inquire.mjs";
import "../_libs/protobufjs__utf8.mjs";
import "../_libs/protobufjs__pool.mjs";
import "../_libs/long.mjs";
import "../_libs/protobufjs__codegen.mjs";
import "../_libs/protobufjs__fetch.mjs";
import "../_libs/protobufjs__path.mjs";
import "../_libs/faye-websocket.mjs";
import "../_libs/websocket-driver.mjs";
import "../_libs/safe-buffer.mjs";
import "../_libs/http-parser-js.mjs";
import "../_libs/websocket-extensions.mjs";
function Students() {
  ensureEcosystemSeed();
  const [schools, setSchools] = reactExports.useState(() => getSchools());
  const [students, setStudents] = reactExports.useState(getStudents());
  const [schoolCode, setSchoolCode] = reactExports.useState("EP-2026-001245");
  const [statusMessage, setStatusMessage] = reactExports.useState("একটি যাচাইকৃত স্কুল বেছে নিন।");
  const [form, setForm] = reactExports.useState({
    fullName: "",
    photo: "🧑‍🎓",
    classLevel: 8,
    section: "A",
    roll: "",
    bloodGroup: "B+",
    contact: "",
    guardianName: "",
    guardianRelation: "Father",
    guardianPhone: ""
  });
  reactExports.useEffect(() => listenSchools(setSchools), []);
  reactExports.useEffect(() => listenStudents(setStudents), []);
  const selectedSchool = reactExports.useMemo(() => schools.find((school) => school.schoolCode === schoolCode.trim() || school.id === schoolCode.trim()) ?? null, [schools, schoolCode]);
  const schoolVerified = Boolean(selectedSchool?.verified);
  const newestStudent = students[0];
  const setStudentPhotoFromFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const value = typeof reader.result === "string" ? reader.result : form.photo;
      setForm((current) => ({
        ...current,
        photo: value
      }));
    };
    reader.readAsDataURL(file);
  };
  const registerStudent = () => {
    if (!selectedSchool || !schoolVerified) {
      setStatusMessage("শুধু যাচাইকৃত স্কুলই শিক্ষার্থী নিবন্ধন করতে পারে।");
      return;
    }
    if (!form.fullName.trim() || !form.roll.trim() || !form.contact.trim() || !form.guardianName.trim()) {
      setStatusMessage("শিক্ষার্থী ও অভিভাবকের প্রয়োজনীয় তথ্য পূরণ করুন।");
      return;
    }
    const studentId = createStudentId();
    const record = {
      id: studentId,
      schoolId: selectedSchool.id,
      schoolCode: selectedSchool.schoolCode,
      schoolName: selectedSchool.schoolName,
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
      academicRecords: [{
        term: "Registration",
        gpa: "N/A",
        remark: "New account created"
      }]
    };
    const saved = saveStudent(record);
    const next = [saved, ...students.filter((student) => student.id !== saved.id)];
    setStudents(next);
    setStatusMessage(`${selectedSchool.schoolName}-এ শিক্ষার্থীটি যাচাইকৃতভাবে যুক্ত হয়েছে।`);
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
      guardianPhone: ""
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "glass-strong rounded-[2rem] p-6 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1.5 text-xs font-semibold text-brand-blue", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
          " শিক্ষার্থী নিবন্ধন ও যাচাই"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold md:text-5xl", children: "স্কুল বেছে নিন, কোড যাচাই করুন, শিক্ষার্থী অ্যাকাউন্ট তৈরি করুন" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-3xl text-sm leading-6 text-muted-foreground md:text-base", children: "শিক্ষার্থীর রেকর্ড স্কুল, অভিভাবক এবং ডিজিটাল আইডির সঙ্গে যুক্ত থাকে। যাচাইকৃত স্কুল থেকেই নতুন অ্যাকাউন্ট তৈরি হয়।" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "শিক্ষার্থী", value: students.length.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "যাচাইকৃত", value: schoolVerified ? "হ্যাঁ" : "না" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-5 xl:grid-cols-[1fr_0.95fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-5 md:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserRoundPlus, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "নিবন্ধন ধাপ" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-2 md:grid-cols-6", children: ["স্কুল বাছাই", "কোড যাচাই", "শিক্ষার্থী তথ্য", "অভিভাবক তথ্য", "তৎক্ষণাৎ যাচাই", "অ্যাকাউন্ট তৈরি"].map((step, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background/80 p-3 text-center text-xs font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-2 grid h-7 w-7 place-items-center rounded-full bg-gradient-hero text-white", children: index + 1 }),
            step
          ] }, step)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-5 md:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(University, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "স্কুল যুক্ত করুন" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5 text-sm font-medium md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "স্কুল কোড" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: schoolCode, onChange: (event) => setSchoolCode(event.target.value), placeholder: "EP-2026-001245", className: "w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "শিক্ষার্থীর নাম", value: form.fullName, onChange: (value) => setForm((current) => ({
              ...current,
              fullName: value
            })), placeholder: "নাম লিখুন" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "ফটো/ইমোজি", value: form.photo, onChange: (value) => setForm((current) => ({
              ...current,
              photo: value
            })), placeholder: "🧑‍🎓" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5 text-sm font-medium md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ছবি আপলোড" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: (event) => setStudentPhotoFromFile(event.target.files?.[0] ?? null), className: "w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "শ্রেণি", value: String(form.classLevel), onChange: (value) => setForm((current) => ({
              ...current,
              classLevel: Number(value) || 1
            })), placeholder: "8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "শাখা", value: form.section, onChange: (value) => setForm((current) => ({
              ...current,
              section: value
            })), placeholder: "A" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "রোল", value: form.roll, onChange: (value) => setForm((current) => ({
              ...current,
              roll: value
            })), placeholder: "14" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "রক্তের গ্রুপ", value: form.bloodGroup, onChange: (value) => setForm((current) => ({
              ...current,
              bloodGroup: value
            })), placeholder: "B+" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "যোগাযোগ", value: form.contact, onChange: (value) => setForm((current) => ({
              ...current,
              contact: value
            })), placeholder: "01711..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "অভিভাবকের নাম", value: form.guardianName, onChange: (value) => setForm((current) => ({
              ...current,
              guardianName: value
            })), placeholder: "অভিভাবকের নাম" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "অভিভাবকের সম্পর্ক", value: form.guardianRelation, onChange: (value) => setForm((current) => ({
              ...current,
              guardianRelation: value
            })), placeholder: "Father" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "অভিভাবকের ফোন", value: form.guardianPhone, onChange: (value) => setForm((current) => ({
              ...current,
              guardianPhone: value
            })), placeholder: "01911..." }) })
          ] }),
          selectedSchool ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-4 rounded-3xl p-4 text-sm ${selectedSchool.verified ? "bg-brand-green/10 text-foreground" : "bg-amber-100 text-foreground"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: selectedSchool.schoolName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1", children: [
              selectedSchool.schoolCode,
              " ·",
              " ",
              selectedSchool.verificationStatus === "Verified Institution" ? "যাচাইকৃত প্রতিষ্ঠান" : "অপেক্ষমাণ"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-3xl bg-destructive/10 p-4 text-sm", children: "স্কুল কোড পাওয়া যায়নি।" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: registerStudent, className: "mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 text-sm font-semibold text-white shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserRoundPlus, { className: "h-4 w-4" }),
            "শিক্ষার্থী অ্যাকাউন্ট তৈরি করুন"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: statusMessage })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-5 md:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Registered students" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "সর্বশেষ অ্যাকাউন্টগুলো আগে দেখানো হয়।" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-brand-orange" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: students.map((student) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/students/$studentId", params: {
            studentId: student.studentId
          }, className: "block rounded-3xl border border-border bg-background/80 p-4 transition-all hover:bg-muted/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: student.fullName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
                student.schoolName,
                " · শ্রেণি ",
                student.classLevel,
                " · শাখা",
                " ",
                student.section,
                " · রোল ",
                student.roll
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-3 py-1 text-xs font-semibold ${student.status === "Valid Student" ? "bg-brand-green text-white" : "bg-muted text-muted-foreground"}`, children: student.status === "Valid Student" ? "যাচাইকৃত শিক্ষার্থী" : student.status })
          ] }) }, student.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DigitalCard, { student: newestStudent ?? null }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IdCard, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "নিবন্ধন নিয়ম" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm leading-6 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• প্রথমে স্কুল বেছে নিন।" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• স্কুল কোড ঠিকভাবে দিন।" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• অভিভাবকের তথ্য বাধ্যতামূলক।" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• যাচাইকৃত স্কুলই নতুন শিক্ষার্থী তৈরি করতে পারে।" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• QR কোড সরাসরি শিক্ষার্থী যাচাই পাতায় নিয়ে যাবে।" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/search", className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "h-4 w-4" }),
            " শিক্ষার্থী ও স্কুল খুঁজুন"
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function DigitalCard({
  student
}) {
  const preview = student ?? {
    studentId: "EP-STU-000000",
    fullName: "Student Name",
    schoolName: "School Name",
    classLevel: 8,
    section: "A",
    roll: "14",
    photo: "🧑‍🎓",
    status: "Valid Student",
    bloodGroup: "B+",
    schoolCode: "EP-2026-001245",
    guardianName: "Guardian Name",
    guardianPhone: "01711-000000",
    contact: "01711-000000"
  };
  const verificationUrl = createVerificationUrl(preview.studentId);
  const [qr, setQr] = reactExports.useState(pseudoQrSvgDataUrl(verificationUrl));
  reactExports.useEffect(() => {
    let active = true;
    void QRCode.toDataURL(verificationUrl, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 240
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm uppercase tracking-[0.2em] text-muted-foreground", children: "Digital Student ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: preview.fullName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "h-6 w-6 text-primary" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-[2rem] bg-[linear-gradient(135deg,#0f172a_0%,#0ea5e9_60%,#22c55e_100%)] p-5 text-white shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.25em] opacity-80", children: "Front Side" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-bold", children: preview.schoolName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-sm opacity-90", children: [
            "School Code: ",
            preview.schoolCode
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-white/15 text-4xl backdrop-blur", children: isImageData(preview.photo) ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview.photo, alt: preview.fullName, className: "h-full w-full object-cover" }) : preview.photo })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-[1fr_auto] gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: "Name:" }),
            " ",
            preview.fullName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: "Class:" }),
            " ",
            preview.classLevel
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: "Section:" }),
            " ",
            preview.section
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: "Roll:" }),
            " ",
            preview.roll
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: "Status:" }),
            " ",
            preview.status === "Valid Student" ? "যাচাইকৃত শিক্ষার্থী" : preview.status
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: qr, alt: "QR code", className: "h-32 w-32 rounded-2xl bg-white p-2" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background/80 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: "Back side" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs leading-6 text-muted-foreground", children: [
          "অভিভাবক: ",
          preview.guardianName,
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "যোগাযোগ: ",
          preview.contact,
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "রক্তের গ্রুপ: ",
          preview.bloodGroup
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background/80 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: "QR যাচাই" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs leading-6 text-muted-foreground", children: [
          "QR কোড বা সরাসরি লিংক থেকে যাচাই পাতায় যান।",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: verificationUrl, className: "font-semibold text-primary", children: verificationUrl })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: exportPdf, className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-2.5 text-sm font-semibold text-white shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
        " PDF ডাউনলোড"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/search", className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-4 w-4" }),
        " শিক্ষার্থী খুঁজুন"
      ] })
    ] })
  ] });
}
function Field({
  label,
  value,
  onChange,
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5 text-sm font-medium", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (event) => onChange(event.target.value), placeholder, className: "w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary" })
  ] });
}
function Metric({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-white/70 bg-white/80 p-4 text-center shadow-soft backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xl font-bold", children: value })
  ] });
}
function isImageData(value) {
  return /^data:image\//i.test(value) || /^https?:\/\//i.test(value);
}
function renderIdCardHtml(student, qr, verificationUrl) {
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
              <div style="font-size:30px;font-weight:800;margin-top:8px">${student.schoolName}</div>
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
export {
  Students as component
};
