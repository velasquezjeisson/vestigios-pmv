// app/oportunidades/[id]/seguimiento/page.tsx
"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useOpportunities } from "@/lib/clientStore"
import type { ActivityType, Opportunity, OpportunityActivity } from "@/lib/types"

const ACTIVITY_TYPES: ActivityType[] = [
  "Llamada",
  "Correo",
  "Reunión",
  "Nota interna",
]

export default function OpportunityFollowUpPage() {
  const { id } = useParams<{ id: string }>()
  const oppId = Array.isArray(id) ? id[0] : id

  const {
    opportunities,
    clients,
    addActivity,
    activities,
    updateActivity,
    getActivitiesByOpportunity,
  } = useOpportunities()

  const opportunity = opportunities.find(
    (o: Opportunity) => o.id === oppId,
  )

  const [form, setForm] = useState({
    type: "Llamada" as ActivityType,
    date: "",
    note: "",
  })

  if (!opportunity) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg px-8 py-6 text-center">
          <p className="mb-3 text-sm text-slate-700">
            No se encontró la oportunidad.
          </p>
          <Link
            href="/oportunidades"
            className="text-sm text-indigo-600 hover:underline"
          >
            Volver a oportunidades
          </Link>
        </div>
      </main>
    )
  }

  const client =
    clients.find((c) => c.id === opportunity.clientId)?.name ||
    "Cliente no encontrado"

  const activitiesForOpp: OpportunityActivity[] =
    getActivitiesByOpportunity(opportunity.id)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.note || !form.date) {
      alert("Debes definir fecha y una nota para la interacción.")
      return
    }

    // addOpportunityActivity(data) en el store
    addActivity({
      opportunityId: opportunity.id,
      type: form.type,
      date: form.date,
      note: form.note,
    })

    setForm({
      type: "Llamada",
      date: "",
      note: "",
    })
  }

  const toggleActivityDone = (activityId: string) => {
    const act = activities.find((a) => a.id === activityId)
    if (!act) return
    updateActivity(activityId, { done: !act.done })
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        {/* Cabecera */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                Seguimiento – {opportunity.title}
              </h1>
              <p className="text-sm text-slate-600">
                Cliente: <span className="font-semibold">{client}</span>
              </p>
              <p className="text-sm text-slate-600">
                Monto:{" "}
                <span className="font-semibold">
                  {opportunity.amount.toLocaleString("es-CO")} COP
                </span>{" "}
                • Probabilidad:{" "}
                <span className="font-semibold">
                  {opportunity.probability}%
                </span>
              </p>
            </div>
            <Link
              href="/oportunidades"
              className="text-sm text-slate-500 hover:underline"
            >
              ← Volver al listado
            </Link>
          </div>
        </div>

        {/* Formulario de nueva interacción / recordatorio */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">
            Nueva interacción / recordatorio
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex flex-col text-sm gap-1">
                Tipo
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 text-sm"
                >
                  {ACTIVITY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col text-sm gap-1">
                Fecha de acción
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 text-sm"
                />
              </label>
            </div>

            <label className="flex flex-col text-sm gap-1">
              Detalle / comentario
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm min-h-[80px]"
                placeholder="Ej. Llamar al cliente para resolver dudas sobre el alcance técnico…"
              />
            </label>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
              >
                Guardar interacción
              </button>
            </div>
          </form>
        </div>

        {/* Historial de interacciones */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">
            Historial de interacciones
          </h2>

          {activitiesForOpp.length === 0 ? (
            <p className="text-sm text-slate-600">
              Aún no hay interacciones registradas para esta oportunidad.
            </p>
          ) : (
            <div className="space-y-3">
              {activitiesForOpp
                .slice()
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((a) => (
                  <div
                    key={a.id}
                    className="border rounded-xl px-4 py-3 flex gap-3 items-start text-sm bg-slate-50"
                  >
                    <div className="pt-1">
                      <input
                        type="checkbox"
                        checked={a.done}
                        onChange={() => toggleActivityDone(a.id)}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-x-3 gap-y-1 items-center mb-1">
                        <span className="font-semibold">{a.type}</span>
                        <span className="text-xs text-slate-500">
                          Fecha acción:{" "}
                          {a.date
                            ? new Date(a.date).toLocaleDateString("es-CO")
                            : "-"}
                        </span>
                        <span className="text-xs text-slate-400">
                          Registrada:{" "}
                          {new Date(a.createdAt).toLocaleString("es-CO")}
                        </span>
                        {a.done && (
                          <span className="text-xs text-emerald-600 font-semibold">
                            COMPLETADA
                          </span>
                        )}
                      </div>
                      <p className="text-slate-700 whitespace-pre-wrap">
                        {a.note}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
