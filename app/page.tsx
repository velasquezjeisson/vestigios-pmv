// app/page.tsx
import Link from "next/link"
import { AppNav } from "@/components/AppNav"
import { Users, FileText, Mail, LineChart } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Menú superior */}
      <AppNav />

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <section className="w-full max-w-5xl space-y-8">
          {/* Hero */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              PMV – Gestión Comercial Vestigios S.A.S.
            </h1>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
              Prototipo funcional para la gestión integrada de clientes,
              oportunidades, cotizaciones y posventa en Vestigios S.A.S.
            </p>
          </div>

          {/* Accesos rápidos */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Flujo PMV */}
            <Link
              href="/pmv"
              className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-indigo-600" />
                <h2 className="font-semibold text-sm">Flujo PMV</h2>
              </div>
              <p className="text-xs text-slate-600">
                Visualiza el paso a paso desde la creación del cliente hasta el
                cierre del proyecto.
              </p>
              <span className="text-xs text-indigo-600 font-semibold mt-auto">
                Ver flujo PMV →
              </span>
            </Link>

            {/* Clientes */}
            <Link
              href="/clientes"
              className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                <h2 className="font-semibold text-sm">Clientes</h2>
              </div>
              <p className="text-xs text-slate-600">
                Registra y administra la base de clientes, contactos y sectores.
              </p>
              <span className="text-xs text-indigo-600 font-semibold mt-auto">
                Gestionar clientes →
              </span>
            </Link>

            {/* Oportunidades */}
            <Link
              href="/oportunidades"
              className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-indigo-600" />
                <h2 className="font-semibold text-sm">Oportunidades</h2>
              </div>
              <p className="text-xs text-slate-600">
                Controla el embudo comercial, montos estimados y probabilidad de
                cierre.
              </p>
              <span className="text-xs text-indigo-600 font-semibold mt-auto">
                Gestionar oportunidades →
              </span>
            </Link>

            {/* Cotizaciones */}
            <Link
              href="/cotizaciones"
              className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-600" />
                <h2 className="font-semibold text-sm">Cotizaciones</h2>
              </div>
              <p className="text-xs text-slate-600">
                Registra propuestas enviadas, estado de revisión y cotizaciones
                aprobadas o rechazadas.
              </p>
              <span className="text-xs text-indigo-600 font-semibold mt-auto">
                Gestionar cotizaciones →
              </span>
            </Link>

            {/* Posventa */}
            <Link
              href="/posventa"
              className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-indigo-600" />
                <h2 className="font-semibold text-sm">Posventa y fidelización</h2>
              </div>
              <p className="text-xs text-slate-600">
                Diseña campañas de mailing y acciones de seguimiento para
                fidelizar y reactivar clientes.
              </p>
              <span className="text-xs text-indigo-600 font-semibold mt-auto">
                Ir a posventa →
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
