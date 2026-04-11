import { useReveal } from "~/hooks/useReveal";

export function RevealSection({
  children,
  className = "",
  staggerChildren = false,
}: {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: boolean;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`${staggerChildren ? "reveal-children" : "reveal"} ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
