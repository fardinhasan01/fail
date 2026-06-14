import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAuth, j as useUser, C as listenClassmates, D as listenChatMessages, E as listenChatRoom, F as markMessagesSeen, A as AppShell, H as followUser, I as sendChatMessage, J as updateTypingState } from "./router-9Ny0xRmp.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__database.mjs";
import "../_libs/firebase__functions.mjs";
import { g as Users, aD as ShieldAlert, aa as MessageSquare, v as Mic, aI as UserPlus, aJ as Send } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/faye-websocket.mjs";
import "../_libs/websocket-driver.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/http-parser-js.mjs";
import "../_libs/websocket-extensions.mjs";
function Classmates() {
  useAuth();
  const user = useUser();
  const inputRef = reactExports.useRef(null);
  const typingTimeoutRef = reactExports.useRef(null);
  const [selectedClass, setSelectedClass] = reactExports.useState(user.class);
  const [members, setMembers] = reactExports.useState([]);
  const [mode, setMode] = reactExports.useState("group");
  const [selectedPeer, setSelectedPeer] = reactExports.useState(null);
  const [messages, setMessages] = reactExports.useState([]);
  const [draft, setDraft] = reactExports.useState("");
  const [roomTyping, setRoomTyping] = reactExports.useState([]);
  const [activeTab, setActiveTab] = reactExports.useState("chat");
  const roomId = reactExports.useMemo(() => {
    if (mode === "group") return `class-${selectedClass}`;
    if (!selectedPeer) return `class-${selectedClass}`;
    return [user.uid, selectedPeer.uid].sort().join("-");
  }, [mode, selectedClass, selectedPeer, user.uid]);
  reactExports.useEffect(() => {
    const unsubscribe = listenClassmates(selectedClass, setMembers);
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [selectedClass]);
  reactExports.useEffect(() => {
    const unsubscribeMessages = listenChatMessages(roomId, setMessages);
    const unsubscribeRoom = listenChatRoom(roomId, (room) => setRoomTyping(room?.typingBy ?? []));
    void markMessagesSeen(roomId, user.uid);
    return () => {
      if (unsubscribeMessages) unsubscribeMessages();
      if (unsubscribeRoom) unsubscribeRoom();
    };
  }, [roomId, user.uid]);
  const onlinePeers = members.filter((member) => member.uid !== user.uid);
  const typingCount = roomTyping.filter((id) => id !== user.uid).length;
  async function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    await sendChatMessage({
      roomId,
      senderId: user.uid,
      senderName: user.name,
      senderAvatar: user.avatar,
      text,
      replyTo: null,
      emoji: "💬"
    });
    setDraft("");
    if (typingTimeoutRef.current) window.clearTimeout(typingTimeoutRef.current);
    void updateTypingState(roomId, user, false);
  }
  function handleDraftChange(value) {
    setDraft(value);
    if (typingTimeoutRef.current) window.clearTimeout(typingTimeoutRef.current);
    void updateTypingState(roomId, user, true);
    typingTimeoutRef.current = window.setTimeout(() => {
      void updateTypingState(roomId, user, false);
    }, 1200);
  }
  async function openDM(peer) {
    setMode("dm");
    setSelectedPeer(peer);
    setActiveTab("chat");
    setDraft("");
    inputRef.current?.focus();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-5xl font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-primary" }),
            " Classmate rooms"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Class-based groups, online indicators, friend/follow actions, and real-time chats for students and teachers." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 glass rounded-2xl px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4 text-brand-orange" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Teacher moderation" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: Array.from({
        length: 10
      }, (_, index) => index + 1).map((classLevel) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setSelectedClass(classLevel), className: `rounded-full px-4 py-2 text-sm font-semibold transition-all ${selectedClass === classLevel ? "bg-gradient-hero text-white shadow-soft" : "glass hover:shadow-soft"}`, children: [
        "Class ",
        classLevel
      ] }, classLevel)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [{
        value: "chat",
        label: "Chat",
        icon: MessageSquare
      }, {
        value: "people",
        label: "People",
        icon: Users
      }, {
        value: "boards",
        label: "Boards",
        icon: Mic
      }, {
        value: "safety",
        label: "Safety",
        icon: ShieldAlert
      }].map(({
        value,
        label,
        icon: Icon
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveTab(value), className: `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${activeTab === value ? "bg-gradient-blue text-white shadow-soft" : "glass hover:shadow-soft"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
        label
      ] }, value)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-5 lg:grid-cols-[0.78fr_1.22fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold", children: [
              "Class ",
              selectedClass,
              " people"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              members.length,
              " members online and offline"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-brand-green/15 px-3 py-1 text-xs font-semibold text-brand-green", children: [
            onlinePeers.filter((member) => member.isOnline).length,
            " online"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[520px] overflow-auto pr-1", children: members.map((member) => {
          const following = user.following?.includes(member.uid);
          const selected = selectedPeer?.uid === member.uid;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "button", tabIndex: 0, onClick: () => void openDM(member), onKeyDown: (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              void openDM(member);
            }
          }, className: `w-full rounded-3xl border p-4 text-left transition-all ${selected ? "border-primary bg-primary/10" : "border-border bg-background hover:bg-muted/50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-orange text-2xl shadow-soft", children: member.avatar }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white ${member.isOnline ? "bg-brand-green" : "bg-muted-foreground"}` })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold truncate", children: member.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs rounded-full bg-muted px-2 py-1", children: [
                    "XP ",
                    member.xp
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
                  "Class ",
                  member.classLevel,
                  " · ",
                  member.role,
                  " · ",
                  member.isOnline ? "online now" : "recently active"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: member.badges.slice(0, 3).map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-brand-orange/10 px-2 py-1 text-[11px] font-medium text-brand-orange", children: badge }, badge)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: (event) => {
                event.stopPropagation();
                void followUser(member.uid);
              }, className: `inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold ${following ? "bg-brand-green text-white" : "bg-muted hover:bg-muted/80"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-3.5 w-3.5" }),
                following ? "Following" : "Follow"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-2xl bg-muted px-3 py-2 text-xs font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${member.isOnline ? "bg-brand-green" : "bg-muted-foreground"}` }),
                member.isOnline ? "Online" : "Offline"
              ] })
            ] })
          ] }, member.uid);
        }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-5 md:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: mode === "group" ? "Group room" : "Direct message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: mode === "group" ? `Class ${selectedClass} study room` : selectedPeer ? `${selectedPeer.name} · DM` : "Direct message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: typingCount > 0 ? `${typingCount} user(s) typing...` : "Real-time messaging, emoji-friendly and classroom-safe." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
              setMode("group");
              setSelectedPeer(null);
            }, className: `rounded-2xl px-4 py-2 font-semibold ${mode === "group" ? "bg-gradient-hero text-white shadow-soft" : "glass hover:shadow-soft"}`, children: "Group chat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
              setMode("dm");
              if (!selectedPeer && members[0]) setSelectedPeer(members[0]);
            }, className: `rounded-2xl px-4 py-2 font-semibold ${mode === "dm" ? "bg-gradient-blue text-white shadow-soft" : "glass hover:shadow-soft"}`, children: "One-to-one" })
          ] })
        ] }),
        activeTab === "chat" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[560px] overflow-auto pr-1", children: messages.map((message, index) => {
            const mine = message.senderId === user.uid;
            const seen = message.seenBy.length > 1 || message.seenBy.length === 1 && message.seenBy[0] !== message.senderId;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-3xl p-4 ${mine ? "bg-gradient-hero text-white" : "glass"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs opacity-80", children: [
                  message.senderAvatar,
                  " ",
                  message.senderName
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] opacity-70", children: new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit"
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm leading-relaxed", children: message.text }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between gap-2 text-[11px] opacity-80", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: message.emoji ?? "💬" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mine ? seen ? "Seen" : "Sent" : "Received" })
              ] })
            ] }, `${message.id}-${index}`);
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 rounded-3xl border border-border bg-background p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: inputRef, value: draft, onChange: (event) => handleDraftChange(event.target.value), placeholder: mode === "group" ? "Write to the class room..." : "Send a direct message...", className: "flex-1 bg-transparent px-2 py-2 outline-none", onKeyDown: (event) => {
              if (event.key === "Enter") void sendMessage();
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void sendMessage(), className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 text-white font-semibold shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
              "Send"
            ] })
          ] })
        ] }) : null,
        activeTab === "people" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2", children: members.map((member) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-orange text-2xl", children: member.avatar }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: member.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                "Class ",
                member.classLevel,
                " · ",
                member.role
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: member.badges.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-muted px-3 py-1.5 text-xs font-medium", children: badge }, badge)) })
        ] }, member.uid)) }) : null,
        activeTab === "boards" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2", children: ["Teacher + student collaborative board", "Math sketch and equation solving", "Vocabulary wall and spelling practice", "Science diagrams and quick notes"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: item }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-muted-foreground", children: "Open the free board to sketch, write, and save a class snapshot in Firebase." })
        ] }, item)) }) : null,
        activeTab === "safety" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2", children: ["Teacher moderation on", "Anti-spam filters", "Report harmful content", "Typing indicators", "Seen/unseen status", "Friendly emoji support"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-border bg-background p-5 text-sm font-medium", children: item }, item)) }) : null
      ] }) })
    ] })
  ] }) });
}
export {
  Classmates as component
};
