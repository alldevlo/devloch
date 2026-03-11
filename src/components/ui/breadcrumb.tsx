import Link from "next/link";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
};

export function Breadcrumb({ items, variant = "light" }: BreadcrumbProps) {
  const isDark = variant === "dark";

  return (
    <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-screen-xl px-6 pt-5 lg:px-10">
      <ol className={`flex flex-wrap items-center gap-1.5 text-[13px] ${isDark ? "text-white/50" : "text-neutral-500"}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden="true" className={isDark ? "text-white/30" : "text-neutral-300"}>›</span>}
              {isLast ? (
                <span className={`rounded-full px-2.5 py-0.5 font-medium ${isDark ? "bg-white/10 text-white/80" : "bg-neutral-100 text-neutral-700"}`}>
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className={`rounded-full px-2.5 py-0.5 transition ${isDark ? "hover:bg-white/10 hover:text-white/80" : "hover:bg-neutral-100 hover:text-neutral-700"}`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
