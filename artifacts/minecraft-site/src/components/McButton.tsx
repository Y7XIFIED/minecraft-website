import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface McButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: "stone" | "wood" | "dirt" | "primary";
}

export function McButton({ className, variant = "stone", children, ...props }: McButtonProps) {
  return (
    <button
      className={cn(
        "mc-button px-6 py-4 font-sans text-sm md:text-base uppercase tracking-widest outline-none focus:ring-4 focus:ring-primary/50",
        variant === "wood" && "texture-wood !bg-[#C19A6B]",
        variant === "dirt" && "texture-dirt !bg-[#8B4513]",
        variant === "primary" && "!bg-primary",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
