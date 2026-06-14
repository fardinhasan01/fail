import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { o as onValue, r as ref, s as set } from "../_libs/firebase__database.mjs";
import { j as useUser, B as Route$a, y as getFirebaseRtdb, A as AppShell, h as cn, v as firebaseEnabled, x as getFirebaseDb, z as quizBank } from "./router-9Ny0xRmp.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { B as Button } from "./button-BiuNZb1U.mjs";
import { R as Root$2 } from "../_libs/radix-ui__react-label.mjs";
import { R as Root, I as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { S as Select$1, a as SelectValue$1, b as SelectTrigger$1, c as SelectIcon, d as SelectPortal, e as SelectContent$1, f as SelectViewport, g as SelectItem$1, h as SelectItemIndicator, i as SelectItemText, j as SelectScrollUpButton$1, k as SelectScrollDownButton$1, l as SelectLabel$1, m as SelectSeparator$1 } from "../_libs/radix-ui__react-select.mjs";
import { R as Root$1 } from "../_libs/radix-ui__react-separator.mjs";
import { o as onSnapshot, d as doc, i as getDoc, q as query, k as orderBy, w as where, c as collection, l as limit, u as updateDoc, f as writeBatch, e as getDocs, r as runTransaction, a as addDoc, s as setDoc } from "../_libs/firebase__firestore.mjs";
import "../_libs/firebase__functions.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase.mjs";
import { S as Sparkles, ah as Crown, b as CircleCheck, aw as Copy, R as RotateCcw, ax as Bomb, i as ArrowRight, ay as Share2, az as TimerReset, Z as Zap, N as Play, K as Pause, aA as SkipForward, aB as Ban, x as Download, aC as ScanSearch, aD as ShieldAlert, aE as ChevronDown, aF as Check, aG as ChevronUp, aH as TriangleAlert, T as Trophy } from "../_libs/lucide-react.mjs";
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
import "../_libs/faye-websocket.mjs";
import "../_libs/websocket-driver.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "events";
import "url";
import "../_libs/http-parser-js.mjs";
import "../_libs/websocket-extensions.mjs";
import "net";
import "tls";
import "../_libs/firebase__component.mjs";
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
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/idb.mjs";
import "../_libs/firebase__webchannel-wrapper.mjs";
import "../_libs/@grpc/grpc-js.mjs";
import "process";
import "http2";
import "http";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: ref2,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: ref2, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: ref2,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: ref2, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: ref2, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: ref2, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref2) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref: ref2,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root$2, { ref: ref2, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root$2.displayName;
const Progress = reactExports.forwardRef(({ className, value, ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref: ref2,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root.displayName;
const Select = Select$1;
const SelectValue = SelectValue$1;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectTrigger$1,
  {
    ref: ref2,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectIcon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectTrigger$1.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollUpButton$1,
  {
    ref: ref2,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollDownButton$1,
  {
    ref: ref2,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPortal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectContent$1,
  {
    ref: ref2,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectViewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectContent$1.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectLabel$1,
  {
    ref: ref2,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectLabel$1.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectItem$1,
  {
    ref: ref2,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectItem$1.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectSeparator$1,
  {
    ref: ref2,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectSeparator$1.displayName;
const Separator = reactExports.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$1,
  {
    ref: ref2,
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    ),
    ...props
  }
));
Separator.displayName = Root$1.displayName;
const LOCAL_PREFIX = "epathshala:competition-battle";
const DEFAULT_COLORS = {
  A: "from-cyan-500 to-blue-600",
  B: "from-fuchsia-500 to-rose-600"
};
const MAX_TEAM_MEMBERS = 12;
let rtdbTransportDisabled = false;
function roomSeed(roomCode) {
  let hash = 2166136261;
  for (let index = 0; index < roomCode.length; index += 1) {
    hash ^= roomCode.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
function seededShuffle(values, seedText) {
  const next = [...values];
  let seed = roomSeed(seedText);
  const random = () => {
    seed += 1831565813;
    let t = seed;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}
function randomId(prefix) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}
function makeRoomCode() {
  const digits = Math.floor(1e5 + Math.random() * 9e5);
  return `ROOM-${digits}`;
}
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function now() {
  return Date.now();
}
function scoreBonusForElapsed(roundType, elapsedMs) {
  const seconds = elapsedMs / 1e3;
  const base = roundType === "rapid-fire" ? 2 : roundType === "power" ? 1.5 : 1;
  if (seconds <= 3) return Math.round(5 * base);
  if (seconds <= 6) return Math.round(3 * base);
  if (seconds <= 10) return Math.round(1 * base);
  return 0;
}
function questionPointsForRound(roundType) {
  if (roundType === "rapid-fire") return 20;
  if (roundType === "power") return 20;
  return 10;
}
function timeLimitForRound(roundType) {
  if (roundType === "rapid-fire") return 5;
  if (roundType === "power") return 10;
  if (roundType === "sudden-death") return 8;
  return 10;
}
function normalizeFeedItem(item) {
  return {
    id: item.id ?? randomId("feed"),
    roomId: item.roomId ?? "",
    side: item.side ?? "SYSTEM",
    type: item.type ?? "info",
    message: item.message ?? "",
    pointsDelta: item.pointsDelta ?? 0,
    createdAt: item.createdAt ?? now()
  };
}
function normalizeEventItem(item) {
  const base = normalizeFeedItem(item);
  return {
    ...base,
    kind: item.kind ?? "system",
    phase: item.phase ?? "loading"
  };
}
function createLocalStore(key, fallback) {
  return {
    read() {
      if (typeof window === "undefined") return fallback;
      try {
        const raw = localStorage.getItem(`${LOCAL_PREFIX}:${key}`);
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    },
    write(value) {
      if (typeof window === "undefined") return;
      localStorage.setItem(`${LOCAL_PREFIX}:${key}`, JSON.stringify(value));
      window.dispatchEvent(new Event(`epathshala:${LOCAL_PREFIX}:${key}`));
    },
    listen(onChange) {
      onChange(this.read());
      const listener = () => onChange(this.read());
      window.addEventListener(`epathshala:${LOCAL_PREFIX}:${key}`, listener);
      window.addEventListener("storage", listener);
      return () => {
        window.removeEventListener(`epathshala:${LOCAL_PREFIX}:${key}`, listener);
        window.removeEventListener("storage", listener);
      };
    }
  };
}
function parseRoomData(id, data) {
  const base = {
    id,
    code: typeof data?.code === "string" && data.code ? data.code : makeRoomCode(),
    title: typeof data?.title === "string" && data.title ? data.title : "Quiz Battle",
    roomLabel: typeof data?.roomLabel === "string" && data.roomLabel ? data.roomLabel : "Live Battle Room",
    hostId: typeof data?.hostId === "string" ? data.hostId : "",
    hostName: typeof data?.hostName === "string" ? data.hostName : "Host",
    hostSchoolId: typeof data?.hostSchoolId === "string" ? data.hostSchoolId : null,
    hostSchoolName: typeof data?.hostSchoolName === "string" ? data.hostSchoolName : "Host School",
    hostAvatar: typeof data?.hostAvatar === "string" ? data.hostAvatar : "👑",
    teamAName: typeof data?.teamAName === "string" ? data.teamAName : "Team A",
    teamBName: typeof data?.teamBName === "string" ? data.teamBName : "Team B",
    teamAId: typeof data?.teamAId === "string" ? data.teamAId : `${id}-A`,
    teamBId: typeof data?.teamBId === "string" ? data.teamBId : `${id}-B`,
    teamACaptainId: typeof data?.teamACaptainId === "string" ? data.teamACaptainId : "",
    teamBCaptainId: typeof data?.teamBCaptainId === "string" ? data.teamBCaptainId : null,
    teamAColor: typeof data?.teamAColor === "string" ? data.teamAColor : DEFAULT_COLORS.A,
    teamBColor: typeof data?.teamBColor === "string" ? data.teamBColor : DEFAULT_COLORS.B,
    roundType: data?.roundType === "rapid-fire" || data?.roundType === "power" || data?.roundType === "sudden-death" ? data.roundType : "standard",
    totalQuestions: typeof data?.totalQuestions === "number" ? data.totalQuestions : 20,
    classLevel: typeof data?.classLevel === "number" ? data.classLevel : 3,
    questionIds: Array.isArray(data?.questionIds) ? data.questionIds.filter((item) => typeof item === "string") : [],
    phase: data?.phase === "invited" || data?.phase === "accepted" || data?.phase === "ready" || data?.phase === "countdown" || data?.phase === "live" || data?.phase === "paused" || data?.phase === "finished" ? data.phase : "draft",
    currentQuestionId: typeof data?.currentQuestionId === "string" ? data.currentQuestionId : null,
    currentQuestionIndex: typeof data?.currentQuestionIndex === "number" ? data.currentQuestionIndex : 0,
    countdownEndsAt: typeof data?.countdownEndsAt === "number" ? data.countdownEndsAt : null,
    questionStartedAt: typeof data?.questionStartedAt === "number" ? data.questionStartedAt : null,
    questionEndsAt: typeof data?.questionEndsAt === "number" ? data.questionEndsAt : null,
    questionTimeLimit: typeof data?.questionTimeLimit === "number" ? data.questionTimeLimit : 10,
    allowedSide: data?.allowedSide === "A" || data?.allowedSide === "B" ? data.allowedSide : null,
    lockState: data?.lockState === "open" || data?.lockState === "locked" || data?.lockState === "second-chance" || data?.lockState === "resolved" ? data.lockState : "open",
    lockedBy: data?.lockedBy === "A" || data?.lockedBy === "B" ? data.lockedBy : null,
    secondChanceSide: data?.secondChanceSide === "A" || data?.secondChanceSide === "B" ? data.secondChanceSide : null,
    firstAnswerSide: data?.firstAnswerSide === "A" || data?.firstAnswerSide === "B" ? data.firstAnswerSide : null,
    firstAnswerCorrect: typeof data?.firstAnswerCorrect === "boolean" ? data.firstAnswerCorrect : null,
    scores: {
      A: typeof data?.scores?.A === "number" ? data.scores.A : 0,
      B: typeof data?.scores?.B === "number" ? data.scores.B : 0
    },
    correctCounts: {
      A: typeof data?.correctCounts?.A === "number" ? data.correctCounts.A : 0,
      B: typeof data?.correctCounts?.B === "number" ? data.correctCounts.B : 0
    },
    wrongCounts: {
      A: typeof data?.wrongCounts?.A === "number" ? data.wrongCounts.A : 0,
      B: typeof data?.wrongCounts?.B === "number" ? data.wrongCounts.B : 0
    },
    speedBonuses: {
      A: typeof data?.speedBonuses?.A === "number" ? data.speedBonuses.A : 0,
      B: typeof data?.speedBonuses?.B === "number" ? data.speedBonuses.B : 0
    },
    readySides: {
      A: Boolean(data?.readySides?.A),
      B: Boolean(data?.readySides?.B)
    },
    winnerSide: data?.winnerSide === "A" || data?.winnerSide === "B" ? data.winnerSide : null,
    winnerLabel: typeof data?.winnerLabel === "string" ? data.winnerLabel : null,
    suspiciousSides: Array.isArray(data?.suspiciousSides) ? data.suspiciousSides.filter(
      (item) => item === "A" || item === "B"
    ) : [],
    updatedAt: typeof data?.updatedAt === "number" ? data.updatedAt : now(),
    createdAt: typeof data?.createdAt === "number" ? data.createdAt : now()
  };
  return base;
}
function parseQuestionData(id, data) {
  return {
    id,
    roomId: typeof data?.roomId === "string" ? data.roomId : "",
    index: typeof data?.index === "number" ? data.index : 0,
    subject: typeof data?.subject === "string" ? data.subject : "সাধারণ জ্ঞান",
    prompt: typeof data?.prompt === "string" ? data.prompt : "",
    options: Array.isArray(data?.options) ? data.options.filter((item) => typeof item === "string") : [],
    answerIndex: typeof data?.answerIndex === "number" ? data.answerIndex : 0,
    explanation: typeof data?.explanation === "string" ? data.explanation : "",
    roundType: data?.roundType === "rapid-fire" || data?.roundType === "power" || data?.roundType === "sudden-death" ? data.roundType : "standard",
    timeLimit: typeof data?.timeLimit === "number" ? data.timeLimit : 10,
    points: typeof data?.points === "number" ? data.points : 10,
    speedWindow: typeof data?.speedWindow === "number" ? data.speedWindow : 10
  };
}
function buildDeck(roomId, classLevel, roundType, totalQuestions) {
  const filtered = quizBank.filter((question) => question.classLevel === classLevel);
  const source = filtered.length ? filtered : quizBank;
  const shuffled = seededShuffle(source, `${roomId}:${classLevel}:${roundType}`);
  return shuffled.slice(0, totalQuestions).map((question, index) => {
    const timeLimit = timeLimitForRound(roundType);
    return {
      id: `${roomId}-q-${index + 1}`,
      roomId,
      index,
      subject: question.subject,
      prompt: question.prompt,
      options: question.options,
      answerIndex: question.answer,
      explanation: question.explain,
      roundType,
      timeLimit,
      points: questionPointsForRound(roundType),
      speedWindow: timeLimit
    };
  });
}
function roomLocalKey(roomId) {
  return `room:${roomId}`;
}
function liveLocalKey(roomId) {
  return `live:${roomId}`;
}
function questionsLocalKey(roomId) {
  return `questions:${roomId}`;
}
function teamsLocalKey(roomId) {
  return `teams:${roomId}`;
}
function participantsLocalKey(roomId) {
  return `participants:${roomId}`;
}
function scoresLocalKey(roomId) {
  return `scores:${roomId}`;
}
function historyLocalKey(roomId) {
  return `history:${roomId}`;
}
function feedLocalKey(roomId) {
  return `feed:${roomId}`;
}
function eventsLocalKey(roomId) {
  return `events:${roomId}`;
}
function buildLocalState(room) {
  return {
    phase: room.phase,
    currentQuestionId: room.currentQuestionId,
    currentQuestionIndex: room.currentQuestionIndex,
    countdownEndsAt: room.countdownEndsAt,
    questionStartedAt: room.questionStartedAt,
    questionEndsAt: room.questionEndsAt,
    questionTimeLimit: room.questionTimeLimit,
    lockState: room.lockState,
    lockedBy: room.lockedBy,
    firstAnswerSide: room.firstAnswerSide,
    firstAnswerCorrect: room.firstAnswerCorrect,
    secondChanceSide: room.secondChanceSide,
    allowedSide: room.allowedSide,
    scores: room.scores,
    correctCounts: room.correctCounts,
    wrongCounts: room.wrongCounts,
    speedBonuses: room.speedBonuses,
    readySides: room.readySides,
    winnerSide: room.winnerSide,
    winnerLabel: room.winnerLabel,
    suspiciousSides: room.suspiciousSides,
    activityFeed: [],
    serverNow: now()
  };
}
function buildPublicStateFromRoom(room, activityFeed = []) {
  return {
    phase: room.phase,
    currentQuestionId: room.currentQuestionId,
    currentQuestionIndex: room.currentQuestionIndex,
    countdownEndsAt: room.countdownEndsAt,
    questionStartedAt: room.questionStartedAt,
    questionEndsAt: room.questionEndsAt,
    questionTimeLimit: room.questionTimeLimit,
    lockState: room.lockState,
    lockedBy: room.lockedBy,
    firstAnswerSide: room.firstAnswerSide,
    firstAnswerCorrect: room.firstAnswerCorrect,
    secondChanceSide: room.secondChanceSide,
    allowedSide: room.allowedSide,
    scores: room.scores,
    correctCounts: room.correctCounts,
    wrongCounts: room.wrongCounts,
    speedBonuses: room.speedBonuses,
    readySides: room.readySides,
    winnerSide: room.winnerSide,
    winnerLabel: room.winnerLabel,
    suspiciousSides: room.suspiciousSides,
    activityFeed,
    serverNow: now()
  };
}
function getLiveRoomRef(roomId) {
  if (!firebaseEnabled || rtdbTransportDisabled) return null;
  const rtdb = getFirebaseRtdb();
  return rtdb ? ref(rtdb, `battleRooms/${roomId}/live`) : null;
}
async function writeLiveRoom(roomId, payload) {
  const liveRef = getLiveRoomRef(roomId);
  if (!liveRef) return false;
  try {
    await set(liveRef, payload);
    return true;
  } catch {
    rtdbTransportDisabled = true;
    return false;
  }
}
async function mirrorLiveState(roomId) {
  if (!firebaseEnabled) return;
  const db = getFirebaseDb();
  if (!db) return;
  const roomSnap = await getDoc(doc(db, "rooms", roomId));
  if (!roomSnap.exists()) return;
  const room = parseRoomData(roomSnap.id, roomSnap.data());
  const questionDocs = await getDocs(
    query(collection(db, "questions"), where("roomId", "==", roomId), orderBy("index", "asc"))
  );
  const currentQuestion = questionDocs.docs.map((entry) => parseQuestionData(entry.id, entry.data())).find((item) => item.id === room.currentQuestionId) ?? null;
  const eventDocs = await getDocs(
    query(
      collection(db, "events"),
      where("roomId", "==", roomId),
      orderBy("createdAt", "desc"),
      limit(30)
    )
  );
  const feed = eventDocs.docs.map(
    (entry) => normalizeFeedItem({
      ...entry.data(),
      id: entry.id,
      roomId
    })
  );
  await writeLiveRoom(roomId, {
    ...buildPublicStateFromRoom(room, feed),
    activityFeed: feed,
    currentQuestion: currentQuestion ? {
      id: currentQuestion.id,
      index: currentQuestion.index,
      roomId: currentQuestion.roomId,
      subject: currentQuestion.subject,
      prompt: currentQuestion.prompt,
      options: currentQuestion.options,
      timeLimit: currentQuestion.timeLimit,
      points: currentQuestion.points,
      speedWindow: currentQuestion.speedWindow
    } : null
  });
}
async function mirrorLocal(room, questions, feed = []) {
  const roomStore = createLocalStore(roomLocalKey(room.id), room);
  const liveStore = createLocalStore(liveLocalKey(room.id), buildLocalState(room));
  const questionStore = createLocalStore(questionsLocalKey(room.id), questions);
  roomStore.write(room);
  liveStore.write({ ...buildLocalState(room), activityFeed: feed });
  questionStore.write(questions);
  createLocalStore(teamsLocalKey(room.id), []).write([]);
  createLocalStore(participantsLocalKey(room.id), []).write([]);
  createLocalStore(scoresLocalKey(room.id), []).write([]);
  createLocalStore(historyLocalKey(room.id), []).write([]);
  createLocalStore(feedLocalKey(room.id), feed);
  createLocalStore(
    eventsLocalKey(room.id),
    feed.map((item) => normalizeEventItem({ ...item, kind: "system", phase: room.phase }))
  ).write(feed.map((item) => normalizeEventItem({ ...item, kind: "system", phase: room.phase })));
}
function listenBattleRoom(roomId, onChange) {
  if (!firebaseEnabled) {
    return createLocalStore(roomLocalKey(roomId), null).listen(onChange);
  }
  const db = getFirebaseDb();
  if (!db) return () => {
  };
  return onSnapshot(
    doc(db, "rooms", roomId),
    (snapshot) => onChange(snapshot.exists() ? parseRoomData(snapshot.id, snapshot.data()) : null)
  );
}
async function findBattleRoomByCode(code) {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return null;
  if (!firebaseEnabled) {
    const room = createLocalStore("rooms", []).read().find(
      (item) => item.code.toUpperCase() === normalized || item.id.toUpperCase() === normalized
    );
    return room?.id ?? null;
  }
  const db = getFirebaseDb();
  if (!db) return null;
  const snapshot = await getDocs(
    query(collection(db, "rooms"), where("code", "==", normalized), limit(1))
  );
  if (snapshot.docs[0]) return snapshot.docs[0].id;
  const byId = await getDoc(doc(db, "rooms", normalized));
  return byId.exists() ? byId.id : null;
}
function listenBattleLive(roomId, onChange) {
  if (!firebaseEnabled) {
    return createLocalStore(liveLocalKey(roomId), null).listen(
      onChange
    );
  }
  const db = getFirebaseDb();
  const fallbackUnsub = db != null ? onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
    if (!rtdbTransportDisabled) return;
    onChange(
      snapshot.exists() ? buildPublicStateFromRoom(parseRoomData(snapshot.id, snapshot.data())) : null
    );
  }) : () => {
  };
  const liveRef = getLiveRoomRef(roomId);
  if (!liveRef) {
    return fallbackUnsub;
  }
  const liveUnsub = onValue(
    liveRef,
    (snapshot) => {
      onChange(snapshot.exists() ? snapshot.val() : null);
    },
    () => {
      rtdbTransportDisabled = true;
      if (db) {
        void getDoc(doc(db, "rooms", roomId)).then((snapshot) => {
          onChange(
            snapshot.exists() ? buildPublicStateFromRoom(parseRoomData(snapshot.id, snapshot.data())) : null
          );
        }).catch(() => onChange(null));
      } else {
        onChange(null);
      }
    }
  );
  return () => {
    fallbackUnsub();
    liveUnsub();
  };
}
function listenBattleQuestions(roomId, onChange) {
  if (!firebaseEnabled) {
    return createLocalStore(questionsLocalKey(roomId), []).listen(onChange);
  }
  const db = getFirebaseDb();
  if (!db) return () => {
  };
  return onSnapshot(
    query(collection(db, "questions"), where("roomId", "==", roomId), orderBy("index", "asc")),
    (snapshot) => {
      onChange(snapshot.docs.map((entry) => parseQuestionData(entry.id, entry.data())));
    }
  );
}
function listenBattleTeams(roomId, onChange) {
  if (!firebaseEnabled) {
    return createLocalStore(teamsLocalKey(roomId), []).listen(onChange);
  }
  const db = getFirebaseDb();
  if (!db) return () => {
  };
  return onSnapshot(
    query(collection(db, "teams"), where("roomId", "==", roomId), orderBy("joinedAt", "asc")),
    (snapshot) => {
      onChange(snapshot.docs.map((entry) => entry.data()));
    }
  );
}
function listenBattleHistory(roomId, onChange) {
  if (!firebaseEnabled) {
    return createLocalStore(historyLocalKey(roomId), []).listen(onChange);
  }
  const db = getFirebaseDb();
  if (!db) return () => {
  };
  return onSnapshot(
    query(
      collection(db, "battle_history"),
      where("roomId", "==", roomId),
      orderBy("endedAt", "desc"),
      limit(10)
    ),
    (snapshot) => {
      onChange(snapshot.docs.map((entry) => entry.data()));
    }
  );
}
function listenBattleFeed(roomId, onChange) {
  if (!firebaseEnabled) {
    return createLocalStore(feedLocalKey(roomId), []).listen(onChange);
  }
  const db = getFirebaseDb();
  if (!db) return () => {
  };
  return onSnapshot(
    query(
      collection(db, "events"),
      where("roomId", "==", roomId),
      orderBy("createdAt", "desc"),
      limit(40)
    ),
    (snapshot) => {
      onChange(
        snapshot.docs.map(
          (entry) => normalizeFeedItem({
            ...entry.data(),
            id: entry.id,
            roomId
          })
        )
      );
    }
  );
}
async function createBattleRoom(input) {
  const roomId = randomId("room");
  const code = makeRoomCode();
  const deck = buildDeck(
    roomId,
    input.classLevel,
    input.roundType,
    clamp(input.totalQuestions, 5, 20)
  );
  const questionIds = deck.map((item) => item.id);
  const room = {
    id: roomId,
    code,
    title: input.title,
    roomLabel: input.roomLabel,
    hostId: input.host.uid,
    hostName: input.host.name,
    hostSchoolId: input.host.schoolId,
    hostSchoolName: input.host.schoolName ?? "Unknown school",
    hostAvatar: input.host.avatar,
    teamAName: input.teamAName,
    teamBName: input.teamBName,
    teamAId: `${roomId}-team-a`,
    teamBId: `${roomId}-team-b`,
    teamACaptainId: input.host.uid,
    teamBCaptainId: null,
    teamAColor: DEFAULT_COLORS.A,
    teamBColor: DEFAULT_COLORS.B,
    roundType: input.roundType,
    totalQuestions: deck.length,
    classLevel: input.classLevel,
    questionIds,
    phase: "invited",
    currentQuestionId: questionIds[0] ?? null,
    currentQuestionIndex: 0,
    countdownEndsAt: null,
    questionStartedAt: null,
    questionEndsAt: null,
    questionTimeLimit: timeLimitForRound(input.roundType),
    allowedSide: null,
    lockState: "open",
    lockedBy: null,
    secondChanceSide: null,
    firstAnswerSide: null,
    firstAnswerCorrect: null,
    scores: { A: 0, B: 0 },
    correctCounts: { A: 0, B: 0 },
    wrongCounts: { A: 0, B: 0 },
    speedBonuses: { A: 0, B: 0 },
    readySides: { A: false, B: false },
    winnerSide: null,
    winnerLabel: null,
    suspiciousSides: [],
    updatedAt: now(),
    createdAt: now()
  };
  const roomEvent = normalizeEventItem({
    roomId,
    side: "SYSTEM",
    type: "state",
    kind: "room",
    phase: "invited",
    message: `${room.teamAName} vs ${room.teamBName}`,
    pointsDelta: 0
  });
  if (!firebaseEnabled) {
    const rooms = createLocalStore("rooms", []).read();
    createLocalStore("rooms", [
      room,
      ...rooms.filter((item) => item.id !== room.id)
    ]).write([room, ...rooms.filter((item) => item.id !== room.id)]);
    mirrorLocal(room, deck, [roomEvent]);
    return room;
  }
  const db = getFirebaseDb();
  if (!db) return room;
  const batch = writeBatch(db);
  batch.set(doc(db, "rooms", roomId), room);
  batch.set(doc(db, "matches", roomId), {
    roomId,
    roomLabel: input.roomLabel,
    title: input.title,
    code,
    hostId: input.host.uid,
    hostName: input.host.name,
    classLevel: input.classLevel,
    roundType: input.roundType,
    totalQuestions: deck.length,
    status: "invited",
    createdAt: now(),
    updatedAt: now()
  });
  batch.set(doc(db, "participants", `${roomId}-${input.host.uid}`), {
    id: `${roomId}-${input.host.uid}`,
    roomId,
    uid: input.host.uid,
    side: "A",
    role: "captain",
    name: input.host.name,
    avatar: input.host.avatar,
    schoolId: input.host.schoolId,
    schoolName: input.host.schoolName ?? "Unknown school",
    ready: false,
    joinedAt: now(),
    lastSeenAt: now(),
    isOnline: true
  });
  batch.set(doc(db, "scores", `${roomId}-A`), {
    id: `${roomId}-A`,
    roomId,
    side: "A",
    score: 0,
    correct: 0,
    wrong: 0,
    speedBonus: 0,
    updatedAt: now()
  });
  batch.set(doc(db, "scores", `${roomId}-B`), {
    id: `${roomId}-B`,
    roomId,
    side: "B",
    score: 0,
    correct: 0,
    wrong: 0,
    speedBonus: 0,
    updatedAt: now()
  });
  deck.forEach((question) => {
    batch.set(doc(db, "questions", question.id), question);
  });
  batch.set(doc(db, "teams", room.teamAId), {
    id: room.teamAId,
    roomId,
    side: "A",
    name: room.teamAName,
    captainId: input.host.uid,
    captainName: input.host.name,
    captainAvatar: input.host.avatar,
    schoolId: input.host.schoolId,
    schoolName: input.host.schoolName ?? "Unknown school",
    color: room.teamAColor,
    ready: false,
    joinedAt: now(),
    points: 0,
    correct: 0,
    wrong: 0,
    speedBonus: 0,
    members: [
      {
        uid: input.host.uid,
        name: input.host.name,
        avatar: input.host.avatar,
        role: "captain",
        schoolId: input.host.schoolId,
        schoolName: input.host.schoolName ?? "Unknown school",
        joinedAt: now(),
        lastSeenAt: now(),
        ready: false,
        isOnline: true
      }
    ]
  });
  batch.set(doc(db, "teams", room.teamBId), {
    id: room.teamBId,
    roomId,
    side: "B",
    name: room.teamBName,
    captainId: "",
    captainName: "",
    captainAvatar: "🏫",
    schoolId: null,
    schoolName: room.teamBName,
    color: room.teamBColor,
    ready: false,
    joinedAt: now(),
    points: 0,
    correct: 0,
    wrong: 0,
    speedBonus: 0,
    members: []
  });
  batch.set(doc(db, "events", roomEvent.id), roomEvent);
  await batch.commit();
  await writeLiveRoom(roomId, {
    ...buildPublicStateFromRoom(room, [roomEvent]),
    activityFeed: [roomEvent],
    currentQuestion: deck[0] ? {
      id: deck[0].id,
      index: deck[0].index,
      roomId,
      subject: deck[0].subject,
      prompt: deck[0].prompt,
      options: deck[0].options,
      timeLimit: deck[0].timeLimit,
      points: deck[0].points,
      speedWindow: deck[0].speedWindow
    } : null
  });
  return room;
}
async function updateRoomAndMirror(roomId, patch, note) {
  if (!firebaseEnabled) {
    const rooms = createLocalStore("rooms", []).read();
    const next = rooms.map(
      (room2) => room2.id === roomId ? { ...room2, ...patch, updatedAt: now() } : room2
    );
    const room = next.find((item) => item.id === roomId) ?? null;
    createLocalStore("rooms", []).write(next);
    if (room) {
      createLocalStore(questionsLocalKey(roomId), []).read();
      const live = {
        ...buildLocalState(room),
        activityFeed: createLocalStore(feedLocalKey(roomId), []).read(),
        serverNow: now()
      };
      createLocalStore(liveLocalKey(roomId), live).write(live);
    }
    return room;
  }
  const db = getFirebaseDb();
  if (!db) return null;
  await updateDoc(doc(db, "rooms", roomId), {
    ...patch,
    updatedAt: now()
  });
  await mirrorLiveState(roomId);
  return null;
}
async function joinBattleRoom(roomId, user, side, role = "member") {
  const participant = {
    id: `${roomId}-${user.uid}`,
    roomId,
    uid: user.uid,
    side: role === "spectator" ? "SPECTATOR" : side,
    role,
    name: user.name,
    avatar: user.avatar,
    schoolId: user.schoolId,
    schoolName: user.schoolName ?? "Unknown school",
    ready: false,
    joinedAt: now(),
    lastSeenAt: now(),
    isOnline: true
  };
  if (!firebaseEnabled) {
    const rooms = createLocalStore("rooms", []).read();
    const room = rooms.find((item) => item.id === roomId);
    if (!room) return { accepted: false, reason: "room-missing" };
    const teams = createLocalStore(teamsLocalKey(roomId), []).read();
    const participants = createLocalStore(
      participantsLocalKey(roomId),
      []
    ).read();
    const nextParticipants = [...participants.filter((item) => item.uid !== user.uid), participant];
    createLocalStore(participantsLocalKey(roomId), nextParticipants).write(nextParticipants);
    const nextTeams = teams.map((team) => {
      if (team.roomId !== roomId || team.side !== side || role === "spectator") return team;
      if (!team.members.some((member2) => member2.uid === user.uid) && team.members.length >= MAX_TEAM_MEMBERS)
        return team;
      const member = {
        uid: user.uid,
        name: user.name,
        avatar: user.avatar,
        role,
        schoolId: user.schoolId,
        schoolName: user.schoolName ?? "Unknown school",
        joinedAt: now(),
        lastSeenAt: now(),
        ready: false,
        isOnline: true
      };
      const members = team.members.filter((existing) => existing.uid !== user.uid).concat(member);
      return {
        ...team,
        members,
        ready: false,
        captainId: role === "captain" ? user.uid : team.captainId,
        captainName: role === "captain" ? user.name : team.captainName,
        captainAvatar: role === "captain" ? user.avatar : team.captainAvatar,
        joinedAt: now()
      };
    });
    createLocalStore(teamsLocalKey(roomId), nextTeams).write(nextTeams);
    const nextRooms = rooms.map(
      (current) => current.id === roomId ? {
        ...current,
        phase: current.phase === "draft" ? "invited" : "accepted",
        teamACaptainId: side === "A" && role === "captain" ? user.uid : current.teamACaptainId,
        teamBCaptainId: side === "B" && role === "captain" ? user.uid : current.teamBCaptainId,
        readySides: { ...current.readySides, [side]: false },
        updatedAt: now()
      } : current
    );
    createLocalStore("rooms", nextRooms).write(nextRooms);
    const nextEvents = [
      normalizeEventItem({
        roomId,
        side: role === "spectator" ? "SYSTEM" : side,
        type: "info",
        kind: "team",
        phase: room.phase,
        message: role === "spectator" ? `${user.name} joined as spectator.` : `${user.name} joined Team ${side}.`,
        pointsDelta: 0
      }),
      ...createLocalStore(feedLocalKey(roomId), []).read()
    ].slice(0, 30);
    createLocalStore(feedLocalKey(roomId), nextEvents).write(nextEvents);
    createLocalStore(
      eventsLocalKey(roomId),
      nextEvents.map((item) => normalizeEventItem({ ...item, phase: room.phase }))
    ).write(nextEvents.map((item) => normalizeEventItem({ ...item, phase: room.phase })));
    return { accepted: true, roomId };
  }
  const db = getFirebaseDb();
  if (!db) return { accepted: false, reason: "firebase-unavailable" };
  const roomRef = doc(db, "rooms", roomId);
  const teamRef = role === "spectator" ? null : doc(db, "teams", `${roomId}-${side === "A" ? "team-a" : "team-b"}`);
  const participantRef = doc(db, "participants", participant.id);
  const result = await runTransaction(db, async (transaction) => {
    const roomSnap = await transaction.get(roomRef);
    if (!roomSnap.exists()) return { accepted: false, reason: "room-missing" };
    const room = parseRoomData(roomSnap.id, roomSnap.data());
    if (role !== "spectator") {
      if (!teamRef) return { accepted: false, reason: "team-missing" };
      const teamSnap = await transaction.get(teamRef);
      const team = teamSnap.exists() ? teamSnap.data() : {
        id: teamRef.id,
        roomId,
        side,
        name: side === "A" ? room.teamAName : room.teamBName,
        captainId: "",
        captainName: "",
        captainAvatar: "🏫",
        schoolId: null,
        schoolName: side === "A" ? room.teamAName : room.teamBName,
        color: side === "A" ? room.teamAColor : room.teamBColor,
        ready: false,
        joinedAt: now(),
        points: 0,
        correct: 0,
        wrong: 0,
        speedBonus: 0,
        members: []
      };
      const otherSide = side === "A" ? "B" : "A";
      const otherTeamRef = doc(db, "teams", `${roomId}-${otherSide === "A" ? "team-a" : "team-b"}`);
      const otherTeamSnap = await transaction.get(otherTeamRef);
      const otherTeam = otherTeamSnap.exists() ? otherTeamSnap.data() : null;
      const existingMember = team.members.find((member2) => member2.uid === user.uid);
      if (!existingMember && team.members.length >= MAX_TEAM_MEMBERS) {
        return { accepted: false, reason: "team-full" };
      }
      const member = {
        uid: user.uid,
        name: user.name,
        avatar: user.avatar,
        role,
        schoolId: user.schoolId,
        schoolName: user.schoolName ?? "Unknown school",
        joinedAt: now(),
        lastSeenAt: now(),
        ready: false,
        isOnline: true
      };
      const members = team.members.filter((item) => item.uid !== user.uid).concat(member);
      const nextPhase = members.length > 0 && (otherTeam?.members?.length ?? 0) > 0 ? "accepted" : room.phase === "draft" ? "invited" : room.phase;
      transaction.set(participantRef, participant);
      transaction.set(teamRef, {
        ...team,
        members,
        ready: false,
        captainId: role === "captain" ? user.uid : team.captainId,
        captainName: role === "captain" ? user.name : team.captainName,
        captainAvatar: role === "captain" ? user.avatar : team.captainAvatar,
        joinedAt: now()
      });
      transaction.update(roomRef, {
        phase: nextPhase,
        teamACaptainId: side === "A" && role === "captain" ? user.uid : room.teamACaptainId,
        teamBCaptainId: side === "B" && role === "captain" ? user.uid : room.teamBCaptainId,
        readySides: { ...room.readySides, [side]: false },
        updatedAt: now()
      });
      transaction.set(doc(db, "scores", `${roomId}-${side}`), {
        id: `${roomId}-${side}`,
        roomId,
        side,
        score: room.scores[side],
        correct: room.correctCounts[side],
        wrong: room.wrongCounts[side],
        speedBonus: room.speedBonuses[side],
        updatedAt: now()
      });
      transaction.set(
        doc(db, "events", randomId("event")),
        normalizeEventItem({
          roomId,
          side,
          type: "info",
          kind: "team",
          phase: nextPhase,
          message: `${user.name} joined Team ${side}.`,
          pointsDelta: 0
        })
      );
    } else {
      transaction.set(participantRef, participant);
      transaction.update(roomRef, { updatedAt: now() });
      transaction.set(
        doc(db, "events", randomId("event")),
        normalizeEventItem({
          roomId,
          side: "SYSTEM",
          type: "info",
          kind: "team",
          phase: room.phase,
          message: `${user.name} joined as a spectator.`,
          pointsDelta: 0
        })
      );
    }
    return { accepted: true, roomId };
  });
  await mirrorLiveState(roomId);
  return result;
}
async function setTeamReady(roomId, side, ready) {
  if (!firebaseEnabled) {
    const rooms = createLocalStore("rooms", []).read();
    const teams = createLocalStore(teamsLocalKey(roomId), []).read();
    const nextTeams = teams.map(
      (team) => team.roomId === roomId && team.side === side ? { ...team, ready } : team
    );
    createLocalStore(teamsLocalKey(roomId), nextTeams).write(nextTeams);
    const nextRooms = rooms.map(
      (room3) => room3.id === roomId ? {
        ...room3,
        readySides: { ...room3.readySides, [side]: ready },
        phase: { ...room3.readySides, [side]: ready }.A && { ...room3.readySides, [side]: ready }.B ? "ready" : room3.phase === "ready" && !ready ? "accepted" : room3.phase,
        updatedAt: now()
      } : room3
    );
    createLocalStore("rooms", nextRooms).write(nextRooms);
    const room2 = nextRooms.find((item) => item.id === roomId);
    if (room2)
      createLocalStore(liveLocalKey(roomId), { ...buildLocalState(room2), serverNow: now() }).write({
        ...buildLocalState(room2),
        serverNow: now()
      });
    return;
  }
  const db = getFirebaseDb();
  if (!db) return;
  const roomRef = doc(db, "rooms", roomId);
  const teamRef = doc(db, "teams", `${roomId}-${side === "A" ? "team-a" : "team-b"}`);
  const roomSnap = await getDoc(roomRef);
  if (!roomSnap.exists()) return;
  const room = parseRoomData(roomId, roomSnap.data());
  const nextReady = { ...room.readySides, [side]: ready };
  await updateDoc(teamRef, { ready, updatedAt: now() });
  await updateDoc(roomRef, {
    [`readySides.${side}`]: ready,
    phase: nextReady.A && nextReady.B ? "ready" : room.phase === "ready" && !ready ? "accepted" : room.phase,
    updatedAt: now()
  });
  await updateDoc(doc(db, "participants", `${roomId}-${side}`), { ready, lastSeenAt: now() }).catch(
    () => {
    }
  );
  await mirrorLiveState(roomId);
}
async function startCountdown(roomId, seconds = 10) {
  const countdownEndsAt = now() + seconds * 1e3;
  if (!firebaseEnabled) {
    const rooms = createLocalStore("rooms", []).read();
    const nextRooms = rooms.map(
      (room3) => room3.id === roomId && room3.readySides.A && room3.readySides.B ? { ...room3, phase: "countdown", countdownEndsAt, updatedAt: now() } : room3
    );
    createLocalStore("rooms", nextRooms).write(nextRooms);
    const room2 = nextRooms.find((item) => item.id === roomId);
    if (room2)
      createLocalStore(liveLocalKey(roomId), { ...buildLocalState(room2), serverNow: now() }).write({
        ...buildLocalState(room2),
        serverNow: now()
      });
    return;
  }
  const db = getFirebaseDb();
  if (!db) return;
  const roomRef = doc(db, "rooms", roomId);
  const roomSnap = await getDoc(roomRef);
  if (!roomSnap.exists()) return;
  const room = parseRoomData(roomId, roomSnap.data());
  if (!room.readySides.A || !room.readySides.B) return;
  await updateDoc(roomRef, { phase: "countdown", countdownEndsAt, updatedAt: now() });
  await mirrorLiveState(roomId);
}
async function loadQuestionByIndex(roomId, index) {
  const db = getFirebaseDb();
  if (!db) return null;
  const snap = await getDocs(
    query(
      collection(db, "questions"),
      where("roomId", "==", roomId),
      where("index", "==", index),
      limit(1)
    )
  );
  if (!snap.docs[0]) return null;
  return parseQuestionData(snap.docs[0].id, snap.docs[0].data());
}
async function loadQuestionForRoom(room, index) {
  const db = getFirebaseDb();
  if (!db) return null;
  const questionId = room.questionIds[index];
  if (questionId) {
    const snap = await getDoc(doc(db, "questions", questionId));
    if (snap.exists()) return parseQuestionData(snap.id, snap.data());
  }
  return loadQuestionByIndex(room.id, index);
}
async function advanceToQuestion(roomId, nextIndex) {
  const db = getFirebaseDb();
  if (!db) return null;
  const roomRef = doc(db, "rooms", roomId);
  const roomSnap = await getDoc(roomRef);
  if (!roomSnap.exists()) return null;
  const room = parseRoomData(roomId, roomSnap.data());
  const question = await loadQuestionForRoom(room, nextIndex);
  if (!question) {
    const roomTeams = await getDocs(query(collection(db, "teams"), where("roomId", "==", roomId)));
    const teamDocs = roomTeams.docs.map((entry) => entry.data());
    const winnerSide = room.scores.A === room.scores.B ? null : room.scores.A > room.scores.B ? "A" : "B";
    const winnerLabel = winnerSide === "A" ? room.teamAName : winnerSide === "B" ? room.teamBName : "Tie";
    const history = {
      id: randomId("history"),
      roomId,
      winnerSide,
      winnerLabel,
      teamAName: room.teamAName,
      teamBName: room.teamBName,
      scoreA: room.scores.A,
      scoreB: room.scores.B,
      correctA: room.correctCounts.A,
      correctB: room.correctCounts.B,
      wrongA: room.wrongCounts.A,
      wrongB: room.wrongCounts.B,
      speedA: room.speedBonuses.A,
      speedB: room.speedBonuses.B,
      accuracyA: room.correctCounts.A + room.wrongCounts.A > 0 ? Math.round(room.correctCounts.A / (room.correctCounts.A + room.wrongCounts.A) * 100) : 0,
      accuracyB: room.correctCounts.B + room.wrongCounts.B > 0 ? Math.round(room.correctCounts.B / (room.correctCounts.B + room.wrongCounts.B) * 100) : 0,
      questionCount: room.totalQuestions,
      classLevel: room.classLevel,
      roundType: room.roundType,
      endedAt: now()
    };
    await updateDoc(roomRef, {
      phase: "finished",
      winnerSide,
      winnerLabel,
      currentQuestionId: null,
      questionEndsAt: null,
      questionStartedAt: null,
      updatedAt: now()
    });
    await setDoc(doc(db, "battle_history", history.id), history);
    await mirrorLiveState(roomId);
    return { history, teamDocs };
  }
  await updateDoc(roomRef, {
    phase: "live",
    currentQuestionId: question.id,
    currentQuestionIndex: nextIndex,
    questionTimeLimit: question.timeLimit,
    questionStartedAt: now(),
    questionEndsAt: now() + question.timeLimit * 1e3,
    allowedSide: null,
    lockState: "open",
    lockedBy: null,
    secondChanceSide: null,
    firstAnswerSide: null,
    firstAnswerCorrect: null,
    updatedAt: now()
  });
  await mirrorLiveState(roomId);
  return { question };
}
async function startBattleMatch(roomId) {
  if (!firebaseEnabled) {
    const rooms = createLocalStore("rooms", []).read();
    const nextRooms = rooms.map((room3) => {
      if (room3.id !== roomId) return room3;
      if (room3.phase === "countdown" && room3.countdownEndsAt && room3.countdownEndsAt > now())
        return room3;
      return {
        ...room3,
        phase: "live",
        currentQuestionIndex: room3.currentQuestionIndex ?? 0,
        currentQuestionId: room3.questionIds[room3.currentQuestionIndex] ?? room3.questionIds[0] ?? null,
        questionStartedAt: now(),
        questionEndsAt: now() + room3.questionTimeLimit * 1e3,
        lockState: "open",
        lockedBy: null,
        secondChanceSide: null,
        firstAnswerSide: null,
        firstAnswerCorrect: null,
        countdownEndsAt: null,
        updatedAt: now()
      };
    });
    createLocalStore("rooms", nextRooms).write(nextRooms);
    const room2 = nextRooms.find((item) => item.id === roomId);
    if (room2)
      createLocalStore(liveLocalKey(roomId), { ...buildLocalState(room2), serverNow: now() }).write({
        ...buildLocalState(room2),
        serverNow: now()
      });
    return;
  }
  const db = getFirebaseDb();
  if (!db) return;
  const roomSnap = await getDoc(doc(db, "rooms", roomId));
  if (!roomSnap.exists()) return;
  const room = parseRoomData(roomId, roomSnap.data());
  if (room.phase === "countdown" && room.countdownEndsAt && room.countdownEndsAt > now()) return;
  const currentQuestionId = room.questionIds[room.currentQuestionIndex] ?? room.questionIds[0] ?? null;
  await updateDoc(doc(db, "rooms", roomId), {
    phase: "live",
    currentQuestionIndex: room.currentQuestionIndex ?? 0,
    currentQuestionId,
    questionStartedAt: now(),
    questionEndsAt: now() + room.questionTimeLimit * 1e3,
    questionTimeLimit: timeLimitForRound(room.roundType),
    lockState: "open",
    lockedBy: null,
    secondChanceSide: null,
    firstAnswerSide: null,
    firstAnswerCorrect: null,
    countdownEndsAt: null,
    updatedAt: now()
  });
  await mirrorLiveState(roomId);
}
async function pauseBattle(roomId) {
  await updateRoomAndMirror(roomId, { phase: "paused" });
}
async function resumeBattle(roomId) {
  await updateRoomAndMirror(roomId, { phase: "live" });
}
async function skipQuestion(roomId) {
  if (!firebaseEnabled) {
    const rooms = createLocalStore("rooms", []).read();
    const room2 = rooms.find((item) => item.id === roomId);
    if (!room2) return;
    const nextIndex = room2.currentQuestionIndex + 1;
    const nextRooms = rooms.map(
      (item) => item.id === roomId ? {
        ...item,
        currentQuestionIndex: nextIndex,
        currentQuestionId: item.questionIds[nextIndex] ?? null,
        questionStartedAt: now(),
        questionEndsAt: now() + item.questionTimeLimit * 1e3,
        lockState: "open",
        lockedBy: null,
        secondChanceSide: null,
        firstAnswerSide: null,
        firstAnswerCorrect: null,
        updatedAt: now()
      } : item
    );
    createLocalStore("rooms", nextRooms).write(nextRooms);
    return;
  }
  const db = getFirebaseDb();
  if (!db) return;
  const roomSnap = await getDoc(doc(db, "rooms", roomId));
  if (!roomSnap.exists()) return;
  const room = parseRoomData(roomId, roomSnap.data());
  await advanceToQuestion(roomId, room.currentQuestionIndex + 1);
}
async function removeTeam(roomId, side) {
  if (!firebaseEnabled) {
    const teams = createLocalStore(teamsLocalKey(roomId), []).read();
    createLocalStore(
      teamsLocalKey(roomId),
      teams.filter((team) => team.side !== side)
    ).write(teams.filter((team) => team.side !== side));
    return;
  }
  const db = getFirebaseDb();
  if (!db) return;
  const teamId = `${roomId}-${"team-b"}`;
  await updateDoc(doc(db, "teams", teamId), { members: [], ready: false });
  await mirrorLiveState(roomId);
}
async function endBattle(roomId) {
  if (!firebaseEnabled) {
    const rooms = createLocalStore("rooms", []).read();
    const nextRooms = rooms.map(
      (room2) => room2.id === roomId ? { ...room2, phase: "finished", updatedAt: now() } : room2
    );
    createLocalStore("rooms", nextRooms).write(nextRooms);
    return;
  }
  const db = getFirebaseDb();
  if (!db) return;
  const roomSnap = await getDoc(doc(db, "rooms", roomId));
  if (!roomSnap.exists()) return;
  const room = parseRoomData(roomId, roomSnap.data());
  const winnerSide = room.scores.A === room.scores.B ? null : room.scores.A > room.scores.B ? "A" : "B";
  const winnerLabel = winnerSide === "A" ? room.teamAName : winnerSide === "B" ? room.teamBName : "Tie";
  await updateDoc(doc(db, "rooms", roomId), {
    phase: "finished",
    winnerSide,
    winnerLabel,
    updatedAt: now()
  });
  await mirrorLiveState(roomId);
}
async function submitBattleAnswer(input) {
  if (!firebaseEnabled) {
    const rooms = createLocalStore("rooms", []).read();
    const room = rooms.find((item) => item.id === input.roomId);
    const questions = createLocalStore(
      questionsLocalKey(input.roomId),
      []
    ).read();
    if (!room) return { accepted: false, reason: "room-missing" };
    const question = questions.find((item) => item.id === room.currentQuestionId);
    if (!question) return { accepted: false, reason: "question-missing" };
    const elapsedMs = now() - (room.questionStartedAt ?? now());
    const isCorrect = input.answerIndex === question.answerIndex;
    const base = question.points;
    const bonus = isCorrect ? scoreBonusForElapsed(room.roundType, elapsedMs) : 0;
    const feed = createLocalStore(feedLocalKey(input.roomId), []).read();
    const nextFeed = [...feed];
    const nextRoom = { ...room };
    if (room.lockState === "open" || room.lockState === "second-chance") {
      if (!room.lockedBy) {
        nextRoom.lockedBy = input.side;
        nextRoom.firstAnswerSide = input.side;
        nextRoom.firstAnswerCorrect = isCorrect;
        nextRoom.lockState = isCorrect ? "resolved" : "second-chance";
        nextRoom.allowedSide = isCorrect ? null : input.side === "A" ? "B" : "A";
        nextRoom.secondChanceSide = isCorrect ? null : input.side === "A" ? "B" : "A";
        nextRoom.questionEndsAt = now() + (isCorrect ? 1800 : 1e4);
        nextRoom.scores[input.side] = nextRoom.scores[input.side] + (isCorrect ? base + bonus : -5);
        nextRoom.correctCounts[input.side] = nextRoom.correctCounts[input.side] + (isCorrect ? 1 : 0);
        nextRoom.wrongCounts[input.side] = nextRoom.wrongCounts[input.side] + (isCorrect ? 0 : 1);
        nextRoom.speedBonuses[input.side] = nextRoom.speedBonuses[input.side] + bonus;
        nextFeed.unshift(
          normalizeFeedItem({
            roomId: input.roomId,
            side: input.side,
            type: isCorrect ? "correct" : "incorrect",
            message: isCorrect ? `${input.user.name} answered first and correct.` : `${input.user.name} answered incorrectly. Second chance unlocked.`,
            pointsDelta: isCorrect ? base + bonus : -5
          })
        );
        if (isCorrect || room.roundType === "sudden-death") {
          const nextIndex = room.currentQuestionIndex + 1;
          const nextQuestion = questions.find((item) => item.index === nextIndex) ?? null;
          if (nextQuestion) {
            nextRoom.currentQuestionId = nextQuestion.id;
            nextRoom.currentQuestionIndex = nextIndex;
            nextRoom.lockState = "open";
            nextRoom.lockedBy = null;
            nextRoom.secondChanceSide = null;
            nextRoom.firstAnswerSide = null;
            nextRoom.firstAnswerCorrect = null;
            nextRoom.questionStartedAt = now();
            nextRoom.questionEndsAt = now() + nextQuestion.timeLimit * 1e3;
            nextRoom.questionTimeLimit = nextQuestion.timeLimit;
            nextRoom.allowedSide = null;
            nextFeed.unshift(
              normalizeFeedItem({
                roomId: input.roomId,
                side: "SYSTEM",
                type: "state",
                message: `Question ${nextIndex + 1} loaded.`
              })
            );
          } else {
            nextRoom.phase = "finished";
            nextRoom.winnerSide = nextRoom.scores.A === nextRoom.scores.B ? null : nextRoom.scores.A > nextRoom.scores.B ? "A" : "B";
            nextRoom.winnerLabel = nextRoom.winnerSide === "A" ? nextRoom.teamAName : nextRoom.winnerSide === "B" ? nextRoom.teamBName : "Tie";
          }
        }
      } else if (room.secondChanceSide === input.side) {
        if (isCorrect) {
          nextRoom.lockState = "resolved";
          nextRoom.firstAnswerSide = room.firstAnswerSide;
          nextRoom.firstAnswerCorrect = false;
          nextRoom.scores[input.side] = nextRoom.scores[input.side] + base + bonus;
          nextRoom.correctCounts[input.side] = nextRoom.correctCounts[input.side] + 1;
          nextRoom.speedBonuses[input.side] = nextRoom.speedBonuses[input.side] + bonus;
          nextFeed.unshift(
            normalizeFeedItem({
              roomId: input.roomId,
              side: input.side,
              type: "correct",
              message: `${input.user.name} rescued the question correctly.`,
              pointsDelta: base + bonus
            })
          );
        } else {
          nextRoom.lockState = "resolved";
          nextRoom.wrongCounts[input.side] = nextRoom.wrongCounts[input.side] + 1;
          nextFeed.unshift(
            normalizeFeedItem({
              roomId: input.roomId,
              side: input.side,
              type: "incorrect",
              message: `${input.user.name} also missed it.`,
              pointsDelta: 0
            })
          );
        }
        const nextIndex = room.currentQuestionIndex + 1;
        const nextQuestion = questions.find((item) => item.index === nextIndex) ?? null;
        if (nextQuestion) {
          nextRoom.currentQuestionId = nextQuestion.id;
          nextRoom.currentQuestionIndex = nextIndex;
          nextRoom.lockState = "open";
          nextRoom.lockedBy = null;
          nextRoom.secondChanceSide = null;
          nextRoom.firstAnswerSide = null;
          nextRoom.firstAnswerCorrect = null;
          nextRoom.questionStartedAt = now();
          nextRoom.questionEndsAt = now() + nextQuestion.timeLimit * 1e3;
          nextRoom.questionTimeLimit = nextQuestion.timeLimit;
          nextRoom.allowedSide = null;
        } else {
          nextRoom.phase = "finished";
          nextRoom.winnerSide = nextRoom.scores.A === nextRoom.scores.B ? null : nextRoom.scores.A > nextRoom.scores.B ? "A" : "B";
          nextRoom.winnerLabel = nextRoom.winnerSide === "A" ? nextRoom.teamAName : nextRoom.winnerSide === "B" ? nextRoom.teamBName : "Tie";
        }
      } else {
        return { accepted: false, reason: "locked" };
      }
    }
    createLocalStore(
      `rooms`,
      rooms.map((item) => item.id === input.roomId ? nextRoom : item)
    ).write(rooms.map((item) => item.id === input.roomId ? nextRoom : item));
    createLocalStore(feedLocalKey(input.roomId), nextFeed.slice(0, 30)).write(
      nextFeed.slice(0, 30)
    );
    createLocalStore(scoresLocalKey(input.roomId), [
      {
        id: `${input.roomId}-A`,
        roomId: input.roomId,
        side: "A",
        score: nextRoom.scores.A,
        correct: nextRoom.correctCounts.A,
        wrong: nextRoom.wrongCounts.A,
        speedBonus: nextRoom.speedBonuses.A,
        updatedAt: now()
      },
      {
        id: `${input.roomId}-B`,
        roomId: input.roomId,
        side: "B",
        score: nextRoom.scores.B,
        correct: nextRoom.correctCounts.B,
        wrong: nextRoom.wrongCounts.B,
        speedBonus: nextRoom.speedBonuses.B,
        updatedAt: now()
      }
    ]).write([
      {
        id: `${input.roomId}-A`,
        roomId: input.roomId,
        side: "A",
        score: nextRoom.scores.A,
        correct: nextRoom.correctCounts.A,
        wrong: nextRoom.wrongCounts.A,
        speedBonus: nextRoom.speedBonuses.A,
        updatedAt: now()
      },
      {
        id: `${input.roomId}-B`,
        roomId: input.roomId,
        side: "B",
        score: nextRoom.scores.B,
        correct: nextRoom.correctCounts.B,
        wrong: nextRoom.wrongCounts.B,
        speedBonus: nextRoom.speedBonuses.B,
        updatedAt: now()
      }
    ]);
    createLocalStore(
      eventsLocalKey(input.roomId),
      nextFeed.map(
        (item) => normalizeEventItem({ ...item, kind: "answer", phase: nextRoom.phase })
      )
    ).write(
      nextFeed.map(
        (item) => normalizeEventItem({ ...item, kind: "answer", phase: nextRoom.phase })
      )
    );
    createLocalStore(liveLocalKey(input.roomId), {
      ...buildLocalState(nextRoom),
      activityFeed: nextFeed.slice(0, 30),
      serverNow: now()
    }).write({
      ...buildLocalState(nextRoom),
      activityFeed: nextFeed.slice(0, 30),
      serverNow: now()
    });
    return {
      accepted: true,
      correct: isCorrect,
      pointsDelta: isCorrect ? base + bonus : -5,
      feed: nextFeed.slice(0, 30)
    };
  }
  const db = getFirebaseDb();
  if (!db) return { accepted: false, reason: "firebase-unavailable" };
  const roomRef = doc(db, "rooms", input.roomId);
  const result = await runTransaction(db, async (transaction) => {
    const roomSnap = await transaction.get(roomRef);
    if (!roomSnap.exists()) return { accepted: false, reason: "room-missing" };
    const room = parseRoomData(roomSnap.id, roomSnap.data());
    if (room.phase !== "live" && room.phase !== "countdown" && room.phase !== "ready") {
      return { accepted: false, reason: "inactive" };
    }
    const teamRef = doc(db, "teams", `${input.roomId}-${input.side === "A" ? "team-a" : "team-b"}`);
    const teamSnap = await transaction.get(teamRef);
    const team = teamSnap.exists() ? teamSnap.data() : null;
    if (!team) return { accepted: false, reason: "team-missing" };
    const questionRef = doc(db, "questions", room.currentQuestionId ?? "");
    const questionSnap = await transaction.get(questionRef);
    if (!questionSnap.exists()) return { accepted: false, reason: "question-missing" };
    const question = parseQuestionData(questionSnap.id, questionSnap.data());
    const elapsedMs = now() - (room.questionStartedAt ?? now());
    const isCorrect = input.answerIndex === question.answerIndex;
    const base = question.points;
    const bonus = isCorrect ? scoreBonusForElapsed(room.roundType, elapsedMs) : 0;
    const pointsDelta = isCorrect ? base + bonus : room.lockState === "second-chance" ? 0 : -5;
    const nextScores = { ...room.scores };
    const nextCorrect = { ...room.correctCounts };
    const nextWrong = { ...room.wrongCounts };
    const nextSpeed = { ...room.speedBonuses };
    const roomPatch = { updatedAt: now() };
    const eventId = randomId("event");
    if (room.lockState === "open" && !room.lockedBy) {
      roomPatch.lockedBy = input.side;
      roomPatch.firstAnswerSide = input.side;
      roomPatch.firstAnswerCorrect = isCorrect;
      roomPatch.lockState = isCorrect ? "resolved" : "second-chance";
      roomPatch.allowedSide = isCorrect ? null : input.side === "A" ? "B" : "A";
      roomPatch.secondChanceSide = isCorrect ? null : input.side === "A" ? "B" : "A";
      nextScores[input.side] += pointsDelta;
      nextCorrect[input.side] += isCorrect ? 1 : 0;
      nextWrong[input.side] += isCorrect ? 0 : 1;
      nextSpeed[input.side] += bonus;
    } else if (room.lockState === "second-chance" && room.secondChanceSide === input.side) {
      roomPatch.lockState = "resolved";
      if (isCorrect) {
        nextScores[input.side] += pointsDelta;
        nextCorrect[input.side] += 1;
        nextSpeed[input.side] += bonus;
      } else {
        nextWrong[input.side] += 1;
      }
    } else {
      return { accepted: false, reason: "locked" };
    }
    roomPatch.scores = nextScores;
    roomPatch.correctCounts = nextCorrect;
    roomPatch.wrongCounts = nextWrong;
    roomPatch.speedBonuses = nextSpeed;
    transaction.update(roomRef, roomPatch);
    transaction.update(teamRef, {
      points: nextScores[input.side],
      correct: nextCorrect[input.side],
      wrong: nextWrong[input.side],
      speedBonus: nextSpeed[input.side],
      ready: team.ready
    });
    transaction.set(doc(db, "scores", `${input.roomId}-${input.side}`), {
      id: `${input.roomId}-${input.side}`,
      roomId: input.roomId,
      side: input.side,
      score: nextScores[input.side],
      correct: nextCorrect[input.side],
      wrong: nextWrong[input.side],
      speedBonus: nextSpeed[input.side],
      updatedAt: now()
    });
    transaction.set(
      doc(db, "events", eventId),
      normalizeEventItem({
        roomId: input.roomId,
        side: input.side,
        type: isCorrect ? "correct" : "incorrect",
        kind: "answer",
        phase: room.phase,
        message: isCorrect ? room.lockState === "second-chance" ? `${input.user.name} answered the second chance correctly.` : `${input.user.name} answered first and correct.` : room.lockState === "second-chance" ? `${input.user.name} missed the second chance.` : `${input.user.name} answered incorrectly.`,
        pointsDelta
      })
    );
    const shouldAdvance = isCorrect || room.lockState === "second-chance" && !isCorrect;
    if (shouldAdvance) {
      const nextIndex = room.currentQuestionIndex + 1;
      const nextQuestionId = room.questionIds[nextIndex];
      const nextQuestionSnap = nextQuestionId ? await transaction.get(doc(db, "questions", nextQuestionId)) : null;
      const resolvedNextQuestion = nextQuestionSnap?.exists() ? parseQuestionData(nextQuestionSnap.id, nextQuestionSnap.data()) : null;
      if (resolvedNextQuestion) {
        roomPatch.currentQuestionId = resolvedNextQuestion.id;
        roomPatch.currentQuestionIndex = nextIndex;
        roomPatch.lockState = "open";
        roomPatch.lockedBy = null;
        roomPatch.secondChanceSide = null;
        roomPatch.firstAnswerSide = null;
        roomPatch.firstAnswerCorrect = null;
        roomPatch.allowedSide = null;
        roomPatch.questionStartedAt = now();
        roomPatch.questionEndsAt = now() + resolvedNextQuestion.timeLimit * 1e3;
        roomPatch.questionTimeLimit = resolvedNextQuestion.timeLimit;
        roomPatch.phase = "live";
        transaction.update(roomRef, roomPatch);
        transaction.set(
          doc(db, "events", randomId("event")),
          normalizeEventItem({
            roomId: input.roomId,
            side: "SYSTEM",
            type: "state",
            kind: "question",
            phase: "live",
            message: `Question ${nextIndex + 1} loaded.`,
            pointsDelta: 0
          })
        );
      } else {
        const finalScores = nextScores;
        const winnerSide = finalScores.A === finalScores.B ? null : finalScores.A > finalScores.B ? "A" : "B";
        const winnerLabel = winnerSide === "A" ? room.teamAName : winnerSide === "B" ? room.teamBName : "Tie";
        roomPatch.phase = "finished";
        roomPatch.winnerSide = winnerSide;
        roomPatch.winnerLabel = winnerLabel;
        roomPatch.currentQuestionId = null;
        roomPatch.questionEndsAt = null;
        roomPatch.questionStartedAt = null;
        transaction.update(roomRef, roomPatch);
        transaction.set(doc(db, "battle_history", randomId("history")), {
          roomId: input.roomId,
          winnerSide,
          winnerLabel,
          teamAName: room.teamAName,
          teamBName: room.teamBName,
          scoreA: finalScores.A,
          scoreB: finalScores.B,
          correctA: nextCorrect.A,
          correctB: nextCorrect.B,
          wrongA: nextWrong.A,
          wrongB: nextWrong.B,
          speedA: nextSpeed.A,
          speedB: nextSpeed.B,
          accuracyA: nextCorrect.A + nextWrong.A > 0 ? Math.round(nextCorrect.A / (nextCorrect.A + nextWrong.A) * 100) : 0,
          accuracyB: nextCorrect.B + nextWrong.B > 0 ? Math.round(nextCorrect.B / (nextCorrect.B + nextWrong.B) * 100) : 0,
          questionCount: room.totalQuestions,
          classLevel: room.classLevel,
          roundType: room.roundType,
          endedAt: now()
        });
        transaction.set(
          doc(db, "events", randomId("event")),
          normalizeEventItem({
            roomId: input.roomId,
            side: "SYSTEM",
            type: "state",
            kind: "system",
            phase: "finished",
            message: winnerSide ? `${winnerLabel} wins the battle.` : "Battle ended in a tie.",
            pointsDelta: 0
          })
        );
      }
    }
    return { accepted: true, correct: isCorrect, pointsDelta };
  });
  await mirrorLiveState(input.roomId);
  return result;
}
async function flagSuspicious(roomId, side, message) {
  if (!firebaseEnabled) {
    const rooms = createLocalStore("rooms", []).read();
    const nextRooms = rooms.map(
      (room) => room.id === roomId && !room.suspiciousSides.includes(side) ? { ...room, suspiciousSides: [...room.suspiciousSides, side], updatedAt: now() } : room
    );
    createLocalStore("rooms", nextRooms).write(nextRooms);
    const feed = createLocalStore(feedLocalKey(roomId), []).read();
    const nextFeed = [
      normalizeFeedItem({ roomId, side, type: "warning", message, pointsDelta: 0 }),
      ...feed
    ].slice(0, 30);
    createLocalStore(feedLocalKey(roomId), nextFeed).write(nextFeed);
    createLocalStore(
      eventsLocalKey(roomId),
      nextFeed.map((item) => normalizeEventItem({ ...item, kind: "system", phase: "live" }))
    ).write(nextFeed.map((item) => normalizeEventItem({ ...item, kind: "system", phase: "live" })));
    return;
  }
  const db = getFirebaseDb();
  if (!db) return;
  await addDoc(
    collection(db, "events"),
    normalizeEventItem({
      roomId,
      side,
      type: "warning",
      kind: "system",
      phase: "live",
      message,
      pointsDelta: 0
    })
  );
}
async function syncBattleMirror(roomId) {
  if (!firebaseEnabled) return;
  await mirrorLiveState(roomId);
}
function getRoundLabel(roundType) {
  if (roundType === "rapid-fire") return "Rapid Fire";
  if (roundType === "power") return "Power Round";
  if (roundType === "sudden-death") return "Sudden Death";
  return "Standard Round";
}
function buildCertificate(room, history) {
  const winnerSide = history?.winnerSide ?? room.winnerSide;
  const winnerLabel = history?.winnerLabel ?? room.winnerLabel ?? "Tie";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="840" viewBox="0 0 1200 840">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" x2="1">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="840" fill="url(#bg)"/>
  <rect x="40" y="40" width="1120" height="760" rx="36" fill="none" stroke="url(#gold)" stroke-width="4"/>
  <text x="600" y="155" fill="#fef3c7" font-family="Arial, sans-serif" font-size="36" text-anchor="middle">E-PATHSHALA QUIZ BATTLE CERTIFICATE</text>
  <text x="600" y="260" fill="#ffffff" font-family="Arial, sans-serif" font-size="52" font-weight="700" text-anchor="middle">${winnerLabel}</text>
  <text x="600" y="330" fill="#d1d5db" font-family="Arial, sans-serif" font-size="24" text-anchor="middle">Winner of ${room.title}</text>
  <text x="600" y="390" fill="#d1d5db" font-family="Arial, sans-serif" font-size="22" text-anchor="middle">${room.teamAName} vs ${room.teamBName}</text>
  <text x="600" y="450" fill="#d1d5db" font-family="Arial, sans-serif" font-size="22" text-anchor="middle">Room ${room.code} • ${getRoundLabel(room.roundType)} • Class ${room.classLevel}</text>
  <text x="600" y="540" fill="#fef3c7" font-family="Arial, sans-serif" font-size="24" text-anchor="middle">Final Score</text>
  <text x="600" y="595" fill="#ffffff" font-family="Arial, sans-serif" font-size="42" font-weight="700" text-anchor="middle">${history ? `${history.scoreA} - ${history.scoreB}` : `${room.scores.A} - ${room.scores.B}`}</text>
  <text x="600" y="670" fill="#9ca3af" font-family="Arial, sans-serif" font-size="18" text-anchor="middle">Certified by the Competition Section</text>
  <text x="600" y="710" fill="#9ca3af" font-family="Arial, sans-serif" font-size="16" text-anchor="middle">Winner: ${winnerSide ?? "Tie"}</text>
</svg>`;
}
function CompetitionPage() {
  const user = useUser();
  const navigate = useNavigate();
  const search = Route$a.useSearch();
  const [roomId, setRoomId] = reactExports.useState(search.room ?? "");
  const [selectedRoom, setSelectedRoom] = reactExports.useState(null);
  const [live, setLive] = reactExports.useState(null);
  const [questions, setQuestions] = reactExports.useState([]);
  const [teams, setTeams] = reactExports.useState([]);
  const [history, setHistory] = reactExports.useState([]);
  const [feed, setFeed] = reactExports.useState([]);
  const [serverOffset, setServerOffset] = reactExports.useState(0);
  const [createForm, setCreateForm] = reactExports.useState({
    roomLabel: "QUIZ ROOM",
    title: "E-পাঠশালা Live Quiz Battle",
    teamAName: "Team Aurora",
    teamBName: "Team Bengal",
    classLevel: String(user.class),
    roundType: "standard",
    totalQuestions: "10"
  });
  const [joinForm, setJoinForm] = reactExports.useState({
    roomCode: "",
    side: "B",
    role: "member"
  });
  const [selectedAnswer, setSelectedAnswer] = reactExports.useState(null);
  const [matchMessage, setMatchMessage] = reactExports.useState("Waiting for a room to load.");
  const [copyState, setCopyState] = reactExports.useState("idle");
  reactExports.useEffect(() => {
    const value = search.room ?? "";
    setRoomId(value);
  }, [search.room]);
  reactExports.useEffect(() => {
    const rtdb = getFirebaseRtdb();
    if (!rtdb) return;
    try {
      return onValue(ref(rtdb, ".info/serverTimeOffset"), (snapshot) => {
        const offset = typeof snapshot.val() === "number" ? snapshot.val() : 0;
        setServerOffset(offset);
      }, () => {
        setServerOffset(0);
      });
    } catch {
      setServerOffset(0);
      return;
    }
  }, []);
  reactExports.useEffect(() => {
    if (!roomId) {
      setSelectedRoom(null);
      setLive(null);
      setQuestions([]);
      setTeams([]);
      setHistory([]);
      setFeed([]);
      return;
    }
    const unsubRoom = listenBattleRoom(roomId, setSelectedRoom);
    const unsubLive = listenBattleLive(roomId, setLive);
    const unsubQuestions = listenBattleQuestions(roomId, setQuestions);
    const unsubTeams = listenBattleTeams(roomId, setTeams);
    const unsubHistory = listenBattleHistory(roomId, setHistory);
    const unsubFeed = listenBattleFeed(roomId, setFeed);
    return () => {
      unsubRoom();
      unsubLive();
      unsubQuestions();
      unsubTeams();
      unsubHistory();
      unsubFeed();
    };
  }, [roomId]);
  reactExports.useEffect(() => {
    if (!roomId) return;
    const room = selectedRoom;
    const currentTeam = teams.find((team) => team.members.some((member) => member.uid === user.uid));
    const currentSide = currentTeam?.side ?? null;
    if (!room || !currentSide) return;
    const suspicious = async (type, message) => {
      await flagSuspicious(roomId, currentSide, message);
      setMatchMessage(message);
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        void suspicious("visibility", `${currentTeam.name}: tab switched away from the battle.`);
      }
    };
    const onCopy = () => void suspicious("copy", `${currentTeam.name}: copy attempt detected.`);
    const onPaste = () => void suspicious("paste", `${currentTeam.name}: paste attempt detected.`);
    const onContext = () => void suspicious("contextmenu", `${currentTeam.name}: context menu blocked.`);
    const onKeyDown = (event) => {
      if (event.key === "Tab" || event.ctrlKey && (event.key.toLowerCase() === "c" || event.key.toLowerCase() === "v")) {
        void suspicious("keydown", `${currentTeam.name}: suspicious shortcut usage.`);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("copy", onCopy);
    document.addEventListener("paste", onPaste);
    document.addEventListener("contextmenu", onContext);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("paste", onPaste);
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [roomId, selectedRoom, teams, user.uid]);
  reactExports.useEffect(() => {
    if (!selectedRoom) return;
    setMatchMessage(matchCopy(selectedRoom, live, questions, teams, user.uid));
  }, [selectedRoom, live, questions, teams, user.uid]);
  const myTeam = reactExports.useMemo(() => teams.find((team) => team.members.some((member) => member.uid === user.uid)), [teams, user.uid]);
  const mySide = myTeam?.side ?? null;
  const currentQuestion = reactExports.useMemo(() => {
    if (!selectedRoom) return null;
    return questions.find((question) => question.id === selectedRoom.currentQuestionId) ?? null;
  }, [questions, selectedRoom]);
  const currentTime = Date.now() + serverOffset;
  const remainingMs = live?.questionEndsAt ? Math.max(0, live.questionEndsAt - currentTime) : 0;
  const remainingSeconds = Math.ceil(remainingMs / 1e3);
  const roomPhase = selectedRoom?.phase ?? live?.phase ?? "draft";
  const isHost = selectedRoom?.hostId === user.uid;
  const isTeamCaptain = Boolean(myTeam?.members.find((member) => member.uid === user.uid && member.role === "captain"));
  const canControl = isHost || isTeamCaptain;
  const currentFeed = feed.length ? feed : live?.activityFeed ?? [];
  const progress = selectedRoom && selectedRoom.totalQuestions > 0 ? (selectedRoom.currentQuestionIndex + (roomPhase === "finished" ? 0 : 1)) / selectedRoom.totalQuestions * 100 : 0;
  const scoreboard = live?.scores ?? {
    A: 0,
    B: 0
  };
  const readyA = live?.readySides.A ?? false;
  const readyB = live?.readySides.B ?? false;
  const questionLocked = live?.lockState === "locked" || live?.lockState === "second-chance";
  const answerAllowedSide = live?.allowedSide ?? mySide;
  const canAnswer = roomPhase === "live" && Boolean(myTeam) && (!answerAllowedSide || answerAllowedSide === mySide || live?.lockState === "open");
  const timerLabel = roomPhase === "countdown" ? "Match starting" : roomPhase === "finished" ? "Battle closed" : `${remainingSeconds.toString().padStart(2, "0")}s`;
  const winnerLabel = live?.winnerSide === "A" ? selectedRoom?.teamAName ?? "Team A" : live?.winnerSide === "B" ? selectedRoom?.teamBName ?? "Team B" : "Tie";
  const certificate = selectedRoom ? buildCertificate(selectedRoom, history[0] ?? null) : null;
  const roomShareUrl = selectedRoom && typeof window !== "undefined" ? `${window.location.origin}/competitions?room=${selectedRoom.id}` : "";
  const handleCreateRoom = async () => {
    const created = await createBattleRoom({
      host: user,
      roomLabel: createForm.roomLabel,
      title: createForm.title,
      teamAName: createForm.teamAName,
      teamBName: createForm.teamBName,
      classLevel: Number(createForm.classLevel) || user.class,
      roundType: createForm.roundType,
      totalQuestions: Number(createForm.totalQuestions) || 10
    });
    setRoomId(created.id);
    await navigate({
      to: "/competitions",
      search: {
        room: created.id
      }
    });
  };
  const handleJoinRoom = async () => {
    const token = roomId.trim();
    if (!token) return;
    const resolvedRoomId = await findBattleRoomByCode(token) ?? token;
    await joinBattleRoom(resolvedRoomId, user, joinForm.side, joinForm.role);
    setRoomId(resolvedRoomId);
    await navigate({
      to: "/competitions",
      search: {
        room: resolvedRoomId
      }
    });
  };
  const handleReady = async (ready) => {
    if (!mySide || !selectedRoom) return;
    await setTeamReady(selectedRoom.id, mySide, ready);
  };
  const handleStartCountdown = async () => {
    if (!selectedRoom) return;
    await startCountdown(selectedRoom.id, 10);
  };
  const handleStartMatch = async () => {
    if (!selectedRoom) return;
    await startBattleMatch(selectedRoom.id);
  };
  const handleSubmitAnswer = async (answerIndex) => {
    if (!selectedRoom || !mySide) return;
    setSelectedAnswer(answerIndex);
    const result = await submitBattleAnswer({
      roomId: selectedRoom.id,
      user,
      side: mySide,
      answerIndex
    });
    if (result && result.accepted === false) {
      setMatchMessage("That answer could not be submitted right now.");
    }
  };
  const handleDownloadCertificate = () => {
    if (!certificate || !selectedRoom) return;
    const blob = new Blob([certificate], {
      type: "image/svg+xml;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${selectedRoom.code}-certificate.svg`;
    anchor.click();
    URL.revokeObjectURL(url);
  };
  const handleCopyInvite = async () => {
    if (!selectedRoom) return;
    const link = `${window.location.origin}/competitions?room=${encodeURIComponent(selectedRoom.id)}`;
    await navigator.clipboard.writeText(`Join room ${selectedRoom.code}: ${link}`);
    setCopyState("done");
    window.setTimeout(() => setCopyState("idle"), 1800);
  };
  const handleAdvanceToNext = async () => {
    if (!selectedRoom) return;
    await skipQuestion(selectedRoom.id);
  };
  const handleEndBattle = async () => {
    if (!selectedRoom) return;
    await endBattle(selectedRoom.id);
  };
  const handlePause = async () => {
    if (!selectedRoom) return;
    await pauseBattle(selectedRoom.id);
  };
  const handleResume = async () => {
    if (!selectedRoom) return;
    await resumeBattle(selectedRoom.id);
  };
  const handleRemoveTeam = async (side) => {
    if (!selectedRoom) return;
    await removeTeam(selectedRoom.id, side);
  };
  const handleSync = async () => {
    if (!selectedRoom) return;
    await syncBattleMirror(selectedRoom.id);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "overflow-hidden rounded-[2rem] border border-white/40 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_rgba(255,255,255,0.65)_35%,_rgba(15,23,42,0.07)_100%)] p-6 shadow-[0_20px_80px_rgba(15,23,42,0.18)] backdrop-blur md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-[1.15fr_0.85fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "inline-flex w-fit gap-2 rounded-full bg-brand-orange/10 px-3 py-1.5 text-brand-orange", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          "লাইভ টিভি কুইজ battle"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "max-w-3xl text-3xl font-black tracking-tight md:text-5xl", children: "E-PATHSHALA real-time team vs team quiz battle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-3xl text-sm leading-6 text-muted-foreground md:text-base", children: "প্রতিটি room server-driven, Firestore + Realtime Database synced, captain-led teams, locked answers, second-chance play, scoreboard animation, আর instant champion selection-এর জন্য তৈরি।" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "rounded-full px-3 py-1.5", children: [
            "রুম: ",
            selectedRoom?.code ?? "নতুন battle তৈরি করুন"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "rounded-full px-3 py-1.5", children: [
            "ধাপ: ",
            roomPhase
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "rounded-full px-3 py-1.5", children: selectedRoom ? getRoundLabel(selectedRoom.roundType) : "কোনো battle লোড হয়নি" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Score", value: `${scoreboard.A} - ${scoreboard.B}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Ready", value: `${readyA ? 1 : 0} / ${readyB ? 1 : 0}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Timer", value: timerLabel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Questions", value: selectedRoom ? `${selectedRoom.currentQuestionIndex + 1}/${selectedRoom.totalQuestions}` : "0/0" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-white/60 bg-white/80 shadow-soft backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "লাইভ room" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-5 w-5 text-brand-orange" }),
              selectedRoom?.title ?? "আপনার room তৈরি করুন"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-background/90 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "Room link" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 break-all text-sm font-semibold", children: roomShareUrl || "তৈরির পরে শেয়ার করুন" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleCopyInvite, variant: "outline", className: "rounded-2xl", children: [
                copyState === "done" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
                copyState === "done" ? "কপি হয়েছে" : "ইনভাইট কপি করুন"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSync, variant: "outline", className: "rounded-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
                "Sync"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleEndBattle, variant: "destructive", disabled: !canControl, className: "rounded-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bomb, { className: "h-4 w-4" }),
                "ম্যাচ শেষ"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-white/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-white/65", children: "লাইভ scoreboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-2xl", children: [
              selectedRoom?.teamAName ?? "Team A",
              " বনাম ",
              selectedRoom?.teamBName ?? "Team B"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreTile, { title: selectedRoom?.teamAName ?? "Team A", score: scoreboard.A, accent: "from-cyan-400 to-blue-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreTile, { title: selectedRoom?.teamBName ?? "Team B", score: scoreboard.B, accent: "from-fuchsia-400 to-rose-600" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-2 bg-white/10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-white/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: matchMessage }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedRoom?.roomLabel ?? "প্রতিযোগিতা room" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    !selectedRoom ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-[0.95fr_1.05fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-white/60 bg-white/85 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "লাইভ room তৈরি করুন" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl", children: "battle room তৈরি করুন" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Room label", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: createForm.roomLabel, onChange: (event) => setCreateForm((current) => ({
            ...current,
            roomLabel: event.target.value
          })) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Battle title", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: createForm.title, onChange: (event) => setCreateForm((current) => ({
            ...current,
            title: event.target.value
          })) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Team A", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: createForm.teamAName, onChange: (event) => setCreateForm((current) => ({
              ...current,
              teamAName: event.target.value
            })) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Team B", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: createForm.teamBName, onChange: (event) => setCreateForm((current) => ({
              ...current,
              teamBName: event.target.value
            })) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Class", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: createForm.classLevel, onValueChange: (value) => setCreateForm((current) => ({
              ...current,
              classLevel: value
            })), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Array.from({
                length: 10
              }, (_, index) => String(index + 1)).map((value) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value, children: [
                "Class ",
                value
              ] }, value)) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Round type", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: createForm.roundType, onValueChange: (value) => setCreateForm((current) => ({
              ...current,
              roundType: value
            })), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "standard", children: "Standard" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rapid-fire", children: "Rapid Fire" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "power", children: "Power Round" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sudden-death", children: "Sudden Death" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Questions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: createForm.totalQuestions, onChange: (event) => setCreateForm((current) => ({
              ...current,
              totalQuestions: event.target.value
            })) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleCreateRoom, className: "w-full rounded-2xl bg-gradient-to-r from-slate-950 to-slate-700 py-6 text-base font-semibold text-white", children: [
            "রুম তৈরি করুন",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-white/60 bg-white/85 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "লাইভ room-এ join করুন" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl", children: "ইনভাইট গ্রহণ করুন" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Room ID", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: roomId, onChange: (event) => setRoomId(event.target.value), placeholder: "QUIZ-728194 or room id" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Join as", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: joinForm.side, onValueChange: (value) => setJoinForm((current) => ({
                ...current,
                side: value
              })), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "B", children: "Team B" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "A", children: "Team A" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Role", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: joinForm.role, onValueChange: (value) => setJoinForm((current) => ({
                ...current,
                role: value
              })), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "captain", children: "Captain" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "member", children: "Member" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "spectator", children: "Spectator" })
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleJoinRoom, className: "w-full rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 py-6 text-base font-semibold text-white", children: [
              "রুমে যোগ দিন",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-white/60 bg-gradient-to-br from-amber-50 to-white shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "প্রতিযোগিতার ধাপ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl", children: "Battle sequence" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3 text-sm text-muted-foreground", children: ["Battle তৈরি", "Team invite", "Match accept", "একই room-এ প্রবেশ", "Ready check", "10-second countdown", "একই প্রশ্ন live", "চ্যাম্পিয়ন + certificate"].map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-7 w-7 place-items-center rounded-full bg-slate-950 text-xs font-bold text-white", children: index + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-slate-800", children: item })
          ] }, item)) })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-[1.1fr_0.9fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-white/60 bg-white/85 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "ম্যাচ room" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl", children: selectedRoom.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 lg:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TeamPanel, { team: teams.find((team) => team.side === "A"), room: selectedRoom, side: "A", currentUserId: user.uid }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TeamPanel, { team: teams.find((team) => team.side === "B"), room: selectedRoom, side: "B", currentUserId: user.uid })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => void handleReady(!readyA || !readyB), variant: "outline", className: "rounded-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TimerReset, { className: "h-4 w-4" }),
                "Ready / Unready"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleStartCountdown, disabled: !canControl, className: "rounded-2xl bg-brand-orange text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
                "10s countdown শুরু"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleStartMatch, variant: "outline", disabled: !canControl, className: "rounded-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4" }),
                "ম্যাচ শুরু"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handlePause, variant: "outline", disabled: !canControl, className: "rounded-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-4 w-4" }),
                "Pause"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleResume, variant: "outline", disabled: !canControl, className: "rounded-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4" }),
                "Resume"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleAdvanceToNext, variant: "outline", disabled: !canControl, className: "rounded-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "h-4 w-4" }),
                "প্রশ্ন স্কিপ"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => void handleRemoveTeam("B"), variant: "destructive", disabled: !canControl, className: "rounded-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-4 w-4" }),
                "Team B সরান"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-white/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-white/65", children: "প্রশ্ন sync" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-2xl", children: [
              "প্রশ্ন ",
              selectedRoom.currentQuestionIndex + 1,
              " / ",
              selectedRoom.totalQuestions
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-5", children: roomPhase === "countdown" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownPanel, { room: selectedRoom, live }) : currentQuestion ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[1.5rem] border border-white/10 bg-white/5 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 text-xs uppercase tracking-[0.28em] text-white/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: currentQuestion.subject }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: getRoundLabel(selectedRoom.roundType) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-2xl font-bold leading-tight text-white", children: currentQuestion.prompt })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2", children: currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const disabled = !canAnswer || questionLocked;
              return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled, onClick: () => void handleSubmitAnswer(index), className: cn("rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40", isSelected && "ring-2 ring-cyan-300"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-white/90", children: [
                  String.fromCharCode(65 + index),
                  ". ",
                  option
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70", children: canAnswer ? "উত্তর দিন" : questionLocked ? "Locked" : "Wait" })
              ] }) }, option);
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs text-white/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "rounded-full bg-white/10 text-white", children: "Timer synced" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "rounded-full bg-white/10 text-white", children: "First answer locks" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "rounded-full bg-white/10 text-white", children: "Second chance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "rounded-full bg-white/10 text-white", children: "Speed bonus" })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-center text-white/70", children: "প্রথম প্রশ্নের জন্য অপেক্ষা করুন।" }) })
        ] }),
        roomPhase === "finished" && selectedRoom ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-white/60 bg-white/85 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "ফলাফল" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-2xl", children: [
              winnerLabel,
              " চ্যাম্পিয়ন"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResultsBox, { label: selectedRoom.teamAName, score: scoreboard.A, history: history[0], side: "A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResultsBox, { label: selectedRoom.teamBName, score: scoreboard.B, history: history[0], side: "B" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleDownloadCertificate, className: "rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                "সার্টিফিকেট ডাউনলোড"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => void handleSync(), variant: "outline", className: "rounded-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { className: "h-4 w-4" }),
                "Server থেকে রিফ্রেশ"
              ] })
            ] })
          ] })
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-white/60 bg-white/85 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "অ্যাক্টিভিটি ফিড" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl", children: "লাইভ tournament feed" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: currentFeed.length ? currentFeed.slice(0, 10).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(FeedRow, { item }, item.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-muted/40 p-4 text-sm text-muted-foreground", children: "লাইভ আপডেট এখানে দেখাবে।" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-white/60 bg-white/85 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Anti-cheat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl", children: "Suspicion monitor" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-amber-50 p-4 text-amber-900", children: "Tab switching, copy/paste, context menu, and keyboard shortcuts realtime-এ লগ হয়।" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: (selectedRoom.suspiciousSides.length ? selectedRoom.suspiciousSides : ["A", "B"]).map((side) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-2xl bg-muted/50 px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: side === "A" ? selectedRoom.teamAName : selectedRoom.teamBName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4 text-brand-orange" })
            ] }, side)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[2rem] border-white/60 bg-white/85 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Battle stats" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl", children: "Question analytics" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatLine, { label: "Question timer", value: `${selectedRoom.questionTimeLimit}s` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatLine, { label: "Phase", value: roomPhase }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatLine, { label: "Allowed side", value: live?.allowedSide ?? "both" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatLine, { label: "First answer", value: live?.firstAnswerSide ?? "none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatLine, { label: "Second chance", value: live?.secondChanceSide ?? "none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatLine, { label: "Captain", value: myTeam?.members.find((member) => member.role === "captain")?.name ?? "not joined" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function matchCopy(room, live, questions, teams, userId) {
  if (!live) return `Room ${room.code} is connecting.`;
  if (live.phase === "countdown") return `Countdown running for ${room.teamAName} vs ${room.teamBName}.`;
  if (live.phase === "live") {
    const current = questions.find((question) => question.id === room.currentQuestionId);
    if (!current) return `Battle live in ${room.title}.`;
    if (live.lockState === "second-chance") {
      const allowed = teams.find((team) => team.side === live.secondChanceSide);
      return `${allowed?.name ?? "Team"} has the second chance.`;
    }
    if (live.lockState === "resolved") return "Question resolved. Loading the next one.";
    return `Question ${current.index + 1} is live: ${current.subject}`;
  }
  if (live.phase === "finished") {
    return live.winnerSide ? `${live.winnerSide === "A" ? room.teamAName : room.teamBName} have won the match.` : "The battle ended in a tie.";
  }
  const joined = teams.find((team) => team.members.some((member) => member.uid === userId));
  if (!joined) return "Join as a team to unlock live answering.";
  return `${joined.name} is ready for the room.`;
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
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    children
  ] });
}
function TeamPanel({
  team,
  room,
  side,
  currentUserId
}) {
  const title = side === "A" ? room.teamAName : room.teamBName;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[1.5rem] border border-border bg-background/85 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: side === "A" ? "Team A" : "Team B" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-lg font-bold", children: team?.name ?? title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: cn("rounded-full bg-gradient-to-r text-white", side === "A" ? "from-cyan-500 to-blue-600" : "from-fuchsia-500 to-rose-600"), children: team?.ready ? "Ready" : "Waiting" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-2", children: (team?.members ?? []).length ? team?.members.map((member) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-2xl bg-muted/40 px-3 py-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: member.avatar }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("font-medium", member.uid === currentUserId && "text-primary"), children: member.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "rounded-full text-[10px] uppercase tracking-[0.2em]", children: member.role })
    ] }, member.uid)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed border-border px-3 py-4 text-sm text-muted-foreground", children: "Invite a team member to join the room." }) })
  ] });
}
function CountdownPanel({
  room,
  live
}) {
  const [seconds, setSeconds] = reactExports.useState(10);
  reactExports.useEffect(() => {
    const tick = () => {
      const endsAt = live?.countdownEndsAt ?? room.countdownEndsAt ?? Date.now();
      const next = Math.max(0, Math.ceil((endsAt - Date.now()) / 1e3));
      setSeconds(next);
    };
    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [live?.countdownEndsAt, room.countdownEndsAt]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.35em] text-white/50", children: "Countdown" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-7xl font-black text-white", children: seconds }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-white/60", children: "Both teams are entering the same room now." })
  ] });
}
function ScoreTile({
  title,
  score,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-[1.5rem] bg-gradient-to-r ${accent} p-4 text-white shadow-lg`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-white/75", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-4xl font-black", children: score })
  ] });
}
function FeedRow({
  item
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-muted/40 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FeedIcon, { type: item.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: item.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(item.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }) })
    ] }),
    item.pointsDelta !== 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("mt-2 text-xs font-semibold", item.pointsDelta > 0 ? "text-brand-green" : "text-destructive"), children: [
      item.pointsDelta > 0 ? `+${item.pointsDelta}` : item.pointsDelta,
      " points"
    ] }) : null
  ] });
}
function FeedIcon({
  type
}) {
  if (type === "correct") return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-brand-green" });
  if (type === "incorrect") return /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-destructive" });
  if (type === "warning") return /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4 text-brand-orange" });
  if (type === "score") return /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-brand-orange" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" });
}
function ResultsBox({
  label,
  score,
  history,
  side
}) {
  const correct = side === "A" ? history?.correctA ?? 0 : history?.correctB ?? 0;
  const wrong = side === "A" ? history?.wrongA ?? 0 : history?.wrongB ?? 0;
  const speed = side === "A" ? history?.speedA ?? 0 : history?.speedB ?? 0;
  const accuracy = side === "A" ? history?.accuracyA ?? 0 : history?.accuracyB ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-muted/30 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-4xl font-black", children: score }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Correct: ",
        correct
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Wrong: ",
        wrong
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Speed bonus: ",
        speed
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Accuracy: ",
        accuracy,
        "%"
      ] })
    ] })
  ] });
}
function StatLine({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-2xl bg-muted/40 px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: value })
  ] });
}
export {
  CompetitionPage as component
};
