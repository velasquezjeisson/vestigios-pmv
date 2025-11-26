// app/cotizaciones/[id]/editar/page.tsx
"use client"

import { useEffect, useState, FormEvent } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { useQuotes } from "@/lib/clientStore"
import type { QuoteStatus } from "@/lib/types"

const STATUS: QuoteStatus[] = [
  "Borrador",
  "Enviada",
  "Vista por el cliente",
  "En negociación",
  "Aprobada",
  "Rechazada",
]

export default function EditQuotePage() {
  const router = useRouter()
  const params = useParams() // 👈 en cliente se usa el hook
  const id = params?.id as string

  const { quotes, updateQuote, clients, opportunities } = useQuotes()

  const quote = quotes.find((q) => q.id === id)

  const [form, setForm] = useState({
    title: "",
    description: "",
    amount: "",
    status: "Borrador" as QuoteStatus,
  })

  // cargar datos al montar cuando ya exista la cotización
  useEffect(() => {
    if (quote) {
      setForm({
        title: quote.title,
        description: quote.description || "",
        amount: String(quote.amount),
        status: quote.status,
      })
    }
  }, [quote])

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!quote) return

    updateQuote(quote.id, {
      title: form.title,
      description: form.description,
      amount: Number(form.amount),
      status: form.status,
    })

    router.push("/cotizaciones")
  }

  // estados de UI: cargando vs no encontrada
  if (!id) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-sm text-slate-700">
          Cargando...
        </div>
      </main>
    )
  }

  if (!quote && quotes.length > 0) {
    // ya hay cotizaciones cargadas pero esta ID no existe
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center space-y-3">
          <p className="text-sm text-slate-700">
            No se encontró la cotización solicitada.
          </p>
          <Link
            href="/cotizaciones"
            className="text-sm text-indigo-600 hover:underline"
          >
            Volver a cotizaciones
          </Link>
        </div>
      </main>
    )
  }

   if (!quote && quotes.length === 0) {
    // contexto aún no cargado desde localStorage
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-sm text-slate-700">
          Cargando cotización...
        </div>
      </main>
    )
  }

  // TS no alcanza a inferirlo, aseguramos explícitamente
  if (!quote) {
    return null
  }

  const client =
    clients.find((c) => c.id === quote.clientId)?.name ||
    "Cliente no encontrado"
  const opp =
    opportunities.find((o) => o.id === quote.opportunityId) || undefined
  const service = opp?.service || ""


  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg space-y-4">
        <h1 className="text-2xl font-bold">Editar cotización</h1>

        {/* Resumen de contexto */}
        <div className="bg-slate-100 border rounded-lg px-4 py-3 text-sm space-y-1">
          <p>
            <strong>Cliente:</strong> {client}
          </p>
          <p>
            <strong>Oportunidad:</strong> {opp?.title || "No encontrada"}
          </p>
          {service && (
            <p>
              <strong>Servicio:</strong> {service}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título */}
          <label className="flex flex-col text-sm gap-1">
            Título de cotización *
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
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
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
