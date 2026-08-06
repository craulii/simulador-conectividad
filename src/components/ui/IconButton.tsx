import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface IconButtonProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function IconButton({ icon, label, active = false, onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-md text-slate-300 transition-colors",
        "hover:bg-cyan-400/10 hover:text-cyan-200",
        active && "bg-cyan-400/15 text-cyan-300",
      )}
    >
      {icon}
    </button>
  );
}
