import type { ReactNode } from "react";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  background?: "white" | "light" | "dark";
  id?: string;
};

export function SectionWrapper({ children, className, background = "white", id }: SectionWrapperProps) {
  const bgClass = {
    white: "bg-white",
    light: "bg-devlo-50",
    dark: "bg-devlo-900 text-white",
  }[background];

  return (
    <section id={id} className={`${bgClass} py-16 md:py-24 lg:py-28 ${className ?? ""}`}>
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16">{children}</div>
    </section>
  );
}
