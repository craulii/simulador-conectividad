interface FormFieldProps {
  label: string;
  type?: "text" | "number";
  value: string | number;
  onChange: (value: string) => void;
  suffix?: string;
}

export function FormField({ label, type = "text", value, onChange, suffix }: FormFieldProps) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">
        {label}
      </span>
      <div className="mt-1 flex items-center gap-1.5 rounded-md border border-white/10 bg-black/30 px-2 py-1.5 focus-within:border-cyan-400/40">
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent text-sm text-slate-100 outline-none"
        />
        {suffix && <span className="text-xs text-slate-500">{suffix}</span>}
      </div>
    </label>
  );
}
