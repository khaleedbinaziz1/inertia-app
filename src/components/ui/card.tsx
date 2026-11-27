import { cn } from "@/lib/utils";

export interface CardProps {
  className?: string;
}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-background border border-border/40 rounded-xl shadow-sm",
        className
      )}
      {...props}
    />
  );
}

Card.displayName = "Card";