import {
  createElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile as updateFirebaseProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";

import { getFirebaseAuth, getFirebaseDb, getGoogleProvider, firebaseEnabled } from "@/lib/firebase";

export type UserRole = "student" | "teacher" | "parent" | "admin";

export interface UserState {
  uid: string;
  email: string;
  name: string;
  class: number;
  role: UserRole;
  schoolId: string | null;
  schoolCode: string | null;
  schoolName: string | null;
  studentId: string | null;
  avatar: string;
  xp: number;
  coins: number;
  streak: number;
  level: number;
  badges: string[];
  lessonsCompleted: number;
  friends: string[];
  following: string[];
  followers: string[];
  isOnline: boolean;
  lastSeen: number;
}

export interface AuthSession {
  loading: boolean;
  firebaseReady: boolean;
  authUser: FirebaseUser | null;
  profile: UserState;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (payload: {
    email: string;
    password: string;
    name: string;
    classLevel: number;
    role: "student" | "teacher";
  }) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (patch: Partial<UserState>) => Promise<void>;
  awardProgress: (payload: {
    xp?: number;
    coins?: number;
    badges?: string[];
    lessonsCompleted?: number;
  }) => Promise<void>;
}

const DEFAULT_PROFILE: UserState = {
  uid: "demo-user",
  email: "student@e-pathshala.local",
  name: "Aarav",
  class: 3,
  role: "student",
  schoolId: "school-kachua",
  schoolCode: "EP-2026-001245",
  schoolName: "Kachua Govt. Pilot High School",
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
  lastSeen: Date.now(),
};

const LOCAL_AUTH_STORAGE_KEY = "epathshala:auth:local-profile";

const AuthContext = createContext<AuthSession | null>(null);

function computeLevel(xp: number) {
  return Math.max(1, Math.floor(xp / 250) + 1);
}

function avatarForRole(role: UserRole) {
  return role === "teacher" ? "👩‍🏫" : "🧑‍🎓";
}

function avatarFromDisplayName(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "🧑‍🎓";
  const [firstWord] = trimmed.split(/\s+/);
  const initials = firstWord.slice(0, 2).toUpperCase();
  return initials.length ? initials : "🧑‍🎓";
}

function sanitizeAvatar(value: unknown, fallback: string, displayName = "") {
  if (typeof value !== "string" || !value.trim()) return fallback;
  if (/^https?:\/\//i.test(value.trim()) || value.includes("googleusercontent.com")) {
    return avatarFromDisplayName(displayName) || fallback;
  }
  return value.trim();
}

function normalizeRole(role: unknown): UserRole {
  return role === "teacher" ? "teacher" : "student";
}

function normalizeNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function normalizeString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function normalizeStringArray(value: unknown, fallback: string[] = []) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : fallback;
}

function createFallbackProfile(overrides: Partial<UserState> = {}): UserState {
  const profile = { ...DEFAULT_PROFILE, ...overrides };
  profile.level = computeLevel(profile.xp);
  profile.badges = profile.badges.length ? profile.badges : DEFAULT_PROFILE.badges;
  profile.avatar = profile.avatar || avatarForRole(profile.role);
  return profile;
}

function isBrowser() {
  return typeof window !== "undefined";
}

function readLocalProfile(): UserState | null {
  if (!isBrowser()) return null;

  try {
    const raw = window.localStorage.getItem(LOCAL_AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<UserState>;
    return createFallbackProfile({
      ...parsed,
      schoolName: parsed.schoolName ?? DEFAULT_PROFILE.schoolName,
    });
  } catch {
    return null;
  }
}

function saveLocalProfile(profile: UserState) {
  if (!isBrowser()) return;
  window.localStorage.setItem(LOCAL_AUTH_STORAGE_KEY, JSON.stringify(profile));
}

function clearLocalProfile() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(LOCAL_AUTH_STORAGE_KEY);
}

function createLocalAuthUser(profile: UserState): FirebaseUser {
  return {
    uid: profile.uid,
    email: profile.email,
    displayName: profile.name,
    photoURL: profile.avatar,
    emailVerified: true,
    isAnonymous: false,
    providerId: "local",
    metadata: {
      creationTime: new Date(profile.lastSeen).toISOString(),
      lastSignInTime: new Date(profile.lastSeen).toISOString(),
    },
    providerData: [],
    refreshToken: "",
    tenantId: null,
    delete: async () => {},
    getIdToken: async () => "",
    getIdTokenResult: async () => ({}) as never,
    reload: async () => {},
    toJSON: () => ({ uid: profile.uid, email: profile.email, displayName: profile.name }),
  } as unknown as FirebaseUser;
}

function seedLocalSession(profile: UserState, setAuthUser: (user: FirebaseUser | null) => void) {
  const nextProfile = createFallbackProfile(profile);
  saveLocalProfile(nextProfile);
  setAuthUser(createLocalAuthUser(nextProfile));
  return nextProfile;
}

function profileFromSnapshot(
  uid: string,
  email: string,
  data: DocumentData | undefined,
): UserState {
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
    level: normalizeNumber(
      data?.level,
      computeLevel(normalizeNumber(data?.xp, DEFAULT_PROFILE.xp)),
    ),
    badges: normalizeStringArray(data?.badges, DEFAULT_PROFILE.badges),
    lessonsCompleted: normalizeNumber(data?.lessonsCompleted, DEFAULT_PROFILE.lessonsCompleted),
    friends: normalizeStringArray(data?.friends),
    following: normalizeStringArray(data?.following),
    followers: normalizeStringArray(data?.followers),
    isOnline: Boolean(data?.isOnline),
    lastSeen: normalizeNumber(data?.lastSeen, Date.now()),
  });
}

function profileFromFirebaseUser(user: FirebaseUser, payload?: Partial<UserState>): UserState {
  const name =
    payload?.name ?? user.displayName ?? user.email?.split("@")[0] ?? DEFAULT_PROFILE.name;
  return createFallbackProfile({
    uid: user.uid,
    email: user.email ?? "",
    name,
    avatar: sanitizeAvatar(
      payload?.avatar ?? user.photoURL,
      avatarForRole(payload?.role ?? "student"),
      name,
    ),
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
    lastSeen: Date.now(),
  });
}

async function upsertFirebaseProfile(user: FirebaseUser, patch: Partial<UserState> = {}) {
  const db = getFirebaseDb();
  if (!db) return;
  const ref = doc(db, "users", user.uid);
  const base = profileFromFirebaseUser(user, patch);
  await setDoc(
    ref,
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
      lastSeen: serverTimestamp(),
    },
    { merge: true },
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserState>(DEFAULT_PROFILE);
  const profileUnsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!firebaseEnabled) {
      const localProfile = readLocalProfile();
      if (localProfile) {
        setAuthUser(createLocalAuthUser(localProfile));
        setProfile(localProfile);
      } else {
        setAuthUser(null);
        setProfile(DEFAULT_PROFILE);
      }
      setLoading(false);
      return;
    }

    const auth = getFirebaseAuth();
    const db = getFirebaseDb();
    if (!auth || !db) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      profileUnsubRef.current?.();
      profileUnsubRef.current = null;
      setAuthUser(nextUser);

      if (!nextUser) {
        setProfile(DEFAULT_PROFILE);
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", nextUser.uid);
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
        },
      );
    });

    return () => {
      unsubscribe();
      profileUnsubRef.current?.();
      profileUnsubRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!authUser || !firebaseEnabled) return;
    const db = getFirebaseDb();
    if (!db) return;

    const userRef = doc(db, "users", authUser.uid);
    const heartbeat = window.setInterval(() => {
      void updateDoc(userRef, {
        isOnline: true,
        lastSeen: serverTimestamp(),
      }).catch(() => {});
    }, 20000);

    const markOffline = () => {
      void updateDoc(userRef, {
        isOnline: false,
        lastSeen: serverTimestamp(),
      }).catch(() => {});
    };

    window.addEventListener("beforeunload", markOffline);
    return () => {
      window.clearInterval(heartbeat);
      window.removeEventListener("beforeunload", markOffline);
      markOffline();
    };
  }, [authUser]);

  const session = useMemo<AuthSession>(
    () => ({
      loading,
      firebaseReady: firebaseEnabled,
      authUser,
      profile,
      signInWithEmail: async (email, password) => {
        if (!firebaseEnabled) {
          const next = seedLocalSession(
            {
              ...DEFAULT_PROFILE,
              uid: `local-${email.trim().toLowerCase() || "student"}`,
              email: email.trim(),
              name: email.split("@")[0] || DEFAULT_PROFILE.name,
            },
            setAuthUser,
          );
          setProfile(next);
          return;
        }

        const auth = getFirebaseAuth();
        if (!auth) throw new Error("Firebase Authentication is not available.");
        await signInWithEmailAndPassword(auth, email, password);
      },
      signUpWithEmail: async ({ email, password, name, classLevel, role }) => {
        if (!firebaseEnabled) {
          const next = seedLocalSession(
            {
              ...DEFAULT_PROFILE,
              uid: `local-${email.trim().toLowerCase() || "student"}`,
              email: email.trim(),
              name,
              class: classLevel,
              role,
              avatar: avatarForRole(role),
            },
            setAuthUser,
          );
          setProfile(next);
          return;
        }

        const auth = getFirebaseAuth();
        if (!auth) throw new Error("Firebase Authentication is not available.");
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const next = profileFromFirebaseUser(result.user, {
          name,
          class: classLevel,
          role,
          avatar: avatarForRole(role),
        });
        await upsertFirebaseProfile(result.user, next);
        await updateFirebaseProfile(result.user, { displayName: name }).catch(() => {});
      },
      signInWithGoogle: async () => {
        if (!firebaseEnabled) {
          const localName = DEFAULT_PROFILE.name;
          const next = seedLocalSession(
            {
              ...DEFAULT_PROFILE,
              uid: "local-google-user",
              email: "student@e-pathshala.local",
              name: localName,
              avatar: "🌟",
            },
            setAuthUser,
          );
          setProfile(next);
          return;
        }

        const auth = getFirebaseAuth();
        if (!auth) throw new Error("Firebase Authentication is not available.");
        const provider = getGoogleProvider() as GoogleAuthProvider;
        const result = await signInWithPopup(auth, provider);
        await upsertFirebaseProfile(result.user, {
          name: result.user.displayName ?? result.user.email?.split("@")[0] ?? DEFAULT_PROFILE.name,
          avatar: sanitizeAvatar(result.user.photoURL, "🌟", result.user.displayName ?? ""),
        });
      },
      signOut: async () => {
        if (!firebaseEnabled) {
          clearLocalProfile();
          setAuthUser(null);
          setProfile(DEFAULT_PROFILE);
          return;
        }

        const auth = getFirebaseAuth();
        if (!auth) throw new Error("Firebase Authentication is not available.");
        await firebaseSignOut(auth);
      },
      updateProfile: async (patch) => {
        const nextProfile = createFallbackProfile({ ...profile, ...patch });
        setProfile(nextProfile);

        if (!firebaseEnabled) {
          saveLocalProfile(nextProfile);
          return;
        }

        if (!authUser) return;
        const db = getFirebaseDb();
        if (!db) return;

        await updateDoc(doc(db, "users", authUser.uid), {
          ...patch,
          level: computeLevel(nextProfile.xp),
          lastSeen: serverTimestamp(),
        }).catch(async () => {
          await upsertFirebaseProfile(authUser, nextProfile);
        });
      },
      awardProgress: async ({ xp = 0, coins = 0, badges = [], lessonsCompleted = 0 }) => {
        const next = createFallbackProfile({
          ...profile,
          xp: profile.xp + xp,
          coins: profile.coins + coins,
          badges: Array.from(new Set([...profile.badges, ...badges])),
          lessonsCompleted: profile.lessonsCompleted + lessonsCompleted,
        });
        setProfile(next);

        if (!firebaseEnabled) {
          saveLocalProfile(next);
          return;
        }

        if (!authUser) return;
        const db = getFirebaseDb();
        if (!db) return;

        await updateDoc(doc(db, "users", authUser.uid), {
          xp: next.xp,
          coins: next.coins,
          badges: next.badges,
          lessonsCompleted: next.lessonsCompleted,
          level: next.level,
          lastSeen: serverTimestamp(),
        }).catch(async () => {
          await upsertFirebaseProfile(authUser, next);
        });
      },
    }),
    [authUser, loading, profile],
  );

  return createElement(AuthContext.Provider, { value: session }, children);
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}

export function useUser(): UserState {
  return useAuth().profile;
}

export function useRequireAuth() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.loading && !auth.authUser && typeof window !== "undefined") {
      const redirect = encodeURIComponent(window.location.pathname + window.location.search);
      void navigate({ to: `/login?redirect=${redirect}` });
    }
  }, [auth.authUser, auth.loading, navigate]);

  return auth;
}

export async function followUser(targetUid: string) {
  const auth = getFirebaseAuth();
  const db = getFirebaseDb();
  if (!auth || !db || !auth.currentUser) return;

  const currentRef = doc(db, "users", auth.currentUser.uid);
  const targetRef = doc(db, "users", targetUid);
  const currentData = (await getDoc(currentRef)).data();
  const targetData = (await getDoc(targetRef)).data();
  await updateDoc(currentRef, {
    following: [
      ...new Set([
        ...(Array.isArray(currentData?.following) ? currentData.following : []),
        targetUid,
      ]),
    ],
    lastSeen: serverTimestamp(),
  }).catch(() => {});
  await updateDoc(targetRef, {
    followers: [
      ...new Set([
        ...(Array.isArray(targetData?.followers) ? targetData.followers : []),
        auth.currentUser.uid,
      ]),
    ],
    lastSeen: serverTimestamp(),
  }).catch(() => {});
}

export async function saveLocalProfilePatch(patch: Partial<UserState>) {
  if (firebaseEnabled) return;
  const next = createFallbackProfile({ ...(readLocalProfile() ?? DEFAULT_PROFILE), ...patch });
  saveLocalProfile(next);
}

export async function awardXp(amount: number, coins = 0) {
  if (!firebaseEnabled) {
    const current = readLocalProfile() ?? DEFAULT_PROFILE;
    const next = createFallbackProfile({
      ...current,
      xp: current.xp + amount,
      coins: current.coins + coins,
    });
    saveLocalProfile(next);
    return;
  }

  const auth = getFirebaseAuth();
  const db = getFirebaseDb();
  if (!auth?.currentUser || !db) return;
  const currentUser = auth.currentUser;
  const ref = doc(db, "users", currentUser.uid);
  const snapshot = await getDoc(ref);
  const current = snapshot.data();
  const next = createFallbackProfile({
    ...profileFromFirebaseUser(
      currentUser,
      current
        ? profileFromSnapshot(currentUser.uid, currentUser.email ?? "", current)
        : undefined,
    ),
    xp: normalizeNumber(current?.xp, DEFAULT_PROFILE.xp) + amount,
    coins: normalizeNumber(current?.coins, DEFAULT_PROFILE.coins) + coins,
  });

  await updateDoc(ref, {
    xp: next.xp,
    coins: next.coins,
    level: next.level,
    lastSeen: serverTimestamp(),
  }).catch(async () => {
    await upsertFirebaseProfile(currentUser, next);
  });
}
