import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route$j, A as AppShell } from "./router-DlWKGgSZ.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__database.mjs";
import "../_libs/firebase__functions.mjs";
import { X as ChevronLeft, Y as ChevronRight, _ as RotateCw, E as ExternalLink, $ as LoaderCircle } from "../_libs/lucide-react.mjs";
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
function PdfViewerPage() {
  const search = Route$j.useSearch();
  const canvasRef = reactExports.useRef(null);
  const [pdf, setPdf] = reactExports.useState(null);
  const [pageNumber, setPageNumber] = reactExports.useState(1);
  const [pageCount, setPageCount] = reactExports.useState(0);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [zoom, setZoom] = reactExports.useState(1.15);
  const title = search.title ?? "PDF Viewer";
  reactExports.useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    setPdf(null);
    setPageNumber(1);
    setPageCount(0);
    void (async () => {
      try {
        const {
          GlobalWorkerOptions,
          getDocument
        } = await import("../_libs/pdfjs-dist.mjs");
        GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
        const task = getDocument({
          url: search.src
        });
        const document = await task.promise;
        if (!active) {
          void task.destroy().catch(() => {
          });
          return;
        }
        setPdf(document);
        setPageCount(document.numPages);
        setLoading(false);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load PDF");
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [search.src]);
  reactExports.useEffect(() => {
    if (!pdf || !canvasRef.current) return;
    let canceled = false;
    pdf.getPage(pageNumber).then((page) => {
      if (canceled || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;
      const viewport = page.getViewport({
        scale: zoom
      });
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(viewport.width * ratio);
      canvas.height = Math.floor(viewport.height * ratio);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      page.render({
        canvasContext: context,
        viewport
      }).promise.catch(() => {
      });
    });
    return () => {
      canceled = true;
    };
  }, [pageNumber, pdf, zoom]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "glass-strong rounded-[2rem] p-5 md:p-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "in-app pdf.js viewer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-3xl font-bold", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "PDF stays inside E-পাঠশালা with page navigation, zoom, and full-screen reading." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setPageNumber((current) => Math.max(1, current - 1)), className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
          "Prev"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setPageNumber((current) => Math.min(pageCount || current, current + 1)), className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70", children: [
          "Next",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setZoom((current) => Math.max(0.85, +(current - 0.1).toFixed(2))), className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70", children: "Zoom -" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setZoom((current) => Math.min(1.8, +(current + 0.1).toFixed(2))), className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70", children: "Zoom +" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => window.location.reload(), className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 font-semibold text-white shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "h-4 w-4" }),
          "Reload"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: search.title?.includes("Class") ? "/subjects" : "/dashboard", className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }),
          "Back"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-strong rounded-[2rem] p-5 md:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between gap-3 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Page ",
          pageNumber,
          " / ",
          pageCount || "?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Zoom ",
          zoom.toFixed(2),
          "x"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto rounded-[1.5rem] border border-border bg-background shadow-soft", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-[68vh] place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
        "Loading PDF..."
      ] }) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-[68vh] place-items-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Could not load PDF" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-sm text-muted-foreground", children: [
          "If this is a remote share link, swap it for a direct PDF URL in ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "src/lib/subject-pdf-links.ts" }),
          "."
        ] })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[68vh] p-4 md:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "mx-auto block" }) }) })
    ] })
  ] }) });
}
export {
  PdfViewerPage as component
};
