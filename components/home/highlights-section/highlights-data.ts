import type { LucideIcon } from "lucide-react";
import { GitPullRequest, MessageCircle, Rocket, Sparkles, Target, Zap } from "lucide-react";

export type HighlightId = "productFirst" | "comms" | "futureYou" | "a11yPerf" | "cdd" | "curious";

export type HighlightConfig = {
  id: HighlightId;
  Icon: LucideIcon;
  accent?: "default" | "featured";
};

export const HIGHLIGHTS: readonly HighlightConfig[] = [
  { id: "productFirst", Icon: Target, accent: "featured" },
  { id: "comms", Icon: MessageCircle },
  { id: "futureYou", Icon: GitPullRequest },
  { id: "a11yPerf", Icon: Zap },
  { id: "cdd", Icon: Rocket },
  { id: "curious", Icon: Sparkles },
] as const;
