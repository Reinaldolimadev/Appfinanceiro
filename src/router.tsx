import { PiggyBank } from 'lucide-react'
import { createBrowserRouter } from 'react-router-dom'

import { Button } from './components/shared/button'

export const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
   element: (
  <div>
    <h1>Formulário de Simulação</h1>

    <Button variant="primary" icon={PiggyBank}>
      Clique aqui
    </Button>
  </div>
),
      },
      {
        path: '/resultado/:id',
        element: <h1>Resultado da Simulação</h1>,
      },
      {
        path: '/historico',
        element: <h1>Histórico de Simulações</h1>,
      },
    ],
  },
])