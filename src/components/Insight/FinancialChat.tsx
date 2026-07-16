import { useState, useRef, useEffect } from 'react'

import { useFinancialChat } from '../../hooks/useFinancialChat'


interface FinancialChatProps {
  simulationId: string
}


export function FinancialChat({
  simulationId,
}: FinancialChatProps) {

  const {
    messages,
    sendMessage,
    isLoading,
    error,
  } = useFinancialChat(simulationId)


  const [question, setQuestion] = useState('')


  const messagesEndRef = useRef<HTMLDivElement>(null)


  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })

  }, [messages])


  async function handleSubmit(
    event: React.FormEvent,
  ) {

    event.preventDefault()


    if (!question.trim()) {
      return
    }


    await sendMessage(question)

    setQuestion('')
  }


  return (
    <div className="mt-8 rounded-xl border p-4">

      <div className="mb-4">

        <h2 className="text-lg font-semibold">
          🤖 Conversando com o Educador Financeiro
        </h2>

        <p className="text-muted-foreground text-sm">
          Tire dúvidas sobre essa simulação.
        </p>

      </div>


      <div className="mb-4 max-h-80 space-y-3 overflow-y-auto">

        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Faça uma pergunta para começar.
          </p>
        )}


        {messages.map((message, index) => (

          <div
            key={index}
            className={
              message.role === 'user'
                ? 'ml-auto max-w-[80%] rounded-lg bg-primary p-3 text-white'
                : 'mr-auto max-w-[80%] rounded-lg bg-muted p-3'
            }
          >

            <p className="text-xs font-semibold mb-1">
              {
                message.role === 'user'
                  ? 'Você'
                  : 'Educador Financeiro'
              }
            </p>


            <p>
              {message.content}
            </p>

          </div>

        ))}


        {isLoading && (
          <p className="text-sm">
            🤔 Pensando...
          </p>
        )}


        <div ref={messagesEndRef} />

      </div>


      {error && (
        <p className="mb-3 text-sm text-red-500">
          {error}
        </p>
      )}


      <form
        onSubmit={handleSubmit}
        className="flex gap-2"
      >

        <input
          value={question}
          onChange={(event) =>
            setQuestion(event.target.value)
          }
          placeholder="Digite sua pergunta..."
          className="flex-1 rounded-lg border px-3 py-2"
        />


        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-50"
        >
          Enviar
        </button>

      </form>

    </div>
  )
}