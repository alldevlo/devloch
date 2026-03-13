import { ServicesSurfaceCard } from "@/components/services/services-ui";

type ProcessStepProps = {
  number: string;
  title: string;
  description: string;
};

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <ServicesSurfaceCard className="relative h-full p-6 md:p-7">
      <div className="text-4xl font-black tracking-tight text-devlo-100 md:text-5xl">{number}</div>
      <h3 className="mt-4 text-xl font-bold text-devlo-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-neutral-600 md:text-base">{description}</p>
    </ServicesSurfaceCard>
  );
}
