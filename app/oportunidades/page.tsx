// app/oportunidades/page.tsx
"use client"

import Link from "next/link"
import { AppNav } from "@/components/AppNav"
import { useOpportunities } from "@/lib/clientStore"
import type { OpportunityStage } from "@/lib/types"

const STAGES: OpportunityStage[] = [
  "Prospecto",
  "En negociación",
  "Cerrada ganada",
  "Cerrada perdida",
]

export default function OpportunitiesPage() {
  const {
    opportunities,
    updateOpportunityStage,
    clients,
    getActivitiesByOpportunity,
  } = useOpportunities()

  const getClientName = (clientId: string) => {
    const c = clients.find((cl) => cl.id === clientId)
    return c ? c.name : "Cliente no encontrado"
  }

  const getNextActionDate = (opportunityId: string) => {
    const activities = getActivitiesByOpportunity(opportunityId)
    if (!activities.length) return "Sin definir"

    const pending = activities
      .filter((a) => !a.done && a.date)
      .sort((a, b) => a.date.localeCompare(b.date))

    if (!pending.length) return "Sin pendientes"
    return new Date(pending[0].date).toLocaleDateString("es-CO")
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <AppNav />

      <div className="py-10 px-4 flex flex-col items-center">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Oportunidades comerciales</h1>
            <div className="flex gap-3">
              <Link
                href="/oportunidades/nueva"
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
              >
                + Nueva oportunidad
              </Link>
            </div>
          </div>

          {opportunities.length === 0 ? (
            <p className="text-slate-600 text-sm">
              Aún no hay oportunidades registradas. Crea la primera con el botón
              “Nueva oportunidad”.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-left">
                    <th className="px-3 py-2 border-b">Cliente</th>
                    <th className="px-3 py-2 border-b">Oportunidad</th>
                    <th className="px-3 py-2 border-b">Monto (COP)</th>
                    <th className="px-3 py-2 border-b">Prob. (%)</th>
                    <th className="px-3 py-2 border-b">Estado</th>
                    <th className="px-3 py-2 border-b">Próx. acción</th>
                    <th className="px-3 py-2 border-b">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunities.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50">
                      <td className="px-3 py-2 border-b">
                        {getClientName(o.clientId)}
                      </td>
                      <td className="px-3 py-2 border-b">{o.title}</td>
                      <td className="px-3 py-2 border-b">
                        {o.amount.toLocaleString("es-CO")}
                      </td>
                      <td className="px-3 py-2 border-b">{o.probability}</td>
                      <td className="px-3 py-2 border-b">
                        <select
                          value={o.stage}
                          onChange={(e) =>
                            updateOpportunityStage(
                              o.id,
                              e.target.value as OpportunityStage,
                            )
                          }
                          className="border rounded-lg px-2 py-1 text-xs"
                        >
                          {STAGES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2 border-b">
                        {getNextActionDate(o.id)}
                      </td>
                      <td className="px-3 py-2 border-b">
                        <div className="flex flex-col gap-1">
                          <Link
                            href={`/oportunidades/${o.id}/editar`} // o la ruta que uses para editar
                            className="text-xs text-slate-700 hover:underline"
                          >
                            Editar
                          </Link>
                          <Link
                            href={`/oportunidades/${o.id}/seguimiento`}
                            className="text-xs text-indigo-600 hover:underline"
                          >
                            Seguimiento
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
