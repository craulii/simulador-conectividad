import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface PanelProps {
  children: ReactNode;
  className?: string;
}

export function Panel({ children, className }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-cyan-400/15 bg-[rgba(10,16,30,0.88)]",
        "shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
