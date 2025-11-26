import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 px-4">
      <h1 className="text-3xl font-bold text-center">
        PMV – Gestión Comercial Vestigios S.A.S.
      </h1>
      <p className="text-slate-600 text-center max-w-xl text-sm">
        Prototipo funcional para la gestión integrada de clientes, oportunidades
        y el flujo comercial de Vestigios S.A.S.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/pmv"
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm"
        >
          Ver flujo PMV
        </Link>
        <Link
          href="/clientes"
          className="px-6 py-3 rounded-xl bg-white border text-sm font-semibold"
        >
          Gestionar clientes
        </Link>
        <Link
          href="/oportunidades"
          className="px-6 py-3 rounded-xl bg-white border text-sm font-semibold"
        >
          Gestionar oportunidades
        </Link>
        <Link
          href="/cotizaciones"
          className="px-6 py-3 rounded-xl bg-white border text-sm font-semibold"
        >
          Gestionar cotizaciones
        </Link>

      </div>
    </main>
  )
}
