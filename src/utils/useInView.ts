import { type RefObject, useEffect, useState } from "react";

// True while the element is on screen (or within `margin` of it).
// With `once`, it stays true after the first time it's seen.
export function useInView(
  ref: RefObject<Element | null>,
  { margin = "0px", once = false }: { margin?: string; once?: boolean } = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, margin, once]);

  return inView;
}
