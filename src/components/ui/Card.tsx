import { cn } from "@heroui/react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  hoverable?: boolean;
};

export function Card({ children, className, hoverable = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-white p-6 shadow-[0_1px_3px_rgba(16,28,48,0.06)] transition-all duration-300",
        hoverable && "hover:-translate-y-0.5 hover:border-gold-soft hover:shadow-[0_12px_24px_rgba(16,28,48,0.08)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
