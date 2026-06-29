import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface McPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "stone" | "dirt" | "wood" | "dark";
}

export function McPanel({ className, variant = "stone", children, ...props }: McPanelProps) {
  return (
    <div
      className={cn(
        "mc-border p-6",
        variant === "stone" && "texture-stone",
        variant === "dirt" && "texture-dirt text-white",
        variant === "wood" && "texture-wood text-white",
        variant === "dark" && "bg-card text-card-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
