import { cn } from "@/lib/utils";

export interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AlertDialog({ open, onOpenChange }: AlertDialogProps) {
  return (
    <div className="fixed inset-0 z-50 hidden items-center justify-center">
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-background border border-border/40 rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-start justify-between gap-2">
              <AlertDialogTitle className="text-lg font-medium" />
              <button
                onClick={() => onOpenChange?.(false)}
                className="p-1 rounded-md hover:bg-neutral-900/20"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <AlertDialogDescription className="mt-2 text-sm text-neutral-400" />
            <div className="mt-4 flex gap-2">
              <AlertDialogAction className="flex-1">Cancel</AlertDialogAction>
              <AlertDialogAction className="flex-1 text-destructive">Delete</AlertDialogAction>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

AlertDialog.displayName = "AlertDialog";

export const AlertDialogTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLH2Element>) => {
  return <h2 className={className} {...props} />;
};

AlertDialogTitle.displayName = "AlertDialogTitle";

export const AlertDialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLPElement>) => {
  return <p className={className} {...props} />;
};

AlertDialogDescription.displayName = "AlertDialogDescription";

export const AlertDialogAction = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
  return <button className={className} {...props} />;
};

AlertDialogAction.displayName = "AlertDialogAction";

export const AlertDialogCancel = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
  return <button className={className} {...props} />;
};

AlertDialogCancel.displayName = "AlertDialogCancel";