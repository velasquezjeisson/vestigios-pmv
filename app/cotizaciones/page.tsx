// app/cotizaciones/page.tsx
"use client"

import Link from "next/link"
import { useQuotes } from "@/lib/clientStore"
import type { QuoteStatus } from "@/lib/types"
import { AppNav } from "@/components/AppNav"

export default function QuotesPage() {
  const { quotes, updateQuoteStatus, clients, opportunities } = useQuotes()

  const getClient = (id: string) =>
    clients.find((c) => c.id === id)?.name || "Cliente no encontrado"

  const getOpp = (id: string) =>
    opportunities.find((o) => o.id === id)?.title || "Oportunidad no encontrada"

  const STATUS: QuoteStatus[] = [
    "Borrador",
    "Enviada",
    "Vista por el cliente",
    "En negociación",
    "Aprobada",
    "Rechazada",
  ]

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ✔ Barra de navegación */}
      <AppNav />

      <div className="py-10 px-4 flex flex-col items-center">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6">

          {/* ✔ Encabezado */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Cotizaciones</h1>

            <div className="flex gap-3">
              <Link
                href="/cotizaciones/nueva"
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
              >
                + Nueva
              </Link>
            </div>
          </div>

          {/* ✔ Listado */}
          {quotes.length === 0 ? (
            <p className="text-slate-600 text-sm">
              Aún no hay cotizaciones registradas.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-left">
                    <th className="px-3 py-2 border-b">Cliente</th>
                    <th className="px-3 py-2 border-b">Oportunidad</th>
                    <th className="px-3 py-2 border-b">Título</th>
                    <th className="px-3 py-2 border-b">Monto</th>
                    <th className="px-3 py-2 border-b">Estado</th>
                    <th className="px-3 py-2 border-b">Creada</th>
                    <th className="px-3 py-2 border-b">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50">
                      <td className="px-3 py-2 border-b">
                        {getClient(q.clientId)}
                      </td>

                      <td className="px-3 py-2 border-b">
                        {getOpp(q.opportunityId)}
                      </td>

                      <td className="px-3 py-2 border-b">{q.title}</td>

                      <td className="px-3 py-2 border-b">
                        {q.amount.toLocaleString("es-CO")}
                      </td>

                      <td className="px-3 py-2 border-b">
                        <select
                          value={q.status}
                          onChange={(e) =>
                            updateQuoteStatus(q.id, e.target.value as QuoteStatus)
                          }
                          className="border rounded-lg px-2 py-1 text-xs"
                        >
                          {STATUS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-3 py-2 border-b">
                        {new Date(q.createdAt).toLocaleDateString("es-CO")}
                      </td>

                      <td className="px-3 py-2 border-b">
                        <Link
                          href={`/cotizaciones/${q.id}/editar`}
                          className="text-xs text-indigo-600 hover:underline"
                        >
                          Editar
                        </Link>
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
