import { cn } from "@/lib/utils";

import { fieldClass, labelClass } from "./contact-form-classes";

export function UnderlineInput({ id, name, type = "text", label, autoComplete }: { id: string; name: string; type?: string; label: string; autoComplete?: string }) {
  return (
    <div className="group relative">
      <input id={id} name={name} type={type} autoComplete={autoComplete} placeholder=" " className={fieldClass} required />
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <span
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-primary to-transparent transition-transform duration-300 ease-out peer-focus:scale-x-100 peer-[:not(:placeholder-shown)]:scale-x-100"
        aria-hidden
      />
    </div>
  );
}

export function UnderlineTextarea({ id, name, label, rows = 5 }: { id: string; name: string; label: string; rows?: number }) {
  return (
    <div className="group relative">
      <textarea id={id} name={name} rows={rows} placeholder=" " className={cn(fieldClass, "min-h-[140px] resize-y align-top leading-relaxed")} required />
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <span
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-primary to-transparent transition-transform duration-300 ease-out peer-focus:scale-x-100 peer-[:not(:placeholder-shown)]:scale-x-100"
        aria-hidden
      />
    </div>
  );
}
