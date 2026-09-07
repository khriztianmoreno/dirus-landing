import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  /**
   * Only observe the first intersection and stop observing afterwards.
   */
  once?: boolean;
  /**
   * Minimum fraction of the target bounding box that must be visible.
   */
  threshold?: number;
};

/**
 * Tracks when an element enters the viewport and exposes that boolean.
 * Shared by scroll-reveal visuals so they can animate once into their
 * final state and respect the reduced-motion preference.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {},
) {
  const { once = true, threshold = 0.2 } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(() => {
    if (typeof window === "undefined") return false;
    // Environs without IntersectionObserver (older browsers, test runners)
    // fall back to the settled, visible state.
    if (!("IntersectionObserver" in window)) return true;
    return (
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    );
  });

  useEffect(() => {
    if (inView) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, once, threshold]);

  return { ref, inView };
}
