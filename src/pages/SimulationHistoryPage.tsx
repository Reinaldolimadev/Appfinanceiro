import { useNavigate } from "react-router-dom";

import { useSimulationStorage } from "../hooks/useSimulationStorage";

import { SimulationCard } from "../components/Historia/SimulationCard";

export function SimulationHistoryPage() {
  const navigate = useNavigate();

  const { getAllSimulations, deleteSimulation } = useSimulationStorage();

  const simulations = getAllSimulations();

  return (
    <main className="space-y-5">
      <h1 className="text-3xl font-bold">Histórico de Simulações</h1>

      {simulations.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma simulação encontrada.</p>
      ) : (
        simulations.map((simulation) => (
          <SimulationCard
            key={simulation.id}
            simulation={simulation}
            onDetails={(id) => navigate(`/resultado/${id}`)}
            onDelete={(id) => {
              deleteSimulation(id);
              window.location.reload();
            }}
          />
        ))
      )}
    </main>
  );
}
