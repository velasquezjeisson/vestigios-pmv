// app/pmv/page.tsx
"use client"

import { AppNav } from "@/components/AppNav"
import CRMAnimationVestigios from "@/components/CRMAnimationVestigios"

export default function PMVPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Menú global */}
      <AppNav />

      {/* Contenido del flujo PMV */}
      <div className="py-10 px-4 flex flex-col items-center">
        <CRMAnimationVestigios />
      </div>
    </main>
  )
}
