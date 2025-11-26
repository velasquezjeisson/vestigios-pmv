// app/oportunidades/nueva/page.tsx
"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useClients, useOpportunities } from "@/lib/clientStore"
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

export default function NewOpportunityPage() {
  const { clients } = useClients()
  const { addOpportunity } = useOpportunities()
  const router = useRouter()

  // ✔ Aquí agregamos service correctamente
  const [form, setForm] = useState({
    clientId: "",
    title: "",
    amount: "",
    stage: "Prospecto" as OpportunityStage,
    probability: "50",
    notes: "",
    service: "", // ← NECESARIO
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!form.clientId || !form.title || !form.amount || !form.service) {
      alert("Por favor completa Cliente, Nombre, Servicio y Monto.")
      return
    }

    addOpportunity({
      clientId: form.clientId,
      title: form.title,
      amount: Number(form.amount) || 0,
      stage: form.stage,
      probability: Number(form.probability) || 0,
      notes: form.notes,
      service: form.service,
    })

    router.push("/oportunidades")
  }

  const hasClients = clients.length > 0

  return (
    <main className="min-h-screen bg-slate-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-4">
        <h1 className="text-2xl font-bold mb-2">Nueva oportunidad comercial</h1>

        {!hasClients && (
          <div className="p-3 rounded-xl bg-amber-50 text-sm text-amber-800 mb-2">
            No hay clientes creados. Primero debes{" "}
            <Link href="/clientes/nuevo" className="underline font-semibold">
              registrar un cliente
            </Link>{" "}
            antes de crear oportunidades.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cliente */}
          <label className="flex flex-col text-sm gap-1">
            Cliente *
            <select
              name="clientId"
              value={form.clientId}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 text-sm"
              disabled={!hasClients}
            >
              <option value="">Selecciona un cliente</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.nit})
                </option>
              ))}
            </select>
          </label>

          {/* Título */}
          <label className="flex flex-col text-sm gap-1">
            Nombre de la oportunidad / ventana *
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 text-sm"
              placeholder="Ej. Estudio arqueológico para..."
            />
          </label>

          {/* Servicio */}
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

          {/* Monto y probabilidad */}
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

          {/* Estado */}
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

          {/* Notas */}
          <label className="flex flex-col text-sm gap-1">
            Notas
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 text-sm min-h-[80px]"
            />
          </label>

          {/* Botones */}
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
              disabled={!hasClients}
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Guardar oportunidad
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
