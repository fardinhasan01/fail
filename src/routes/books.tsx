import { createFileRoute } from "@tanstack/react-router";

import { Library } from "@/routes/library";

export const Route = createFileRoute("/books")({
  head: () => ({ meta: [{ title: "বই · E-পাঠশালা" }] }),
  component: BooksPage,
});

function BooksPage() {
  return <Library />;
}
