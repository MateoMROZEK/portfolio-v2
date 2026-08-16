import { cn } from "@heroui/react";

type SkillChipProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

export function SkillChip({ children, icon, className }: SkillChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-gold px-3.5 py-1.5 text-[13px] font-medium text-navy-900 whitespace-nowrap",
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
