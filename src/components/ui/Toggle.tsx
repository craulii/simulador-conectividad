import { cn } from "@/utils/cn";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 px-1 py-1.5 text-left"
    >
      <span className="text-xs font-medium tracking-wide text-slate-300">{label}</span>
      <span
        className={cn(
          "relative h-4 w-8 shrink-0 rounded-full transition-colors",
          checked ? "bg-cyan-400/70" : "bg-slate-700",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform",
            checked ? "translate-x-4" : "translate-x-0.5",
          )}
        />
      </span>
    </button>
  );
}
