import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState, e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { Q as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { o as onAuthStateChanged, s as signOut, a as signInWithPopup, c as createUserWithEmailAndPassword, u as updateProfile, b as signInWithEmailAndPassword, g as getAuth, d as setPersistence, G as GoogleAuthProvider, e as browserLocalPersistence } from "../_libs/firebase__auth.mjs";
import { c as getApps, g as getApp, i as initializeApp } from "../_libs/firebase__app.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import { d as doc, u as updateDoc, g as getFirestore, o as onSnapshot, s as setDoc, a as addDoc, c as collection, b as serverTimestamp, q as query, w as where, e as getDocs, l as limit, f as writeBatch, h as arrayUnion, i as getDoc, j as arrayRemove } from "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import { r as ref, o as onValue, g as getDatabase, s as set } from "../_libs/firebase__database.mjs";
import "../_libs/firebase__functions.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { createHash } from "node:crypto";
import process$1 from "node:process";
import { c as createOpenAICompatible } from "../_libs/ai-sdk__openai-compatible.mjs";
import { s as streamText, c as convertToModelMessages, a as createUIMessageStream, b as createUIMessageStreamResponse } from "../_libs/ai.mjs";
import { S as Sparkles, M as Maximize2, V as Volume2, a as VolumeX, C as Clock3, T as Trophy, b as CircleCheck, Z as Zap, R as RotateCcw, c as ShieldCheck, A as Award, F as FolderPlus, U as UserRoundPlus, B as BadgeCheck, L as LayoutDashboard, d as University, e as BookOpen, G as Globe, W as WandSparkles, f as LibraryBig, g as Users, h as Search, i as ArrowRight, H as House, j as GraduationCap, k as MessageCircleHeart, l as Activity, m as Brain, n as Swords, P as Palette, o as Video, p as ScrollText, D as DoorOpen } from "../_libs/lucide-react.mjs";
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
import "../_libs/faye-websocket.mjs";
import "../_libs/websocket-driver.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/http-parser-js.mjs";
import "../_libs/websocket-extensions.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/zod.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/vercel__oidc.mjs";
import "../_libs/opentelemetry__api.mjs";
const appCss = "/assets/styles-DBy6s86G.css";
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
let rtdb = null;
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
function getFirebaseRtdb() {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  if (!rtdb) {
    rtdb = getDatabase(firebaseApp);
  }
  return rtdb;
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
  schoolId: "school-drmc",
  schoolCode: "EP-2026-001245",
  schoolName: "Dhaka Residential Model College",
  studentId: "EP-STU-260001",
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
    schoolId: normalizeString(data?.schoolId, DEFAULT_PROFILE.schoolId ?? ""),
    schoolCode: normalizeString(data?.schoolCode, DEFAULT_PROFILE.schoolCode ?? ""),
    schoolName: normalizeString(data?.schoolName, DEFAULT_PROFILE.schoolName ?? ""),
    studentId: normalizeString(data?.studentId, DEFAULT_PROFILE.studentId ?? ""),
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
    schoolId: payload?.schoolId ?? DEFAULT_PROFILE.schoolId,
    schoolCode: payload?.schoolCode ?? DEFAULT_PROFILE.schoolCode,
    schoolName: payload?.schoolName ?? DEFAULT_PROFILE.schoolName,
    studentId: payload?.studentId ?? DEFAULT_PROFILE.studentId,
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
  const ref2 = doc(db2, "users", user.uid);
  const base = profileFromFirebaseUser(user, patch);
  await setDoc(
    ref2,
    {
      uid: user.uid,
      email: user.email ?? "",
      name: base.name,
      class: base.class,
      role: base.role,
      schoolId: base.schoolId,
      schoolCode: base.schoolCode,
      schoolName: base.schoolName,
      studentId: base.studentId,
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
const Route$t = createRootRouteWithContext()({
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
  const { queryClient } = Route$t.useRouteContext();
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-bold animate-float", children: "Kachua Govt pilot High School Team" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl md:text-2xl font-semibold opacity-95", children: "Kachua Govt Pilot High School" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base opacity-80", children: "বাংলা-প্রথম শিক্ষালয় · ক্লাস · PDF · লাইভ ক্লাস · কুইজ · গেম" })
    ] }) })
  ] });
}
const $$splitComponentImporter$o = () => import("./subjects-DwGN_Xoy.mjs");
const Route$s = createFileRoute("/subjects")({
  head: () => ({
    meta: [{
      title: "বিষয়সমূহ · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./students-CMv8Iyjr.mjs");
const Route$r = createFileRoute("/students")({
  head: () => ({
    meta: [{
      title: "Student Registration · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./student-health-XiSm2S4-.mjs");
const Route$q = createFileRoute("/student-health")({
  head: () => ({
    meta: [{
      title: "শিক্ষার্থী স্বাস্থ্য ও মন · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./special-game-tM1etfGa.mjs");
const Route$p = createFileRoute("/special-game")({
  head: () => ({
    meta: [{
      title: "Special Games · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./search-BbNfqR-R.mjs");
const Route$o = createFileRoute("/search")({
  head: () => ({
    meta: [{
      title: "Advanced Search · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const nav = [
  { to: "/dashboard", label: "শুরু", icon: House },
  { to: "/school", label: "স্কুল", icon: University },
  { to: "/students", label: "ছাত্র", icon: GraduationCap },
  { to: "/competitions", label: "প্রতিযোগিতা", icon: Trophy },
  { to: "/subjects", label: "বিষয়", icon: BookOpen },
  { to: "/search", label: "সার্চ", icon: Search },
  { to: "/bani", label: "সহায়ক", icon: MessageCircleHeart },
  { to: "/student-health", label: "স্বাস্থ্য", icon: Activity },
  { to: "/quiz", label: "কুইজ", icon: Brain },
  { to: "/special-game", label: "Special Game", icon: Swords },
  { to: "/free-board", label: "বোর্ড", icon: Palette },
  { to: "/classmates", label: "ক্লাসমেট", icon: Users },
  { to: "/live-class", label: "লাইভ", icon: Video },
  { to: "/library", label: "লাইব্রেরি", icon: BookOpen },
  { to: "/certificates", label: "সার্টিফিকেট", icon: ScrollText },
  { to: "/leaderboard", label: "র‍্যাঙ্ক", icon: Trophy }
];
function AppShell({ children }) {
  const auth2 = useRequireAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = auth2.profile;
  if (auth2.loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-8 text-center max-w-md w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3 animate-float", children: "📚" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "তোমার স্কুল লোড হচ্ছে" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "সেশন যাচাই করা হচ্ছে, একটু অপেক্ষা করো।" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden lg:flex w-64 flex-col gap-2 p-4 sticky top-0 h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "flex items-center gap-2 px-3 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/e-pathshala-logo.png",
            alt: "E-পাঠশালা",
            className: "w-12 h-12 rounded-2xl object-cover shadow-glow bg-white"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-lg leading-none", children: "E-পাঠশালা" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "ডিজিটাল শেখার স্কুল" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-1 mt-2", children: nav.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.to || pathname.startsWith(item.to + "/");
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            className: cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
              active ? "bg-gradient-hero text-white shadow-soft" : "text-sidebar-foreground hover:bg-sidebar-accent"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }),
              item.label
            ]
          },
          item.to
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto glass rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-gradient-orange grid place-items-center text-2xl", children: user.avatar }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold truncate", children: user.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "Class ",
              user.class,
              " · ",
              user.role.charAt(0).toUpperCase() + user.role.slice(1),
              " · Lv",
              " ",
              user.level
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            "🔥 ",
            user.streak,
            "d"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            "⭐ ",
            user.xp
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            "🪙 ",
            user.coins
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => void auth2.signOut(),
            className: "mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted/80 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DoorOpen, { className: "w-4 h-4" }),
              "Logout"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 min-w-0 pb-24 lg:pb-8", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "lg:hidden fixed bottom-3 left-3 right-3 z-40 glass-strong rounded-2xl px-2 py-2 flex items-center justify-around overflow-x-auto", children: nav.slice(0, 7).map((item) => {
      const Icon = item.icon;
      const active = pathname === item.to || pathname.startsWith(item.to + "/");
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.to,
          className: cn(
            "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-medium",
            active ? "text-primary" : "text-muted-foreground"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }),
            item.label
          ]
        },
        item.to
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "fixed left-1/2 -translate-x-1/2 bottom-20 lg:bottom-4 z-30 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-auto glass-strong px-4 py-2 rounded-full text-[11px] md:text-xs text-muted-foreground shadow-soft text-center", children: "Created & Developed by Fardin Hasan, Kachua Govt Pilot High School. Firebase-powered learning workspace." }) })
  ] });
}
const STORAGE_KEYS = {
  schools: "epathshala:ecosystem:schools",
  students: "epathshala:ecosystem:students",
  competitions: "epathshala:ecosystem:competitions",
  posts: "epathshala:ecosystem:posts",
  library: "epathshala:ecosystem:library"
};
const RTDB_KEYS = {
  schools: "epathshala/ecosystem/schools",
  students: "epathshala/ecosystem/students",
  competitions: "epathshala/ecosystem/competitions",
  posts: "epathshala/ecosystem/posts",
  library: "epathshala/ecosystem/library"
};
const rtdbUnsubscribers = /* @__PURE__ */ new Map();
const seedSchools = [
  {
    id: "school-drmc",
    schoolCode: "EP-2026-001245",
    schoolSerialNumber: "SCH-0001",
    verified: true,
    verificationStatus: "Verified Institution",
    schoolName: "Dhaka Residential Model College",
    eiinNumber: "109876",
    logo: "🏫",
    address: "Mirpur, Dhaka, Bangladesh",
    principal: "Prof. A. K. M. Hasan",
    phone: "+880-2-9000123",
    district: "Dhaka",
    division: "Dhaka",
    students: 3421,
    teachers: 156,
    achievements: [
      "National Olympiad top-10",
      "3 consecutive debate titles",
      "Best digital school 2026"
    ],
    competitionRankings: ["Top Schools #1", "Top Debaters #2", "Top Quiz Masters #4"],
    gallery: ["Innovation Week", "Science Fair", "Debate Finals", "Library Night"],
    about: "A flagship model for Bangladesh digital education with strong academics, competitions, and student leadership."
  },
  {
    id: "school-bcpsc",
    schoolCode: "EP-2026-000882",
    schoolSerialNumber: "SCH-0002",
    verified: true,
    verificationStatus: "Verified Institution",
    schoolName: "BCSIR School & College",
    eiinNumber: "112233",
    logo: "🧪",
    address: "Agargaon, Dhaka, Bangladesh",
    principal: "Dr. Salma Rahman",
    phone: "+880-2-55550123",
    district: "Dhaka",
    division: "Dhaka",
    students: 2190,
    teachers: 121,
    achievements: ["Science fair champions", "Top coding school", "STEM leadership award"],
    competitionRankings: ["Top Innovators #1", "Top Coders #3"],
    gallery: ["Lab Expo", "Coding Camp", "Robotics Club", "Poster Day"],
    about: "A STEM-first school profile built for science, coding, and project-based learning."
  },
  {
    id: "school-rangpur",
    schoolCode: "EP-2026-004521",
    schoolSerialNumber: "SCH-0003",
    verified: true,
    verificationStatus: "Verified Institution",
    schoolName: "Rangpur Cantonment Public School",
    eiinNumber: "145678",
    logo: "🌳",
    address: "Rangpur Sadar, Rangpur, Bangladesh",
    principal: "Col. Farhana Akter",
    phone: "+880-521-123456",
    district: "Rangpur",
    division: "Rangpur",
    students: 1840,
    teachers: 98,
    achievements: ["Regional quiz finalists", "Library growth award"],
    competitionRankings: ["Top Schools #9"],
    gallery: ["Campus Walk", "Quiz Arena", "Library"],
    about: "A regional school profile pending official ecosystem verification."
  }
];
const seedStudents = [
  {
    id: "EP-STU-260001",
    schoolId: "school-drmc",
    schoolCode: "EP-2026-001245",
    schoolName: "Dhaka Residential Model College",
    fullName: "Fahim Hasan",
    photo: "🧑‍🎓",
    classLevel: 8,
    section: "A",
    roll: "14",
    studentId: "EP-STU-260001",
    bloodGroup: "B+",
    contact: "01711-123456",
    guardianName: "Mr. Kamrul Hasan",
    guardianRelation: "Father",
    guardianPhone: "01911-123456",
    status: "Valid Student",
    achievements: ["Science quiz finalist", "7-day streak", "Debate team"],
    competitionHistory: ["Quiz Battles", "District Olympiad", "Debate Battle"],
    academicRecords: [
      { term: "Mid-term", gpa: "5.00", remark: "Excellent" },
      { term: "Terminal", gpa: "4.93", remark: "Strong performance" }
    ]
  },
  {
    id: "EP-STU-260002",
    schoolId: "school-drmc",
    schoolCode: "EP-2026-001245",
    schoolName: "Dhaka Residential Model College",
    fullName: "Nafisa Rahman",
    photo: "👩‍🎓",
    classLevel: 10,
    section: "B",
    roll: "07",
    studentId: "EP-STU-260002",
    bloodGroup: "O+",
    contact: "01811-998877",
    guardianName: "Mrs. Jahanara Rahman",
    guardianRelation: "Mother",
    guardianPhone: "01711-998877",
    status: "Valid Student",
    achievements: ["Top coder", "Science fair medal"],
    competitionHistory: ["Coding Competition", "Science Fair Arena"],
    academicRecords: [
      { term: "Mid-term", gpa: "4.98", remark: "Outstanding" },
      { term: "Terminal", gpa: "5.00", remark: "Honor roll" }
    ]
  },
  {
    id: "EP-STU-260003",
    schoolId: "school-bcpsc",
    schoolCode: "EP-2026-000882",
    schoolName: "BCSIR School & College",
    fullName: "Sabbir Hossain",
    photo: "🧑‍🔬",
    classLevel: 9,
    section: "C",
    roll: "03",
    studentId: "EP-STU-260003",
    bloodGroup: "A+",
    contact: "01611-554433",
    guardianName: "Mr. Anwar Hossain",
    guardianRelation: "Father",
    guardianPhone: "01711-554433",
    status: "Suspended",
    achievements: ["Laboratory project"],
    competitionHistory: ["Olympiad qualifier"],
    academicRecords: [{ term: "Mid-term", gpa: "4.30", remark: "Needs review" }]
  }
];
const seedCompetitions = [
  {
    id: "comp-quiz-01",
    category: "Quiz Battles",
    title: "School A vs School B: National Quiz Night",
    description: "Real-time scoreboard with fast question rounds and team ranking.",
    schoolA: "Dhaka Residential Model College",
    schoolB: "BCSIR School & College",
    status: "Live",
    scoreboard: { left: 420, right: 390 },
    judgeScore: 92,
    participants: 48
  },
  {
    id: "comp-debate-01",
    category: "Debate Battles",
    title: "Climate Action Youth Debate",
    description: "Topic announcement, team registration, video submission, and judge scoring.",
    schoolA: "Rangpur Cantonment Public School",
    schoolB: "Dhaka Residential Model College",
    status: "Judging",
    scoreboard: { left: 78, right: 84 },
    judgeScore: 89,
    participants: 16
  },
  {
    id: "comp-science-01",
    category: "Science Fair Arena",
    title: "Virtual Science Fair Arena",
    description: "Project uploads, visitor votes, and AI support for evaluation.",
    schoolA: "BCSIR School & College",
    schoolB: "Rangpur Cantonment Public School",
    status: "Upcoming",
    scoreboard: { left: 0, right: 0 },
    judgeScore: 0,
    participants: 72
  }
];
const seedPosts = [
  {
    id: "post-01",
    author: "Fahim Hasan",
    authorRole: "Student",
    schoolName: "Dhaka Residential Model College",
    title: "Uploaded my class 8 science note",
    body: "Shared a short note with diagrams for the water cycle and some revision questions.",
    tags: ["#science", "#notes", "#class8"],
    likes: 124,
    replies: 18
  },
  {
    id: "post-02",
    author: "Prof. A. K. M. Hasan",
    authorRole: "Teacher",
    schoolName: "Dhaka Residential Model College",
    title: "New debate topic announced",
    body: "The motion this week is about digital learning improving rural access.",
    tags: ["#debate", "#digital", "#school"],
    likes: 88,
    replies: 11
  },
  {
    id: "post-03",
    author: "BCSIR School & College",
    authorRole: "School",
    schoolName: "BCSIR School & College",
    title: "Robotics team shortlisted",
    body: "Our junior robotics team will represent the school in the national innovation challenge.",
    tags: ["#robotics", "#innovation", "#stem"],
    likes: 203,
    replies: 29
  }
];
const seedLibraryAssets = [
  {
    id: "asset-1",
    title: "Class 6 Mathematics PDF",
    kind: "PDF",
    subject: "গণিত",
    shelf: "left",
    url: "https://example.com/class-6-math.pdf",
    uploadedBy: "Admin",
    uploadedAt: Date.now(),
    description: "Printable textbook on the left shelf."
  },
  {
    id: "asset-2",
    title: "Bangla Note - Grammar",
    kind: "Note",
    subject: "বাংলা",
    shelf: "left",
    url: "https://example.com/bangla-note",
    uploadedBy: "Teacher",
    uploadedAt: Date.now(),
    description: "Revision note for the note shelf."
  },
  {
    id: "asset-3",
    title: "Audio Story - Shonar Tori",
    kind: "Audio",
    subject: "বাংলা",
    shelf: "middle",
    url: "https://example.com/audio-story.mp3",
    uploadedBy: "Librarian",
    uploadedAt: Date.now(),
    description: "Middle shelf audio experience."
  },
  {
    id: "asset-4",
    title: "Nolok Novel Starter",
    kind: "Novel",
    subject: "সাহিত্য",
    shelf: "middle",
    url: "https://example.com/novel",
    uploadedBy: "Library",
    uploadedAt: Date.now(),
    description: "Novels shelf for slow reading."
  },
  {
    id: "asset-5",
    title: "AR Heart Model",
    kind: "AR Model",
    subject: "বিজ্ঞান",
    shelf: "right",
    url: "https://example.com/heart-model.glb",
    uploadedBy: "STEM Team",
    uploadedAt: Date.now(),
    description: "3D AR model to place on the right shelf."
  }
];
const libraryItems = [
  {
    id: "lib-text-1",
    category: "Textbooks",
    title: "Class 1-12 National Textbooks",
    level: "Primary to HSC",
    format: "Book",
    description: "Quick search across class, subject, and edition with one-tap reading.",
    accent: "from-amber-200 via-amber-100 to-white"
  },
  {
    id: "lib-bank-1",
    category: "Question Banks",
    title: "SSC and HSC Exam Banks",
    level: "Board prep",
    format: "Book",
    description: "Practice sets grouped by exam, year, and difficulty.",
    accent: "from-sky-200 via-cyan-100 to-white"
  },
  {
    id: "lib-novel-1",
    category: "Novels",
    title: "Bangla and English Story Shelf",
    level: "Reading club",
    format: "Audio",
    description: "Beginner-friendly novels with audiobook playback.",
    accent: "from-rose-200 via-pink-100 to-white"
  },
  {
    id: "lib-science-1",
    category: "Virtual Labs",
    title: "Interactive Science Labs",
    level: "Class 6-10",
    format: "Lab",
    description: "Animated experiments and 3D-ready lessons.",
    accent: "from-emerald-200 via-green-100 to-white"
  },
  {
    id: "lib-3d-1",
    category: "3D Models",
    title: "AR Learning Models",
    level: "Future classroom",
    format: "Model",
    description: "Rotate, inspect, and explore curriculum concepts in 3D.",
    accent: "from-violet-200 via-fuchsia-100 to-white"
  },
  {
    id: "lib-audio-1",
    category: "Audiobooks",
    title: "Bangla Audiobook Reader",
    level: "Everyday reading",
    format: "Audio",
    description: "Play books directly while students read along.",
    accent: "from-indigo-200 via-blue-100 to-white"
  }
];
const isBrowser = () => typeof window !== "undefined";
function readCollection(key, fallback) {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function normalizeCollection(value, fallback) {
  if (Array.isArray(value))
    return value.filter((item) => item !== null && item !== void 0);
  if (value && typeof value === "object") {
    return Object.values(value).filter(
      (item) => item !== null && item !== void 0
    );
  }
  return fallback;
}
function writeCollection(key, value) {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(key));
}
function writeRemoteCollection(key, value) {
  if (!firebaseEnabled || !isBrowser()) return;
  const rtdb2 = getFirebaseRtdb();
  if (!rtdb2) return;
  void set(ref(rtdb2, RTDB_KEYS[key]), value).catch(() => {
  });
}
function seedCollection(key, fallback) {
  if (!isBrowser()) return fallback;
  const existing = localStorage.getItem(key);
  if (!existing) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  return readCollection(key, fallback);
}
function subscribeCollection(key, fallback, onChange) {
  if (!isBrowser()) {
    onChange(fallback);
    return () => {
    };
  }
  const next = seedCollection(STORAGE_KEYS[key], fallback);
  onChange(next);
  const listener = () => onChange(readCollection(STORAGE_KEYS[key], fallback));
  window.addEventListener(STORAGE_KEYS[key], listener);
  window.addEventListener("storage", listener);
  if (firebaseEnabled && !rtdbUnsubscribers.has(key)) {
    const rtdb2 = getFirebaseRtdb();
    if (rtdb2) {
      const collectionRef = ref(rtdb2, RTDB_KEYS[key]);
      const unsub = onValue(
        collectionRef,
        (snapshot) => {
          const remote = snapshot.exists() ? normalizeCollection(snapshot.val(), fallback) : fallback;
          writeCollection(STORAGE_KEYS[key], remote);
          onChange(remote);
          if (!snapshot.exists()) {
            void set(collectionRef, fallback).catch(() => {
            });
          }
        },
        () => {
          onChange(readCollection(STORAGE_KEYS[key], fallback));
        }
      );
      rtdbUnsubscribers.set(key, unsub);
    }
  }
  return () => {
    window.removeEventListener(STORAGE_KEYS[key], listener);
    window.removeEventListener("storage", listener);
    const unsub = rtdbUnsubscribers.get(key);
    if (unsub) {
      unsub();
      rtdbUnsubscribers.delete(key);
    }
  };
}
function ensureEcosystemSeed() {
  if (!isBrowser()) return;
  seedCollection(STORAGE_KEYS.schools, seedSchools);
  seedCollection(STORAGE_KEYS.students, seedStudents);
  seedCollection(STORAGE_KEYS.competitions, seedCompetitions);
  seedCollection(STORAGE_KEYS.posts, seedPosts);
  seedCollection(STORAGE_KEYS.library, seedLibraryAssets);
}
function listenSchools(onChange) {
  return subscribeCollection("schools", seedSchools, onChange);
}
function listenStudents(onChange) {
  return subscribeCollection("students", seedStudents, onChange);
}
function listenLibraryAssets(onChange) {
  return subscribeCollection("library", seedLibraryAssets, onChange);
}
function getSchools() {
  return seedCollection(STORAGE_KEYS.schools, seedSchools);
}
function getStudents() {
  return seedCollection(STORAGE_KEYS.students, seedStudents);
}
function getCompetitions() {
  return seedCollection(STORAGE_KEYS.competitions, seedCompetitions);
}
function getSocialPosts() {
  return seedCollection(STORAGE_KEYS.posts, seedPosts);
}
function getLibraryAssets() {
  return seedCollection(STORAGE_KEYS.library, seedLibraryAssets);
}
function getSchoolById(id) {
  return getSchools().find((school) => school.id === id) ?? null;
}
function getStudentById(id) {
  return getStudents().find((student) => student.studentId === id || student.id === id) ?? null;
}
function getStudentsBySchool(schoolId) {
  return getStudents().filter((student) => student.schoolId === schoolId);
}
function saveSchool(record) {
  const schools = getSchools();
  const index = schools.findIndex(
    (school) => school.id === record.id || school.schoolCode === record.schoolCode
  );
  if (index >= 0) schools[index] = record;
  else schools.unshift(record);
  writeCollection(STORAGE_KEYS.schools, schools);
  writeRemoteCollection("schools", schools);
  return record;
}
function saveStudent(record) {
  const students = getStudents();
  const index = students.findIndex(
    (student) => student.id === record.id || student.studentId === record.studentId
  );
  if (index >= 0) students[index] = record;
  else students.unshift(record);
  writeCollection(STORAGE_KEYS.students, students);
  writeRemoteCollection("students", students);
  return record;
}
function saveLibraryAsset(record) {
  const assets = getLibraryAssets();
  const index = assets.findIndex((asset) => asset.id === record.id);
  if (index >= 0) assets[index] = record;
  else assets.unshift(record);
  writeCollection(STORAGE_KEYS.library, assets);
  writeRemoteCollection("library", assets);
  return record;
}
function createSchoolCode() {
  const number = Math.floor(1e5 + Math.random() * 9e5);
  return `EP-2026-${String(number).padStart(6, "0")}`;
}
function createSchoolSerialNumber() {
  return `SCH-${String(Math.floor(1 + Math.random() * 9999)).padStart(4, "0")}`;
}
function createStudentId() {
  return `EP-STU-${String(Math.floor(1e5 + Math.random() * 9e5))}`;
}
function createVerificationUrl(studentId) {
  return createAppUrl(`/students/${encodeURIComponent(studentId)}`);
}
function createAppUrl(pathname) {
  if (isBrowser() && window.location?.origin) {
    return new URL(pathname, window.location.origin).toString();
  }
  return pathname;
}
function pseudoQrSvgDataUrl(text) {
  const size = 29;
  const cells = Array.from({ length: size }, () => Array.from({ length: size }, () => false));
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = hash * 31 + text.charCodeAt(index) >>> 0;
  }
  const fill = (x, y, v) => {
    if (x >= 0 && y >= 0 && x < size && y < size) cells[y][x] = v;
  };
  const patterns = [
    [0, 0],
    [size - 7, 0],
    [0, size - 7]
  ];
  patterns.forEach(([sx, sy]) => {
    for (let y = 0; y < 7; y += 1) {
      for (let x = 0; x < 7; x += 1) {
        const edge = x === 0 || y === 0 || x === 6 || y === 6;
        const inner = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        fill(sx + x, sy + y, edge || inner);
      }
    }
  });
  for (let y = 8; y < size - 8; y += 1) {
    for (let x = 8; x < size - 8; x += 1) {
      const bit = hash >> (x + y) % 24 & 1;
      fill(x, y, bit === 1 || (x * y + hash) % 11 === 0);
    }
  }
  const moduleSize = 6;
  const margin = 8;
  const dimension = size * moduleSize + margin * 2;
  const rects = [];
  cells.forEach((row, y) => {
    row.forEach((filled, x) => {
      if (!filled) return;
      rects.push(
        `<rect x="${margin + x * moduleSize}" y="${margin + y * moduleSize}" width="${moduleSize}" height="${moduleSize}" rx="1.2" fill="#111827"/>`
      );
    });
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${dimension}" height="${dimension}" viewBox="0 0 ${dimension} ${dimension}"><rect width="100%" height="100%" fill="white"/>${rects.join("")}</svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
function searchCatalog(query2) {
  const normalized = query2.trim().toLowerCase();
  if (!normalized) return defaultSearchResults();
  const results = [];
  getSchools().forEach((school) => {
    const haystack = `${school.schoolName} ${school.schoolCode} ${school.address} ${school.district} ${school.division} ${school.about}`.toLowerCase();
    const score = scoreMatch(normalized, haystack);
    if (score > 0) {
      results.push({
        type: "School",
        title: school.schoolName,
        subtitle: `${school.schoolCode} · ${school.verificationStatus}`,
        href: `/schools/${school.id}`,
        score
      });
    }
  });
  getStudents().forEach((student) => {
    const haystack = `${student.fullName} ${student.studentId} ${student.schoolName} ${student.section} ${student.roll} ${student.achievements.join(" ")}`.toLowerCase();
    const score = scoreMatch(normalized, haystack);
    if (score > 0) {
      results.push({
        type: "Student",
        title: student.fullName,
        subtitle: `${student.schoolName} · Class ${student.classLevel} · Roll ${student.roll}`,
        href: `/students/${student.studentId}`,
        score
      });
    }
  });
  libraryItems.forEach((item) => {
    const haystack = `${item.category} ${item.title} ${item.level} ${item.description}`.toLowerCase();
    const score = scoreMatch(normalized, haystack);
    if (score > 0) {
      results.push({
        type: "Book",
        title: item.title,
        subtitle: `${item.category} · ${item.level}`,
        href: "/library",
        score
      });
    }
  });
  getCompetitions().forEach((competition) => {
    const haystack = `${competition.category} ${competition.title} ${competition.description} ${competition.schoolA} ${competition.schoolB}`.toLowerCase();
    const score = scoreMatch(normalized, haystack);
    if (score > 0) {
      results.push({
        type: "Competition",
        title: competition.title,
        subtitle: `${competition.category} · ${competition.status}`,
        href: "/competitions",
        score
      });
    }
  });
  getSocialPosts().forEach((post) => {
    const haystack = `${post.author} ${post.title} ${post.body} ${post.tags.join(" ")}`.toLowerCase();
    const score = scoreMatch(normalized, haystack);
    if (score > 0) {
      results.push({
        type: "Note",
        title: post.title,
        subtitle: `${post.author} · ${post.schoolName}`,
        href: "/classmates",
        score
      });
    }
  });
  return results.sort((a, b) => b.score - a.score).slice(0, 20);
}
function scoreMatch(query2, haystack) {
  if (haystack.includes(query2)) return 100 + query2.length;
  const terms = query2.split(/\s+/).filter(Boolean);
  let score = 0;
  for (const term of terms) {
    if (haystack.includes(term)) score += 15;
  }
  return score;
}
function defaultSearchResults() {
  return [
    {
      type: "School",
      title: "Dhaka Residential Model College",
      subtitle: "EP-2026-001245 · Verified Institution",
      href: "/schools/school-drmc",
      score: 88
    },
    {
      type: "Student",
      title: "Fahim Hasan",
      subtitle: "Class 8 · Roll 14",
      href: "/students/EP-STU-260001",
      score: 87
    },
    {
      type: "Competition",
      title: "National Quiz Night",
      subtitle: "Quiz Battles · Live",
      href: "/competitions",
      score: 82
    }
  ];
}
const Route$n = createFileRoute("/schools")({
  head: () => ({ meta: [{ title: "স্কুল · E-পাঠশালা" }] }),
  component: Schools
});
function Schools() {
  ensureEcosystemSeed();
  const [schools, setSchools] = reactExports.useState(getSchools());
  const students = getStudents();
  const competitions = getCompetitions();
  const posts = getSocialPosts();
  const [form, setForm] = reactExports.useState(() => ({
    schoolName: "",
    eiinNumber: "",
    address: "",
    principal: "",
    phone: "",
    district: "Dhaka",
    division: "Dhaka",
    logo: "🏫",
    about: ""
  }));
  const [selectedSchoolCode, setSelectedSchoolCode] = reactExports.useState(schools[0]?.schoolCode ?? "");
  reactExports.useEffect(() => listenSchools(setSchools), []);
  const selectedSchool = reactExports.useMemo(
    () => schools.find(
      (school) => school.schoolCode === selectedSchoolCode || school.id === selectedSchoolCode
    ) ?? schools[0],
    [schools, selectedSchoolCode]
  );
  const verifiedCount = schools.filter((school) => school.verified).length;
  const setSchoolLogoFromFile = (file) => {
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
    const school = {
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
      about: form.about.trim() || "New school account registered in E-পাঠশালা."
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
      about: ""
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "glass-strong rounded-[2rem] p-6 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1.5 text-xs font-semibold text-brand-blue", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
          " স্কুল অ্যাকাউন্ট সিস্টেম"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold md:text-5xl", children: "স্কুল নিবন্ধন, প্রোফাইল আর ইকোসিস্টেম এক পাতায়" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-3xl text-sm leading-6 text-muted-foreground md:text-base", children: "প্রতিটি স্কুল এখন সরাসরি যাচাইকৃতভাবে যুক্ত হয়, আর নিচে ছাত্র, প্রতিযোগিতা, লাইব্রেরি আর জাতীয় শিক্ষার পুরো চিত্র একসঙ্গে দেখা যায়।" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "স্কুল", value: schools.length.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "যাচাইকৃত", value: verifiedCount.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "ছাত্র", value: students.length.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "প্রতিযোগিতা", value: competitions.length.toString() })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-5 xl:grid-cols-[0.95fr_1.05fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-5 md:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "স্কুল নিবন্ধন করুন" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "স্কুলের নাম",
                value: form.schoolName,
                onChange: (value) => setForm((current) => ({ ...current, schoolName: value })),
                placeholder: "Dhaka Residential Model College"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "EIIN নম্বর",
                value: form.eiinNumber,
                onChange: (value) => setForm((current) => ({ ...current, eiinNumber: value })),
                placeholder: "109876"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "প্রধান শিক্ষক",
                value: form.principal,
                onChange: (value) => setForm((current) => ({ ...current, principal: value })),
                placeholder: "Principal name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "ফোন",
                value: form.phone,
                onChange: (value) => setForm((current) => ({ ...current, phone: value })),
                placeholder: "+880..."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "জেলা",
                value: form.district,
                onChange: (value) => setForm((current) => ({ ...current, district: value })),
                placeholder: "Dhaka"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "বিভাগ",
                value: form.division,
                onChange: (value) => setForm((current) => ({ ...current, division: value })),
                placeholder: "Dhaka"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5 text-sm font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "লোগো আপলোড" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  onChange: (event) => setSchoolLogoFromFile(event.target.files?.[0] ?? null),
                  className: "w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "ঠিকানা",
                value: form.address,
                onChange: (value) => setForm((current) => ({ ...current, address: value })),
                placeholder: "Campus address"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "স্কুল পরিচিতি",
                value: form.about,
                onChange: (value) => setForm((current) => ({ ...current, about: value })),
                placeholder: "Short school profile"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleRegister,
              className: "mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 text-sm font-semibold text-white shadow-soft",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserRoundPlus, { className: "h-4 w-4" }),
                "স্কুল অ্যাকাউন্ট তৈরি করুন"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-5 md:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "যাচাইকৃত স্কুল" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "নতুন স্কুল যোগ হলেই সেটি যাচাইকৃত হিসেবে লাইভ হয়।" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-5 w-5 text-brand-green" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: schools.map((school) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedSchoolCode(school.schoolCode),
              className: `w-full rounded-3xl border p-4 text-left transition-all ${selectedSchool?.id === school.id ? "border-primary bg-primary/10" : "border-border bg-background/80 hover:bg-muted/50"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero text-2xl text-white shadow-soft", children: school.logo }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-semibold", children: school.schoolName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `rounded-full px-2.5 py-1 text-[11px] font-semibold ${school.verified ? "bg-brand-green text-white" : "bg-muted text-muted-foreground"}`,
                        children: school.verificationStatus === "Verified Institution" ? "যাচাইকৃত" : "অপেক্ষমাণ"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
                    school.schoolCode,
                    " · EIIN ",
                    school.eiinNumber,
                    " · শিক্ষার্থী",
                    " ",
                    school.students.toLocaleString()
                  ] })
                ] })
              ] })
            },
            school.id
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        selectedSchool ? /* @__PURE__ */ jsxRuntimeExports.jsx(SchoolProfileCard, { school: selectedSchool }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-strong rounded-[2rem] p-6 text-sm text-muted-foreground", children: "No school found." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: "School dashboard access" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Students, teachers, notices, events, results and analytics." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-5 w-5 text-primary" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3", children: ["Students", "Teachers", "Notices", "Events", "Results", "Attendance"].map(
            (item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl border border-border bg-background/80 p-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: item }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
                    "স্কুল ড্যাশবোর্ড থেকে ",
                    item.toLowerCase(),
                    " পরিচালনা করুন।"
                  ] })
                ]
              },
              item
            )
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/students",
                className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-blue px-4 py-2.5 text-sm font-semibold text-white shadow-soft",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(University, { className: "h-4 w-4" }),
                  " Register students"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/search",
                className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted/70",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
                  " Search profiles"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 lg:grid-cols-[1.15fr_0.85fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-6 md:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm uppercase tracking-[0.2em] text-muted-foreground", children: "Ecosystem overview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "জাতীয় শিক্ষা ইকোসিস্টেম" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-5 w-5 text-primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MiniCard,
            {
              title: "Verified school flow",
              description: "স্কুল কোড, সিরিয়াল, প্রোফাইল এবং লাইভ যাচাইকরণ।",
              icon: ShieldCheck,
              href: "/school"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MiniCard,
            {
              title: "Digital student IDs",
              description: "QR verification, school tags আর PDF-ready ID card।",
              icon: WandSparkles,
              href: "/students"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MiniCard,
            {
              title: "Competition arena",
              description: "Quiz, debate, olympiad আর team battle একসাথে।",
              icon: Trophy,
              href: "/competitions"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MiniCard,
            {
              title: "Library + search",
              description: "Bookshelf, notes, AR model আর smart search।",
              icon: LibraryBig,
              href: "/library"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-brand-blue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: "সাম্প্রতিক activity" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: posts.slice(0, 3).map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-background/80 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: post.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
              post.author,
              " · ",
              post.schoolName
            ] })
          ] }, post.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-brand-orange" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: "লাইব্রেরি ঝলক" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: libraryItems.slice(0, 3).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-white/80 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              item.category,
              " · ",
              item.level
            ] })
          ] }, item.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/library",
              className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary",
              children: [
                "লাইব্রেরি খুলুন ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
function SchoolProfileCard({ school }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-6 md:p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center overflow-hidden rounded-[1.5rem] bg-gradient-hero text-3xl text-white shadow-soft", children: isImageData(school.logo) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: school.logo,
            alt: school.schoolName,
            className: "h-full w-full object-cover"
          }
        ) : school.logo }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
            " ",
            school.verificationStatus === "Verified Institution" ? "যাচাইকৃত প্রতিষ্ঠান" : "অপেক্ষমাণ"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-2xl font-bold md:text-3xl", children: school.schoolName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
            "স্কুল কোড: ",
            school.schoolCode,
            " · সিরিয়াল: ",
            school.schoolSerialNumber
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/schools/$schoolId",
          params: { schoolId: school.id },
          className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-2.5 text-sm font-semibold text-white shadow-soft",
          children: "সম্পূর্ণ প্রোফাইল"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "শিক্ষার্থী", value: school.students.toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "শিক্ষক", value: school.teachers.toString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "EIIN", value: school.eiinNumber })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 lg:grid-cols-[1fr_0.9fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-background/80 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: "স্কুল পরিচিতি" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-6 text-muted-foreground", children: school.about }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "প্রধান শিক্ষক:" }),
          " ",
          school.principal
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "ঠিকানা:" }),
          " ",
          school.address
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "জেলা/বিভাগ:" }),
          " ",
          school.district,
          ", ",
          school.division
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-background/80 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: "অর্জন" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-2", children: school.achievements.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-brand-orange/10 px-3 py-2 text-sm", children: item }, item)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 font-bold", children: "র‍্যাংকিং" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-2", children: school.competitionRankings.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-brand-blue/10 px-3 py-2 text-sm", children: item }, item)) })
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        value,
        onChange: (event) => onChange(event.target.value),
        placeholder,
        className: "w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
      }
    )
  ] });
}
function Metric({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-white/70 bg-white/80 p-4 text-center shadow-soft backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xl font-bold", children: value })
  ] });
}
function Info({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background/80 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xl font-bold", children: value })
  ] });
}
function MiniCard({
  title,
  description,
  icon: Icon,
  href
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: href,
      className: "rounded-[1.6rem] border border-white/60 bg-white/80 p-4 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-glow",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-2xl bg-gradient-hero text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-5 text-muted-foreground", children: description })
        ] })
      ] })
    }
  );
}
function isImageData(value) {
  return /^data:image\//i.test(value) || /^https?:\/\//i.test(value);
}
const $$splitComponentImporter$j = () => import("./school-DpKcW6xB.mjs");
const Route$m = createFileRoute("/school")({
  head: () => ({
    meta: [{
      title: "স্কুল · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./quizzes-DMcblO0J.mjs");
const Route$l = createFileRoute("/quizzes")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./quiz-lQAPFIwg.mjs");
const Route$k = createFileRoute("/quiz")({
  head: () => ({
    meta: [{
      title: "কুইজ · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitNotFoundComponentImporter$1 = () => import("./pdf-viewer-Cw-dCcSo.mjs");
const $$splitComponentImporter$g = () => import("./pdf-viewer-DGmLlVAm.mjs");
const Route$j = createFileRoute("/pdf-viewer")({
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
  component: lazyRouteComponent($$splitComponentImporter$g, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent")
});
const $$splitComponentImporter$f = () => import("./login-IcBvLGu3.mjs");
const Route$i = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "প্রবেশ · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./live-class-DFWHt3wB.mjs");
const Route$h = createFileRoute("/live-class")({
  head: () => ({
    meta: [{
      title: "লাইভ ক্লাস · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./library-B1KMFaCu.mjs");
const Route$g = createFileRoute("/library")({
  head: () => ({
    meta: [{
      title: "লাইব্রেরি · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./leaderboard-CB34pVAa.mjs");
const Route$f = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [{
      title: "জাতীয় লিডারবোর্ড · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const classLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const liveClasses = [
  {
    classLevel: 1,
    title: "সংখ্যা আর গল্পের প্রথম ধাপ",
    teacher: "Ms. Rina",
    time: "Today · 6:00 PM",
    room: "EPathshala-BD-Class-1",
    description: "পড়া, গণনা, আর রিয়েল-টাইম প্রশ্নের জন্য সহজ-সাবলীল লাইভ রুম।"
  },
  {
    classLevel: 2,
    title: "বাংলা, ইংরেজি, আর মজার গণিত অনুশীলন",
    teacher: "Mr. Arif",
    time: "Tomorrow · 5:30 PM",
    room: "EPathshala-BD-Class-2",
    description: "শিক্ষকের ফিডব্যাক আর শিক্ষার্থীদের অংশগ্রহণসহ ছোট লাইভ প্র্যাকটিস।"
  },
  {
    classLevel: 3,
    title: "সমস্যা সমাধানের ঘণ্টা",
    teacher: "Ms. Nadia",
    time: "Wed · 5:00 PM",
    room: "EPathshala-BD-Class-3",
    description: "শ্রেণি ৩-এর শিক্ষার্থীরা টেবিল, ব্যাকরণ, আর বিজ্ঞানের তথ্য অনুশীলন করে।"
  },
  {
    classLevel: 4,
    title: "পড়া, বলা, আর কুইজের সময়",
    teacher: "Mr. Hasan",
    time: "Thu · 6:15 PM",
    room: "EPathshala-BD-Class-4",
    description: "প্র্যাকটিস টাস্ক আর দ্রুত রিভিশন রাউন্ডসহ লাইভ ক্লাস।"
  },
  {
    classLevel: 5,
    title: "বাংলাদেশ পড়ার স্প্রিন্ট",
    teacher: "Ms. Jannat",
    time: "Fri · 7:00 PM",
    room: "EPathshala-BD-Class-5",
    description: "উচ্চ প্রাথমিক শিক্ষার্থীদের জন্য ফোকাসড লাইভ সেশন।"
  },
  {
    classLevel: 6,
    title: "মাধ্যমিক ব্রিজ ক্লাস",
    teacher: "Mr. Rafi",
    time: "Sat · 5:15 PM",
    room: "EPathshala-BD-Class-6",
    description: "প্রাথমিক মাধ্যমিক শিক্ষার্থীদের জন্য মূল পাঠের রিভিশন রুম।"
  },
  {
    classLevel: 7,
    title: "ইংরেজি ও বিজ্ঞান ক্লিনিক",
    teacher: "Ms. Tahmina",
    time: "Sun · 6:00 PM",
    room: "EPathshala-BD-Class-7",
    description: "রিডিং, ব্যাকরণ, আর বিজ্ঞান সমস্যা সমাধানের অনুশীলন।"
  },
  {
    classLevel: 8,
    title: "গণিত ও আইসিটি ল্যাব",
    teacher: "Mr. Hasan",
    time: "Mon · 6:30 PM",
    room: "EPathshala-BD-Class-8",
    description: "গণনা, ডিজিটাল বেসিক, আর গাইডেড প্র্যাকটিসের লাইভ ক্লাস।"
  },
  {
    classLevel: 9,
    title: "পরীক্ষা প্রস্তুতি লাইভ রুম",
    teacher: "Ms. Nabila",
    time: "Tue · 7:00 PM",
    room: "EPathshala-BD-Class-9",
    description: "বড় শিক্ষার্থীদের জন্য ফোকাসড রিভিশন আর কুইজ ড্রিল।"
  },
  {
    classLevel: 10,
    title: "বোর্ড প্রস্তুতি রুম",
    teacher: "Mr. Adnan",
    time: "Wed · 7:30 PM",
    room: "EPathshala-BD-Class-10",
    description: "প্রশ্ন, নোট, আর লাইভ সহায়তাসহ সিনিয়র শ্রেণির স্টাডি রুম।"
  }
];
const WORDS = {
  pluralNouns: ["book", "pen", "box", "cat", "bus", "flower"],
  antonyms: [
    ["hot", "cold"],
    ["big", "small"],
    ["early", "late"],
    ["fast", "slow"],
    ["open", "close"],
    ["happy", "sad"]
  ],
  banglaWords: [
    ["book", "বই"],
    ["water", "পানি"],
    ["school", "স্কুল"],
    ["flower", "ফুল"],
    ["home", "বাড়ি"],
    ["friend", "বন্ধু"]
  ]
};
const placeCorrect = (correct, wrongs, seed) => {
  const options = [...wrongs.slice(0, 3)];
  const answer = seed % 4;
  options.splice(answer, 0, correct);
  return { options, answer };
};
const makeMathQuestion = (classLevel, variant) => {
  const seed = classLevel * 10 + variant;
  if (classLevel === 1) {
    const a2 = 2 + variant;
    const b2 = 1 + variant % 3;
    const correct2 = a2 + b2;
    const { options: options2, answer: answer2 } = placeCorrect(
      String(correct2),
      [String(correct2 - 1), String(correct2 + 1), String(correct2 + 2)],
      seed
    );
    return {
      prompt: `What is ${a2} + ${b2}?`,
      options: options2,
      answer: answer2,
      explain: `${a2} + ${b2} = ${correct2}.`
    };
  }
  if (classLevel === 2) {
    const a2 = 12 + variant;
    const b2 = 2 + variant % 4;
    const correct2 = a2 - b2;
    const { options: options2, answer: answer2 } = placeCorrect(
      String(correct2),
      [String(correct2 - 1), String(correct2 + 1), String(correct2 + 3)],
      seed
    );
    return {
      prompt: `What is ${a2} - ${b2}?`,
      options: options2,
      answer: answer2,
      explain: `${a2} - ${b2} = ${correct2}.`
    };
  }
  if (classLevel === 3) {
    const a2 = 2 + variant % 4;
    const b2 = 3 + (variant + 1) % 4;
    const correct2 = a2 * b2;
    const { options: options2, answer: answer2 } = placeCorrect(
      String(correct2),
      [String(correct2 - a2), String(correct2 + b2), String(correct2 + a2)],
      seed
    );
    return {
      prompt: `What is ${a2} × ${b2}?`,
      options: options2,
      answer: answer2,
      explain: `${a2} × ${b2} = ${correct2}.`
    };
  }
  if (classLevel === 4) {
    const divisor = 2 + variant % 4;
    const quotient = 2 + (variant + 1) % 4;
    const dividend = divisor * quotient;
    const { options: options2, answer: answer2 } = placeCorrect(
      String(quotient),
      [String(quotient - 1), String(quotient + 1), String(quotient + 2)],
      seed
    );
    return {
      prompt: `What is ${dividend} ÷ ${divisor}?`,
      options: options2,
      answer: answer2,
      explain: `${dividend} ÷ ${divisor} = ${quotient}.`
    };
  }
  const a = 4 + variant;
  const b = 2 + variant % 3;
  const c = 1 + variant % 2;
  const correct = a + b - c;
  const { options, answer } = placeCorrect(
    String(correct),
    [String(correct - 2), String(correct + 1), String(correct + 2)],
    seed
  );
  return {
    prompt: `What is ${a} + ${b} - ${c}?`,
    options,
    answer,
    explain: `Work left to right: ${a} + ${b} - ${c} = ${correct}.`
  };
};
const makeEnglishQuestion = (classLevel, variant) => {
  const seed = classLevel * 10 + variant;
  if (classLevel === 1) {
    const sets = [
      { letter: "B", correct: "ball", wrongs: ["cat", "rice", "sun"] },
      { letter: "C", correct: "cat", wrongs: ["book", "tree", "star"] },
      { letter: "M", correct: "moon", wrongs: ["pen", "dog", "kite"] },
      { letter: "S", correct: "school", wrongs: ["ship", "shoe", "apple"] }
    ];
    const item = sets[variant % sets.length];
    const { options: options2, answer: answer2 } = placeCorrect(item.correct, item.wrongs, seed);
    return {
      prompt: `Which word starts with "${item.letter}"?`,
      options: options2,
      answer: answer2,
      explain: `"${item.correct}" starts with ${item.letter}.`
    };
  }
  if (classLevel === 2) {
    const singular = WORDS.pluralNouns[variant % WORDS.pluralNouns.length];
    const correct2 = singular + (singular.endsWith("s") || singular.endsWith("x") || singular.endsWith("ch") || singular.endsWith("sh") ? "es" : "s");
    const wrongs2 = [
      singular,
      singular.endsWith("s") || singular.endsWith("x") || singular.endsWith("ch") || singular.endsWith("sh") ? `${singular}s` : `${singular}es`,
      `${singular}ed`
    ].filter((w) => w !== correct2);
    const { options: options2, answer: answer2 } = placeCorrect(correct2, wrongs2, seed);
    return {
      prompt: `Which is the plural of "${singular}"?`,
      options: options2,
      answer: answer2,
      explain: `The plural form is "${correct2}".`
    };
  }
  if (classLevel === 3) {
    const pair = WORDS.antonyms[variant % WORDS.antonyms.length];
    const [word, correct2] = pair;
    const wrongs2 = WORDS.antonyms.map(([a, b]) => a === word ? b : a).filter((w) => w !== correct2).slice(0, 3);
    const { options: options2, answer: answer2 } = placeCorrect(
      correct2,
      wrongs2.length >= 3 ? wrongs2 : ["hot", "big", "fast"],
      seed
    );
    return {
      prompt: `What is the opposite of "${word}"?`,
      options: options2,
      answer: answer2,
      explain: `"${correct2}" is the opposite of "${word}".`
    };
  }
  if (classLevel === 4) {
    const sentence = [
      "i like to read books",
      "bangladesh is my country",
      "my teacher is kind",
      "we play football"
    ][variant % 4];
    const correct2 = sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
    const wrongs2 = [
      sentence + "!",
      sentence.charAt(0).toUpperCase() + sentence.slice(1),
      sentence + "?"
    ];
    const { options: options2, answer: answer2 } = placeCorrect(correct2, wrongs2, seed);
    return {
      prompt: `Which sentence is written correctly?`,
      options: options2,
      answer: answer2,
      explain: `A proper sentence starts with a capital letter and ends with a full stop.`
    };
  }
  const verbs = ["play", "clean", "visit", "travel"];
  const verb = verbs[variant % verbs.length];
  const correct = `${verb}ed`;
  const wrongs = [`${verb}s`, `${verb}ing`, `${verb.charAt(0).toUpperCase()}${verb.slice(1)}s`];
  const { options, answer } = placeCorrect(correct, wrongs, seed);
  return {
    prompt: `Choose the best past-tense form for "${verb}".`,
    options,
    answer,
    explain: `The correct form here is "${correct}".`
  };
};
const makeBanglaQuestion = (classLevel, variant) => {
  const seed = classLevel * 10 + variant;
  if (classLevel === 1) {
    const correct = ["ক", "খ", "গ", "ম"][variant % 4];
    const wrongs = ["1", "@", "9", "A"];
    const { options: options2, answer: answer2 } = placeCorrect(correct, wrongs, seed);
    return {
      prompt: "Which one is a Bangla letter?",
      options: options2,
      answer: answer2,
      explain: `"${correct}" is a Bangla letter.`
    };
  }
  if (classLevel === 2) {
    const pair = WORDS.banglaWords[variant % WORDS.banglaWords.length];
    const [english, bangla] = pair;
    const wrongs = WORDS.banglaWords.map(([, word]) => word).filter((w) => w !== bangla).slice(0, 3);
    const { options: options2, answer: answer2 } = placeCorrect(bangla, wrongs, seed);
    return {
      prompt: `What is the Bangla word for "${english}"?`,
      options: options2,
      answer: answer2,
      explain: `"${bangla}" means "${english}".`
    };
  }
  if (classLevel === 3) {
    const items2 = [
      {
        prompt: "How many vowels are in the Bangla alphabet?",
        correct: "১১",
        wrongs: ["৮", "১০", "১২"],
        explain: "Bangla has 11 vowels."
      },
      {
        prompt: "Which letter comes after 'ক'?",
        correct: "খ",
        wrongs: ["গ", "ঘ", "ঙ"],
        explain: "The letter after ক is খ."
      },
      {
        prompt: "Which one is a Bangla numeral?",
        correct: "১",
        wrongs: ["A", "B", "3"],
        explain: "১ is a Bangla numeral."
      },
      {
        prompt: "Which word is written in Bangla script?",
        correct: "বাংলা",
        wrongs: ["Bangla", "English", "Math"],
        explain: "বাংলা is written in Bangla script."
      }
    ];
    const item2 = items2[variant % items2.length];
    const { options: options2, answer: answer2 } = placeCorrect(item2.correct, item2.wrongs, seed);
    return {
      prompt: item2.prompt,
      options: options2,
      answer: answer2,
      explain: item2.explain
    };
  }
  if (classLevel === 4) {
    const correct = ["আমি", "তুমি", "সে", "আমরা"][variant % 4];
    const wrongs = ["পানি", "বই", "গাছ", "ফুল"];
    const { options: options2, answer: answer2 } = placeCorrect(correct, wrongs, seed);
    return {
      prompt: "Which one is a pronoun in Bangla?",
      options: options2,
      answer: answer2,
      explain: `"${correct}" is used as a pronoun.`
    };
  }
  const items = [
    {
      prompt: "Which word is a good synonym for 'সুন্দর'?",
      correct: "মনোরম",
      wrongs: ["কঠিন", "মোটা", "গরম"],
      explain: `"মনোরম" matches the meaning of "সুন্দর".`
    },
    {
      prompt: "Which word means 'happy' in Bangla?",
      correct: "আনন্দিত",
      wrongs: ["দুঃখিত", "চুপ", "কঠিন"],
      explain: `"আনন্দিত" means happy.`
    },
    {
      prompt: "Which word means 'quick' in Bangla?",
      correct: "দ্রুত",
      wrongs: ["ধীর", "লম্বা", "গভীর"],
      explain: `"দ্রুত" means quick.`
    },
    {
      prompt: "Which word means 'good' in Bangla?",
      correct: "ভালো",
      wrongs: ["খারাপ", "মন্দ", "দুষ্ট"],
      explain: `"ভালো" means good.`
    }
  ];
  const item = items[variant % items.length];
  const { options, answer } = placeCorrect(item.correct, item.wrongs, seed);
  return {
    prompt: item.prompt,
    options,
    answer,
    explain: item.explain
  };
};
const makeScienceQuestion = (classLevel, variant) => {
  const seed = classLevel * 10 + variant;
  if (classLevel === 1) {
    const items2 = [
      {
        prompt: "Which organ helps you hear?",
        correct: "ear",
        wrongs: ["nose", "hand", "leg"],
        explain: "The ear helps us hear sounds."
      },
      {
        prompt: "Which organ helps you see?",
        correct: "eye",
        wrongs: ["nose", "ear", "hand"],
        explain: "The eye helps us see."
      },
      {
        prompt: "Which part helps you smell?",
        correct: "nose",
        wrongs: ["mouth", "foot", "knee"],
        explain: "The nose helps us smell."
      },
      {
        prompt: "Which part helps you taste?",
        correct: "tongue",
        wrongs: ["arm", "ear", "hair"],
        explain: "The tongue helps us taste."
      }
    ];
    const item2 = items2[variant % items2.length];
    const { options: options2, answer: answer2 } = placeCorrect(item2.correct, item2.wrongs, seed);
    return { prompt: item2.prompt, options: options2, answer: answer2, explain: item2.explain };
  }
  if (classLevel === 2) {
    const items2 = [
      {
        prompt: "What do plants need to grow well?",
        correct: "water",
        wrongs: ["noise", "stones", "toys"],
        explain: "Plants need water, sunlight, and air."
      },
      {
        prompt: "Which one gives light to Earth?",
        correct: "sunlight",
        wrongs: ["moon dust", "rain", "clouds"],
        explain: "Sunlight helps plants and living things."
      },
      {
        prompt: "What do animals need to stay alive?",
        correct: "food",
        wrongs: ["toys", "chalk", "ink"],
        explain: "Animals need food, water, and air."
      },
      {
        prompt: "Which is a healthy habit?",
        correct: "washing hands",
        wrongs: ["throwing trash", "eating only chips", "sleeping late"],
        explain: "Washing hands keeps us healthy."
      }
    ];
    const item2 = items2[variant % items2.length];
    const { options: options2, answer: answer2 } = placeCorrect(item2.correct, item2.wrongs, seed);
    return { prompt: item2.prompt, options: options2, answer: answer2, explain: item2.explain };
  }
  if (classLevel === 3) {
    const items2 = [
      {
        prompt: "Which one is a solid?",
        correct: "stone",
        wrongs: ["water", "air", "steam"],
        explain: "Stone keeps its shape, so it is a solid."
      },
      {
        prompt: "Which one is a liquid?",
        correct: "juice",
        wrongs: ["rock", "smoke", "ice"],
        explain: "Juice flows, so it is a liquid."
      },
      {
        prompt: "Which one is a gas?",
        correct: "air",
        wrongs: ["sand", "wood", "milk"],
        explain: "Air is a gas."
      },
      {
        prompt: "Which animal lays eggs?",
        correct: "hen",
        wrongs: ["cow", "goat", "dog"],
        explain: "Hens lay eggs."
      }
    ];
    const item2 = items2[variant % items2.length];
    const { options: options2, answer: answer2 } = placeCorrect(item2.correct, item2.wrongs, seed);
    return { prompt: item2.prompt, options: options2, answer: answer2, explain: item2.explain };
  }
  if (classLevel === 4) {
    const items2 = [
      {
        prompt: "Which planet do we live on?",
        correct: "Earth",
        wrongs: ["Mars", "Venus", "Jupiter"],
        explain: "Humans live on Earth."
      },
      {
        prompt: "What do clouds usually bring?",
        correct: "rain",
        wrongs: ["sand", "fire", "snowflakes"],
        explain: "Clouds often bring rain."
      },
      {
        prompt: "Which part of the Earth has salt water?",
        correct: "sea",
        wrongs: ["mountain", "field", "desert"],
        explain: "Seas and oceans have salt water."
      },
      {
        prompt: "Which is used to measure temperature?",
        correct: "thermometer",
        wrongs: ["ruler", "eraser", "bottle"],
        explain: "A thermometer measures temperature."
      }
    ];
    const item2 = items2[variant % items2.length];
    const { options: options2, answer: answer2 } = placeCorrect(item2.correct, item2.wrongs, seed);
    return { prompt: item2.prompt, options: options2, answer: answer2, explain: item2.explain };
  }
  const items = [
    {
      prompt: "Which energy source is renewable?",
      correct: "solar",
      wrongs: ["coal", "diesel", "smoke"],
      explain: "Solar energy is renewable and clean."
    },
    {
      prompt: "Which one is good for a healthy diet?",
      correct: "fruits",
      wrongs: ["chips", "soda", "candy"],
      explain: "Fruits help our body stay healthy."
    },
    {
      prompt: "Which practice saves electricity?",
      correct: "turning off lights",
      wrongs: ["leaving fans on", "opening the fridge often", "charging overnight"],
      explain: "Turning off lights saves electricity."
    },
    {
      prompt: "Which one is a clean transport choice?",
      correct: "walking",
      wrongs: ["smoke", "noise", "trash"],
      explain: "Walking is healthy and clean."
    }
  ];
  const item = items[variant % items.length];
  const { options, answer } = placeCorrect(item.correct, item.wrongs, seed);
  return { prompt: item.prompt, options, answer, explain: item.explain };
};
const makeBangladeshQuestion = (classLevel, variant) => {
  const seed = classLevel * 10 + variant;
  if (classLevel === 1) {
    const items2 = [
      {
        prompt: "What is the capital of Bangladesh?",
        correct: "Dhaka",
        wrongs: ["Rajshahi", "Khulna", "Sylhet"],
        explain: "Dhaka is the capital city of Bangladesh."
      },
      {
        prompt: "What is the national flower of Bangladesh?",
        correct: "Shapla",
        wrongs: ["Rose", "Lily", "Jasmine"],
        explain: "The national flower is Shapla (water lily)."
      },
      {
        prompt: "What color is in the Bangladesh flag?",
        correct: "green",
        wrongs: ["purple", "black", "orange"],
        explain: "The flag is red and green."
      },
      {
        prompt: "Which animal is a symbol of Bangladesh?",
        correct: "Royal Bengal Tiger",
        wrongs: ["panda", "lion", "camel"],
        explain: "The Royal Bengal Tiger is our national animal."
      }
    ];
    const item2 = items2[variant % items2.length];
    const { options: options2, answer: answer2 } = placeCorrect(item2.correct, item2.wrongs, seed);
    return { prompt: item2.prompt, options: options2, answer: answer2, explain: item2.explain };
  }
  if (classLevel === 2) {
    const items2 = [
      {
        prompt: "What is the national fish of Bangladesh?",
        correct: "Hilsa",
        wrongs: ["Rui", "Katla", "Pabda"],
        explain: "Hilsa is the national fish of Bangladesh."
      },
      {
        prompt: "Which day is Language Martyrs' Day?",
        correct: "21 February",
        wrongs: ["26 March", "16 December", "1 January"],
        explain: "We observe Language Martyrs' Day on 21 February."
      },
      {
        prompt: "What is the currency of Bangladesh?",
        correct: "Taka",
        wrongs: ["Rupee", "Dollar", "Peso"],
        explain: "Bangladesh uses Taka."
      },
      {
        prompt: "Which is the largest mangrove forest in Bangladesh?",
        correct: "Sundarbans",
        wrongs: ["Sylhet", "Teknaf", "Kaptai"],
        explain: "The Sundarbans is the largest mangrove forest."
      }
    ];
    const item2 = items2[variant % items2.length];
    const { options: options2, answer: answer2 } = placeCorrect(item2.correct, item2.wrongs, seed);
    return { prompt: item2.prompt, options: options2, answer: answer2, explain: item2.explain };
  }
  if (classLevel === 3) {
    const items2 = [
      {
        prompt: "How many divisions are in Bangladesh?",
        correct: "8",
        wrongs: ["6", "7", "9"],
        explain: "Bangladesh currently has 8 divisions."
      },
      {
        prompt: "Which is the longest sea beach in Bangladesh?",
        correct: "Cox's Bazar",
        wrongs: ["Kuakata", "Patenga", "Inani"],
        explain: "Cox's Bazar is the longest sea beach."
      },
      {
        prompt: "Which day is Independence Day?",
        correct: "26 March",
        wrongs: ["21 February", "16 December", "14 April"],
        explain: "Independence Day is observed on 26 March."
      },
      {
        prompt: "Which day is Victory Day?",
        correct: "16 December",
        wrongs: ["26 March", "21 February", "1 May"],
        explain: "Victory Day is observed on 16 December."
      }
    ];
    const item2 = items2[variant % items2.length];
    const { options: options2, answer: answer2 } = placeCorrect(item2.correct, item2.wrongs, seed);
    return { prompt: item2.prompt, options: options2, answer: answer2, explain: item2.explain };
  }
  if (classLevel === 4) {
    const items2 = [
      {
        prompt: "What is the name of Bangladesh's parliament?",
        correct: "Jatiya Sangsad",
        wrongs: ["Shonar Bangla", "Bharat Sangsad", "Rastriya Sabha"],
        explain: "The national parliament is Jatiya Sangsad."
      },
      {
        prompt: "Which river is strongly linked with Bangladesh geography?",
        correct: "Padma",
        wrongs: ["Nile", "Danube", "Amazon"],
        explain: "Padma is one of Bangladesh's major rivers."
      },
      {
        prompt: "Which city is famous as the port city of Bangladesh?",
        correct: "Chattogram",
        wrongs: ["Panchagarh", "Barishal", "Mymensingh"],
        explain: "Chattogram is Bangladesh's major port city."
      },
      {
        prompt: "Which is the national anthem of Bangladesh?",
        correct: "Amar Sonar Bangla",
        wrongs: ["Joy Bangla", "Dhono Dhanyo", "Bharoto Bhagyo Bidhata"],
        explain: "Amar Sonar Bangla is the national anthem."
      }
    ];
    const item2 = items2[variant % items2.length];
    const { options: options2, answer: answer2 } = placeCorrect(item2.correct, item2.wrongs, seed);
    return { prompt: item2.prompt, options: options2, answer: answer2, explain: item2.explain };
  }
  const items = [
    {
      prompt: "What is the name of Bangladesh's national fruit?",
      correct: "Jackfruit",
      wrongs: ["Mango", "Guava", "Banana"],
      explain: "Jackfruit is the national fruit."
    },
    {
      prompt: "What is the name of the national bird of Bangladesh?",
      correct: "Doyel",
      wrongs: ["Crow", "Sparrow", "Pigeon"],
      explain: "The Doyel is the national bird."
    },
    {
      prompt: "Which hill district is in Bangladesh?",
      correct: "Rangamati",
      wrongs: ["Delhi", "Paris", "Tokyo"],
      explain: "Rangamati is a hill district in Bangladesh."
    },
    {
      prompt: "Which is a famous wetland in Bangladesh?",
      correct: "Hakaluki Haor",
      wrongs: ["Sahara", "Andes", "Alps"],
      explain: "Hakaluki Haor is a well-known wetland."
    }
  ];
  const item = items[variant % items.length];
  const { options, answer } = placeCorrect(item.correct, item.wrongs, seed);
  return { prompt: item.prompt, options, answer, explain: item.explain };
};
const categoryBuilders = [
  makeMathQuestion,
  makeEnglishQuestion,
  makeBanglaQuestion,
  makeScienceQuestion,
  makeBangladeshQuestion
];
const categoryNames = [
  "গণিত",
  "ইংরেজি",
  "বাংলা",
  "বিজ্ঞান",
  "সাধারণ জ্ঞান"
];
const buildQuizBank = () => {
  const bank = [];
  classLevels.forEach((classLevel) => {
    categoryBuilders.forEach((builder, categoryIndex) => {
      for (let variant = 0; variant < 4; variant += 1) {
        const built = builder(classLevel, variant);
        bank.push({
          id: `class-${classLevel}-${categoryIndex}-${variant}`,
          classLevel,
          subject: categoryNames[categoryIndex],
          prompt: built.prompt,
          options: built.options,
          answer: built.answer,
          explain: built.explain
        });
      }
    });
  });
  return bank;
};
const activityTemplates = [
  {
    emoji: "🧠",
    subject: "কুইজ",
    title: "কুইজ স্প্রিন্ট",
    subtitle: "দ্রুত ৫ প্রশ্নের চ্যালেঞ্জ",
    href: "/quiz",
    cta: "কুইজ শুরু"
  },
  {
    emoji: "🎥",
    subject: "লাইভ",
    title: "লাইভ ক্লাস রুম",
    subtitle: "রিয়েল-টাইমে শিক্ষকের সঙ্গে",
    href: "/live-class",
    cta: "লাইভে ঢুকো"
  },
  {
    emoji: "📺",
    subject: "রিলস",
    title: "শিক্ষামূলক রিলস",
    subtitle: "ছোট YouTube লার্নিং ক্লিপ",
    href: "/library",
    cta: "রিলস দেখো"
  },
  {
    emoji: "🗺️",
    subject: "মানচিত্র",
    title: "বাংলাদেশ মানচিত্র হান্ট",
    subtitle: "দেশের মানচিত্র ঘুরে দেখো",
    href: "/bangladesh-map",
    cta: "মানচিত্র খুলুন"
  },
  {
    emoji: "📘",
    subject: "NCTB",
    title: "অফিশিয়াল NCTB বই",
    subtitle: "পাঠ্যপুস্তক পোর্টাল খুলুন",
    href: "https://www.nctb.gov.bd/",
    external: true,
    cta: "NCTB খুলুন"
  },
  {
    emoji: "🏃",
    subject: "গেম",
    title: "RunBD স্পেশাল গেম",
    subtitle: "বাছাই করা রানিং গেম খেলো",
    href: "https://runbd.netlify.app",
    external: true,
    cta: "এখনই খেলো"
  }
];
const activityThemes = [
  "সংখ্যা দৌড়",
  "বাংলা অক্ষর অনুসন্ধান",
  "গল্প সময় স্প্রিন্ট",
  "বিজ্ঞানের অভিযান",
  "বাংলাদেশ তথ্য অভিযান",
  "শব্দ বানাও",
  "গণনা ও তুলনা",
  "পড়ার রকেট",
  "প্রকৃতি নোট",
  "মানচিত্র মাস্টার",
  "কুইজ ল্যাডার",
  "বানান তারকা",
  "টেবিল চেজ",
  "আকার সাফারি",
  "সবুজ অভ্যাস গেম",
  "নদী রান",
  "প্রোনাউন পপ",
  "নবায়নযোগ্য জ্বালানি রাশ",
  "রাজধানী ধরো",
  "বিজয় দৌড়"
];
const buildActivityBank = () => {
  const items = [];
  classLevels.forEach((classLevel) => {
    for (let variant = 0; variant < 20; variant += 1) {
      const template = activityTemplates[variant % activityTemplates.length];
      const subjectGroup = categoryNames[(classLevel + variant) % categoryNames.length];
      const theme = activityThemes[variant];
      items.push({
        id: `activity-${classLevel}-${variant}`,
        classLevel,
        title: `${theme} · শ্রেণি ${classLevel}`,
        subtitle: `${template.title} · ${template.subtitle} · ${subjectGroup}`,
        subject: subjectGroup,
        emoji: template.emoji,
        href: template.href,
        external: template.external,
        cta: template.cta
      });
    }
  });
  return items;
};
const quizBank = buildQuizBank();
const activityBank = buildActivityBank();
const LOCAL_STORAGE_PREFIX = "epathshala:firebase-data";
function readLocalCollection(name) {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}:${name}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeLocalCollection(name, records) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${LOCAL_STORAGE_PREFIX}:${name}`, JSON.stringify(records));
  window.dispatchEvent(new Event(`epathshala:${name}`));
}
function subscribeLocalCollection(name, getSnapshot, onChange) {
  onChange(getSnapshot());
  const listener = () => onChange(getSnapshot());
  window.addEventListener(`epathshala:${name}`, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(`epathshala:${name}`, listener);
    window.removeEventListener("storage", listener);
  };
}
function listenClassmates(classLevel, onChange) {
  if (!firebaseEnabled) {
    return subscribeLocalCollection(
      "users",
      () => readLocalCollection("users").filter((item) => item.classLevel === classLevel).sort((a, b) => Number(b.isOnline) - Number(a.isOnline) || b.xp - a.xp),
      onChange
    );
  }
  const db2 = getFirebaseDb();
  if (!db2) return () => {
  };
  return onSnapshot(
    query(collection(db2, "users"), where("class", "==", classLevel)),
    (snapshot) => {
      onChange(
        snapshot.docs.map((entry) => {
          const data = entry.data();
          return {
            uid: entry.id,
            name: data.name ?? "শিক্ষার্থী",
            avatar: data.avatar ?? "🧑‍🎓",
            classLevel: data.class ?? classLevel,
            role: data.role ?? "student",
            xp: data.xp ?? 0,
            badges: Array.isArray(data.badges) ? data.badges : [],
            isOnline: Boolean(data.isOnline),
            lastSeen: typeof data.lastSeen === "number" ? data.lastSeen : Date.now(),
            friends: Array.isArray(data.friends) ? data.friends : [],
            followers: Array.isArray(data.followers) ? data.followers : [],
            following: Array.isArray(data.following) ? data.following : [],
            email: data.email ?? ""
          };
        }).sort((a, b) => Number(b.isOnline) - Number(a.isOnline) || b.lastSeen - a.lastSeen || b.xp - a.xp)
      );
    }
  );
}
function listenChatMessages(roomId, onChange) {
  if (!firebaseEnabled) {
    return subscribeLocalCollection(
      "messages",
      () => readLocalCollection("messages").filter((message) => message.roomId === roomId).sort((a, b) => a.createdAt - b.createdAt),
      onChange
    );
  }
  const db2 = getFirebaseDb();
  if (!db2) return () => {
  };
  return onSnapshot(
    query(collection(db2, "messages"), where("roomId", "==", roomId)),
    (snapshot) => onChange(
      snapshot.docs.map((entry) => {
        const data = entry.data();
        return {
          id: entry.id,
          roomId: data.roomId ?? roomId,
          senderId: data.senderId ?? "",
          senderName: data.senderName ?? "শিক্ষার্থী",
          senderAvatar: data.senderAvatar ?? "🧑‍🎓",
          text: data.text ?? "",
          createdAt: typeof data.createdAt === "number" ? data.createdAt : Date.now(),
          seenBy: Array.isArray(data.seenBy) ? data.seenBy : [],
          replyTo: data.replyTo ?? null,
          emoji: data.emoji
        };
      }).sort((a, b) => a.createdAt - b.createdAt)
    )
  );
}
async function sendChatMessage(message) {
  if (!firebaseEnabled) {
    const messages = readLocalCollection("messages");
    messages.push({
      ...message,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      seenBy: [message.senderId]
    });
    writeLocalCollection("messages", messages);
    return;
  }
  const db2 = getFirebaseDb();
  if (!db2) return;
  await addDoc(collection(db2, "messages"), {
    ...message,
    createdAt: Date.now(),
    seenBy: [message.senderId],
    updatedAt: serverTimestamp()
  });
}
async function updateTypingState(roomId, user, isTyping) {
  if (!firebaseEnabled) return;
  const db2 = getFirebaseDb();
  if (!db2) return;
  await setDoc(
    doc(db2, "chats", roomId),
    {
      roomId,
      classLevel: user.class,
      typingBy: isTyping ? arrayUnion(user.uid) : arrayRemove(user.uid),
      typingName: user.name,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
}
async function markMessagesSeen(roomId, userId) {
  if (!firebaseEnabled) return;
  const db2 = getFirebaseDb();
  if (!db2) return;
  const snapshot = await getDocs(query(collection(db2, "messages"), where("roomId", "==", roomId), limit(50)));
  const batch = writeBatch(db2);
  snapshot.docs.forEach((entry) => {
    batch.update(entry.ref, {
      seenBy: arrayUnion(userId)
    });
  });
  await batch.commit();
}
function listenChatRoom(roomId, onChange) {
  if (!firebaseEnabled) {
    return subscribeLocalCollection(
      "rooms",
      () => readLocalCollection("rooms").find((room) => room.id === roomId) ?? null,
      onChange
    );
  }
  const db2 = getFirebaseDb();
  if (!db2) return () => {
  };
  return onSnapshot(doc(db2, "chats", roomId), (snapshot) => {
    if (!snapshot.exists()) {
      onChange(null);
      return;
    }
    const data = snapshot.data();
    onChange({
      id: snapshot.id,
      title: data.title ?? roomId,
      classLevel: data.classLevel ?? 0,
      typingBy: Array.isArray(data.typingBy) ? data.typingBy : [],
      updatedAt: typeof data.updatedAt === "number" ? data.updatedAt : Date.now()
    });
  });
}
async function saveQuizScore(record) {
  if (!firebaseEnabled) {
    const scores = readLocalCollection("scores");
    scores.unshift({
      ...record,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    });
    writeLocalCollection("scores", scores.slice(0, 100));
    return;
  }
  const db2 = getFirebaseDb();
  if (!db2) return;
  await addDoc(collection(db2, "scores"), {
    ...record,
    createdAt: Date.now()
  });
}
async function saveBoardSnapshot(record) {
  if (!firebaseEnabled) {
    const boards = readLocalCollection("boards");
    const next2 = {
      ...record,
      imageUrl: record.imageUrl || record.imageDataUrl || "",
      imageDataUrl: record.imageDataUrl || record.imageUrl || "",
      id: record.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || crypto.randomUUID(),
      updatedAt: Date.now()
    };
    writeLocalCollection("boards", [next2, ...boards.filter((board) => board.id !== next2.id)]);
    return next2;
  }
  const db2 = getFirebaseDb();
  if (!db2) return null;
  const ref2 = doc(collection(db2, "boards"));
  const next = {
    ...record,
    imageUrl: record.imageUrl || record.imageDataUrl || "",
    imageDataUrl: record.imageDataUrl || record.imageUrl || "",
    id: ref2.id,
    updatedAt: Date.now()
  };
  await setDoc(ref2, {
    ...record,
    imageUrl: record.imageUrl || record.imageDataUrl || "",
    imageDataUrl: record.imageDataUrl || record.imageUrl || "",
    updatedAt: Date.now()
  });
  return next;
}
function listenBoardSnapshots(classLevel, onChange) {
  if (!firebaseEnabled) {
    return subscribeLocalCollection(
      "boards",
      () => readLocalCollection("boards").filter((board) => board.classLevel === classLevel).sort((a, b) => b.updatedAt - a.updatedAt),
      onChange
    );
  }
  const db2 = getFirebaseDb();
  if (!db2) return () => {
  };
  return onSnapshot(
    query(collection(db2, "boards"), where("classLevel", "==", classLevel)),
    (snapshot) => onChange(
      snapshot.docs.map((entry) => {
        const data = entry.data();
        return {
          id: entry.id,
          classLevel: data.classLevel ?? classLevel,
          title: data.title ?? "Untitled board",
          ownerId: data.ownerId ?? "",
          ownerName: data.ownerName ?? "",
          imageUrl: data.imageUrl ?? data.imageDataUrl ?? "",
          imageDataUrl: data.imageDataUrl ?? data.imageUrl ?? "",
          updatedAt: typeof data.updatedAt === "number" ? data.updatedAt : Date.now()
        };
      }).sort((a, b) => b.updatedAt - a.updatedAt)
    )
  );
}
async function saveCertificate(record) {
  if (!firebaseEnabled) {
    const certificates = readLocalCollection("certificates");
    certificates.unshift({
      ...record,
      id: crypto.randomUUID(),
      issuedAt: Date.now()
    });
    writeLocalCollection("certificates", certificates.slice(0, 100));
    return;
  }
  const db2 = getFirebaseDb();
  if (!db2) return;
  await addDoc(collection(db2, "certificates"), {
    ...record,
    issuedAt: Date.now()
  });
}
function listenCertificates(userId, onChange) {
  if (!firebaseEnabled) {
    return subscribeLocalCollection(
      "certificates",
      () => readLocalCollection("certificates").filter((certificate) => certificate.userId === userId),
      onChange
    );
  }
  const db2 = getFirebaseDb();
  if (!db2) return () => {
  };
  return onSnapshot(
    query(collection(db2, "certificates"), where("userId", "==", userId)),
    (snapshot) => onChange(
      snapshot.docs.map((entry) => {
        const data = entry.data();
        return {
          id: entry.id,
          userId: data.userId ?? userId,
          userName: data.userName ?? "",
          classLevel: data.classLevel ?? 0,
          title: data.title ?? "",
          subject: data.subject ?? "",
          score: data.score ?? 0,
          total: data.total ?? 0,
          issuedAt: typeof data.issuedAt === "number" ? data.issuedAt : Date.now()
        };
      }).sort((a, b) => b.issuedAt - a.issuedAt)
    )
  );
}
const Route$e = createFileRoute("/games")({
  head: () => ({ meta: [{ title: "গেমস · E-পাঠশালা" }] }),
  component: Games
});
const SUBJECTS = [
  { label: "সব বিষয়", value: "all" },
  { label: "গণিত", value: "গণিত" },
  { label: "ইংরেজি", value: "ইংরেজি" },
  { label: "বাংলা", value: "বাংলা" },
  { label: "বিজ্ঞান", value: "বিজ্ঞান" },
  { label: "বাংলাদেশ & গ্লোবাল স্টাডিজ", value: "সাধারণ জ্ঞান" }
];
function Games() {
  const auth2 = useAuth();
  const user = useUser();
  const boardRef = reactExports.useRef(null);
  const completeGuardRef = reactExports.useRef(false);
  const soundEnabledRef = reactExports.useRef(true);
  const [selectedClass, setSelectedClass] = reactExports.useState(user.class);
  const [selectedSubject, setSelectedSubject] = reactExports.useState("all");
  const [questionCount, setQuestionCount] = reactExports.useState(10);
  const [timeLimit, setTimeLimit] = reactExports.useState(15);
  const [audioEnabled, setAudioEnabled] = reactExports.useState(true);
  const [questions, setQuestions] = reactExports.useState(() => buildQuestions(user.class, "all", 10));
  const [index, setIndex] = reactExports.useState(0);
  const [selectedAnswer, setSelectedAnswer] = reactExports.useState(null);
  const [secondsLeft, setSecondsLeft] = reactExports.useState(timeLimit);
  const [score, setScore] = reactExports.useState(0);
  const [correctCount, setCorrectCount] = reactExports.useState(0);
  const [feedback, setFeedback] = reactExports.useState(null);
  const [finished, setFinished] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const question = questions[index];
  reactExports.useMemo(() => {
    if (!questions.length) return 0;
    let count = 0;
    for (let i = 0; i < index; i += 1) {
      if (questions[i]?.__correct && questions[i].__answeredCorrect) count += 1;
      else count = 0;
    }
    return count;
  }, [index, questions]);
  reactExports.useEffect(() => {
    setQuestions(buildQuestions(selectedClass, selectedSubject, questionCount));
    setIndex(0);
    setSelectedAnswer(null);
    setSecondsLeft(timeLimit);
    setScore(0);
    setCorrectCount(0);
    setFeedback(null);
    setFinished(false);
    setSubmitted(false);
    completeGuardRef.current = false;
  }, [questionCount, selectedClass, selectedSubject, timeLimit]);
  reactExports.useEffect(() => {
    if (finished || !question || selectedAnswer !== null) return;
    setSecondsLeft(timeLimit);
  }, [finished, index, question, selectedAnswer, timeLimit]);
  reactExports.useEffect(() => {
    if (finished || selectedAnswer !== null || !question) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          void handleAnswer(-1);
          return 0;
        }
        return current - 1;
      });
    }, 1e3);
    return () => window.clearInterval(timer);
  }, [finished, question, selectedAnswer]);
  reactExports.useEffect(() => {
    if (finished || submitted || !auth2.profile.uid) return;
    if (index < questions.length) return;
    setFinished(true);
  }, [auth2.profile.uid, finished, index, questions.length, submitted]);
  reactExports.useEffect(() => {
    if (!finished || completeGuardRef.current) return;
    completeGuardRef.current = true;
    const percent2 = questions.length ? Math.round(correctCount / questions.length * 100) : 0;
    const streakBonus = Math.max(0, correctCount - 1) * 2;
    void saveQuizCompletion(percent2, score, questions.length, streakBonus);
  }, [correctCount, finished, questions.length, score]);
  async function saveQuizCompletion(percent2, finalScore, total, streakBonus) {
    const subjectLabel = selectedSubject === "all" ? "Mixed subject" : selectedSubject;
    await saveQuizScore({
      userId: auth2.profile.uid,
      userName: auth2.profile.name,
      classLevel: selectedClass,
      subject: subjectLabel,
      mode: "fullscreen-quiz",
      score: finalScore,
      total,
      accuracy: percent2,
      streakBonus
    });
    const xpGain = Math.max(25, finalScore * 8 + streakBonus * 3);
    const coinGain = Math.max(5, Math.floor(percent2 / 10) + streakBonus);
    await auth2.awardProgress({
      xp: xpGain,
      coins: coinGain,
      lessonsCompleted: percent2 >= 80 ? 1 : 0,
      badges: percent2 >= 80 ? [`${subjectLabel} Champ`] : []
    });
    if (percent2 >= 80) {
      await saveCertificate({
        userId: auth2.profile.uid,
        userName: auth2.profile.name,
        classLevel: selectedClass,
        title: `Certificate of Excellence in ${subjectLabel}`,
        subject: subjectLabel,
        score: finalScore,
        total
      });
    }
    setSubmitted(true);
  }
  function playSound(ok) {
    if (!audioEnabled || !soundEnabledRef.current || typeof window === "undefined") return;
    const audioContext = new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = ok ? 880 : 220;
    gain.gain.value = 0.08;
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.16);
  }
  async function handleAnswer(choice) {
    if (!question || selectedAnswer !== null || finished) return;
    const correct = choice === question.answer;
    const nextQuestions = questions.slice();
    nextQuestions[index] = {
      ...question,
      __correct: true,
      __answeredCorrect: correct
    };
    setQuestions(nextQuestions);
    setSelectedAnswer(choice);
    setFeedback({
      correct,
      text: correct ? "দারুণ! তুমি সঠিক উত্তর দিয়েছ।" : `সঠিক উত্তর: ${question.options[question.answer]}`
    });
    playSound(correct);
    const timeBonus = Math.max(0, timeLimit - secondsLeft);
    const streakBonus = correct ? Math.max(1, Math.min(5, Math.floor(index / 2) + 1)) : 0;
    const earned = correct ? 10 + streakBonus + Math.floor(timeBonus / 4) : 0;
    if (correct) setCorrectCount((current) => current + 1);
    setScore((current) => current + earned);
    window.setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex((current) => current + 1);
        setSelectedAnswer(null);
        setFeedback(null);
      } else {
        setFinished(true);
      }
    }, 1200);
  }
  async function enterFullscreen() {
    if (!boardRef.current?.requestFullscreen) return;
    await boardRef.current.requestFullscreen().catch(() => {
    });
  }
  function restart() {
    setQuestions(buildQuestions(selectedClass, selectedSubject, questionCount));
    setIndex(0);
    setSelectedAnswer(null);
    setSecondsLeft(timeLimit);
    setScore(0);
    setCorrectCount(0);
    setFeedback(null);
    setFinished(false);
    setSubmitted(false);
    completeGuardRef.current = false;
  }
  const percent = questions.length ? Math.round(correctCount / questions.length * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: boardRef, className: "min-h-[calc(100vh-2rem)] px-4 md:px-8 py-6 md:py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "glass-strong rounded-[2rem] p-5 md:p-6 flex flex-col gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-brand-orange" }),
            " fullscreen quiz arena"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-3xl md:text-5xl font-bold leading-tight", children: "Bangladesh curriculum quiz mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-3xl text-sm md:text-base text-muted-foreground", children: "প্রতি প্রশ্নে সময়সীমা আছে, answer feedback instant, score save হয় Firebase-এ, আর high score হলে certificate auto-generate হয়।" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => void enterFullscreen(),
              className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 text-white font-semibold shadow-soft",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-4 w-4" }),
                "Full screen"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setAudioEnabled((current) => !current),
              className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70",
              children: [
                audioEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "h-4 w-4" }),
                "Sound ",
                audioEnabled ? "on" : "off"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "h-4 w-4" }), label: "Timer", value: `${secondsLeft}s` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" }), label: "Score", value: score.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Stat,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
            label: "Accuracy",
            value: `${percent}%`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Stat,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
            label: "Streak",
            value: `${Math.max(0, correctCount - 1)}`
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 lg:grid-cols-[1.1fr_0.9fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-5 md:p-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Control,
            {
              label: "Class",
              value: selectedClass.toString(),
              onChange: (value) => setSelectedClass(Number(value)),
              options: Array.from({ length: 10 }, (_, idx) => `${idx + 1}`)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Control,
            {
              label: "Subject",
              value: selectedSubject,
              onChange: (value) => setSelectedSubject(value),
              options: SUBJECTS.map((item) => item.value),
              optionsLabel: SUBJECTS.map((item) => item.label)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Control,
            {
              label: "Questions",
              value: questionCount.toString(),
              onChange: (value) => setQuestionCount(Number(value)),
              options: ["5", "10", "15", "20"]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[1fr_auto] items-center gap-3 rounded-3xl bg-muted/50 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-[0.24em] text-muted-foreground", children: [
              "Question ",
              index + 1,
              " / ",
              questions.length
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 text-xl md:text-3xl font-bold leading-tight", children: question?.prompt ?? "No question" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: restart,
              className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
                "Restart"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full bg-gradient-hero transition-all",
            style: {
              width: `${questions.length ? (index + 1) / questions.length * 100 : 0}%`
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: question?.options.map((option, optionIndex) => {
          const isCorrect = optionIndex === question.answer;
          const isPicked = selectedAnswer === optionIndex;
          const reveal = selectedAnswer !== null;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              disabled: reveal,
              onClick: () => void handleAnswer(optionIndex),
              className: `w-full rounded-2xl border-2 p-4 text-left transition-all ${reveal && isCorrect ? "border-brand-green bg-brand-green/10" : reveal && isPicked && !isCorrect ? "border-destructive bg-destructive/10" : "border-border bg-background hover:border-primary hover:bg-muted/60"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: option }),
                reveal && isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-brand-green" }) : null
              ] })
            },
            option
          );
        }) }),
        feedback ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `rounded-2xl p-4 text-sm ${feedback.correct ? "bg-brand-green/10" : "bg-destructive/10"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                feedback.correct ? "Correct" : "Try again",
                ":"
              ] }),
              " ",
              feedback.text
            ]
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-brand-orange" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Time limit per question is mandatory. Auto-next runs when the timer ends." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: "Game rules" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-muted px-3 py-1 text-xs font-semibold", children: selectedClass })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• 10–30 second timers, based on your setting." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Correct streaks add bonus points." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• 80%+ opens certificate creation automatically." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Scores save to Firebase or the local demo store." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-3", children: "Live summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TinyStat, { title: "Correct", value: `${correctCount}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TinyStat, { title: "Streak bonus", value: `${Math.max(0, correctCount - 1)}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TinyStat, { title: "Timer", value: `${secondsLeft}s` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TinyStat, { title: "Accuracy", value: `${percent}%` })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-3", children: "Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 font-medium", children: [
                "Time per question: ",
                timeLimit,
                "s"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: 10,
                  max: 30,
                  step: 5,
                  value: timeLimit,
                  onChange: (event) => setTimeLimit(Number(event.target.value)),
                  className: "w-full"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Audio feedback" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setAudioEnabled((current) => !current),
                  className: "rounded-full bg-muted px-3 py-1.5 font-medium",
                  children: audioEnabled ? "Enabled" : "Disabled"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/certificates",
            className: "glass rounded-[2rem] p-5 flex items-center justify-between gap-3 hover:shadow-soft transition-all",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: "Achievement certificates" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "View generated certificates and download as PDF." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-primary" })
            ]
          }
        )
      ] })
    ] }),
    finished ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-strong rounded-[2rem] p-6 md:p-8 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5 text-brand-orange" }),
            " final score"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl md:text-4xl font-bold", children: "Quiz complete" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[1.5rem] bg-gradient-hero px-6 py-5 text-white shadow-glow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] opacity-80", children: "score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold", children: score }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm opacity-85", children: [
            "out of ",
            questions.length * 15
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResultCard, { label: "Accuracy", value: `${percent}%` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResultCard, { label: "Correct answers", value: `${correctCount}/${questions.length}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ResultCard,
          {
            label: "Firebase",
            value: auth2.firebaseReady ? "Enabled" : "Local demo"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: restart,
            className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 font-semibold text-white shadow-soft",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
              "Play again"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/certificates",
            className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4" }),
              "Open certificates"
            ]
          }
        )
      ] })
    ] }) : null
  ] }) }) });
}
function buildQuestions(classLevel, subject, count) {
  const filtered = quizBank.filter(
    (question) => question.classLevel === classLevel && (subject === "all" || question.subject === subject)
  );
  const pool = filtered.length ? filtered : quizBank.filter((question) => question.classLevel === classLevel);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
function Stat({ icon, label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-background/80 p-4 shadow-soft border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
      icon,
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-bold", children: value })
  ] });
}
function TinyStat({ title, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-muted/60 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xl font-bold", children: value })
  ] });
}
function ResultCard({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-muted/50 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-bold", children: value })
  ] });
}
function Control({
  label,
  value,
  onChange,
  options,
  optionsLabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "select",
      {
        value,
        onChange: (event) => onChange(event.target.value),
        className: "w-full rounded-2xl border border-border bg-background px-4 py-3 font-medium outline-none",
        children: options.map((option, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option, children: optionsLabel?.[index] ?? option }, option))
      }
    )
  ] });
}
const $$splitComponentImporter$b = () => import("./free-board-D8o-Mi_z.mjs");
const Route$d = createFileRoute("/free-board")({
  head: () => ({
    meta: [{
      title: "ফ্রি বোর্ড · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./ecosystem-M_F0voKY.mjs");
const Route$c = createFileRoute("/ecosystem")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./dashboard-BUIfKiQt.mjs");
const Route$b = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "ড্যাশবোর্ড · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./competitions-Dxqw1ivj.mjs");
const Route$a = createFileRoute("/competitions")({
  validateSearch: (search) => ({
    room: typeof search.room === "string" && search.room.trim() ? search.room.trim() : void 0
  }),
  head: () => ({
    meta: [{
      title: "E-পাঠশালা Competition · Real-time Quiz Battle"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./classmates-f4VwxZlE.mjs");
const Route$9 = createFileRoute("/classmates")({
  head: () => ({
    meta: [{
      title: "ক্লাসমেট · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./certificates-xeJtPzx7.mjs");
const Route$8 = createFileRoute("/certificates")({
  head: () => ({
    meta: [{
      title: "সার্টিফিকেট · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./bani-C6drTOPz.mjs");
const Route$7 = createFileRoute("/bani")({
  head: () => ({
    meta: [{
      title: "সহায়ক AI Core · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./bangladesh-map-Cvubt5s2.mjs");
const Route$6 = createFileRoute("/bangladesh-map")({
  head: () => ({
    meta: [{
      title: "বাংলাদেশ মানচিত্র · E-পাঠশালা"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-e0PE_uBb.mjs");
const Route$5 = createFileRoute("/")({
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
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
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
const $$splitNotFoundComponentImporter = () => import("./subjects._slug-B1mq55vU.mjs");
const $$splitComponentImporter$2 = () => import("./subjects._slug-C0AqmFmq.mjs");
const Route$4 = createFileRoute("/subjects/$slug")({
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
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const $$splitComponentImporter$1 = () => import("./students._studentId-M6Vt2HA5.mjs");
const Route$3 = createFileRoute("/students/$studentId")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `Student Verification · ${params.studentId}`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./schools._schoolId-B0aOx4S1.mjs");
const Route$2 = createFileRoute("/schools/$schoolId")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `স্কুল প্রোফাইল · ${params.schoolId}`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
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
If asked who made you, answer: "আমি E-পাঠশালা Tutor. আমাকে বানিয়েছে কচুয়া সরকারি পাইলট উচ্চ বিদ্যালয় টিম (Kachua Govt pilot High School Team)।"
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
            "আমি E-পাঠশালা Tutor. আমাকে বানিয়েছে কচুয়া সরকারি পাইলট উচ্চ বিদ্যালয় টিম (Kachua Govt pilot High School Team)।"
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
const SubjectsRoute = Route$s.update({
  id: "/subjects",
  path: "/subjects",
  getParentRoute: () => Route$t
});
const StudentsRoute = Route$r.update({
  id: "/students",
  path: "/students",
  getParentRoute: () => Route$t
});
const StudentHealthRoute = Route$q.update({
  id: "/student-health",
  path: "/student-health",
  getParentRoute: () => Route$t
});
const SpecialGameRoute = Route$p.update({
  id: "/special-game",
  path: "/special-game",
  getParentRoute: () => Route$t
});
const SearchRoute = Route$o.update({
  id: "/search",
  path: "/search",
  getParentRoute: () => Route$t
});
const SchoolsRoute = Route$n.update({
  id: "/schools",
  path: "/schools",
  getParentRoute: () => Route$t
});
const SchoolRoute = Route$m.update({
  id: "/school",
  path: "/school",
  getParentRoute: () => Route$t
});
const QuizzesRoute = Route$l.update({
  id: "/quizzes",
  path: "/quizzes",
  getParentRoute: () => Route$t
});
const QuizRoute = Route$k.update({
  id: "/quiz",
  path: "/quiz",
  getParentRoute: () => Route$t
});
const PdfViewerRoute = Route$j.update({
  id: "/pdf-viewer",
  path: "/pdf-viewer",
  getParentRoute: () => Route$t
});
const LoginRoute = Route$i.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$t
});
const LiveClassRoute = Route$h.update({
  id: "/live-class",
  path: "/live-class",
  getParentRoute: () => Route$t
});
const LibraryRoute = Route$g.update({
  id: "/library",
  path: "/library",
  getParentRoute: () => Route$t
});
const LeaderboardRoute = Route$f.update({
  id: "/leaderboard",
  path: "/leaderboard",
  getParentRoute: () => Route$t
});
const GamesRoute = Route$e.update({
  id: "/games",
  path: "/games",
  getParentRoute: () => Route$t
});
const FreeBoardRoute = Route$d.update({
  id: "/free-board",
  path: "/free-board",
  getParentRoute: () => Route$t
});
const EcosystemRoute = Route$c.update({
  id: "/ecosystem",
  path: "/ecosystem",
  getParentRoute: () => Route$t
});
const DashboardRoute = Route$b.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$t
});
const CompetitionsRoute = Route$a.update({
  id: "/competitions",
  path: "/competitions",
  getParentRoute: () => Route$t
});
const ClassmatesRoute = Route$9.update({
  id: "/classmates",
  path: "/classmates",
  getParentRoute: () => Route$t
});
const CertificatesRoute = Route$8.update({
  id: "/certificates",
  path: "/certificates",
  getParentRoute: () => Route$t
});
const BaniRoute = Route$7.update({
  id: "/bani",
  path: "/bani",
  getParentRoute: () => Route$t
});
const BangladeshMapRoute = Route$6.update({
  id: "/bangladesh-map",
  path: "/bangladesh-map",
  getParentRoute: () => Route$t
});
const IndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$t
});
const SubjectsSlugRoute = Route$4.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => SubjectsRoute
});
const StudentsStudentIdRoute = Route$3.update({
  id: "/$studentId",
  path: "/$studentId",
  getParentRoute: () => StudentsRoute
});
const SchoolsSchoolIdRoute = Route$2.update({
  id: "/$schoolId",
  path: "/$schoolId",
  getParentRoute: () => SchoolsRoute
});
const ApiCloudinaryUploadRoute = Route$1.update({
  id: "/api/cloudinary-upload",
  path: "/api/cloudinary-upload",
  getParentRoute: () => Route$t
});
const ApiChatRoute = Route.update({
  id: "/api/chat",
  path: "/api/chat",
  getParentRoute: () => Route$t
});
const SchoolsRouteChildren = {
  SchoolsSchoolIdRoute
};
const SchoolsRouteWithChildren = SchoolsRoute._addFileChildren(SchoolsRouteChildren);
const StudentsRouteChildren = {
  StudentsStudentIdRoute
};
const StudentsRouteWithChildren = StudentsRoute._addFileChildren(
  StudentsRouteChildren
);
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
  CompetitionsRoute,
  DashboardRoute,
  EcosystemRoute,
  FreeBoardRoute,
  GamesRoute,
  LeaderboardRoute,
  LibraryRoute,
  LiveClassRoute,
  LoginRoute,
  PdfViewerRoute,
  QuizRoute,
  QuizzesRoute,
  SchoolRoute,
  SchoolsRoute: SchoolsRouteWithChildren,
  SearchRoute,
  SpecialGameRoute,
  StudentHealthRoute,
  StudentsRoute: StudentsRouteWithChildren,
  SubjectsRoute: SubjectsRouteWithChildren,
  ApiChatRoute,
  ApiCloudinaryUploadRoute
};
const routeTree = Route$t._addFileChildren(rootRouteChildren)._addFileTypes();
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
  AppShell as A,
  Route$a as B,
  listenClassmates as C,
  listenChatMessages as D,
  listenChatRoom as E,
  markMessagesSeen as F,
  Games as G,
  followUser as H,
  sendChatMessage as I,
  updateTypingState as J,
  listenCertificates as K,
  saveCertificate as L,
  Route$4 as M,
  classLevels as N,
  Route$3 as O,
  getStudentById as P,
  getSchoolById as Q,
  Route$j as R,
  Schools as S,
  Route$2 as T,
  getStudentsBySchool as U,
  router as V,
  getStudents as a,
  listenStudents as b,
  saveStudent as c,
  createVerificationUrl as d,
  ensureEcosystemSeed as e,
  createStudentId as f,
  getSchools as g,
  cn as h,
  searchCatalog as i,
  useUser as j,
  liveClasses as k,
  listenSchools as l,
  getLibraryAssets as m,
  listenLibraryAssets as n,
  libraryItems as o,
  pseudoQrSvgDataUrl as p,
  saveLibraryAsset as q,
  listenBoardSnapshots as r,
  subjects as s,
  saveBoardSnapshot as t,
  useAuth as u,
  firebaseEnabled as v,
  activityBank as w,
  getFirebaseDb as x,
  getFirebaseRtdb as y,
  quizBank as z
};
