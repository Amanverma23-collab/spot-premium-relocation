import { THEMES, useTheme, type ThemeId } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme, isMobileTheme } = useTheme();
  if (isMobileTheme) return null;
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 p-1 backdrop-blur",
        className,
      )}
      role="radiogroup"
      aria-label="Color theme"
    >
      {THEMES.map((t) => {
        const active = t.id === theme;
        return (
          <button
            key={t.id}
            role="radio"
            aria-checked={active}
            title={t.label}
            onClick={() => setTheme(t.id as ThemeId)}
            className={cn(
              "group relative grid h-7 w-7 place-items-center rounded-full transition",
              active
                ? "ring-2 ring-[var(--ring)] ring-offset-2 ring-offset-background"
                : "hover:scale-110",
            )}
          >
            <span
              className="block h-5 w-5 rounded-full border border-white/30 shadow-inner"
              style={{
                background: `conic-gradient(${t.swatch[0]} 0 33%, ${t.swatch[1]} 33% 66%, ${t.swatch[2]} 66% 100%)`,
              }}
            />
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-0.5 text-[10px] font-medium text-background opacity-0 transition group-hover:opacity-100">
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
