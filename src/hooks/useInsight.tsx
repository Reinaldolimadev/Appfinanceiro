import { useCallback, useEffect, useRef, useState } from "react";

import { buildAIPrompt } from "../components/data/aiPrompt";
import type { SimulationRecord } from "../components/data/Simulation";
import { useSimulationStorage } from "../hooks/useSimulationStorage";
import {
  getInsight,
  type InsightData,
} from "../components/services/aiServices";

export const useInsight = (id: string) => {
  const isRequestPending = useRef(false);

  const { getFormData, updateSimulation } = useSimulationStorage();

  const [insight, setInsight] = useState<InsightData | null>(() => {
    const simulation = getFormData(id);

    if (simulation?.insight) {
      return simulation.insight;
    }

    return null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = useCallback(
    async (simulationId: string) => {
      console.log("fetchInsight foi chamado");

      const simulation = getFormData(simulationId);

      if (!simulation) {
        setError("Simulação não encontrada.");
        return;
      }

      isRequestPending.current = true;
      setIsLoading(true);
      setError(null);

      try {
        const prompt = buildAIPrompt(simulation);

        const data = await getInsight(prompt);

        setInsight(data);

        updateSimulation(simulationId, {
          ...simulation,
          insight: data,
        } as SimulationRecord);
      } catch (err) {
        console.error("Erro ao chamar Gemini:", err);
        setError("Erro ao gerar o diagnóstico. Tente novamente.");
      } finally {
        isRequestPending.current = false;
        setIsLoading(false);
      }
    },
    [getFormData, updateSimulation],
  );

  useEffect(() => {
    console.log("useEffect executou", {
      insight,
      isLoading,
      error,
      pending: isRequestPending.current,
    });

    if (insight || isLoading || error || isRequestPending.current) {
      console.log("Saiu do useEffect");
      return;
    }

    console.log("Chamando fetchInsight...");
    fetchInsight(id);
  }, [id, insight, isLoading, error, fetchInsight]);

  return {
    insight,
    isLoading,
    error,
    fetchInsight,
  };
};
