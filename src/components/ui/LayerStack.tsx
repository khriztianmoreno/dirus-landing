import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type LayerItem = {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  variant?: "default" | "highlight" | "ghost";
  content?: ReactNode;
};

export type LayerStackProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * List of layer objects to render in top-to-bottom stack order.
   */
  layers: LayerItem[];
  /**
   * If true, shows animated connector pulse line between adjacent layers.
   */
  showConnectors?: boolean;
  className?: string;
};

const layerVariantStyles: Record<"default" | "highlight" | "ghost", string> = {
  default:
    "border-dark-gray/60 bg-graphite-raised/80 text-ink backdrop-blur-md",
  highlight:
    "border-accent-indigo/60 bg-near-black/90 text-white shadow-[0_0_30px_rgba(54,38,206,0.25)] backdrop-blur-xl",
  ghost: "border-white/10 bg-graphite/40 text-soft-gray backdrop-blur-sm",
};

export function LayerStack({
  layers,
  showConnectors = true,
  className,
  ...restProps
}: LayerStackProps) {
  return (
    <div
      className={cn(
        "flex w-full max-w-md flex-col items-center gap-4",
        className,
      )}
      {...restProps}
    >
      {layers.map((layer, index) => {
        const variant = layer.variant ?? "default";
        const isLast = index === layers.length - 1;

        return (
          <div
            key={layer.id}
            className="relative flex w-full flex-col items-center"
          >
            {/* Layer Card Container */}
            <div
              className={cn(
                "relative flex w-full flex-col gap-2 rounded-xl border p-6 transition-all duration-300 hover:border-soft-gray",
                layerVariantStyles[variant],
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase tracking-widest text-accent-indigo-soft">
                    {layer.subtitle}
                  </span>
                  <h3 className="font-sans text-lg font-semibold tracking-tight text-white">
                    {layer.title}
                  </h3>
                </div>
                {layer.badge && (
                  <span className="rounded bg-accent-indigo/20 px-2.5 py-1 font-mono text-xs font-medium uppercase tracking-wider text-accent-indigo-soft">
                    {layer.badge}
                  </span>
                )}
              </div>

              {layer.content && <div className="mt-2">{layer.content}</div>}
            </div>

            {/* Connecting Flow Line between layers */}
            {showConnectors && !isLast && (
              <div className="my-1 flex h-8 w-full items-center justify-center">
                <div className="h-full w-0.5 bg-gradient-to-b from-accent-indigo to-soft-gray/30 opacity-70 animate-pulse" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
