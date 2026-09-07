"use client";

import { ConnectorLine } from "@/components/ui/ConnectorLine";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/hooks/useInView";

type ChaosNode = { id: string; title: string };

type OperationalNoiseProps = {
  nodes: ChaosNode[];
  centerLabel: string;
  className?: string;
};

const CENTER = 50;
const RING_RADIUS = 34;

/**
 * Deterministic chaotic offsets per node (index-based) so the layout
 * looks organic without randomness. Each tuple is [dx, dy, rotationDeg]
 * expressed as a percentage offset from center or degrees.
 */
const CHAOS_OFFSETS: Array<[number, number, number]> = [
  [10, -30, -16],
  [-28, 12, 18],
  [5, 30, 22],
  [-20, -24, -10],
  [28, 22, 12],
  [-32, -6, -22],
  [22, -20, 15],
];

function nodeOrdered(index: number, count: number) {
  const angle = -Math.PI / 2 + (index / count) * Math.PI * 2;
  return {
    x: CENTER + RING_RADIUS * Math.cos(angle),
    y: CENTER + RING_RADIUS * Math.sin(angle),
  };
}

/**
 * Scroll-reveal visual that starts with operational elements scattered
 * chaotically and converges them toward a central DIRUS core, drawing
 * animated ConnectorLines from each node to the center.
 *
 * Semantic note: this component is purely decorative — the surrounding
 * copy already communicates the full message on its own.
 */
export function OperationalNoise({
  nodes,
  centerLabel,
  className,
}: OperationalNoiseProps) {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full aspect-[4/3] max-w-2xl mx-auto",
        className,
      )}
      aria-hidden="true"
    >
      {/* ConnectorLines from each node to center */}
      {nodes.map((node, i) => {
        const { x, y } = nodeOrdered(i, nodes.length);
        const chaos = CHAOS_OFFSETS[i % CHAOS_OFFSETS.length] ?? [0, 0, 0];

        return (
          <ConnectorLine
            key={node.id}
            orientation="orthogonal"
            path={`M ${inView ? x : CENTER + chaos[0]},${inView ? y : CENTER + chaos[1]} L ${CENTER},${CENTER}`}
            color="accent"
            variant={inView ? "solid" : "dashed"}
            animated={inView}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              opacity: inView ? 0.6 : 0,
              transition: "opacity 700ms ease-in-out",
              transitionDelay: `${i * 120 + 400}ms`,
            }}
          />
        );
      })}

      {/* Center DIRUS core */}
      <div
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20",
          "w-20 h-20 md:w-24 md:h-24 rounded-full",
          "bg-accent-indigo/90 border-2 border-accent-indigo-soft/50",
          "flex items-center justify-center",
          "shadow-[0_0_40px_rgba(54,38,206,0.4)]",
          "transition-all duration-700 ease-in-out",
        )}
      >
        <span className="font-mono text-xs md:text-sm font-semibold text-white uppercase tracking-widest">
          {centerLabel}
        </span>
      </div>

      {/* Operational nodes */}
      {nodes.map((node, i) => {
        const { x, y } = nodeOrdered(i, nodes.length);
        const chaos = CHAOS_OFFSETS[i % CHAOS_OFFSETS.length];

        return (
          <div
            key={node.id}
            className={cn(
              "absolute z-10",
              "px-3 py-1.5 md:px-4 md:py-2",
              "rounded-full border border-white/10",
              "bg-graphite-raised/80 backdrop-blur-md",
              "font-mono text-[11px] md:text-xs text-soft-gray",
              "whitespace-nowrap",
              "transition-all duration-700 ease-in-out",
            )}
            style={{
              left: `${inView ? x : CENTER + (chaos?.[0] ?? 0)}%`,
              top: `${inView ? y : CENTER + (chaos?.[1] ?? 0)}%`,
              transform: `translate(-50%, -50%) rotate(${inView ? 0 : (chaos?.[2] ?? 0)}deg)`,
              transitionDelay: `${i * 120}ms`,
            }}
          >
            {node.title}
          </div>
        );
      })}
    </div>
  );
}
