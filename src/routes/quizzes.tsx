import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/quizzes")({
  component: QuizzesRedirect,
});

function QuizzesRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    void navigate({ to: "/quiz", replace: true });
  }, [navigate]);

  return null;
}
