// app/oportunidades/[id]/editar/page.tsx
"use client"

import { useEffect, useState, FormEvent } from "react"
import { useRouter, useParams } from "next/navigation"
import { AppNav } from "@/components/AppNav"
import { useOpportunities } from "@/lib/clientStore"
import type { OpportunityStage } from "@/lib/types"

const STAGES: OpportunityStage[] = [
  "Prospecto",
  "En negociación",
  "Cerrada ganada",
  "Cerrada perdida",
]

const SERVICES = [
  "Consultorías y Servicios Ambientales",
  "Consultorías y Servicios Arqueológicos",
  "Gestión Social y Territorial",
  "Consultorías SST",
  "Gestión Rápida de Permisos y Certificaciones",
]

export default function EditOpportunityPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const { opportunities, updateOpportunity, clients } = useOpportunities()

  const opportunity = opportunities.find((o) => o.id === id)

  const [form, setForm] = useState({
    title: "",
    amount: "",
    probability: "50",
    stage: "Prospecto" as OpportunityStage,
    notes: "",
    service: "",
  })

  useEffect(() => {
    if (opportunity) {
      setForm({
        title: opportunity.title,
        amount: String(opportunity.amount),
        probability: String(opportunity.probability ?? 50),
        stage: opportunity.stage,
        notes: opportunity.notes || "",
        service: opportunity.service || "",
      })
    }
  }, [opportunity])

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

    if (!opportunity) return

    updateOpportunity(opportunity.id, {
      title: form.title,
      amount: Number(form.amount) || 0,
      probability: Number(form.probability) || 0,
      stage: form.stage,
      notes: form.notes,
      service: form.service,
    })

    router.push("/oportunidades")
  }

  if (!id) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-sm text-slate-700">
          Cargando oportunidad...
        </div>
      </main>
    )
  }

  if (!opportunity && opportunities.length > 0) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center space-y-3">
          <p className="text-sm text-slate-700">
            No se encontró la oportunidad solicitada.
          </p>
          <button
            onClick={() => router.push("/oportunidades")}
            className="text-sm text-indigo-600 hover:underline"
          >
            Volver a oportunidades
          </button>
        </div>
      </main>
    )
  }

  if (!opportunity && opportunities.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-sm text-slate-700">
          Cargando datos...
        </div>
      </main>
    )
  }

  const client =
    clients.find((c) => c.id === opportunity!.clientId)?.name ||
    "Cliente no encontrado"

  return (
    <main className="min-h-screen bg-slate-50">
      <AppNav />

      <div className="py-10 px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-4">
          <h1 className="text-2xl font-bold mb-2">
            Editar oportunidad comercial
          </h1>

          {/* Resumen del cliente */}
          <div className="bg-slate-100 border rounded-xl px-4 py-3 text-sm mb-2">
            <p>
              <strong>Cliente:</strong> {client}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="flex flex-col text-sm gap-1">
              Nombre de la oportunidad / ventana *
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
                placeholder="Ej. Estudio de evaluación para ..."
              />
            </label>

            <label className="flex flex-col text-sm gap-1">
              Tipo de servicio *
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Selecciona un servicio</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col text-sm gap-1">
                Monto estimado (COP) *
                <input
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 text-sm"
                  placeholder="Ej. 15000000"
                />
              </label>

              <label className="flex flex-col text-sm gap-1">
                Probabilidad de cierre (%)
                <input
                  name="probability"
                  type="number"
                  min={0}
                  max={100}
                  value={form.probability}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 text-sm"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col text-sm gap-1">
                Estado
                <select
                  name="stage"
                  value={form.stage}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 text-sm"
                >
                  {STAGES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="flex flex-col text-sm gap-1">
              Notas
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm min-h-[80px]"
              />
            </label>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => router.push("/oportunidades")}
                className="text-sm text-slate-500 hover:underline"
              >
                ← Volver al listado
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
