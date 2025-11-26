// app/clientes/page.tsx
"use client"

import Link from "next/link"
import { useClients } from "@/lib/clientStore"
import { AppNav } from "@/components/AppNav"   // 👈 nuevo

export default function ClientsPage() {
  const { clients } = useClients()

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Clientes – Vestigios S.A.S.</h1>
          <div className="flex gap-3">
            <Link
              href="/"
              className="text-sm text-slate-500 hover:underline"
            >
              Inicio
            </Link>
            <Link
              href="/pmv"
              className="text-sm text-slate-500 hover:underline"
            >
              Ver flujo PMV
            </Link>
            <Link
              href="/clientes/nuevo"
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
            >
              + Nuevo cliente
            </Link>
          </div>
        </div>

        {clients.length === 0 ? (
          <p className="text-slate-600 text-sm">
            Aún no hay clientes registrados. Crea el primero con el botón
            “Nuevo cliente”.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="px-3 py-2 border-b">Nombre</th>
                  <th className="px-3 py-2 border-b">NIT</th>
                  <th className="px-3 py-2 border-b">Contacto</th>
                  <th className="px-3 py-2 border-b">Correo</th>
                  <th className="px-3 py-2 border-b">Sector</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 border-b">{c.name}</td>
                    <td className="px-3 py-2 border-b">{c.nit}</td>
                    <td className="px-3 py-2 border-b">{c.contactName}</td>
                    <td className="px-3 py-2 border-b">{c.contactEmail}</td>
                    <td className="px-3 py-2 border-b">{c.sector}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
