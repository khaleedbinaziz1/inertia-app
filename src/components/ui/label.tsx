export function Label({ className, htmlFor, children, ...rest }: {
  className?: string;
  htmlFor?: string;
  children?: React.ReactNode;
}) {
  return (
    <label className={className} htmlFor={htmlFor} {...rest}>
      {children}
    </label>
  );
}