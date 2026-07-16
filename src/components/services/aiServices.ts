interface GroqResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export interface InsightData {
  feasibility: {
    status: "viable" | "needs_adjustment" | "unfeasible";
    content: string;
  };
  diagnosis: {
    content: string;
  };
  suggestions: {
    items: string[];
  };
  extraIncome: {
    items: string[];
  };
  investment: {
    items: string[];
  };
  motivation: {
    content: string;
  };
}

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const callGroqAPI = async (prompt: string): Promise<GroqResponse> => {
  console.log("🚀 Enviando requisição para Groq...");

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  console.log("Resposta Groq:", data);

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
};

export const getInsight = async (prompt: string): Promise<InsightData> => {
  const response = await callGroqAPI(prompt);

  const text = response.choices[0].message.content;

  console.log("Texto recebido:");
  console.log(text);

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned) as InsightData;
};
