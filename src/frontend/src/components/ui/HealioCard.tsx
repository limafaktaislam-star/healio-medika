import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className, onClick, hoverable }: CardProps) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "bg-card border border-border rounded-xl p-5 shadow-xs text-left w-full",
          hoverable &&
            "cursor-pointer transition-smooth hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5",
          "cursor-pointer",
          className,
        )}
      >
        {children}
      </button>
    );
  }
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-5 shadow-xs",
        hoverable &&
          "cursor-pointer transition-smooth hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return (
    <h3
      className={cn(
        "font-display text-lg font-semibold text-foreground",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm text-muted-foreground mt-1", className)}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return <div className={cn(className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mt-4 pt-4 border-t border-border", className)}>
      {children}
    </div>
  );
}
