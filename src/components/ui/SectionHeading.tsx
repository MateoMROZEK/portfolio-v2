import { cn } from "@heroui/react";

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3";
};

export function SectionHeading({ children, className, as: Tag = "h2" }: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        "border-l-[6px] border-gold py-0.5 pl-3.5 text-[13px] font-bold tracking-[0.14em] text-navy-950 uppercase",
        className
      )}
    >
      {children}
    </Tag>
  );
}
