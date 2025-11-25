"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "./ui/card"

const steps = [
  {
    title: "1. Creación del Cliente",
    description:
      "El proceso inicia registrando un nuevo cliente. El sistema centraliza los datos, creando un historial único y evitando duplicidades.",
  },
  {
    title: "2. Generación de Cotización",
    description:
      "Desde la ficha del cliente se genera la cotización con plantillas estandarizadas para garantizar claridad, consistencia y rapidez.",
  },
  {
    title: "3. Seguimiento de la Cotización",
    description:
      "La plataforma muestra estados en tiempo real: enviada, vista, en negociación o aprobada. Todo con trazabilidad completa.",
  },
  {
    title: "4. Seguimiento del Cliente",
    description:
      "El CRM permite monitorear la oportunidad comercial clasificando el cliente como frío, tibio o caliente según sus interacciones.",
  },
  {
    title: "5. Cierre de la Ventana o Proyecto",
    description:
      "Cuando la cotización es aprobada, se formaliza el cierre del proyecto. El sistema genera la ventana de servicio y habilita la programación.",
  },
  {
    title: "Beneficios para Vestigios S.A.S.",
    description:
      "✓ Información centralizada\n✓ Eliminación de reprocesos\n✓ Seguimiento comercial efectivo\n✓ Procesos estandarizados\n✓ Decisiones basadas en datos reales\n✓ Mayor probabilidad de cierre",
  },
]

export default function CRMAnimationVestigios() {
  const [activeStep, setActiveStep] = useState(0)

  // cambia de paso automáticamente cada 2.2 s
  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 2200)

    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-slate-50 py-10">
      {/* Título animado */}
      <motion.div
        className="text-center mb-6 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl font-bold mb-2">
          PMV – Gestión Integrada de la Información
          <br />
          Vestigios S.A.S.
        </h1>
        <p className="text-slate-600">
          Flujo desde la creación del cliente hasta el cierre del proyecto.
        </p>
      </motion.div>

      {/* Barra de avance animada */}
      <motion.div
        className="w-full max-w-4xl mb-6 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
          />
        </div>
      </motion.div>

      {/* Indicador de pasos */}
      <div className="flex items-center justify-center gap-2 mb-6 px-4">
        {steps.map((_, index) => {
          const isActive = index === activeStep
          return (
            <motion.div
              key={index}
              className={`h-2 rounded-full ${
                isActive ? "w-10 bg-indigo-500" : "w-4 bg-slate-300"
              }`}
              animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={isActive ? { repeat: Infinity, duration: 0.8 } : {}}
            />
          )
        })}
      </div>

      {/* Tarjetas animadas */}
      <div className="grid gap-6 w-full max-w-4xl px-4">
        {steps.map((step, index) => {
          const isActive = index === activeStep

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <Card
                className={`rounded-2xl border bg-white transition-all duration-300 ${
                  isActive
                    ? "border-indigo-500 shadow-2xl shadow-indigo-100"
                    : "border-slate-200 shadow-md opacity-80 hover:opacity-100"
                }`}
              >
                <CardContent className="p-6 flex gap-4">
                  {/* círculo con número de paso */}
                  <motion.span
                    className={`mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                    animate={
                      isActive
                        ? { scale: [1, 1.08, 1] }
                        : { scale: 1 }
                    }
                    transition={
                      isActive
                        ? { repeat: Infinity, duration: 1.1 }
                        : {}
                    }
                  >
                    {index + 1}
                  </motion.span>

                  <div>
                    <h2 className="text-xl font-semibold mb-1">
                      {step.title}
                    </h2>
                    <p className="text-base text-slate-700 whitespace-pre-line">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
