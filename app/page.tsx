import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50 px-4 py-12">
      <h1 className="text-3xl font-bold text-center">
        PMV – Gestión Comercial Vestigios S.A.S.
      </h1>

      <p className="text-slate-600 text-center max-w-xl text-sm">
        Prototipo funcional para la gestión integrada de clientes, oportunidades,
        cotizaciones, flujo comercial y estrategias de posventa de Vestigios S.A.S.
      </p>

      <div className="flex flex-wrap gap-4 justify-center max-w-2xl mt-4">
        <Link
          href="/pmv"
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm shadow hover:bg-indigo-700"
        >
          Ver flujo PMV
        </Link>

        <Link
          href="/clientes"
          className="px-6 py-3 rounded-xl bg-white border font-semibold text-sm shadow-sm hover:bg-slate-100"
        >
          Gestionar clientes
        </Link>

        <Link
          href="/oportunidades"
          className="px-6 py-3 rounded-xl bg-white border font-semibold text-sm shadow-sm hover:bg-slate-100"
        >
          Gestionar oportunidades
        </Link>

        <Link
          href="/cotizaciones"
          className="px-6 py-3 rounded-xl bg-white border font-semibold text-sm shadow-sm hover:bg-slate-100"
        >
          Gestionar cotizaciones
        </Link>

        <Link
          href="/posventa"
          className="px-6 py-3 rounded-xl bg-white border font-semibold text-sm shadow-sm hover:bg-slate-100"
        >
          Estrategias de posventa
        </Link>
      </div>
    </main>
  )
}
