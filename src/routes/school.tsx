import { createFileRoute } from "@tanstack/react-router";

import { Schools } from "@/routes/schools";

export const Route = createFileRoute("/school")({
  head: () => ({ meta: [{ title: "স্কুল · E-পাঠশালা" }] }),
  component: SchoolPage,
});

function SchoolPage() {
  return <Schools />;
}
