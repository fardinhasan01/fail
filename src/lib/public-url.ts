export function getPublicAppOrigin() {
  const defaultOrigin = "https://e-pathshalaa.vercel.app";
  if (typeof window !== "undefined") {
    const configured = import.meta.env.VITE_PUBLIC_APP_URL || import.meta.env.VITE_APP_URL;
    if (configured) return configured.replace(/\/+$/, "");
    if (/^(localhost|127\.0\.0\.1|::1)$/i.test(window.location.hostname)) {
      return defaultOrigin;
    }
    return window.location.origin;
  }

  return (
    process.env.VITE_PUBLIC_APP_URL?.replace(/\/+$/, "") ||
    process.env.VITE_APP_URL?.replace(/\/+$/, "") ||
    defaultOrigin
  );
}

export function getPublicAppUrl(pathname: string) {
  return new URL(pathname, getPublicAppOrigin()).toString();
}
