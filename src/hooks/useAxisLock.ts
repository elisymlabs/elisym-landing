import { useRef, useEffect, type RefObject } from "react";

/**
 * Locks touch-scrolling to a single axis on a bi-directional scrollable element.
 * Once the dominant direction is determined (first significant move),
 * the opposite axis overflow is temporarily disabled until touch ends.
 */
export function useAxisLock<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let locked: "x" | "y" | null = null;

    const THRESHOLD = 5; // px before axis is decided

    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      locked = null;
    }

    function onTouchMove(e: TouchEvent) {
      if (locked || !e.touches[0]) return;

      const dx = Math.abs(e.touches[0].clientX - startX);
      const dy = Math.abs(e.touches[0].clientY - startY);

      if (dx < THRESHOLD && dy < THRESHOLD) return;

      if (dx > dy) {
        locked = "x";
        el!.style.overflowY = "hidden";
      } else {
        locked = "y";
        el!.style.overflowX = "hidden";
      }
    }

    function onTouchEnd() {
      locked = null;
      el!.style.overflowX = "";
      el!.style.overflowY = "";
    }

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return ref;
}