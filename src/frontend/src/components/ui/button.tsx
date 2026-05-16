import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        primary:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-2 border-primary text-primary bg-transparent shadow-xs hover:bg-primary/10",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "text-primary bg-transparent hover:bg-primary/10",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-lg font-bold tracking-wide",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 min-h-[36px] has-[>svg]:px-2.5",
        md: "px-5 py-2.5 text-base rounded-lg gap-2 min-h-[44px]",
        lg: "rounded-xl px-7 py-3.5 text-lg gap-2.5 min-h-[52px] has-[>svg]:px-5",
        xl: "px-8 py-4 text-xl rounded-xl gap-3 min-h-[60px] w-full",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      disabled={disabled || isLoading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isLoading ? (
        <span
          className="inline-block size-4 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0"
          aria-hidden
        />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </Comp>
  );
}

export { Button, buttonVariants };
