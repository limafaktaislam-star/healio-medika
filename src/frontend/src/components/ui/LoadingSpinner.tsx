import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  label,
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-[3px]",
    lg: "w-14 h-14 border-4",
  };

  return (
    <div
      className={cn("flex flex-col items-center gap-3", className)}
      data-ocid="loading_state"
    >
      <div
        className={cn(
          "rounded-full border-primary/20 border-t-primary animate-spin",
          sizeClasses[size],
        )}
        role="status"
        aria-label={label ?? "Memuat"}
      />
      {label && (
        <span className="text-muted-foreground text-sm font-medium animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
}
