import { c as addDoc, e as collection, o as onSnapshot, q as query, w as where, d as doc, f as getDocs, l as limit, h as writeBatch, i as arrayUnion, s as setDoc, a as serverTimestamp, j as arrayRemove } from "../_libs/firebase__firestore.mjs";
import { f as firebaseEnabled, g as getFirebaseDb } from "./router-D2rIulYA.mjs";
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
  const db = getFirebaseDb();
  if (!db) return () => {
  };
  return onSnapshot(
    query(collection(db, "users"), where("class", "==", classLevel)),
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
  const db = getFirebaseDb();
  if (!db) return () => {
  };
  return onSnapshot(
    query(collection(db, "messages"), where("roomId", "==", roomId)),
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
  const db = getFirebaseDb();
  if (!db) return;
  await addDoc(collection(db, "messages"), {
    ...message,
    createdAt: Date.now(),
    seenBy: [message.senderId],
    updatedAt: serverTimestamp()
  });
}
async function updateTypingState(roomId, user, isTyping) {
  if (!firebaseEnabled) return;
  const db = getFirebaseDb();
  if (!db) return;
  await setDoc(
    doc(db, "chats", roomId),
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
  const db = getFirebaseDb();
  if (!db) return;
  const snapshot = await getDocs(query(collection(db, "messages"), where("roomId", "==", roomId), limit(50)));
  const batch = writeBatch(db);
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
  const db = getFirebaseDb();
  if (!db) return () => {
  };
  return onSnapshot(doc(db, "chats", roomId), (snapshot) => {
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
  const db = getFirebaseDb();
  if (!db) return;
  await addDoc(collection(db, "scores"), {
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
  const db = getFirebaseDb();
  if (!db) return null;
  const ref = doc(collection(db, "boards"));
  const next = {
    ...record,
    imageUrl: record.imageUrl || record.imageDataUrl || "",
    imageDataUrl: record.imageDataUrl || record.imageUrl || "",
    id: ref.id,
    updatedAt: Date.now()
  };
  await setDoc(ref, {
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
  const db = getFirebaseDb();
  if (!db) return () => {
  };
  return onSnapshot(
    query(collection(db, "boards"), where("classLevel", "==", classLevel)),
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
  const db = getFirebaseDb();
  if (!db) return;
  await addDoc(collection(db, "certificates"), {
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
  const db = getFirebaseDb();
  if (!db) return () => {
  };
  return onSnapshot(
    query(collection(db, "certificates"), where("userId", "==", userId)),
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
export {
  saveCertificate as a,
  saveBoardSnapshot as b,
  listenClassmates as c,
  listenChatMessages as d,
  listenChatRoom as e,
  sendChatMessage as f,
  listenCertificates as g,
  listenBoardSnapshots as l,
  markMessagesSeen as m,
  saveQuizScore as s,
  updateTypingState as u
};
