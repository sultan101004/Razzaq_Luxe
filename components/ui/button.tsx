import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-brand-paper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-main focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-h-[44px] min-w-[44px] px-4 py-2",
  {
    variants: {
      variant: {
        default:
          "bg-gold-main text-black hover:bg-gold-light hover:text-black shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-gold-main bg-transparent text-gold-main hover:bg-gold-main/10",
        secondary:
          "bg-muted text-muted-foreground hover:bg-brand-black/[0.06]",
        ghost: "hover:bg-gold-main/10 hover:text-brand-black",
        link: "text-gold-main underline-offset-4 hover:underline",
        /** Hero / editorial: pill CTAs on dark imagery */
        heroSolid:
          "rounded-full border border-gold-main/30 bg-gold-main text-black hover:bg-gold-light h-auto min-h-[48px] px-8 py-5 text-[10px] font-semibold uppercase tracking-[0.22em] shadow-lg shadow-black/30",
        heroGhost:
          "rounded-full border border-off-white/35 bg-off-white/[0.06] text-off-white backdrop-blur-sm hover:bg-off-white/12 h-auto min-h-[48px] px-8 py-5 text-[10px] font-semibold uppercase tracking-[0.22em]",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-xs min-h-[40px]",
        lg: "h-12 rounded-md px-8 text-base min-h-[48px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
