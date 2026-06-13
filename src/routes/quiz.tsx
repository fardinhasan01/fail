import { createFileRoute } from "@tanstack/react-router";

import { Games } from "@/routes/games";

export const Route = createFileRoute("/quiz")({
  head: () => ({ meta: [{ title: "কুইজ · E-পাঠশালা" }] }),
  component: QuizPage,
});

function QuizPage() {
  return <Games />;
}
