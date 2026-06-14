import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Brush,
  Eraser,
  ImageDown,
  ImagePlus,
  Palette,
  Redo2,
  Save,
  Search,
  Shapes,
  Sparkles,
  Type,
  Undo2,
  School2,
  Users,
  Trophy,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { ensureEcosystemSeed, searchCatalog } from "@/lib/ecosystem";
import { listenBoardSnapshots, saveBoardSnapshot, type BoardSnapshot } from "@/lib/firebase-data";
import { firebaseEnabled } from "@/lib/firebase";
import { useAuth, useUser } from "@/lib/user-store";

export const Route = createFileRoute("/smart-board")({
  head: () => ({ meta: [{ title: "স্মার্ট বোর্ড · E-পাঠশালা" }] }),
  component: SmartBoard,
});

type Tool = "pen" | "eraser" | "text";
type Point = { x: number; y: number };

function SmartBoard() {
  const auth = useAuth();
  const user = useUser();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const historyRef = useRef<string[]>([]);
  const redoRef = useRef<string[]>([]);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const [classLevel, setClassLevel] = useState<number>(user.class);
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState("#7c3aed");
  const [brushSize, setBrushSize] = useState(6);
  const [textValue, setTextValue] = useState("Note");
  const [draftText, setDraftText] = useState("Note");
  const [textPoint, setTextPoint] = useState<{ x: number; y: number } | null>(null);
  const [boards, setBoards] = useState<BoardSnapshot[]>([]);
  const [boardTitle, setBoardTitle] = useState("Classroom board");
  const [status, setStatus] = useState("Ready");

  // Search state
  ensureEcosystemSeed();
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchCatalog(query), [query]);
  const boardStorageKey = useMemo(() => `epathshala:smart-board:${classLevel}`, [classLevel]);

  const palette = useMemo(
    () => ["#7c3aed", "#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#111827"],
    [],
  );

  useEffect(() => {
    const unsubscribe = listenBoardSnapshots(classLevel, setBoards);
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [classLevel]);

  useEffect(() => {
    if (tool !== "text") {
      setTextPoint(null);
    }
  }, [tool]);

  useEffect(() => {
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(boardStorageKey);
    if (!saved) return;
    applySnapshot(saved);
    historyRef.current = [saved];
    redoRef.current = [];
    setStatus("Saved board restored");
  }, [boardStorageKey]);

  function getCanvasPointFromClient(clientX: number, clientY: number) {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }

  function getCanvasPoint(
    event: React.PointerEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>,
  ) {
    return getCanvasPointFromClient(event.clientX, event.clientY);
  }

  function snapshotCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const snapshot = canvas.toDataURL("image/png");
    historyRef.current.push(snapshot);
    if (historyRef.current.length > 25) historyRef.current.shift();
    redoRef.current = [];
    if (typeof window !== "undefined") {
      localStorage.setItem(boardStorageKey, snapshot);
    }
  }

  function applySnapshot(dataUrl: string) {
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

  function persistSnapshot(dataUrl: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(boardStorageKey, dataUrl);
  }

  function drawLine(from: Point, to: Point) {
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

  function drawText(point: { x: number; y: number }, value: string) {
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

  function drawImageToCanvas(sourceUrl: string) {
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

  async function uploadDataUrl(dataUrl: string, publicId: string) {
    const response = await fetch("/api/cloudinary-upload", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ dataUrl, publicId, folder: "epathshala/free-board" }),
    });

    if (!response.ok) return null;
    const payload = (await response.json().catch(() => null)) as { url?: string } | null;
    return payload?.url ?? null;
  }

  async function addImageFromFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("Failed to read image"));
      reader.readAsDataURL(file);
    });

    const uploadedUrl = (await uploadDataUrl(dataUrl, `board-image-${Date.now()}`)) ?? dataUrl;
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

  function beginStroke(point: Point, pointerId?: number) {
    const canvas = canvasRef.current;
    if (canvas && typeof pointerId === "number") {
      try {
        canvas.setPointerCapture(pointerId);
      } catch {
        // Some browsers can throw if pointer capture is unsupported.
      }
    }
    drawingRef.current = true;
    lastPointRef.current = point;
    setStatus(tool === "eraser" ? "Erasing..." : "Drawing...");
  }

  function handlePointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
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

  function handleMouseDown(event: React.MouseEvent<HTMLCanvasElement>) {
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

  function handleTouchStart(event: React.TouchEvent<HTMLCanvasElement>) {
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

  function handlePointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current || tool === "text") return;
    const point = getCanvasPoint(event);
    if (!point || !lastPointRef.current) return;
    drawLine(lastPointRef.current, point);
    lastPointRef.current = point;
  }

  function handleMouseMove(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!drawingRef.current || tool === "text") return;
    const point = getCanvasPoint(event);
    if (!point || !lastPointRef.current) return;
    drawLine(lastPointRef.current, point);
    lastPointRef.current = point;
  }

  function handleTouchMove(event: React.TouchEvent<HTMLCanvasElement>) {
    if (!drawingRef.current || tool === "text") return;
    const touch = event.touches[0];
    if (!touch) return;
    event.preventDefault();
    const point = getCanvasPointFromClient(touch.clientX, touch.clientY);
    if (!point || !lastPointRef.current) return;
    drawLine(lastPointRef.current, point);
    lastPointRef.current = point;
  }

  function handlePointerUp(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture?.(event.pointerId)) {
      try {
        canvas.releasePointerCapture(event.pointerId);
      } catch {
        // Ignore release errors from browsers without capture support.
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
    if (previous) persistSnapshot(previous);
    setStatus("Undo applied");
  }

  function redo() {
    const next = redoRef.current.pop();
    if (!next) return;
    historyRef.current.push(next);
    applySnapshot(next);
    persistSnapshot(next);
    setStatus("Redo applied");
  }

  async function saveBoard() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageDataUrl = canvas.toDataURL("image/png");
    const uploadedUrl =
      (await uploadDataUrl(
        imageDataUrl,
        `board-snapshot-${boardTitle.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || Date.now()}`,
      )) ?? imageDataUrl;
    const saved = await saveBoardSnapshot({
      classLevel,
      title: boardTitle,
      ownerId: auth.profile.uid,
      ownerName: auth.profile.name,
      imageUrl: uploadedUrl,
      imageDataUrl,
    });
    persistSnapshot(imageDataUrl);
    setStatus(
      saved && firebaseEnabled ? "Board shared with Firebase + Cloudinary" : "Board saved locally",
    );
  }

  function clearBoard() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    const blankSnapshot = canvas.toDataURL("image/png");
    historyRef.current = [blankSnapshot];
    redoRef.current = [];
    persistSnapshot(blankSnapshot);
    setStatus("Board cleared");
  }

  async function downloadImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${boardTitle.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "smart-board"}.png`;
    link.click();
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8">
        {/* Header */}
        <header className="glass-strong rounded-[2rem] p-6 md:p-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
              <Shapes className="h-3.5 w-3.5 text-brand-orange" /> স্মার্ট বোর্ড
            </div>
            <h1 className="text-3xl md:text-5xl font-bold">স্মার্ট বোর্ড</h1>
            <p className="max-w-3xl text-sm md:text-base text-muted-foreground">
              সার্চ ইঞ্জিন ও হোয়াইটবোর্ড একসাথে — খুঁজুন, আঁকুন, লিখুন এবং শেয়ার করুন।
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 min-w-[250px]">
            <Metric label="Results" value={results.length.toString()} />
            <Metric label="Snapshots" value={boards.length.toString()} />
          </div>
        </header>

        {/* Search Section */}
        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-strong rounded-[2rem] p-5 md:p-6">
            <div className="rounded-[2rem] border border-input bg-background px-4 py-4 shadow-soft">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="স্কুল, ছাত্র, বই, প্রতিযোগিতা খুঁজুন..."
                  className="w-full bg-transparent text-base outline-none"
                />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {results.map((item) => (
                <Link
                  key={`${item.type}-${item.title}`}
                  to={item.href as never}
                  className="block rounded-3xl border border-border bg-background/80 p-4 transition-all hover:bg-muted/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-hero text-white">
                        {iconForType(item.type)}
                      </div>
                      <div>
                        <div className="font-semibold">{item.title}</div>
                        <div className="mt-1 text-xs text-muted-foreground">{item.subtitle}</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
                      {item.type}
                    </span>
                  </div>
                </Link>
              ))}
              {results.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  কোনো মিল পাওয়া যায়নি। স্কুল, ছাত্র, বই বা প্রতিযোগিতার নাম লিখে খুঁজুন।
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass rounded-[2rem] p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">সার্চ সাজেশন</h2>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Dhaka Residential",
                  "EP-2026",
                  "Fahim Hasan",
                  "Science Fair",
                  "Class 8 book",
                  "Debate",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="rounded-full bg-brand-orange/10 px-3 py-2 text-xs font-semibold text-brand-orange"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-[2rem] p-5">
              <div className="flex items-center gap-2">
                <School2 className="h-5 w-5 text-brand-blue" />
                <h2 className="text-xl font-bold">Supported scopes</h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                <li>• Schools and profiles</li>
                <li>• Students and ID cards</li>
                <li>• Books and library shelves</li>
                <li>• Competitions and rankings</li>
                <li>• Teachers, notes and projects</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Whiteboard Section */}
        <section className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr] items-start">
          <div className="glass-strong rounded-[2rem] p-4 md:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTool("pen")}
                  className={toolButton(tool === "pen")}
                >
                  <Brush className="h-4 w-4" />
                  Pen
                </button>
                <button
                  type="button"
                  onClick={() => setTool("eraser")}
                  className={toolButton(tool === "eraser")}
                >
                  <Eraser className="h-4 w-4" />
                  Eraser
                </button>
                <button
                  type="button"
                  onClick={() => setTool("text")}
                  className={toolButton(tool === "text")}
                >
                  <Type className="h-4 w-4" />
                  Text
                </button>
                <button type="button" onClick={undo} className={toolButton(false)}>
                  <Undo2 className="h-4 w-4" />
                  Undo
                </button>
                <button type="button" onClick={redo} className={toolButton(false)}>
                  <Redo2 className="h-4 w-4" />
                  Redo
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={toolButton(false)}
                >
                  <ImagePlus className="h-4 w-4" />
                  Image
                </button>
              </div>
              <div className="text-sm text-muted-foreground">{status}</div>
            </div>

            <div className="grid gap-3 md:grid-cols-[auto_auto_1fr] md:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Class
                </div>
                <select
                  value={classLevel}
                  onChange={(event) => setClassLevel(Number(event.target.value))}
                  className="rounded-2xl border border-border bg-background px-4 py-3 font-medium"
                >
                  {Array.from({ length: 10 }, (_, index) => index + 1).map((level) => (
                    <option key={level} value={level}>
                      Class {level}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Brush size
                </div>
                <input
                  type="range"
                  min={2}
                  max={24}
                  value={brushSize}
                  onChange={(event) => setBrushSize(Number(event.target.value))}
                />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Text tool
                </div>
                <input
                  value={textValue}
                  onChange={(event) => setTextValue(event.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3"
                  placeholder="Type your note..."
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {palette.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setColor(item)}
                  className={`h-10 w-10 rounded-full border-4 transition-all ${color === item ? "border-foreground scale-110" : "border-transparent"}`}
                  style={{ backgroundColor: item }}
                  aria-label={`Set color ${item}`}
                />
              ))}
              <div className="ml-auto flex flex-wrap gap-2">
                <input
                  value={boardTitle}
                  onChange={(event) => setBoardTitle(event.target.value)}
                  className="min-w-[220px] rounded-2xl border border-border bg-background px-4 py-3"
                  placeholder="Board title"
                />
                <button
                  type="button"
                  onClick={() => void saveBoard()}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 font-semibold text-white shadow-soft"
                >
                  <Save className="h-4 w-4" />
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => void downloadImage()}
                  className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70"
                >
                  <ImageDown className="h-4 w-4" />
                  PNG
                </button>
                <button
                  type="button"
                  onClick={clearBoard}
                  className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70"
                >
                  Clear
                </button>
              </div>
            </div>

            <div
              ref={containerRef}
              className="relative overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-soft"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void addImageFromFile(file);
                  event.currentTarget.value = "";
                }}
              />
              <canvas
                ref={canvasRef}
                className="touch-none block w-full h-[68vh] select-none"
                style={{ touchAction: "none", userSelect: "none" }}
                onPointerDown={(event) => handlePointerDown(event)}
                onPointerMove={(event) => handlePointerMove(event)}
                onPointerUp={(event) => handlePointerUp(event)}
                onPointerLeave={() => endStroke()}
                onMouseDown={(event) => handleMouseDown(event)}
                onMouseMove={(event) => handleMouseMove(event)}
                onMouseUp={() => endStroke()}
                onMouseLeave={() => endStroke()}
                onTouchStart={(event) => handleTouchStart(event)}
                onTouchMove={(event) => handleTouchMove(event)}
                onTouchEnd={() => endStroke()}
                onContextMenu={(event) => event.preventDefault()}
              />
              {textPoint ? (
                <textarea
                  autoFocus
                  value={draftText}
                  onChange={(event) => setDraftText(event.target.value)}
                  onBlur={() => commitTextDraft()}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      commitTextDraft();
                    }
                    if (event.key === "Escape") {
                      event.preventDefault();
                      setTextPoint(null);
                      setStatus("Text canceled");
                    }
                  }}
                  placeholder="Type your note..."
                  className="absolute z-20 min-h-20 w-64 rounded-2xl border border-brand-purple/30 bg-white/95 p-3 text-sm shadow-soft outline-none resize-none"
                  style={{
                    left: `${textPoint.x}px`,
                    top: `${Math.max(12, textPoint.y - 12)}px`,
                    transform: "translateY(-100%)",
                  }}
                />
              ) : null}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="glass rounded-[2rem] p-5">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h2 className="font-bold">Shared boards</h2>
                <Palette className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-3">
                {boards.length ? (
                  boards.map((board) => (
                    <div
                      key={board.id}
                      className="rounded-3xl border border-border bg-background p-4"
                    >
                      <img
                        src={board.imageUrl || board.imageDataUrl || ""}
                        alt={board.title}
                        className="mb-3 h-40 w-full rounded-2xl object-cover bg-muted"
                      />
                      <div className="font-semibold">{board.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {board.ownerName} · Class {board.classLevel}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-border p-5 text-sm text-muted-foreground">
                    No shared boards yet. Save this board to publish it for the selected class.
                  </div>
                )}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </AppShell>
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

function iconForType(type: string) {
  if (type === "School") return <School2 className="h-5 w-5" />;
  if (type === "Student") return <Users className="h-5 w-5" />;
  if (type === "Competition") return <Trophy className="h-5 w-5" />;
  return <BookOpen className="h-5 w-5" />;
}

function toolButton(active: boolean) {
  return `inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${active ? "bg-gradient-hero text-white shadow-soft" : "border border-border bg-background hover:bg-muted/70"}`;
}
