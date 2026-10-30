import { Fragment } from "react";

// Renders text where *words in asterisks* become italic serif keywords
// and **words in double asterisks** become bold highlights.
// Example: "Work *experience*." or "Cut cold-start time by **45%**."
export const Rich = ({ text }: { text: string }) => {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-cream">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return (
            <span key={i} className="kw">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
};

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  className?: string;
};

// Small numbered label above a big heading, e.g. "01 — About" / "I run *AI* end to end."
export const SectionHeading = ({ index, label, title, className }: SectionHeadingProps) => (
  <div className={className}>
    <p className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted sm:text-xs">
      <span className="text-accent">{index}</span>
      <span className="h-px w-8 bg-white/20" />
      {label}
    </p>
    <h2 className="mt-5 text-[38px] font-semibold leading-[1.02] tracking-[-0.03em] text-cream sm:text-[52px] md:text-[64px]">
      <Rich text={title} />
    </h2>
  </div>
);

export default Rich;
