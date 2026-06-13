import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/ecosystem")({
  component: EcosystemRedirect,
});

function EcosystemRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    void navigate({ to: "/school", replace: true });
  }, [navigate]);

  return null;
}
