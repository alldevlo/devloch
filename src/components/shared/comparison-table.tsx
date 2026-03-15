type ComparisonRow = {
  criterion: string;
  colA: string;
  colB: string;
};

type ComparisonTableProps = {
  caption: string;
  headers: string[];
  rows: ComparisonRow[];
};

export function ComparisonTable({ caption, headers, rows }: ComparisonTableProps) {
  if (rows.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-soft">
      <table itemScope itemType="https://schema.org/Table" className="min-w-full border-separate border-spacing-0 text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-devlo-900 text-white">
            <th scope="col" className="rounded-tl-2xl px-5 py-4 text-sm font-semibold">{headers[0]}</th>
            <th scope="col" className="px-5 py-4 text-sm font-semibold text-white/80">{headers[1]}</th>
            <th scope="col" className="rounded-tr-2xl px-5 py-4 text-sm font-semibold">{headers[2]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.criterion} className={index % 2 === 0 ? "bg-white" : "bg-devlo-50/60"}>
              <th scope="row" className="border-t border-neutral-200 px-5 py-3 text-sm font-semibold text-devlo-900">
                {row.criterion}
              </th>
              <td className="border-t border-neutral-200 px-5 py-3 text-sm leading-7 text-neutral-600">
                {row.colA}
              </td>
              <td className="border-t border-neutral-200 px-5 py-3 text-sm font-medium leading-7 text-devlo-900">
                {row.colB}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
