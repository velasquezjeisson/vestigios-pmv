// app/oportunidades/[id]/seguimiento/page.tsx
"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useOpportunities } from "@/lib/clientStore"
import type {
  ActivityType,
  ActivityOutcome,
  Opportunity,
  OpportunityActivity,
} from "@/lib/types"

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
    completeActivity,
    getActivitiesByOpportunity,
  } = useOpportunities()

  const opportunity = opportunities.find(
    (o: Opportunity) => o.id === oppId,
  )

  // formulario de nueva interacción / recordatorio
  const [form, setForm] = useState({
    type: "Llamada" as ActivityType,
    actionDate: "",
    detail: "",
  })

  // estado para completar una actividad (resultado)
  const [activityToComplete, setActivityToComplete] =
    useState<OpportunityActivity | null>(null)

  const [completionForm, setCompletionForm] = useState({
    outcome: "contactado" as ActivityOutcome,
    outcomeNote: "",
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
    if (!form.detail || !form.actionDate) {
      alert("Debes definir fecha y un detalle para la interacción.")
      return
    }

    // nueva actividad pendiente
    addActivity(opportunity.id, {
      type: form.type,
      actionDate: form.actionDate,
      detail: form.detail,
    })

    setForm({
      type: "Llamada",
      actionDate: "",
      detail: "",
    })
  }

  const handleOpenComplete = (activity: OpportunityActivity) => {
    setActivityToComplete(activity)
    setCompletionForm({
      outcome: "contactado",
      outcomeNote: "",
    })
  }

  const handleConfirmComplete = () => {
    if (!activityToComplete) return
    completeActivity(activityToComplete.id, {
      outcome: completionForm.outcome,
      outcomeNote: completionForm.outcomeNote,
    })
    setActivityToComplete(null)
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
                  name="actionDate"
                  value={form.actionDate}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 text-sm"
                />
              </label>
            </div>

            <label className="flex flex-col text-sm gap-1">
              Detalle / comentario
              <textarea
                name="detail"
                value={form.detail}
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
                .sort((a, b) =>
                  (b.actionDate || "").localeCompare(a.actionDate || ""),
                )
                .map((a) => (
                  <div
                    key={a.id}
                    className="border rounded-xl px-4 py-3 flex gap-3 items-start text-sm bg-slate-50"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-x-3 gap-y-1 items-center mb-1">
                        <span className="font-semibold">{a.type}</span>
                        <span className="text-xs text-slate-500">
                          Fecha acción:{" "}
                          {a.actionDate
                            ? new Date(a.actionDate).toLocaleDateString("es-CO")
                            : "-"}
                        </span>
                        <span className="text-xs text-slate-400">
                          Registrada:{" "}
                          {new Date(a.createdAt).toLocaleString("es-CO")}
                        </span>
                        <span
                          className={`text-xs font-semibold ${
                            a.status === "completada"
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }`}
                        >
                          {a.status === "completada"
                            ? "COMPLETADA"
                            : "PENDIENTE"}
                        </span>
                      </div>

                      <p className="text-slate-700 whitespace-pre-wrap">
                        <span className="font-semibold">Detalle: </span>
                        {a.detail}
                      </p>

                      {a.status === "completada" && (
                        <div className="mt-1 text-slate-700 whitespace-pre-wrap">
                          {a.outcome && (
                            <p className="text-xs">
                              <span className="font-semibold">
                                Resultado:{" "}
                              </span>
                              {a.outcome}
                            </p>
                          )}
                          {a.outcomeNote && (
                            <p className="text-xs mt-0.5">
                              <span className="font-semibold">Nota: </span>
                              {a.outcomeNote}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {a.status === "pendiente" && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => handleOpenComplete(a)}
                          className="text-xs px-3 py-1 rounded-full border text-indigo-600 hover:bg-indigo-50"
                        >
                          Marcar como completada
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal simple para completar actividad */}
      {activityToComplete && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">
              Completar {activityToComplete.type}
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              {activityToComplete.detail}
            </p>

            <label className="block text-sm font-medium mb-1">
              Resultado
            </label>
            <select
              className="w-full mb-3 rounded-lg border px-3 py-2 text-sm"
              value={completionForm.outcome}
              onChange={(e) =>
                setCompletionForm((prev) => ({
                  ...prev,
                  outcome: e.target.value as ActivityOutcome,
                }))
              }
            >
              <option value="contactado">Contactado</option>
              <option value="no_contesta">No contesta</option>
              <option value="reprogramada">Reprogramada</option>
              <option value="solicita_cotizacion">Solicita cotización</option>
              <option value="envia_informacion">Se envía información</option>
              <option value="rechaza">Rechaza propuesta</option>
              <option value="otro">Otro</option>
            </select>

            <label className="block text-sm font-medium mb-1">
              Nota / comentario del resultado
            </label>
            <textarea
              className="w-full rounded-lg border px-3 py-2 text-sm mb-4"
              rows={3}
              placeholder="Ej. Cliente pide revisar el alcance y enviar nueva propuesta…"
              value={completionForm.outcomeNote}
              onChange={(e) =>
                setCompletionForm((prev) => ({
                  ...prev,
                  outcomeNote: e.target.value,
                }))
              }
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="text-sm px-3 py-2 rounded-lg border"
                onClick={() => setActivityToComplete(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white"
                onClick={handleConfirmComplete}
              >
                Guardar resultado
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
