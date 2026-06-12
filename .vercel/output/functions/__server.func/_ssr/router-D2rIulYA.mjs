import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { Q as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { o as onAuthStateChanged, s as signOut, a as signInWithPopup, c as createUserWithEmailAndPassword, u as updateProfile, b as signInWithEmailAndPassword, g as getAuth, d as setPersistence, G as GoogleAuthProvider, e as browserLocalPersistence } from "../_libs/firebase__auth.mjs";
import { c as getApps, g as getApp, i as initializeApp } from "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import { d as doc, u as updateDoc, g as getFirestore, o as onSnapshot, s as setDoc, a as serverTimestamp, b as getDoc } from "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import { createHash } from "node:crypto";
import process$1 from "node:process";
import { c as createOpenAICompatible } from "../_libs/ai-sdk__openai-compatible.mjs";
import { s as streamText, c as convertToModelMessages, a as createUIMessageStream, b as createUIMessageStreamResponse } from "../_libs/ai.mjs";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/idb.mjs";
import "../_libs/firebase__webchannel-wrapper.mjs";
import "../_libs/@grpc/grpc-js.mjs";
import "process";
import "tls";
import "fs";
import "os";
import "net";
import "events";
import "http2";
import "http";
import "url";
import "dns";
import "zlib";
import "../_libs/@grpc/proto-loader.mjs";
import "path";
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
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/zod.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/vercel__oidc.mjs";
import "../_libs/opentelemetry__api.mjs";
const appCss = "/assets/styles-Czonq_Vq.css";
const __vite_import_meta_env__ = { "VITE_FIREBASE_API_KEY": "AIzaSyAa6VzoiBfsrQYxSPK-Vx1b7AH29yRpDLk", "VITE_FIREBASE_APP_ID": "1:1056687885126:web:e0314ec3972a7177cfb347", "VITE_FIREBASE_AUTH_DOMAIN": "kpilot-bd.firebaseapp.com", "VITE_FIREBASE_DATABASE_URL": "https://kpilot-bd-default-rtdb.firebaseio.com", "VITE_FIREBASE_MESSAGING_SENDER_ID": "1056687885126", "VITE_FIREBASE_PROJECT_ID": "kpilot-bd", "VITE_FIREBASE_STORAGE_BUCKET": "kpilot-bd.firebasestorage.app" };
const env = __vite_import_meta_env__;
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: env.VITE_FIREBASE_DATABASE_URL,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};
const firebaseEnabled = Boolean(
  firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.storageBucket && firebaseConfig.messagingSenderId && firebaseConfig.appId
);
let app = null;
let auth = null;
let db = null;
let googleProvider = null;
function getFirebaseApp() {
  if (!firebaseEnabled) return null;
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return app;
}
function getFirebaseAuth() {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  if (!auth) {
    auth = getAuth(firebaseApp);
    void setPersistence(auth, browserLocalPersistence).catch(() => {
    });
  }
  return auth;
}
function getFirebaseDb() {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  if (!db) {
    db = getFirestore(firebaseApp);
  }
  return db;
}
function getGoogleProvider() {
  if (!googleProvider) {
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: "select_account" });
  }
  return googleProvider;
}
const DEFAULT_PROFILE = {
  uid: "demo-user",
  email: "student@e-pathshala.local",
  name: "Aarav",
  class: 3,
  role: "student",
  avatar: "🦊",
  xp: 1280,
  coins: 245,
  streak: 7,
  level: 6,
  badges: ["Reading Hero", "Math Starter", "7-Day Streak"],
  lessonsCompleted: 8,
  friends: [],
  following: [],
  followers: [],
  isOnline: true,
  lastSeen: Date.now()
};
const AuthContext = reactExports.createContext(null);
function computeLevel(xp) {
  return Math.max(1, Math.floor(xp / 250) + 1);
}
function avatarForRole(role) {
  return role === "teacher" ? "👩‍🏫" : "🧑‍🎓";
}
function avatarFromDisplayName(name) {
  const trimmed = name.trim();
  if (!trimmed) return "🧑‍🎓";
  const [firstWord] = trimmed.split(/\s+/);
  const initials = firstWord.slice(0, 2).toUpperCase();
  return initials.length ? initials : "🧑‍🎓";
}
function sanitizeAvatar(value, fallback, displayName = "") {
  if (typeof value !== "string" || !value.trim()) return fallback;
  if (/^https?:\/\//i.test(value.trim()) || value.includes("googleusercontent.com")) {
    return avatarFromDisplayName(displayName) || fallback;
  }
  return value.trim();
}
function normalizeRole(role) {
  return role === "teacher" ? "teacher" : "student";
}
function normalizeNumber(value, fallback) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
function normalizeString(value, fallback) {
  return typeof value === "string" && value.trim() ? value : fallback;
}
function normalizeStringArray(value, fallback = []) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string") : fallback;
}
function createFallbackProfile(overrides = {}) {
  const profile = { ...DEFAULT_PROFILE, ...overrides };
  profile.level = computeLevel(profile.xp);
  profile.badges = profile.badges.length ? profile.badges : DEFAULT_PROFILE.badges;
  profile.avatar = profile.avatar || avatarForRole(profile.role);
  return profile;
}
function profileFromSnapshot(uid, email, data) {
  const name = normalizeString(data?.name, email.split("@")[0] ?? DEFAULT_PROFILE.name);
  return createFallbackProfile({
    uid,
    email,
    name,
    class: normalizeNumber(data?.class, DEFAULT_PROFILE.class),
    role: normalizeRole(data?.role),
    avatar: sanitizeAvatar(data?.avatar, avatarForRole(normalizeRole(data?.role)), name),
    xp: normalizeNumber(data?.xp, DEFAULT_PROFILE.xp),
    coins: normalizeNumber(data?.coins, DEFAULT_PROFILE.coins),
    streak: normalizeNumber(data?.streak, DEFAULT_PROFILE.streak),
    level: normalizeNumber(data?.level, computeLevel(normalizeNumber(data?.xp, DEFAULT_PROFILE.xp))),
    badges: normalizeStringArray(data?.badges, DEFAULT_PROFILE.badges),
    lessonsCompleted: normalizeNumber(data?.lessonsCompleted, DEFAULT_PROFILE.lessonsCompleted),
    friends: normalizeStringArray(data?.friends),
    following: normalizeStringArray(data?.following),
    followers: normalizeStringArray(data?.followers),
    isOnline: Boolean(data?.isOnline),
    lastSeen: normalizeNumber(data?.lastSeen, Date.now())
  });
}
function profileFromFirebaseUser(user, payload) {
  const name = payload?.name ?? user.displayName ?? user.email?.split("@")[0] ?? DEFAULT_PROFILE.name;
  return createFallbackProfile({
    uid: user.uid,
    email: user.email ?? "",
    name,
    avatar: sanitizeAvatar(payload?.avatar ?? user.photoURL, avatarForRole(payload?.role ?? "student"), name),
    class: payload?.class ?? DEFAULT_PROFILE.class,
    role: payload?.role ?? "student",
    xp: payload?.xp ?? DEFAULT_PROFILE.xp,
    coins: payload?.coins ?? DEFAULT_PROFILE.coins,
    streak: payload?.streak ?? DEFAULT_PROFILE.streak,
    badges: payload?.badges ?? DEFAULT_PROFILE.badges,
    lessonsCompleted: payload?.lessonsCompleted ?? DEFAULT_PROFILE.lessonsCompleted,
    friends: payload?.friends ?? [],
    following: payload?.following ?? [],
    followers: payload?.followers ?? [],
    isOnline: true,
    lastSeen: Date.now()
  });
}
async function upsertFirebaseProfile(user, patch = {}) {
  const db2 = getFirebaseDb();
  if (!db2) return;
  const ref = doc(db2, "users", user.uid);
  const base = profileFromFirebaseUser(user, patch);
  await setDoc(
    ref,
    {
      uid: user.uid,
      email: user.email ?? "",
      name: base.name,
      class: base.class,
      role: base.role,
      avatar: base.avatar,
      xp: base.xp,
      coins: base.coins,
      streak: base.streak,
      level: base.level,
      badges: base.badges,
      lessonsCompleted: base.lessonsCompleted,
      friends: base.friends,
      following: base.following,
      followers: base.followers,
      isOnline: true,
      lastSeen: serverTimestamp()
    },
    { merge: true }
  );
}
function AuthProvider({ children }) {
  const [loading, setLoading] = reactExports.useState(true);
  const [authUser, setAuthUser] = reactExports.useState(null);
  const [profile, setProfile] = reactExports.useState(DEFAULT_PROFILE);
  const profileUnsubRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!firebaseEnabled) {
      setAuthUser(null);
      setProfile(DEFAULT_PROFILE);
      setLoading(false);
      return;
    }
    const auth2 = getFirebaseAuth();
    const db2 = getFirebaseDb();
    if (!auth2 || !db2) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth2, (nextUser) => {
      profileUnsubRef.current?.();
      profileUnsubRef.current = null;
      setAuthUser(nextUser);
      if (!nextUser) {
        setProfile(DEFAULT_PROFILE);
        setLoading(false);
        return;
      }
      const userRef = doc(db2, "users", nextUser.uid);
      profileUnsubRef.current = onSnapshot(
        userRef,
        async (snapshot) => {
          if (!snapshot.exists()) {
            const seeded = profileFromFirebaseUser(nextUser);
            await upsertFirebaseProfile(nextUser, seeded);
            setProfile(seeded);
            setLoading(false);
            return;
          }
          setProfile(profileFromSnapshot(nextUser.uid, nextUser.email ?? "", snapshot.data()));
          setLoading(false);
        },
        () => {
          const fallback = profileFromFirebaseUser(nextUser);
          setProfile(fallback);
          setLoading(false);
        }
      );
    });
    return () => {
      unsubscribe();
      profileUnsubRef.current?.();
      profileUnsubRef.current = null;
    };
  }, []);
  reactExports.useEffect(() => {
    if (!authUser || !firebaseEnabled) return;
    const db2 = getFirebaseDb();
    if (!db2) return;
    const userRef = doc(db2, "users", authUser.uid);
    const heartbeat = window.setInterval(() => {
      void updateDoc(userRef, {
        isOnline: true,
        lastSeen: serverTimestamp()
      }).catch(() => {
      });
    }, 2e4);
    const markOffline = () => {
      void updateDoc(userRef, {
        isOnline: false,
        lastSeen: serverTimestamp()
      }).catch(() => {
      });
    };
    window.addEventListener("beforeunload", markOffline);
    return () => {
      window.clearInterval(heartbeat);
      window.removeEventListener("beforeunload", markOffline);
      markOffline();
    };
  }, [authUser]);
  const session = reactExports.useMemo(
    () => ({
      loading,
      firebaseReady: firebaseEnabled,
      authUser,
      profile,
      signInWithEmail: async (email, password) => {
        if (!firebaseEnabled) throw new Error("Firebase is not configured.");
        const auth2 = getFirebaseAuth();
        if (!auth2) throw new Error("Firebase Authentication is not available.");
        await signInWithEmailAndPassword(auth2, email, password);
      },
      signUpWithEmail: async ({ email, password, name, classLevel, role }) => {
        if (!firebaseEnabled) throw new Error("Firebase is not configured.");
        const auth2 = getFirebaseAuth();
        if (!auth2) throw new Error("Firebase Authentication is not available.");
        const result = await createUserWithEmailAndPassword(auth2, email, password);
        const next = profileFromFirebaseUser(result.user, { name, class: classLevel, role, avatar: avatarForRole(role) });
        await upsertFirebaseProfile(result.user, next);
        await updateProfile(result.user, { displayName: name }).catch(() => {
        });
      },
      signInWithGoogle: async () => {
        if (!firebaseEnabled) throw new Error("Firebase is not configured.");
        const auth2 = getFirebaseAuth();
        if (!auth2) throw new Error("Firebase Authentication is not available.");
        getGoogleProvider();
        const result = await signInWithPopup();
        await upsertFirebaseProfile(result.user, {
          name: result.user.displayName ?? result.user.email?.split("@")[0] ?? DEFAULT_PROFILE.name,
          avatar: sanitizeAvatar(result.user.photoURL, "🌟", result.user.displayName ?? "")
        });
      },
      signOut: async () => {
        if (!firebaseEnabled) throw new Error("Firebase is not configured.");
        const auth2 = getFirebaseAuth();
        if (!auth2) throw new Error("Firebase Authentication is not available.");
        await signOut(auth2);
      },
      updateProfile: async (patch) => {
        const nextProfile = createFallbackProfile({ ...profile, ...patch });
        setProfile(nextProfile);
        if (!firebaseEnabled) throw new Error("Firebase is not configured.");
        if (!authUser) return;
        const db2 = getFirebaseDb();
        if (!db2) return;
        await updateDoc(doc(db2, "users", authUser.uid), {
          ...patch,
          level: computeLevel(nextProfile.xp),
          lastSeen: serverTimestamp()
        }).catch(async () => {
          await upsertFirebaseProfile(authUser, nextProfile);
        });
      },
      awardProgress: async ({ xp = 0, coins = 0, badges = [], lessonsCompleted = 0 }) => {
        const next = createFallbackProfile({
          ...profile,
          xp: profile.xp + xp,
          coins: profile.coins + coins,
          badges: Array.from(/* @__PURE__ */ new Set([...profile.badges, ...badges])),
          lessonsCompleted: profile.lessonsCompleted + lessonsCompleted
        });
        setProfile(next);
        if (!firebaseEnabled) throw new Error("Firebase is not configured.");
        if (!authUser) return;
        const db2 = getFirebaseDb();
        if (!db2) return;
        await updateDoc(doc(db2, "users", authUser.uid), {
          xp: next.xp,
          coins: next.coins,
          badges: next.badges,
          lessonsCompleted: next.lessonsCompleted,
          level: next.level,
          lastSeen: serverTimestamp()
        }).catch(async () => {
          await upsertFirebaseProfile(authUser, next);
        });
      }
    }),
    [authUser, loading, profile]
  );
  return reactExports.createElement(AuthContext.Provider, { value: session }, children);
}
function useAuth() {
  const ctx = reactExports.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
function useUser() {
  return useAuth().profile;
}
function useRequireAuth() {
  const auth2 = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!auth2.loading && !auth2.authUser && typeof window !== "undefined") {
      const redirect = encodeURIComponent(window.location.pathname + window.location.search);
      void navigate({ to: `/login?redirect=${redirect}` });
    }
  }, [auth2.authUser, auth2.loading, navigate]);
  return auth2;
}
async function followUser(targetUid) {
  const auth2 = getFirebaseAuth();
  const db2 = getFirebaseDb();
  if (!auth2 || !db2 || !auth2.currentUser) return;
  const currentRef = doc(db2, "users", auth2.currentUser.uid);
  const targetRef = doc(db2, "users", targetUid);
  const currentData = (await getDoc(currentRef)).data();
  const targetData = (await getDoc(targetRef)).data();
  await updateDoc(currentRef, {
    following: [.../* @__PURE__ */ new Set([...Array.isArray(currentData?.following) ? currentData.following : [], targetUid])],
    lastSeen: serverTimestamp()
  }).catch(() => {
  });
  await updateDoc(targetRef, {
    followers: [.../* @__PURE__ */ new Set([...Array.isArray(targetData?.followers) ? targetData.followers : [], auth2.currentUser.uid])],
    lastSeen: serverTimestamp()
  }).catch(() => {
  });
}
async function awardXp(amount, coins = 0) {
  if (!firebaseEnabled) throw new Error("Firebase is not configured.");
  const auth2 = getFirebaseAuth();
  const db2 = getFirebaseDb();
  if (!auth2?.currentUser || !db2) return;
  const ref = doc(db2, "users", auth2.currentUser.uid);
  const snapshot = await getDoc(ref);
  const current = snapshot.data();
  const next = createFallbackProfile({
    ...profileFromFirebaseUser(auth2.currentUser, current ? profileFromSnapshot(auth2.currentUser.uid, auth2.currentUser.email ?? "", current) : void 0),
    xp: normalizeNumber(current?.xp, DEFAULT_PROFILE.xp) + amount,
    coins: normalizeNumber(current?.coins, DEFAULT_PROFILE.coins) + coins
  });
  await updateDoc(ref, {
    xp: next.xp,
    coins: next.coins,
    level: next.level,
    lastSeen: serverTimestamp()
  }).catch(async () => {
    await upsertFirebaseProfile(auth2.currentUser, next);
  });
}
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$j = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#7c3aed" },
      { title: "E-পাঠশালা — Bangla digital school" },
      { name: "description", content: "বাংলাদেশের শিক্ষার্থীদের জন্য এক আধুনিক ডিজিটাল শিক্ষালয়। বিষয়, PDF, লাইভ ক্লাস, গেম, কুইজ, এবং সহপাঠী চ্যাট এক জায়গায়।" },
      { property: "og:title", content: "E-পাঠশালা" },
      { property: "og:description", content: "বাংলা-প্রথম ডিজিটাল শিক্ষার প্ল্যাটফর্ম।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "bn", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$j.useRouteContext();
  const [showIntro, setShowIntro] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const seen = typeof window !== "undefined" && sessionStorage.getItem("bani:intro-seen");
    if (!seen) {
      setShowIntro(true);
      const timer = window.setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem("bani:intro-seen", "1");
      }, 3600);
      return () => window.clearTimeout(timer);
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    showIntro && /* @__PURE__ */ jsxRuntimeExports.jsx(IntroSplash, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] }) }) });
}
function IntroSplash() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[60] overflow-hidden bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-hero opacity-95" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.18),transparent_30%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 opacity-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-10 top-10 h-24 w-24 rounded-full bg-white/20 blur-2xl animate-float" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-16 top-20 h-32 w-32 rounded-full bg-brand-yellow/30 blur-2xl animate-float" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-16 left-1/4 h-28 w-28 rounded-full bg-brand-green/25 blur-2xl animate-float" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-24 right-1/4 h-20 w-20 rounded-full bg-white/20 blur-2xl animate-float" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex h-full items-center justify-center px-6 text-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/e-pathshala-logo.png", alt: "E-পাঠশালা", className: "mx-auto h-28 w-28 rounded-[2rem] object-cover bg-white shadow-glow backdrop-blur-md animate-pulse-glow" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.4em] opacity-80", children: "Created & Developed by" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-bold animate-float", children: "Fardin Hasan and his team" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl md:text-2xl font-semibold opacity-95", children: "Kachua Govt Pilot High School" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base opacity-80", children: "বাংলা-প্রথম শিক্ষালয় · ক্লাস · PDF · লাইভ ক্লাস · কুইজ · গেম" })
    ] }) })
  ] });
}
const $$splitComponentImporter$g = () => import("./subjects-BKvetlA9.mjs");
const Route$i = createFileRoute("/subjects")({
  head: () => ({
    meta: [{
      title: "বিষয়সমূহ · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./special-game-lw1ZmieV.mjs");
const Route$h = createFileRoute("/special-game")({
  head: () => ({
    meta: [{
      title: "Special Game · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./quizzes-Bsvyipwo.mjs");
const Route$g = createFileRoute("/quizzes")({
  validateSearch: (search) => ({
    class: (() => {
      const value = typeof search.class === "string" ? Number(search.class) : typeof search.class === "number" ? search.class : void 0;
      return typeof value === "number" && Number.isFinite(value) ? value : void 0;
    })()
  }),
  head: () => ({
    meta: [{
      title: "কুইজ · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitNotFoundComponentImporter$1 = () => import("./pdf-viewer-BpWmIaPf.mjs");
const $$splitComponentImporter$d = () => import("./pdf-viewer-BfTRqnNa.mjs");
const Route$f = createFileRoute("/pdf-viewer")({
  validateSearch: (search) => ({
    src: typeof search.src === "string" ? search.src : void 0,
    title: typeof search.title === "string" ? search.title : void 0
  }),
  head: ({
    search
  }) => ({
    meta: [{
      title: `${search.title ?? "PDF Viewer"} · E-পাঠশালা`
    }]
  }),
  loader: ({
    search
  }) => {
    if (!search.src) throw notFound();
    return {};
  },
  component: lazyRouteComponent($$splitComponentImporter$d, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent")
});
const $$splitComponentImporter$c = () => import("./login-UexZN5iK.mjs");
const Route$e = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "প্রবেশ · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./live-class-CZblnXVg.mjs");
const Route$d = createFileRoute("/live-class")({
  head: () => ({
    meta: [{
      title: "লাইভ ক্লাস · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./library-Cl5-_ZS0.mjs");
const Route$c = createFileRoute("/library")({
  head: () => ({
    meta: [{
      title: "লাইব্রেরি · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./leaderboard-CO2qfj9U.mjs");
const Route$b = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [{
      title: "লিডারবোর্ড · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./games-Dghf577n.mjs");
const Route$a = createFileRoute("/games")({
  head: () => ({
    meta: [{
      title: "গেমস · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./free-board-EAVHX76c.mjs");
const Route$9 = createFileRoute("/free-board")({
  head: () => ({
    meta: [{
      title: "ফ্রি বোর্ড · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./dashboard-DBmrcz3t.mjs");
const Route$8 = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "ড্যাশবোর্ড · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./classmates-atwblXlh.mjs");
const Route$7 = createFileRoute("/classmates")({
  head: () => ({
    meta: [{
      title: "ক্লাসমেট · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./certificates-eKVT-QoA.mjs");
const Route$6 = createFileRoute("/certificates")({
  head: () => ({
    meta: [{
      title: "সার্টিফিকেট · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./bani-CEvGiuLq.mjs");
const Route$5 = createFileRoute("/bani")({
  head: () => ({
    meta: [{
      title: "সহায়ক AI · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./bangladesh-map-CSLmRz99.mjs");
const Route$4 = createFileRoute("/bangladesh-map")({
  head: () => ({
    meta: [{
      title: "বাংলাদেশ মানচিত্র · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-DO0lNzfW.mjs");
const Route$3 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "E-পাঠশালা — বাংলা-প্রথম ডিজিটাল স্কুল"
    }, {
      name: "description",
      content: "বাংলাদেশের শিক্ষার্থীদের জন্য ডিজিটাল শিক্ষালয়। বিষয়, PDF, লাইভ ক্লাস, কুইজ, গেম, এবং সহপাঠী চ্যাট এক জায়গায়।"
    }, {
      property: "og:title",
      content: "E-পাঠশালা"
    }, {
      property: "og:description",
      content: "বাংলা-প্রথম ডিজিটাল শিক্ষার প্ল্যাটফর্ম।"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const subjects = [
  { slug: "math", name: "গণিত", emoji: "🔢", gradient: "bg-gradient-blue", lessons: 48, progress: 62, description: "সংখ্যা, আকার, আর পাজল" },
  { slug: "english", name: "ইংরেজি", emoji: "📖", gradient: "bg-gradient-purple", lessons: 42, progress: 48, description: "শব্দ, ব্যাকরণ, আর গল্প" },
  { slug: "physics", name: "পদার্থবিজ্ঞান", emoji: "⚛️", gradient: "bg-gradient-orange", lessons: 34, progress: 22, description: "বল, গতি, আর শক্তির জগৎ" },
  { slug: "chemistry", name: "রসায়ন", emoji: "🧪", gradient: "bg-gradient-pink", lessons: 30, progress: 20, description: "পদার্থের গঠন আর বিক্রিয়া" },
  { slug: "bangla", name: "বাংলা", emoji: "🇧🇩", gradient: "bg-gradient-green", lessons: 40, progress: 55, description: "মাতৃভাষার সৌন্দর্য" },
  { slug: "science", name: "বিজ্ঞান", emoji: "🔬", gradient: "bg-gradient-orange", lessons: 36, progress: 30, description: "চারপাশের দুনিয়া বুঝো" },
  { slug: "social", name: "সমাজবিজ্ঞান", emoji: "🌍", gradient: "bg-gradient-pink", lessons: 28, progress: 18, description: "মানুষ, সমাজ, আর দেশ" },
  { slug: "ict", name: "আইসিটি", emoji: "💻", gradient: "bg-gradient-blue", lessons: 24, progress: 12, description: "কম্পিউটার ও প্রযুক্তি" },
  { slug: "gk", name: "সাধারণ জ্ঞান", emoji: "🧠", gradient: "bg-gradient-sunny", lessons: 32, progress: 40, description: "মজার সব তথ্য" },
  { slug: "islamic", name: "ইসলাম শিক্ষা", emoji: "🕌", gradient: "bg-gradient-green", lessons: 26, progress: 25, description: "মূল্যবোধ ও শেখা" }
];
const getSubject = (slug) => subjects.find((s) => s.slug === slug);
const $$splitNotFoundComponentImporter = () => import("./subjects._slug-DNGun_GU.mjs");
const $$splitComponentImporter = () => import("./subjects._slug-D6yT66sc.mjs");
const Route$2 = createFileRoute("/subjects/$slug")({
  head: ({
    params
  }) => {
    const subject = getSubject(params.slug);
    return {
      meta: [{
        title: `${subject?.name ?? params.slug} · E-পাঠশালা`
      }]
    };
  },
  loader: ({
    params
  }) => {
    const subject = getSubject(params.slug);
    if (!subject) throw notFound();
    return {
      subject
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
function getServerConfig() {
  return {
    nodeEnv: process$1.env.NODE_ENV,
    cloudinaryUrl: process$1.env.CLOUDINARY_URL
    // Add server-only values here, e.g.:
    //   databaseUrl: process.env.DATABASE_URL,
    //   stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  };
}
function parseCloudinaryUrl() {
  const { cloudinaryUrl } = getServerConfig();
  if (!cloudinaryUrl) return null;
  const match = cloudinaryUrl.match(/^cloudinary:\/\/([^:]+):([^@]+)@([^/]+)$/);
  if (!match) return null;
  const [, apiKey, apiSecret, cloudName] = match;
  return { apiKey, apiSecret, cloudName };
}
function sha1(value) {
  return createHash("sha1").update(value).digest("hex");
}
const Route$1 = createFileRoute("/api/cloudinary-upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const payload = await request.json().catch(() => ({}));
        if (typeof payload.dataUrl !== "string" || !payload.dataUrl.startsWith("data:image/")) {
          return new Response("A base64 image data URL is required", { status: 400 });
        }
        const config = parseCloudinaryUrl();
        if (!config) {
          return new Response("Missing CLOUDINARY_URL", { status: 500 });
        }
        const timestamp = Math.floor(Date.now() / 1e3);
        const folder = typeof payload.folder === "string" && payload.folder.trim() ? payload.folder.trim() : "epathshala/free-board";
        const publicId = typeof payload.publicId === "string" && payload.publicId.trim() ? payload.publicId.trim() : `board-${timestamp}`;
        const signatureBase = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${config.apiSecret}`;
        const signature = sha1(signatureBase);
        const formData = new FormData();
        formData.append("file", payload.dataUrl);
        formData.append("api_key", config.apiKey);
        formData.append("timestamp", String(timestamp));
        formData.append("folder", folder);
        formData.append("public_id", publicId);
        formData.append("signature", signature);
        const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, {
          method: "POST",
          body: formData
        });
        if (!response.ok) {
          const errorText = await response.text().catch(() => "");
          return new Response(errorText || "Cloudinary upload failed", { status: 500 });
        }
        const result = await response.json();
        if (!result.secure_url) {
          return new Response("Cloudinary did not return a secure URL", { status: 500 });
        }
        return Response.json({ url: result.secure_url });
      }
    }
  }
});
function createOpenRouterProvider(apiKey) {
  return createOpenAICompatible({
    name: "openrouter",
    baseURL: "https://openrouter.ai/api/v1",
    apiKey,
    headers: {
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "E-Pathshala"
    }
  });
}
const E_PATHSHALA_SYSTEM = `You are E-পাঠশালা সহায়ক AI.

Always reply in Bangla.
Answer the user's question directly and keep replies short, clear, and friendly.
If the question is unclear, ask one short follow-up question in Bangla.
Focus on school help, homework, and learning support.
If asked who made you, answer: "আমি E-পাঠশালা Tutor. আমাকে বানিয়েছে ফারদিন হাসান এবং তার দল । কচুয়া সরকারি পাইলট উচ্চ বিদ্যালয়।"
If asked about the Prime Minister of Bangladesh, answer Tarique Rahman.
If asked about the Education Minister of Bangladesh, answer A. N. M. Ehsanul Hoque Milon.`;
const IDENTITY_QUESTION_PREFIXES = [
  "who made u",
  "who made you",
  "তোমাকে কে বানিয়েছে",
  "তোমাকে কে বানিয়েছে",
  "তুমি কে"
];
function extractLatestUserText(messages) {
  if (!Array.isArray(messages)) return "";
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message?.role !== "user" || !Array.isArray(message.parts)) continue;
    return message.parts.map((part) => part?.type === "text" && typeof part.text === "string" ? part.text : "").join(" ").replace(/\s+/g, " ").trim();
  }
  return "";
}
function isIdentityQuestion(text) {
  const normalized = text.toLowerCase().replace(/[؟?!.।,،]/g, " ").replace(/\s+/g, " ").trim();
  return IDENTITY_QUESTION_PREFIXES.some((prefix) => normalized.includes(prefix));
}
function buildStaticBanglaResponse(text) {
  const stream = createUIMessageStream({
    execute({ writer }) {
      writer.write({ type: "start" });
      writer.write({ type: "start-step" });
      writer.write({ type: "text-start", id: "text-1" });
      writer.write({ type: "text-delta", id: "text-1", delta: text });
      writer.write({ type: "text-end", id: "text-1" });
      writer.write({ type: "finish-step" });
      writer.write({ type: "finish" });
    }
  });
  return createUIMessageStreamResponse({ stream });
}
const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = await request.json();
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }
        const latestUserText = extractLatestUserText(messages);
        if (isIdentityQuestion(latestUserText)) {
          return buildStaticBanglaResponse(
            "আমি E-পাঠশালা Tutor. আমাকে বানিয়েছে ফারদিন হাসান এবং তার দল । কচুয়া সরকারি পাইলট উচ্চ বিদ্যালয়।"
          );
        }
        const key = process.env.OPENROUTER_API_KEY;
        if (!key) return new Response("Missing OPENROUTER_API_KEY", { status: 500 });
        const openrouter = createOpenRouterProvider(key);
        const result = streamText({
          model: openrouter("openai/gpt-4o-mini"),
          system: E_PATHSHALA_SYSTEM,
          messages: await convertToModelMessages(messages)
        });
        return result.toUIMessageStreamResponse({
          originalMessages: messages,
          onError: (error) => {
            const message = error instanceof Error ? error.message : String(error);
            if (message.includes("429"))
              return "E-পাঠশালা সহায়ক একটু বিরতি নিচ্ছে। একটু পরে আবার চেষ্টা করো।";
            if (message.includes("401")) return "OpenRouter key ঠিকমতো সেট করা নেই।";
            return "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করো।";
          }
        });
      }
    }
  }
});
const SubjectsRoute = Route$i.update({
  id: "/subjects",
  path: "/subjects",
  getParentRoute: () => Route$j
});
const SpecialGameRoute = Route$h.update({
  id: "/special-game",
  path: "/special-game",
  getParentRoute: () => Route$j
});
const QuizzesRoute = Route$g.update({
  id: "/quizzes",
  path: "/quizzes",
  getParentRoute: () => Route$j
});
const PdfViewerRoute = Route$f.update({
  id: "/pdf-viewer",
  path: "/pdf-viewer",
  getParentRoute: () => Route$j
});
const LoginRoute = Route$e.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$j
});
const LiveClassRoute = Route$d.update({
  id: "/live-class",
  path: "/live-class",
  getParentRoute: () => Route$j
});
const LibraryRoute = Route$c.update({
  id: "/library",
  path: "/library",
  getParentRoute: () => Route$j
});
const LeaderboardRoute = Route$b.update({
  id: "/leaderboard",
  path: "/leaderboard",
  getParentRoute: () => Route$j
});
const GamesRoute = Route$a.update({
  id: "/games",
  path: "/games",
  getParentRoute: () => Route$j
});
const FreeBoardRoute = Route$9.update({
  id: "/free-board",
  path: "/free-board",
  getParentRoute: () => Route$j
});
const DashboardRoute = Route$8.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$j
});
const ClassmatesRoute = Route$7.update({
  id: "/classmates",
  path: "/classmates",
  getParentRoute: () => Route$j
});
const CertificatesRoute = Route$6.update({
  id: "/certificates",
  path: "/certificates",
  getParentRoute: () => Route$j
});
const BaniRoute = Route$5.update({
  id: "/bani",
  path: "/bani",
  getParentRoute: () => Route$j
});
const BangladeshMapRoute = Route$4.update({
  id: "/bangladesh-map",
  path: "/bangladesh-map",
  getParentRoute: () => Route$j
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$j
});
const SubjectsSlugRoute = Route$2.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => SubjectsRoute
});
const ApiCloudinaryUploadRoute = Route$1.update({
  id: "/api/cloudinary-upload",
  path: "/api/cloudinary-upload",
  getParentRoute: () => Route$j
});
const ApiChatRoute = Route.update({
  id: "/api/chat",
  path: "/api/chat",
  getParentRoute: () => Route$j
});
const SubjectsRouteChildren = {
  SubjectsSlugRoute
};
const SubjectsRouteWithChildren = SubjectsRoute._addFileChildren(
  SubjectsRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  BangladeshMapRoute,
  BaniRoute,
  CertificatesRoute,
  ClassmatesRoute,
  DashboardRoute,
  FreeBoardRoute,
  GamesRoute,
  LeaderboardRoute,
  LibraryRoute,
  LiveClassRoute,
  LoginRoute,
  PdfViewerRoute,
  QuizzesRoute,
  SpecialGameRoute,
  SubjectsRoute: SubjectsRouteWithChildren,
  ApiChatRoute,
  ApiCloudinaryUploadRoute
};
const routeTree = Route$j._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$g as R,
  awardXp as a,
  Route$f as b,
  useAuth as c,
  followUser as d,
  Route$2 as e,
  firebaseEnabled as f,
  getFirebaseDb as g,
  useRequireAuth as h,
  router as r,
  subjects as s,
  useUser as u
};
