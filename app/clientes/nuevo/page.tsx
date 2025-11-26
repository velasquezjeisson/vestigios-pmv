// app/clientes/nuevo/page.tsx
"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { useClients } from "@/lib/clientStore"

export default function NewClientPage() {
  const { addClient } = useClients()
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    nit: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    sector: "",
    notes: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // validación mínima
    if (!form.name || !form.nit) {
      alert("Por favor completa al menos Nombre y NIT.")
      return
    }
    addClient({
      name: form.name,
      nit: form.nit,
      contactName: form.contactName,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      sector: form.sector,
      notes: form.notes,
    })
    router.push("/clientes")
  }

  return (
    <main className="min-h-screen bg-slate-50 flex justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-4"
      >
        <h1 className="text-2xl font-bold mb-2">
          Crear nuevo cliente – Vestigios S.A.S.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col text-sm gap-1">
            Nombre / Razón social *
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 text-sm"
            />
          </label>

          <label className="flex flex-col text-sm gap-1">
            NIT *
            <input
              name="nit"
              value={form.nit}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 text-sm"
            />
          </label>

          <label className="flex flex-col text-sm gap-1">
            Nombre de contacto
            <input
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 text-sm"
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
            />
          </label>

          <label className="flex flex-col text-sm gap-1">
            Teléfono
            <input
              name="contactPhone"
              value={form.contactPhone}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 text-sm"
            />
          </label>

          <label className="flex flex-col text-sm gap-1">
            Sector
            <input
              name="sector"
              value={form.sector}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 text-sm"
            />
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
            onClick={() => router.push("/pmv")}
            className="text-sm text-slate-500 hover:underline"
          >
            ← Volver al flujo PMV
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
          >
            Guardar cliente
          </button>
        </div>
      </form>
    </main>
  )
}
