import type { SVGAttributes } from "react";
import { cn } from "@/lib/utils";

export type ConnectorOrientation = "horizontal" | "vertical" | "orthogonal";
export type ConnectorColor = "accent" | "secondary" | "muted" | "error";

export type ConnectorLineProps = SVGAttributes<SVGSVGElement> & {
  /**
   * Line orientation mode.
   * - "horizontal": Straight left-to-right line
   * - "vertical": Straight top-to-bottom line
   * - "orthogonal": 90-degree corner path line
   */
  orientation?: ConnectorOrientation;
  /**
   * Line color variant using design system tokens.
   */
  color?: ConnectorColor;
  /**
   * Stroke style variant.
   */
  variant?: "solid" | "dashed";
  /**
   * If true, renders an animated signal pulse moving along the line path.
   */
  animated?: boolean;
  /**
   * Optional custom SVG path string `d` override.
   */
  path?: string;
  className?: string;
};

const strokeColors: Record<ConnectorColor, string> = {
  accent: "#3626ce",
  secondary: "#c3c0ff",
  muted: "#444748",
  error: "#ef4444",
};

const defaultPaths: Record<ConnectorOrientation, string> = {
  horizontal: "M 0,10 L 100,10",
  vertical: "M 10,0 L 10,100",
  orthogonal: "M 0,10 L 50,10 L 50,90 L 100,90",
};

const viewBoxMap: Record<ConnectorOrientation, string> = {
  horizontal: "0 0 100 20",
  vertical: "0 0 20 100",
  orthogonal: "0 0 100 100",
};

export function ConnectorLine({
  orientation = "horizontal",
  color = "secondary",
  variant = "solid",
  animated = false,
  path,
  className,
  ...restProps
}: ConnectorLineProps) {
  const pathD = path ?? defaultPaths[orientation];
  const hexColor = strokeColors[color];

  return (
    <svg
      viewBox={viewBoxMap[orientation]}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full overflow-visible", className)}
      {...restProps}
    >
      {/* Base Connector Line */}
      <path
        d={pathD}
        stroke={hexColor}
        strokeWidth="2"
        strokeDasharray={variant === "dashed" ? "4 4" : undefined}
        strokeOpacity={color === "muted" ? 0.4 : 0.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Animated Flow Pulse Indicator */}
      {animated && (
        <path
          d={pathD}
          stroke={hexColor}
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-[flow_2s_linear_infinite]"
          style={{
            strokeDasharray: "15 85",
            filter: `drop-shadow(0 0 6px ${hexColor})`,
          }}
        />
      )}
    </svg>
  );
}
