import { useEffect, useRef, useState } from "react";

// Using rootMargin (not threshold) so reveal fires reliably for sections
// taller than the viewport — e.g. Roadmap on narrow phones, where the
// element is tall enough that a 0.1 intersection ratio can never be
// reached. A negative bottom rootMargin triggers the reveal once the
// element's top has scrolled ~80px into the viewport.
const REVEAL_ROOT_MARGIN = "0px 0px -80px 0px";

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: REVEAL_ROOT_MARGIN }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
