import { cn } from "@/lib/utils";

export interface InputProps extends React.TextInputAttributes {
  placeholder?: string;
}

export function Input({ 
  className, 
  placeholder = "", 
  ...props 
}: InputProps) {
  return (
    <input
      className={cn(
        "bg-neutral-900/50 border border-border/40 rounded-md px-3 py-2 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/80",
        className
      )}
      placeholder={placeholder}
      {...props}
    />
  );
}

Input.displayName = "Input";