// app/cotizaciones/nueva/page.tsx
"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useQuotes, useOpportunities, useClients } from "@/lib/clientStore"
import Link from "next/link"
import type { QuoteStatus } from "@/lib/types"

const STATUS: QuoteStatus[] = [
  "Borrador",
  "Enviada",
  "Vista por el cliente",
  "En negociación",
  "Aprobada",
  "Rechazada",
]

export default function NewQuotePage() {
  const router = useRouter()
  const { addQuote } = useQuotes()
  const { opportunities } = useOpportunities()
  const { clients } = useClients()

  // form con servicio heredado
  const [form, setForm] = useState({
    opportunityId: "",
    clientId: "",
    service: "",
    title: "",
    description: "",
    amount: "",
    status: "Borrador" as QuoteStatus,
  })

  // cuando selecciona oportunidad, heredamos cliente y servicio automáticamente
  const handleOpportunitySelect = (oppId: string) => {
    const opp = opportunities.find((o) => o.id === oppId)

    setForm((prev) => ({
      ...prev,
      opportunityId: oppId,
      clientId: opp?.clientId || "",
      service: opp?.service || "",
    }))
  }

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!form.opportunityId || !form.clientId) {
      alert("Debes seleccionar una oportunidad válida")
      return
    }

    addQuote({
      opportunityId: form.opportunityId,
      clientId: form.clientId,
      title: form.title,
      description: form.description,
      amount: Number(form.amount),
      status: form.status,
    })

    router.push("/cotizaciones")
  }

  // obtener nombres para mostrar
  const selectedClient =
    clients.find((c) => c.id === form.clientId)?.name || ""

  const selectedService = form.service || ""

  const selectedOpp =
    opportunities.find((o) => o.id === form.opportunityId)?.title || ""

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg space-y-4">

        <h1 className="text-2xl font-bold">Nueva cotización</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Oportunidad */}
          <label className="text-sm flex flex-col gap-1">
            Oportunidad *
            <select
              name="opportunityId"
              value={form.opportunityId}
              onChange={(e) => handleOpportunitySelect(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="">Selecciona oportunidad</option>
              {opportunities.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.title}
                </option>
              ))}
            </select>
          </label>

          {/* Cliente (auto asignado) */}
          {form.clientId && (
            <div className="bg-slate-100 border rounded-lg px-4 py-3 text-sm">
              <p>
                <strong>Cliente:</strong> {selectedClient}
              </p>
              <p>
                <strong>Servicio:</strong> {selectedService}
              </p>
            </div>
          )}

          {/* Título de cotización */}
          <label className="flex flex-col text-sm gap-1">
            Título de cotización *
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
              placeholder="Ej. Cotización del estudio arqueológico..."
            />
          </label>

          {/* Descripción */}
          <label className="flex flex-col text-sm gap-1">
            Descripción
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
              rows={3}
              placeholder="Descripción del alcance"
            />
          </label>

          {/* Monto y estado */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col text-sm gap-1">
              Monto (COP) *
              <input
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2"
                placeholder="15000000"
              />
            </label>

            <label className="flex flex-col text-sm gap-1">
              Estado
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2"
              >
                {STATUS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Botones */}
          <div className="flex justify-between pt-4">
            <Link href="/cotizaciones" className="text-sm text-slate-500">
              ← Volver
            </Link>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
            >
              Guardar cotización
            </button>
          </div>

        </form>
      </div>
    </main>
  )
}
