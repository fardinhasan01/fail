import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, FileText, Headphones, PlusCircle, Boxes, PlayCircle } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import { AppShell } from "@/components/layout/AppShell";
import {
  ensureEcosystemSeed,
  getLibraryAssets,
  libraryItems,
  listenLibraryAssets,
  saveLibraryAsset,
  type LibraryAsset,
} from "@/lib/ecosystem";

type LibraryVideo = {
  title: string;
  channel: string;
  url: string;
  classLevel: number;
  subject: string;
};

const educationalVideos: LibraryVideo[] = [
  {
    title: "বাংলা ব্যাকরণ ও পাঠ",
    channel: "শিক্ষামূলক ভিডিও",
    url: "https://youtu.be/AfiqSCwQTfM?si=0LLz4Ld65MgnPtUM",
    classLevel: 1,
    subject: "বাংলা",
  },
  {
    title: "গণিতের সহজ ব্যাখ্যা",
    channel: "শিক্ষামূলক ভিডিও",
    url: "https://youtu.be/jp6WuzjCPRE?si=SZxYGdcSOmf1OUy_",
    classLevel: 2,
    subject: "গণিত",
  },
  {
    title: "বিজ্ঞানের মজার ক্লাস",
    channel: "শিক্ষামূলক ভিডিও",
    url: "https://youtu.be/j5Vwp6PQyNE?si=L_4vudkJEoFMwpjW",
    classLevel: 4,
    subject: "বিজ্ঞান",
  },
];

const featuredShorts: LibraryVideo[] = [
  {
    title: "শর্টস: বাংলা শেখা",
    channel: "শিক্ষামূলক শর্টস",
    url: "https://youtu.be/AfiqSCwQTfM?si=0LLz4Ld65MgnPtUM",
    classLevel: 1,
    subject: "বাংলা",
  },
  {
    title: "শর্টস: দ্রুত গণিত",
    channel: "শিক্ষামূলক শর্টস",
    url: "https://youtu.be/jp6WuzjCPRE?si=SZxYGdcSOmf1OUy_",
    classLevel: 2,
    subject: "গণিত",
  },
  {
    title: "শর্টস: বিজ্ঞান রিভিশন",
    channel: "শিক্ষামূলক শর্টস",
    url: "https://youtu.be/j5Vwp6PQyNE?si=L_4vudkJEoFMwpjW",
    classLevel: 4,
    subject: "বিজ্ঞান",
  },
];

type UploadForm = {
  title: string;
  kind: LibraryAsset["kind"];
  shelf: LibraryAsset["shelf"];
  subject: string;
  description: string;
  url: string;
  uploadedBy: string;
};

export const Route = createFileRoute("/library")({
  head: () => ({ meta: [{ title: "বই · E-পাঠশালা" }] }),
  component: Library,
});

export function Library() {
  ensureEcosystemSeed();
  const [uploadedAssets, setUploadedAssets] = useState<LibraryAsset[]>(getLibraryAssets());
  const [selectedClass, setSelectedClass] = useState<number | "all">("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [uploadForm, setUploadForm] = useState<UploadForm>({
    title: "",
    kind: "PDF",
    shelf: "left",
    subject: "সাধারণ জ্ঞান",
    description: "",
    url: "",
    uploadedBy: "লাইব্রেরি অ্যাডমিন",
  });
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  useEffect(() => listenLibraryAssets(setUploadedAssets), []);

  const shelfAssets = useMemo(
    () => ({
      left: [
        ...uploadedAssets.filter((asset) => asset.shelf === "left"),
        ...libraryItems.filter((item) => item.format === "Book"),
      ],
      middle: [
        ...uploadedAssets.filter((asset) => asset.shelf === "middle"),
        ...libraryItems.filter((item) => item.format === "Audio"),
      ],
      right: [
        ...uploadedAssets.filter((asset) => asset.shelf === "right"),
        ...libraryItems.filter((item) => item.format === "Model"),
      ],
    }),
    [uploadedAssets],
  );

  const filteredVideos = useMemo(
    () =>
      educationalVideos.filter(
        (video) =>
          (selectedClass === "all" || video.classLevel === selectedClass) &&
          (selectedSubject === "all" || video.subject === selectedSubject),
      ),
    [selectedClass, selectedSubject],
  );

  const filteredReels = useMemo(
    () =>
      featuredShorts.filter(
        (reel) =>
          (selectedClass === "all" || reel.classLevel === selectedClass) &&
          (selectedSubject === "all" || reel.subject === selectedSubject),
      ),
    [selectedClass, selectedSubject],
  );

  const handleUpload = () => {
    if (!uploadForm.title.trim()) return;
    const commitUpload = (resolvedUrl: string) => {
      const asset: LibraryAsset = {
        id: `asset-${Date.now()}`,
        title: uploadForm.title.trim(),
        kind: uploadForm.kind,
        shelf: uploadForm.shelf,
        subject: uploadForm.subject.trim() || "সাধারণ জ্ঞান",
        url: resolvedUrl,
        uploadedBy: uploadForm.uploadedBy.trim() || "লাইব্রেরি অ্যাডমিন",
        uploadedAt: Date.now(),
        description: uploadForm.description.trim() || "নতুন লাইব্রেরি আপলোড",
      };
      saveLibraryAsset(asset);
      setUploadedAssets((current) => [asset, ...current.filter((item) => item.id !== asset.id)]);
      setUploadForm({
        title: "",
        kind: uploadForm.kind,
        shelf: uploadForm.shelf,
        subject: uploadForm.subject,
        description: "",
        url: "",
        uploadedBy: uploadForm.uploadedBy,
      });
      setPendingFile(null);
    };

    if (pendingFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const resolvedUrl = typeof reader.result === "string" ? reader.result : uploadForm.url;
        commitUpload(resolvedUrl || uploadForm.url);
      };
      reader.readAsDataURL(pendingFile);
      return;
    }

    commitUpload(uploadForm.url.trim());
  };

  return (
    <AppShell>
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-none flex-col gap-6 px-4 py-6 md:px-8 md:py-8">
        <header className="overflow-hidden rounded-[2.5rem] border border-white/40 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.28),transparent_26%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.22),transparent_28%),linear-gradient(135deg,#07111f_0%,#0f172a_55%,#111827_100%)] text-white shadow-[0_24px_80px_rgba(15,23,42,0.28)]">
          <div className="grid min-h-[34vh] gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="flex flex-col justify-between gap-6 p-6 md:p-10">
              <div className="space-y-5">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                  বই
                </span>
                <div className="max-w-3xl space-y-4">
                  <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                    পূর্ণ পর্দার বইয়ের জগৎ যেখানে পাঠ, ভিডিও আর লাইভ রিসোর্স একসাথে
                  </h1>
                  <p className="max-w-2xl text-sm leading-7 text-white/75 md:text-base">
                    E-Bangla Library সরাসরি প্ল্যাটফর্মের ভেতরে চলছে, আর তার নিচে তোমার বই, নোট,
                    অডিও, AR model এবং ভিডিও রিসোর্স একসাথে সাজানো আছে।
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/live-class"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 shadow-soft transition-transform hover:scale-[1.01]"
                >
                  লাইভ ক্লাস
                </Link>
                <a
                  href="https://www.ebanglalibrary.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  বাইরে খুলো
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative p-6 md:p-10">
              <div className="grid h-full grid-cols-3 gap-3">
                <ShelfPreview
                  title="PDF বই"
                  accent="from-amber-200 via-amber-100 to-white"
                  icon={<FileText className="h-5 w-5" />}
                />
                <ShelfPreview
                  title="অডিও"
                  accent="from-cyan-200 via-sky-100 to-white"
                  icon={<Headphones className="h-5 w-5" />}
                />
                <ShelfPreview
                  title="AR"
                  accent="from-fuchsia-200 via-violet-100 to-white"
                  icon={<Boxes className="h-5 w-5" />}
                />
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[1.55fr_0.75fr]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[2rem] border border-white/40 bg-slate-950 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)]">
              <div className="border-b border-white/10 p-5">
                <div className="flex items-center gap-2">
                  <Boxes className="h-5 w-5 text-emerald-300" />
                  <h2 className="text-xl font-bold">E-Bangla Library</h2>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  এই ভিউটি পুরো main area জুড়ে চলছে, তাই বই পড়ার সময় পাশের প্যানেল আলাদা করে
                  খুঁজতে হবে না।
                </p>
              </div>
              <div className="bg-white">
                <iframe
                  title="E-Bangla Library"
                  src="https://www.ebanglalibrary.com"
                  className="h-[86vh] w-full"
                  loading="eager"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/40 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
              <iframe
                title="zperiod.app"
                src="https://zperiod.app"
                className="h-[62vh] w-full"
                loading="lazy"
              />
            </div>

            <div className="glass-strong rounded-[2rem] p-5 md:p-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">বাম শেল্ফ: PDF বই ও নোট</h2>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {shelfAssets.left.map((asset) => (
                  <AssetRow key={asset.id ?? asset.title} asset={normalizeAsset(asset, "left")} />
                ))}
              </div>
            </div>

            <div className="glass-strong rounded-[2rem] p-5 md:p-6">
              <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-brand-blue" />
                <h2 className="text-xl font-bold">মধ্য শেল্ফ: অডিও নোট ও নভেল</h2>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {shelfAssets.middle.map((asset) => (
                  <AssetRow key={asset.id ?? asset.title} asset={normalizeAsset(asset, "middle")} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass rounded-[2rem] p-5 md:p-6">
              <div className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-brand-green" />
                <h2 className="text-xl font-bold">লাইব্রেরি আপলোড</h2>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <InputField
                  label="Title"
                  value={uploadForm.title}
                  onChange={(value) => setUploadForm((current) => ({ ...current, title: value }))}
                />
                <SelectField
                  label="Kind"
                  value={uploadForm.kind}
                  options={["PDF", "Note", "Audio", "Novel", "AR Model"]}
                  onChange={(value) => {
                    const nextShelf =
                      value === "AR Model"
                        ? "right"
                        : value === "Audio" || value === "Novel"
                          ? "middle"
                          : "left";
                    setUploadForm((current) => ({
                      ...current,
                      kind: value as UploadForm["kind"],
                      shelf: nextShelf,
                    }));
                  }}
                />
                <SelectField
                  label="Shelf"
                  value={uploadForm.shelf}
                  options={["left", "middle", "right"]}
                  onChange={(value) =>
                    setUploadForm((current) => ({
                      ...current,
                      shelf: value as UploadForm["shelf"],
                    }))
                  }
                />
                <InputField
                  label="Subject"
                  value={uploadForm.subject}
                  onChange={(value) => setUploadForm((current) => ({ ...current, subject: value }))}
                />
                <InputField
                  label="Uploaded by"
                  value={uploadForm.uploadedBy}
                  onChange={(value) =>
                    setUploadForm((current) => ({ ...current, uploadedBy: value }))
                  }
                />
                <InputField
                  label="URL"
                  value={uploadForm.url}
                  onChange={(value) => setUploadForm((current) => ({ ...current, url: value }))}
                />
                <label className="space-y-1.5 text-sm font-medium md:col-span-2">
                  <span>ফাইল আপলোড</span>
                  <input
                    type="file"
                    onChange={(event) => setPendingFile(event.target.files?.[0] ?? null)}
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground"
                  />
                </label>
                <label className="space-y-1.5 text-sm font-medium md:col-span-2">
                  <span>Description</span>
                  <textarea
                    value={uploadForm.description}
                    onChange={(event) =>
                      setUploadForm((current) => ({ ...current, description: event.target.value }))
                    }
                    className="min-h-24 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
                    placeholder="Short description"
                  />
                </label>
              </div>
              <button
                type="button"
                onClick={handleUpload}
                className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 text-sm font-semibold text-white shadow-soft"
              >
                <PlusCircle className="h-4 w-4" />
                আপলোড সংরক্ষণ করুন
              </button>
              <p className="mt-3 text-sm text-muted-foreground">
                RTDB-backed upload. File দিলে সেটি data URL হিসেবে লোড হবে, না হলে URL হিসেবে সেভ
                হবে।
              </p>
            </div>

            <div className="glass-strong rounded-[2rem] p-5 md:p-6">
              <div className="flex items-center gap-2">
                <Boxes className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">3D Models</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                3D model upload এখানে RTDB-তে সেভ হবে, তারপর AR shelf-এ দেখাবে।
              </p>
              <div className="mt-4 space-y-3">
                {shelfAssets.right.map((asset) => (
                  <AssetRow key={asset.id ?? asset.title} asset={normalizeAsset(asset, "right")} />
                ))}
              </div>
            </div>

            <div className="glass-strong rounded-[2rem] p-5 md:p-6">
              <div className="flex items-center gap-3 mb-5">
                <PlayCircle className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="text-2xl font-bold">ভিডিও ফিড</h2>
                  <p className="text-sm text-muted-foreground">
                    মিনিওয়েবের নিচে বাম থেকে ডানে সাজানো থাম্বনেইল।
                  </p>
                </div>
              </div>
              <div className="space-y-5">
                <div className="grid gap-4 xl:grid-cols-2">
                  <div className="rounded-[1.75rem] border border-border bg-white/90 p-4 shadow-soft">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                          ভিডিও
                        </div>
                        <div className="mt-1 font-bold">শিক্ষামূলক ভিডিও</div>
                      </div>
                      <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange">
                        {filteredVideos.length}
                      </span>
                    </div>
                    <div className="mt-4 flex gap-4 overflow-x-auto pb-2 pr-2 snap-x snap-mandatory">
                      {filteredVideos.map((video) => (
                        <a
                          key={video.url + video.title}
                          href={video.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group min-w-[240px] max-w-[240px] snap-start overflow-hidden rounded-[1.5rem] border border-border bg-background shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
                        >
                          <div className="relative aspect-video bg-slate-100">
                            <img
                              src={`https://i.ytimg.com/vi/${youtubeIdFromUrl(video.url)}/hqdefault.jpg`}
                              alt={video.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs font-semibold text-white">
                              শ্রেণি {video.classLevel}
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="line-clamp-2 font-bold leading-snug">{video.title}</div>
                            <div className="mt-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                              <span>{video.channel}</span>
                              <span>{video.subject}</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-border bg-white/90 p-4 shadow-soft">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                          Shorts
                        </div>
                        <div className="mt-1 font-bold">দ্রুত রিভিশন থাম্বনেইল</div>
                      </div>
                      <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
                        {filteredReels.length}
                      </span>
                    </div>
                    <div className="mt-4 flex gap-4 overflow-x-auto pb-2 pr-2 snap-x snap-mandatory">
                      {filteredReels.map((reel) => (
                        <a
                          key={reel.url}
                          href={reel.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group min-w-[200px] max-w-[200px] snap-start overflow-hidden rounded-[1.5rem] border border-border bg-background shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
                        >
                          <div className="relative aspect-[9/16] overflow-hidden bg-gradient-blue text-white">
                            <img
                              src={`https://i.ytimg.com/vi/${youtubeIdFromUrl(reel.url)}/hqdefault.jpg`}
                              alt={reel.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs font-semibold text-white">
                              Shorts
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="line-clamp-2 font-bold">{reel.title}</div>
                            <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                              <span>{reel.subject}</span>
                              <span>শ্রেণি {reel.classLevel}</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function AssetRow({ asset }: { asset: LibraryAsset }) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-white/85 p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {asset.kind}
          </div>
          <div className="mt-1 font-bold">{asset.title}</div>
          <div className="mt-1 text-xs text-muted-foreground">{asset.subject}</div>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
          {asset.shelf}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{asset.description}</p>
      <div className="mt-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>{asset.uploadedBy}</span>
        {asset.url && asset.url !== "#" ? (
          <a
            href={asset.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-primary"
          >
            খুলুন <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span className="font-semibold text-muted-foreground">Preview</span>
        )}
      </div>
    </div>
  );
}

function ShelfPreview({
  title,
  accent,
  icon,
}: {
  title: string;
  accent: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-[2rem] border border-white/10 bg-gradient-to-br ${accent} p-4 text-slate-900 shadow-soft`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Shelf</div>
          <div className="mt-1 font-bold">{title}</div>
        </div>
        <div className="rounded-full bg-white/80 p-2">{icon}</div>
      </div>
    </div>
  );
}

function normalizeAsset(
  asset: LibraryAsset | (typeof libraryItems)[number],
  shelf: LibraryAsset["shelf"],
): LibraryAsset {
  if ("kind" in asset) return asset;
  return {
    id: asset.id,
    title: asset.title,
    kind: asset.format === "Book" ? "PDF" : asset.format === "Audio" ? "Audio" : "AR Model",
    subject: asset.category,
    shelf,
    url: "#",
    uploadedBy: "System",
    uploadedAt: Date.now(),
    description: asset.description,
  };
}

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-1.5 text-sm font-medium">
      <span>{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-1.5 text-sm font-medium">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function youtubeIdFromUrl(url: string) {
  const patterns = [
    /youtu\.be\/([A-Za-z0-9_-]{11})/i,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/i,
    /youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/i,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
}
