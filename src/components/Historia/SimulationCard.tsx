import type { SimulationRecord } from "../data/Simulation";

interface SimulationCardProps {
  simulation: SimulationRecord;
  onDelete: (id: string) => void;
  onDetails: (id: string) => void;
}

export function SimulationCard({
  simulation,
  onDelete,
  onDetails,
}: SimulationCardProps) {
  return (
    <div className="rounded-xl border p-5">
      <h2 className="text-lg font-semibold">{simulation.goalName}</h2>

      <div className="mt-3 space-y-1 text-sm">
        <p>💰 Renda: R$ {simulation.income}</p>

        <p>💳 Gastos: R$ {simulation.expenses}</p>

        <p>🎯 Meta: R$ {simulation.goalAmount}</p>

        <p>⏳ Prazo: {simulation.goalDeadline} meses</p>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          onClick={() => onDetails(simulation.id)}
          className="rounded-lg bg-primary px-4 py-2"
        >
          Ver detalhes
        </button>

        <button
          onClick={() => onDelete(simulation.id)}
          className="rounded-lg bg-red-500 px-4 py-2 text-white"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
