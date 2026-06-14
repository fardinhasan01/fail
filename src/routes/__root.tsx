import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { AuthProvider } from "@/lib/user-store";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#7c3aed" },
      { title: "E-পাঠশালা — Bangla digital school" },
      {
        name: "description",
        content:
          "বাংলাদেশের শিক্ষার্থীদের জন্য এক আধুনিক ডিজিটাল শিক্ষালয়। বিষয়, PDF, লাইভ ক্লাস, গেম, কুইজ, এবং সহপাঠী চ্যাট এক জায়গায়।",
      },
      { property: "og:title", content: "E-পাঠশালা" },
      { property: "og:description", content: "বাংলা-প্রথম ডিজিটাল শিক্ষার প্ল্যাটফর্ম।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="bn">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const seen = typeof window !== "undefined" && sessionStorage.getItem("bani:intro-seen");
    if (seen) {
      setShowIntro(false);
      return;
    }

    setShowIntro(true);
    if (typeof window !== "undefined") {
      const timer = window.setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem("bani:intro-seen", "1");
      }, 5000);
      return () => window.clearTimeout(timer);
    }
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <div className="relative">
          {showIntro && <IntroSplash />}
          <Outlet />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
}

function IntroSplash() {
  return (
    <div className="fixed inset-0 z-[60] overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-950 via-slate-900 to-cyan-950 opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.26),transparent_30%),radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.18),transparent_30%)]" />
      <div className="absolute inset-0 opacity-50">
        <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-white/10 blur-2xl animate-float" />
        <div className="absolute right-16 top-20 h-32 w-32 rounded-full bg-brand-yellow/20 blur-2xl animate-float" />
        <div className="absolute bottom-16 left-1/4 h-28 w-28 rounded-full bg-brand-green/20 blur-2xl animate-float" />
        <div className="absolute bottom-24 right-1/4 h-20 w-20 rounded-full bg-white/10 blur-2xl animate-float" />
      </div>
      <div className="relative z-10 flex h-full items-center justify-center px-4 py-6 md:px-8">
        <div className="grid w-full max-w-6xl gap-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[42vh] lg:min-h-[78vh]">
            <img
              src="/assets/intro-team.jpg"
              alt="E-পাঠশালা টিম"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.28)_55%,rgba(2,6,23,0.78)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 text-white">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] backdrop-blur">
                Created & Developed by
              </div>
              <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
                Kachua Govt. Pilot High School Team
              </h1>
              <p className="mt-2 text-base font-medium text-white/85 md:text-lg">
                Kachua Govt. Pilot High School
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-5 p-6 md:p-10 text-white">
            <div className="flex justify-end">
              <div className="grid h-20 w-20 place-items-center rounded-[1.5rem] border border-white/15 bg-white/10 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.35)] backdrop-blur">
                <img
                  src="/assets/e-pathshala-logo.png"
                  alt="E-পাঠশালা logo"
                  className="h-full w-full rounded-[1.2rem] object-cover"
                />
              </div>
            </div>
            <div className="max-w-xl space-y-4">
              <p className="text-xs uppercase tracking-[0.45em] text-white/60">E-পাঠশালা intro</p>
              <h2 className="text-3xl font-bold md:text-5xl">
                একটি স্কুল টিম, একটি ডিজিটাল শিক্ষালয়
              </h2>
              <p className="max-w-lg text-sm leading-7 text-white/75 md:text-base">
                এই পরিচিতিতে তোমাদের টিমের ছবি দেখানো হবে, তারপর 5 সেকেন্ড পরে অ্যাপ
                স্বয়ংক্রিয়ভাবে খুলে যাবে।
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["বাংলা-প্রথম", "লাইভ ক্লাস", "কুইজ ও বই"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90 backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/8 p-4 text-sm leading-6 text-white/75">
              স্বাগতম। তোমাদের কাজের ছবি সামনে রেখে এই intro এখন আরও সুন্দরভাবে শুরু হবে।
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
