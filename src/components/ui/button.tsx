import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
}

export function Button({ 
  className, 
  variant = "default", 
  size = "default", 
  children, 
  ...props 
}: ButtonProps) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-border/40 text-neutral-400 hover:bg-neutral-900/50",
    secondary: "bg-neutral-950 text-neutral-100 hover:bg-neutral-900/80",
  };

  const sizes = {
    default: "py-3 px-6 text-sm",
    sm: "py-2 px-4 text-sm",
    lg: "py-4 px-8 text-base",
  };

  return (
    <button
      className={cn(
        `rounded-md ${variants[variant]} ${sizes[size]}`,
        variant === "default" && "hover:bg-primary/80",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

Button.displayName = "Button";