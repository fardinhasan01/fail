import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as useAuth } from "./router-D2rIulYA.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import { U as University, M as Mail, e as UsersRound, f as LogIn, L as LoaderCircle, g as Chromium, h as User } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/firebase__util.mjs";
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
import "zlib";
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
const CLASSES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("signin");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [classLevel, setClassLevel] = reactExports.useState(3);
  const [role, setRole] = reactExports.useState("student");
  const [pending, setPending] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  const redirectTo = reactExports.useMemo(() => {
    if (typeof window === "undefined") return "/dashboard";
    const url = new URL(window.location.href);
    return url.searchParams.get("redirect") ?? "/dashboard";
  }, []);
  reactExports.useEffect(() => {
    if (!auth.loading && auth.authUser) {
      void navigate({
        to: redirectTo
      });
    }
  }, [auth.authUser, auth.loading, navigate, redirectTo]);
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setPending("email");
    try {
      if (mode === "signup") {
        await auth.signUpWithEmail({
          email: email.trim(),
          password,
          name: name.trim(),
          classLevel,
          role
        });
      } else {
        await auth.signInWithEmail(email.trim(), password);
      }
      void navigate({
        to: redirectTo
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "প্রবেশ করা যায়নি।");
    } finally {
      setPending(null);
    }
  };
  const googleLogin = async () => {
    setError("");
    setPending("google");
    try {
      await auth.signInWithGoogle();
      void navigate({
        to: redirectTo
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google লগইন ব্যর্থ হয়েছে।");
    } finally {
      setPending(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen px-4 py-6 md:px-6 grid lg:grid-cols-[1fr_0.9fr] gap-6 items-stretch", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-[2rem] overflow-hidden shadow-soft border border-white/40 bg-[linear-gradient(135deg,#fff4d9_0%,#dff7ff_46%,#f3e8ff_100%)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-10 lg:p-12 h-full flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/e-pathshala-logo.png", alt: "E-পাঠশালা", className: "w-14 h-14 rounded-2xl object-cover bg-white shadow-soft" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: "E-পাঠশালা" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Firebase-powered digital school" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(University, { className: "h-4 w-4 text-brand-orange" }),
            " ক্লাস 1–10 · ছাত্র ও শিক্ষক"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-6xl font-bold leading-[0.95]", children: [
            "এক লগইনেই ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-orange", children: "পড়া" }),
            ", ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-green", children: "খেলা" }),
            ", আর ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-blue", children: "সংযোগ" }),
            "।"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-xl text-base md:text-lg text-muted-foreground leading-7", children: "Email/password এবং Google login, persistent Firebase session, class profile, Firebase chat, quiz score, free board, আর certificate tracking সব এক জায়গায়।" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3 mt-10", children: [{
        icon: Mail,
        title: "Email sign-in",
        text: "Secure local session or Firebase auth."
      }, {
        icon: UsersRound,
        title: "Class rooms",
        text: "Class 1–10 students and teachers."
      }, {
        icon: LogIn,
        title: "Auto restore",
        text: "Persistent session with seamless return."
      }].map((item) => {
        const Icon = item.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-2xl bg-gradient-hero text-white grid place-items-center shadow-soft mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: item.text })
        ] }, item.title);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xl glass-strong rounded-[2rem] p-6 md:p-8 shadow-glow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Welcome back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: mode === "signin" ? "প্রবেশ করুন" : "নতুন অ্যাকাউন্ট তৈরি করুন" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded-full border border-border bg-background p-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode("signin"), className: `rounded-full px-3 py-1.5 text-sm font-medium ${mode === "signin" ? "bg-gradient-hero text-white shadow-soft" : "text-muted-foreground"}`, children: "Login" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode("signup"), className: `rounded-full px-3 py-1.5 text-sm font-medium ${mode === "signup" ? "bg-gradient-hero text-white shadow-soft" : "text-muted-foreground"}`, children: "Sign up" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void googleLogin(), disabled: pending !== null, className: "w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3.5 text-sm font-semibold hover:bg-muted/70 transition-colors disabled:opacity-60", children: [
        pending === "google" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Chromium, { className: "w-4 h-4" }),
        "Google দিয়ে প্রবেশ"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-5 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.25em] text-muted-foreground", children: "or" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "নাম" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 rounded-2xl border border-input bg-background px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: name, onChange: (event) => setName(event.target.value), placeholder: "যেমন: আরাভ", className: "w-full bg-transparent outline-none" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "ক্লাস" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-5 gap-2 md:grid-cols-10", children: CLASSES.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setClassLevel(item), className: `rounded-xl px-3 py-2 text-sm font-semibold ${classLevel === item ? "bg-gradient-hero text-white shadow-soft" : "glass hover:shadow-soft"}`, children: item }, item)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-2 gap-2", children: [["student", "শিক্ষার্থী"], ["teacher", "শিক্ষক"]].map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setRole(value), className: `rounded-xl px-4 py-3 text-sm font-semibold ${role === value ? "bg-gradient-blue text-white shadow-soft" : "glass hover:shadow-soft"}`, children: label }, value)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", value: email, onChange: (event) => setEmail(event.target.value), placeholder: "student@school.edu", className: "mt-1 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "password", value: password, onChange: (event) => setPassword(event.target.value), placeholder: "••••••••", className: "mt-1 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary" })
        ] }),
        error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive", children: error }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: pending !== null, className: "w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3.5 text-white font-semibold shadow-soft hover:shadow-glow transition-all disabled:opacity-60", children: [
          pending === "email" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
          mode === "signin" ? "প্রবেশ করুন" : "অ্যাকাউন্ট তৈরি করুন"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-xs leading-6 text-muted-foreground", children: "This login is now wired directly to Firebase. Make sure your `VITE_FIREBASE_*` env vars are set and Firebase Email/Password auth is enabled in the console." })
    ] }) })
  ] });
}
export {
  Login as component
};
