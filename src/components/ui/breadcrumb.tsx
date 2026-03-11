import Link from "next/link";

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-screen-xl px-6 pt-5 lg:px-10">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-neutral-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden="true" className="text-neutral-300">›</span>}
              {isLast ? (
                <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 font-medium text-neutral-700">{item.name}</span>
              ) : (
                <Link href={item.path} className="rounded-full px-2.5 py-0.5 transition hover:bg-neutral-100 hover:text-neutral-700">
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
