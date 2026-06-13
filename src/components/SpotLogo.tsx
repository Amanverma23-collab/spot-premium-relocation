import logoAsset from "@/assets/spot-logo.png.asset.json";
import { cn } from "@/lib/utils";

interface SpotLogoProps {
  className?: string;
  withTagline?: boolean;
  variant?: "default" | "light";
}

/**
 * SPOT brand lockup. The image replaces the word "SPOT" — followed by
 * "Packers & Movers" wordmark.
 */
export function SpotLogo({ className, withTagline, variant = "default" }: SpotLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <img
        src={logoAsset.url}
        alt="SPOT"
        className="h-7 w-auto sm:h-8 select-none"
        draggable={false}
      />
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-semibold text-[0.72rem] sm:text-[0.8rem] tracking-[0.18em] uppercase",
            variant === "light" ? "text-white/90" : "text-foreground",
          )}
        >
          Packers &amp; Movers
        </span>
        {withTagline && (
          <span className={cn("text-[0.62rem] mt-0.5 tracking-wider uppercase", variant === "light" ? "text-white/55" : "text-muted-foreground")}>
            IBA Approved · Pan India
          </span>
        )}
      </div>
    </div>
  );
}
