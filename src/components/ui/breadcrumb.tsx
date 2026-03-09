import Link from "next/link";

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-screen-xl px-6 pt-4 lg:px-10">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-neutral-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span className="font-medium text-neutral-700">{item.name}</span>
              ) : (
                <Link href={item.path} className="hover:text-neutral-700 hover:underline">
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
