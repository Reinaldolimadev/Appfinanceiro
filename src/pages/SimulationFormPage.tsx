import { SimulationForm } from "../components/features/Form";
import { SimulationHero } from "../components/features/Hero";



export function SimulationFormPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-10 sm:py-14">
      <SimulationHero/>
      <SimulationForm/>
      
    </main>
  )
}
