import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell } from "./AppShell-C4H10nur.mjs";
import { l as listenBoardSnapshots, b as saveBoardSnapshot } from "./firebase-data-BtoO4O4A.mjs";
import { c as useAuth, u as useUser, f as firebaseEnabled } from "./router-D2rIulYA.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase.mjs";
import { v as Shapes, B as Brush, w as Eraser, x as Type, y as Undo2, z as Redo2, I as ImagePlus, D as Save, F as ImageDown, P as Palette } from "../_libs/lucide-react.mjs";
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
function FreeBoard() {
  const auth = useAuth();
  const user = useUser();
  const canvasRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const fileInputRef = reactExports.useRef(null);
  const historyRef = reactExports.useRef([]);
  const redoRef = reactExports.useRef([]);
  const drawingRef = reactExports.useRef(false);
  const lastPointRef = reactExports.useRef(null);
  const [classLevel, setClassLevel] = reactExports.useState(user.class);
  const [tool, setTool] = reactExports.useState("pen");
  const [color, setColor] = reactExports.useState("#7c3aed");
  const [brushSize, setBrushSize] = reactExports.useState(6);
  const [textValue, setTextValue] = reactExports.useState("Note");
  const [draftText, setDraftText] = reactExports.useState("Note");
  const [textPoint, setTextPoint] = reactExports.useState(null);
  const [boards, setBoards] = reactExports.useState([]);
  const [boardTitle, setBoardTitle] = reactExports.useState("Classroom board");
  const [status, setStatus] = reactExports.useState("Ready");
  const palette = reactExports.useMemo(() => ["#7c3aed", "#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#111827"], []);
  reactExports.useEffect(() => {
    const unsubscribe = listenBoardSnapshots(classLevel, setBoards);
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
      else unsubscribe?.();
    };
  }, [classLevel]);
  reactExports.useEffect(() => {
    if (tool !== "text") {
      setTextPoint(null);
    }
  }, [tool]);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      const width = Math.max(320, Math.floor(rect.width));
      const height = Math.max(420, Math.floor(window.innerHeight * 0.68));
      const snapshot = canvas.toDataURL("image/png");
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      if (historyRef.current.length === 0) {
        historyRef.current.push(snapshot);
        return;
      }
      const image = new Image();
      image.onload = () => ctx.drawImage(image, 0, 0, width, height);
      image.src = historyRef.current[historyRef.current.length - 1];
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  function getCanvasPointFromClient(clientX, clientY) {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }
  function getCanvasPoint(event) {
    return getCanvasPointFromClient(event.clientX, event.clientY);
  }
  function snapshotCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    historyRef.current.push(canvas.toDataURL("image/png"));
    if (historyRef.current.length > 25) historyRef.current.shift();
    redoRef.current = [];
  }
  function applySnapshot(dataUrl) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const image = new Image();
    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.clientWidth, canvas.clientHeight);
    };
    image.src = dataUrl;
  }
  function drawLine(from, to) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.restore();
  }
  function drawText(point, value) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = `${Math.max(18, brushSize * 4)}px "Plus Jakarta Sans", sans-serif`;
    ctx.textBaseline = "top";
    ctx.fillText(value.trim() || "Text", point.x, point.y);
    ctx.restore();
  }
  function drawImageToCanvas(sourceUrl) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const maxWidth = Math.min(canvas.clientWidth * 0.72, image.width);
      const scale = maxWidth / image.width;
      const width = Math.max(120, maxWidth);
      const height = Math.max(120, image.height * scale);
      const x = Math.max(12, (canvas.clientWidth - width) / 2);
      const y = Math.max(12, (canvas.clientHeight - height) / 3);
      ctx.save();
      ctx.drawImage(image, x, y, width, height);
      ctx.restore();
      snapshotCanvas();
      setStatus("Image added to board");
    };
    image.src = sourceUrl;
  }
  async function uploadDataUrl(dataUrl, publicId) {
    const response = await fetch("/api/cloudinary-upload", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        dataUrl,
        publicId,
        folder: "epathshala/free-board"
      })
    });
    if (!response.ok) return null;
    const payload = await response.json().catch(() => null);
    return payload?.url ?? null;
  }
  async function addImageFromFile(file) {
    if (!file.type.startsWith("image/")) return;
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("Failed to read image"));
      reader.readAsDataURL(file);
    });
    const uploadedUrl = await uploadDataUrl(dataUrl, `board-image-${Date.now()}`) ?? dataUrl;
    drawImageToCanvas(uploadedUrl);
    setDraftText(file.name);
  }
  function commitTextDraft() {
    const point = textPoint;
    if (!point) return;
    drawText(point, draftText || textValue || "Text");
    snapshotCanvas();
    setStatus("Text placed");
    setTextPoint(null);
  }
  function beginStroke(point, pointerId) {
    const canvas = canvasRef.current;
    if (canvas && typeof pointerId === "number") {
      try {
        canvas.setPointerCapture(pointerId);
      } catch {
      }
    }
    drawingRef.current = true;
    lastPointRef.current = point;
    setStatus(tool === "eraser" ? "Erasing..." : "Drawing...");
  }
  function handlePointerDown(event) {
    event.preventDefault();
    const point = getCanvasPoint(event);
    if (!point) return;
    if (tool === "text") {
      setTextPoint(point);
      setDraftText(textValue || "Note");
      setStatus("Type your note and press Enter");
      return;
    }
    beginStroke(point, event.pointerId);
  }
  function handleMouseDown(event) {
    event.preventDefault();
    const point = getCanvasPoint(event);
    if (!point) return;
    if (tool === "text") {
      setTextPoint(point);
      setDraftText(textValue || "Note");
      setStatus("Type your note and press Enter");
      return;
    }
    beginStroke(point);
  }
  function handleTouchStart(event) {
    const touch = event.touches[0];
    if (!touch) return;
    event.preventDefault();
    const point = getCanvasPointFromClient(touch.clientX, touch.clientY);
    if (!point) return;
    if (tool === "text") {
      setTextPoint(point);
      setDraftText(textValue || "Note");
      setStatus("Type your note and press Enter");
      return;
    }
    beginStroke(point);
  }
  function handlePointerMove(event) {
    if (!drawingRef.current || tool === "text") return;
    const point = getCanvasPoint(event);
    if (!point || !lastPointRef.current) return;
    drawLine(lastPointRef.current, point);
    lastPointRef.current = point;
  }
  function handleMouseMove(event) {
    if (!drawingRef.current || tool === "text") return;
    const point = getCanvasPoint(event);
    if (!point || !lastPointRef.current) return;
    drawLine(lastPointRef.current, point);
    lastPointRef.current = point;
  }
  function handleTouchMove(event) {
    if (!drawingRef.current || tool === "text") return;
    const touch = event.touches[0];
    if (!touch) return;
    event.preventDefault();
    const point = getCanvasPointFromClient(touch.clientX, touch.clientY);
    if (!point || !lastPointRef.current) return;
    drawLine(lastPointRef.current, point);
    lastPointRef.current = point;
  }
  function handlePointerUp(event) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture?.(event.pointerId)) {
      try {
        canvas.releasePointerCapture(event.pointerId);
      } catch {
      }
    }
    endStroke();
  }
  function endStroke() {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastPointRef.current = null;
    snapshotCanvas();
    setStatus("Saved locally");
  }
  function undo() {
    if (historyRef.current.length <= 1) return;
    const current = historyRef.current.pop();
    if (current) redoRef.current.push(current);
    const previous = historyRef.current[historyRef.current.length - 1];
    if (previous) applySnapshot(previous);
    setStatus("Undo applied");
  }
  function redo() {
    const next = redoRef.current.pop();
    if (!next) return;
    historyRef.current.push(next);
    applySnapshot(next);
    setStatus("Redo applied");
  }
  async function saveBoard() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageDataUrl = canvas.toDataURL("image/png");
    const uploadedUrl = await uploadDataUrl(imageDataUrl, `board-snapshot-${boardTitle.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || Date.now()}`) ?? imageDataUrl;
    const saved = await saveBoardSnapshot({
      classLevel,
      title: boardTitle,
      ownerId: auth.profile.uid,
      ownerName: auth.profile.name,
      imageUrl: uploadedUrl,
      imageDataUrl
    });
    setStatus(saved && firebaseEnabled ? "Board shared with Firebase + Cloudinary" : "Board saved locally");
  }
  function clearBoard() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    historyRef.current = [canvas.toDataURL("image/png")];
    redoRef.current = [];
    setStatus("Board cleared");
  }
  async function downloadImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${boardTitle.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "free-board"}.png`;
    link.click();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "glass-strong rounded-[2rem] p-6 md:p-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shapes, { className: "h-3.5 w-3.5 text-brand-orange" }),
          " live whiteboard"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-bold", children: "Free Board" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-sm md:text-base text-muted-foreground", children: "Pencil, eraser, color palette, text notes, undo/redo, image download, and class-based snapshots for shared teaching." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 min-w-[250px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Class", value: classLevel.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Snapshots", value: boards.length.toString() })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 xl:grid-cols-[1.25fr_0.75fr] items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-4 md:p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setTool("pen"), className: toolButton(tool === "pen"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brush, { className: "h-4 w-4" }),
              "Pen"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setTool("eraser"), className: toolButton(tool === "eraser"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eraser, { className: "h-4 w-4" }),
              "Eraser"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setTool("text"), className: toolButton(tool === "text"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-4 w-4" }),
              "Text"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: undo, className: toolButton(false), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Undo2, { className: "h-4 w-4" }),
              "Undo"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: redo, className: toolButton(false), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Redo2, { className: "h-4 w-4" }),
              "Redo"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => fileInputRef.current?.click(), className: toolButton(false), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-4 w-4" }),
              "Upload image"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-[auto_auto_1fr] md:items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2", children: "Class" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: classLevel, onChange: (event) => setClassLevel(Number(event.target.value)), className: "rounded-2xl border border-border bg-background px-4 py-3 font-medium", children: Array.from({
              length: 10
            }, (_, index) => index + 1).map((level) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: level, children: [
              "Class ",
              level
            ] }, level)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2", children: "Brush size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 2, max: 24, value: brushSize, onChange: (event) => setBrushSize(Number(event.target.value)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2", children: "Text tool" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: textValue, onChange: (event) => setTextValue(event.target.value), className: "w-full rounded-2xl border border-border bg-background px-4 py-3", placeholder: "Type your note..." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          palette.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setColor(item), className: `h-10 w-10 rounded-full border-4 transition-all ${color === item ? "border-foreground scale-110" : "border-transparent"}`, style: {
            backgroundColor: item
          }, "aria-label": `Set color ${item}` }, item)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: boardTitle, onChange: (event) => setBoardTitle(event.target.value), className: "min-w-[220px] rounded-2xl border border-border bg-background px-4 py-3", placeholder: "Board title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void saveBoard(), className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 font-semibold text-white shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
              "Save"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void downloadImage(), className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ImageDown, { className: "h-4 w-4" }),
              "PNG"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: clearBoard, className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70", children: "Clear" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, className: "relative overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", className: "hidden", onChange: (event) => {
            const file = event.target.files?.[0];
            if (file) void addImageFromFile(file);
            event.currentTarget.value = "";
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "touch-none block w-full h-[68vh] select-none", style: {
            touchAction: "none",
            userSelect: "none"
          }, onPointerDown: (event) => handlePointerDown(event), onPointerMove: (event) => handlePointerMove(event), onPointerUp: (event) => handlePointerUp(event), onPointerLeave: () => endStroke(), onMouseDown: (event) => handleMouseDown(event), onMouseMove: (event) => handleMouseMove(event), onMouseUp: () => endStroke(), onMouseLeave: () => endStroke(), onTouchStart: (event) => handleTouchStart(event), onTouchMove: (event) => handleTouchMove(event), onTouchEnd: () => endStroke(), onContextMenu: (event) => event.preventDefault() }),
          textPoint ? /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { autoFocus: true, value: draftText, onChange: (event) => setDraftText(event.target.value), onBlur: () => commitTextDraft(), onKeyDown: (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              commitTextDraft();
            }
            if (event.key === "Escape") {
              event.preventDefault();
              setTextPoint(null);
              setStatus("Text canceled");
            }
          }, placeholder: "Type your note...", className: "absolute z-20 min-h-20 w-64 rounded-2xl border border-brand-purple/30 bg-white/95 p-3 text-sm shadow-soft outline-none resize-none", style: {
            left: `${textPoint.x}px`,
            top: `${Math.max(12, textPoint.y - 12)}px`,
            transform: "translateY(-100%)"
          } }) : null
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold", children: "Shared boards" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-5 w-5 text-primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: boards.length ? boards.map((board) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: board.imageUrl || board.imageDataUrl || "", alt: board.title, className: "mb-3 h-40 w-full rounded-2xl object-cover bg-muted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: board.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            board.ownerName,
            " · Class ",
            board.classLevel
          ] })
        ] }, board.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-dashed border-border p-5 text-sm text-muted-foreground", children: "No shared boards yet. Save this board to publish it for the selected class." }) })
      ] }) })
    ] })
  ] }) });
}
function toolButton(active) {
  return `inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${active ? "bg-gradient-hero text-white shadow-soft" : "border border-border bg-background hover:bg-muted/70"}`;
}
function Metric({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-background/80 p-4 shadow-soft border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-2xl font-bold", children: value })
  ] });
}
export {
  FreeBoard as component
};
