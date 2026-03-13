import { ServicesSurfaceCard } from "@/components/services/services-ui";

type PersonaCardProps = {
  icon: string;
  title: string;
  profile: string;
  pain: string;
  systems: readonly string[];
  result: string;
};

export function PersonaCard({ icon, title, profile, pain, systems, result }: PersonaCardProps) {
  return (
    <ServicesSurfaceCard className="h-full p-6 md:p-7">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-devlo-100 text-2xl">
        <span aria-hidden="true">{icon}</span>
      </div>
      <h3 className="mt-5 text-2xl font-bold leading-tight text-devlo-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-neutral-600 md:text-base">{profile}</p>

      <div className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-500">Problème principal</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-devlo-900">{pain}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {systems.map((system) => (
          <span
            key={`${title}-${system}`}
            className="inline-flex rounded-full border border-devlo-200 bg-devlo-50 px-3 py-1.5 text-xs font-semibold text-devlo-700"
          >
            {system}
          </span>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-devlo-900 p-4 text-white">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70">Résultat attendu</p>
        <p className="mt-2 text-sm font-semibold leading-6 md:text-base">{result}</p>
      </div>
    </ServicesSurfaceCard>
  );
}
