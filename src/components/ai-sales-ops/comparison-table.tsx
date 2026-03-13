type ComparisonRow = {
  criterion: string;
  withoutDevlo: string;
  withDevlo: string;
};

type ComparisonTableProps = {
  rows: readonly ComparisonRow[];
};

export function ComparisonTable({ rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-neutral-200 bg-white shadow-soft">
      <table itemScope itemType="https://schema.org/Table" className="min-w-full border-separate border-spacing-0 text-left">
        <caption className="sr-only">Comparatif entre le statu quo commercial et AI Sales Ops par devlo</caption>
        <thead>
          <tr className="bg-devlo-900 text-white">
            <th scope="col" className="rounded-tl-3xl px-5 py-4 text-sm font-semibold">Critère</th>
            <th scope="col" className="px-5 py-4 text-sm font-semibold text-white/80">Sans AI Sales Ops</th>
            <th scope="col" className="rounded-tr-3xl px-5 py-4 text-sm font-semibold">Avec AI Sales Ops, devlo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.criterion} className={index % 2 === 0 ? "bg-white" : "bg-devlo-50/60"}>
              <th scope="row" className="border-t border-neutral-200 px-5 py-4 text-sm font-semibold text-devlo-900 md:text-base">
                {row.criterion}
              </th>
              <td className="border-t border-neutral-200 px-5 py-4 text-sm leading-7 text-neutral-600 md:text-base">
                {row.withoutDevlo}
              </td>
              <td className="border-t border-neutral-200 px-5 py-4 text-sm font-medium leading-7 text-devlo-900 md:text-base">
                {row.withDevlo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
