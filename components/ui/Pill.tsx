import { cn } from "@/lib/utils";

interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  dot?: "primary" | "secondary";
}

/** Rounded section label with a pulsing dot. */
export const Pill = ({ dot = "primary", children, className, ...props }: PillProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-full border border-white/14 px-3.5 py-2 text-[13px] text-[#C3C7CD]",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "size-1.5 rounded-full animate-pulse-dot",
          dot === "primary" ? "bg-primary" : "bg-secondary"
        )}
      />
      {children}
    </div>
  );
};
