import { useState } from "react";

import { type ChatMessage } from "../components/data/Simulation";

import { useSimulationStorage } from "./useSimulationStorage";

import { askFinancialAI } from "../components/services/chatSrvices";

export function useFinancialChat(simulationId: string) {
  const { getFormData, updateSimulation } = useSimulationStorage();

  const simulation = getFormData(simulationId);

  const [messages, setMessages] = useState<ChatMessage[]>(
    simulation?.chat ?? [],
  );

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function sendMessage(question: string) {
    if (!simulation) {
      setError("Simulação não encontrada.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userMessage: ChatMessage = {
        role: "user",
        content: question,
        createdAt: new Date().toISOString(),
      };

      const prompt = `
Você é um educador financeiro.

Analise esta simulação:

Renda mensal:
R$ ${simulation.income}

Gastos:
R$ ${simulation.expenses}

Dívidas:
R$ ${simulation.debts}

Objetivo:
${simulation.goalName}

Valor da meta:
R$ ${simulation.goalAmount}

Prazo:
${simulation.goalDeadline} meses


Pergunta do usuário:
${question}

Responda de forma clara e prática.
`;

      const answer = await askFinancialAI(prompt);

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: answer,
        createdAt: new Date().toISOString(),
      };

      const updatedMessages = [...messages, userMessage, assistantMessage];

      setMessages(updatedMessages);

      updateSimulation(simulationId, {
        ...simulation,
        chat: updatedMessages,
      });
    } catch (error) {
      console.error(error);

      setError("Erro ao conversar com o educador financeiro.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    messages,
    sendMessage,
    isLoading,
    error,
  };
}
