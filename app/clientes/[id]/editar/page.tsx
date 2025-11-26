// app/clientes/[id]/editar/page.tsx
"use client"

import { useEffect, useState, FormEvent } from "react"
import { useRouter, useParams } from "next/navigation"
import { AppNav } from "@/components/AppNav"
import { useClients } from "@/lib/clientStore"

export default function EditClientPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const { clients, updateClient } = useClients()

  const client = clients.find((c) => c.id === id)

  const [form, setForm] = useState({
    name: "",
    nit: "",
    contactName: "",
    contactEmail: "",
    sector: "",
  })

  useEffect(() => {
    if (client) {
      setForm({
        name: client.name || "",
        nit: client.nit || "",
        contactName: client.contactName || "",
        contactEmail: client.contactEmail || "",
        sector: client.sector || "",
      })
    }
  }, [client])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!client) return

    updateClient(client.id, {
      name: form.name,
      nit: form.nit,
      contactName: form.contactName,
      contactEmail: form.contactEmail,
      sector: form.sector,
    })

    router.push("/clientes")
  }

  // estados de carga / no encontrado
  if (!id) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-sm text-slate-700">
          Cargando cliente...
        </div>
      </main>
    )
  }

  if (!client && clients.length > 0) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center space-y-3">
          <p className="text-sm text-slate-700">
            No se encontró el cliente solicitado.
          </p>
          <button
            onClick={() => router.push("/clientes")}
            className="text-sm text-indigo-600 hover:underline"
          >
            Volver a clientes
          </button>
        </div>
      </main>
    )
  }

  if (!client && clients.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-sm text-slate-700">
          Cargando datos...
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <AppNav />

      <div className="py-10 px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-4">
          <h1 className="text-2xl font-bold mb-2">
            Editar cliente
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="flex flex-col text-sm gap-1">
              Razón social / Nombre *
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
                placeholder="Ej. Vestigios S.A.S."
              />
            </label>

            <label className="flex flex-col text-sm gap-1">
              NIT *
              <input
                name="nit"
                value={form.nit}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
                placeholder="Ej. 900000000-1"
              />
            </label>

            <label className="flex flex-col text-sm gap-1">
              Nombre de contacto
              <input
                name="contactName"
                value={form.contactName}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
                placeholder="Persona responsable"
              />
            </label>

            <label className="flex flex-col text-sm gap-1">
              Correo de contacto
              <input
                name="contactEmail"
                type="email"
                value={form.contactEmail}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
                placeholder="correo@cliente.com"
              />
            </label>

            <label className="flex flex-col text-sm gap-1">
              Sector
              <input
                name="sector"
                value={form.sector}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
                placeholder="Ambiental, arqueológico, etc."
              />
            </label>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => router.push("/clientes")}
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
