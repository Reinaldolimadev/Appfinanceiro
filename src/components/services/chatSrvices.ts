const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function askFinancialAI(prompt: string): Promise<string> {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },

      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content:
              "Você é um educador financeiro inteligente. Responda de forma clara, prática e objetiva ajudando o usuário a tomar melhores decisões financeiras.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();

    console.error(error);

    throw new Error("Erro ao consultar a inteligência artificial.");
  }

  const data = await response.json();

  return data.choices[0].message.content;
}
