// app/posventa/page.tsx
"use client"

import { useEffect, useState, FormEvent } from "react"
import { AppNav } from "@/components/AppNav"
import { useClients } from "@/lib/clientStore"

type PostSaleStatus = "Borrador" | "Programada" | "En ejecución" | "Finalizada"

type PostSaleCampaign = {
  id: string
  name: string
  objective: string
  segment: string
  service: string
  channel: string
  nextActionDate: string
  status: PostSaleStatus
  createdAt: string
}

const STATUS: PostSaleStatus[] = [
  "Borrador",
  "Programada",
  "En ejecución",
  "Finalizada",
]

const CHANNELS = ["Email", "WhatsApp", "Llamada"] as const

const SEGMENTS = [
  "Todos los clientes",
  "Clientes activos (con proyectos recientes)",
  "Clientes inactivos (sin proyectos últimos 12 meses)",
  "Clientes por servicio específico",
]

const SERVICES = [
  "Consultorías y Servicios Ambientales",
  "Consultorías y Servicios Arqueológicos",
  "Gestión Social y Territorial",
  "Consultorías SST",
  "Gestión Rápida de Permisos y Certificaciones",
]

export default function PostSalePage() {
  const { clients } = useClients()

  const [campaigns, setCampaigns] = useState<PostSaleCampaign[]>([])
  const [form, setForm] = useState({
    name: "",
    objective: "",
    segment: "Todos los clientes",
    service: "",
    channel: "Email",
    nextActionDate: "",
  })

  // Cargar campañas desde localStorage
  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = localStorage.getItem("vestigios_posventa")
    if (stored) {
      setCampaigns(JSON.parse(stored))
    }
  }, [])

  // Guardar campañas en localStorage
  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem("vestigios_posventa", JSON.stringify(campaigns))
  }, [campaigns])

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

    if (!form.name || !form.objective) {
      alert("Por favor completa al menos Nombre de campaña y Objetivo.")
      return
    }

    const newCampaign: PostSaleCampaign = {
      id: crypto.randomUUID(),
      name: form.name,
      objective: form.objective,
      segment: form.segment,
      service: form.service,
      channel: form.channel,
      nextActionDate: form.nextActionDate,
      status: "Borrador",
      createdAt: new Date().toISOString(),
    }

    setCampaigns((prev) => [newCampaign, ...prev])

    setForm({
      name: "",
      objective: "",
      segment: "Todos los clientes",
      service: "",
      channel: "Email",
      nextActionDate: "",
    })
  }

  const updateStatus = (id: string, status: PostSaleStatus) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <AppNav />

      <div className="py-10 px-4 flex flex-col items-center">
        <div className="w-full max-w-5xl space-y-6">
          {/* Encabezado */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-2">
              Posventa – Estrategias de fidelización
            </h1>
            <p className="text-sm text-slate-600">
              Aquí puedes definir campañas de mailing y acciones de
              posventa para mantener informados y fidelizados a los
              clientes de Vestigios S.A.S.
            </p>

            {/* Mini-resumen de clientes */}
            <div className="mt-4 text-xs text-slate-500">
              Clientes en la base actual:{" "}
              <span className="font-semibold">
                {clients.length}
              </span>
            </div>
          </div>

          {/* Formulario de nueva campaña */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              Nueva campaña de posventa
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col text-sm gap-1">
                  Nombre de la campaña *
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 text-sm"
                    placeholder="Ej. Boletín de novedades ambientales Q1"
                  />
                </label>

                <label className="flex flex-col text-sm gap-1">
                  Canal principal
                  <select
                    name="channel"
                    value={form.channel}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 text-sm"
                  >
                    {CHANNELS.map((ch) => (
                      <option key={ch} value={ch}>
                        {ch}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="flex flex-col text-sm gap-1">
                Objetivo de la campaña *
                <textarea
                  name="objective"
                  value={form.objective}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 text-sm"
                  rows={3}
                  placeholder="Ej. Informar cambios normativos, educar sobre servicios, reactivar clientes inactivos..."
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col text-sm gap-1">
                  Segmento de clientes
                  <select
                    name="segment"
                    value={form.segment}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 text-sm"
                  >
                    {SEGMENTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col text-sm gap-1">
                  Servicio foco (opcional)
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Todos los servicios</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="flex flex-col text-sm gap-1 max-w-xs">
                Próxima acción / envío
                <input
                  type="date"
                  name="nextActionDate"
                  value={form.nextActionDate}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 text-sm"
                />
              </label>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
                >
                  Guardar campaña
                </button>
              </div>
            </form>
          </div>

          {/* Listado de campañas */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              Campañas registradas
            </h2>

            {campaigns.length === 0 ? (
              <p className="text-sm text-slate-600">
                Aún no hay campañas de posventa. Crea la primera con el formulario superior.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-left">
                      <th className="px-3 py-2 border-b">Campaña</th>
                      <th className="px-3 py-2 border-b">Objetivo</th>
                      <th className="px-3 py-2 border-b">Segmento</th>
                      <th className="px-3 py-2 border-b">Servicio</th>
                      <th className="px-3 py-2 border-b">Canal</th>
                      <th className="px-3 py-2 border-b">Próx. acción</th>
                      <th className="px-3 py-2 border-b">Estado</th>
                      <th className="px-3 py-2 border-b">Creada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50 align-top">
                        <td className="px-3 py-2 border-b">
                          <div className="font-semibold">{c.name}</div>
                        </td>
                        <td className="px-3 py-2 border-b max-w-xs">
                          <div className="line-clamp-3 whitespace-pre-wrap">
                            {c.objective}
                          </div>
                        </td>
                        <td className="px-3 py-2 border-b">
                          {c.segment}
                        </td>
                        <td className="px-3 py-2 border-b">
                          {c.service || "Todos"}
                        </td>
                        <td className="px-3 py-2 border-b">
                          {c.channel}
                        </td>
                        <td className="px-3 py-2 border-b">
                          {c.nextActionDate
                            ? new Date(c.nextActionDate).toLocaleDateString("es-CO")
                            : "Sin definir"}
                        </td>
                        <td className="px-3 py-2 border-b">
                          <select
                            value={c.status}
                            onChange={(e) =>
                              updateStatus(
                                c.id,
                                e.target.value as PostSaleStatus,
                              )
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
                          {new Date(c.createdAt).toLocaleDateString("es-CO")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
