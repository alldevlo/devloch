import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

function getVariantClasses(variant: ButtonVariant) {
  if (variant === "secondary") {
    return "border-2 border-neutral-200 bg-white text-neutral-900 hover:border-devlo-700 hover:text-devlo-700";
  }

  if (variant === "outline") {
    return "border border-accent-red bg-transparent text-accent-red hover:bg-accent-red/10";
  }

  return "bg-devlo-800 text-white hover:bg-devlo-900 shadow-soft hover:shadow-panel";
}

export function buttonClassName(variant: ButtonVariant = "primary", className = "") {
  return [
    "inline-flex min-h-[44px] items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devlo-600 focus-visible:ring-offset-2",
    getVariantClasses(variant),
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonClassName(variant, className)}>
      {children}
    </button>
  );
}
