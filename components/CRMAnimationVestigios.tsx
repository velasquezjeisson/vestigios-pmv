"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "./ui/card"

type Step = {
  title: string
  description: string
  details: string[]
}

const steps: Step[] = [
  {
    title: "1. Creación del Cliente",
    description:
      "Registro estructurado del cliente para iniciar el flujo comercial con información completa y centralizada.",
    details: [
      "1. El asesor valida si el cliente ya existe en la base de datos.",
      "2. Si es nuevo, se crea el registro con razón social, NIT, contacto principal, correo y teléfono.",
      "3. Se asigna el sector, tipo de cliente y responsable comercial interno.",
      "4. Se guarda el registro y queda disponible el historial para futuras interacciones.",
    ],
  },
  {
    title: "2. Generación de Cotización",
    description:
      "Creación de la propuesta económica y técnica a partir de plantillas estandarizadas.",
    details: [
      "1. Desde la ficha del cliente se crea una nueva oportunidad o solicitud de servicio.",
      "2. Se selecciona el tipo de servicio de Vestigios (ej. estudio, diagnóstico, intervención).",
      "3. El sistema carga una plantilla base y el asesor ajusta alcance, tiempos y valor.",
      "4. Se genera la cotización en PDF o en formato digital para envío al cliente.",
    ],
  },
  {
    title: "3. Seguimiento de la Cotización",
    description:
      "Monitoreo del estado de la propuesta enviada al cliente y registro de las interacciones.",
    details: [
      "1. Se registra la fecha y el medio de envío de la cotización (correo, reunión, etc.).",
      "2. El sistema actualiza el estado: Enviada, Vista, En revisión, En negociación.",
      "3. Se agendan recordatorios de llamada o correos de seguimiento en fechas específicas.",
      "4. Cada interacción (llamada, reunión, comentario) se documenta en la misma oportunidad.",
    ],
  },
  {
    title: "4. Seguimiento del Cliente",
    description:
      "Gestión de la relación con el cliente y calificación de la oportunidad según su interés.",
    details: [
      "1. El asesor clasifica la oportunidad como cliente frío, tibio o caliente.",
      "2. Se identifican objeciones, necesidades adicionales o decisiones internas del cliente.",
      "3. Se pueden reasignar responsables o involucrar a dirección/área técnica cuando se requiere.",
      "4. El sistema muestra un resumen del estado del cliente y las oportunidades activas.",
    ],
  },
  {
    title: "5. Cierre de la Ventana o Proyecto",
    description:
      "Formalización del cierre de la oportunidad y creación del proyecto a ejecutar por Vestigios.",
    details: [
      "1. Una vez el cliente confirma, se cambia el estado a Cotización Aprobada.",
      "2. Se genera la orden interna o ventana de proyecto con código único.",
      "3. Se define alcance final, fechas tentativas y responsable técnico del proyecto.",
      "4. El sistema deja listo el proyecto para programación, ejecución y seguimiento operativo.",
    ],
  },
  {
    title: "6. Posventa y fidelización del cliente",
    description:
      "Estrategias de comunicación y seguimiento posteriores al proyecto para mantener y fortalecer la relación con el cliente.",
    details: [
      "1. Al cerrar el proyecto, se registra al cliente dentro de una campaña de posventa asociada al servicio ejecutado.",
      "2. Se definen campañas de mailing o contacto (boletines normativos, novedades de servicios, invitaciones a nuevos proyectos).",
      "3. El sistema permite segmentar clientes (activos, inactivos, por tipo de servicio o sector) para acciones de fidelización específicas.",
      "4. Se programan fechas de próxima acción (envío de correo, llamada, reunión de retroalimentación) y se registra el resultado.",
      "5. La información de posventa alimenta indicadores de recurrencia, satisfacción y oportunidades de venta cruzada para Vestigios S.A.S.",
    ],
  },
]

export default function CRMAnimationVestigios() {
  const [activeStep, setActiveStep] = useState<number>(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-slate-50 py-10">
      {/* Título */}
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
          Haz clic en cada etapa para ver cómo se realiza cada fase del proceso.
        </p>
      </motion.div>

      {/* Barra animada superior */}
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

      {/* Indicador de pasos clicable */}
      <div className="flex items-center justify-center gap-2 mb-6 px-4">
        {steps.map((step, index) => {
          const isActive = index === activeStep
          return (
            <motion.button
              key={index}
              type="button"
              className="focus:outline-none"
              onClick={() => setActiveStep(index)}
              whileHover={{ scale: 1.1 }}
            >
              <div
                className={`h-2 rounded-full transition-all ${
                  isActive ? "w-10 bg-indigo-500" : "w-4 bg-slate-300"
                }`}
              />
            </motion.button>
          )
        })}
      </div>

      {/* Tarjetas */}
      <div className="grid gap-6 w-full max-w-4xl px-4">
        {steps.map((step, index) => {
          const isActive = index === activeStep

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                type="button"
                className="w-full text-left focus:outline-none"
                onClick={() => setActiveStep(index)}
              >
                <Card
                  className={`rounded-2xl border bg-white transition-all duration-300 ${
                    isActive
                      ? "border-indigo-500 shadow-2xl shadow-indigo-100"
                      : "border-slate-200 shadow-md hover:shadow-lg"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4 items-start">
                      {/* círculo del paso */}
                      <motion.span
                        className={`mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                          isActive
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                        animate={
                          isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }
                        }
                        transition={
                          isActive ? { repeat: Infinity, duration: 1.1 } : {}
                        }
                      >
                        {index + 1}
                      </motion.span>

                      <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-1">
                          {step.title}
                        </h2>
                        <p className="text-base text-slate-700 mb-2">
                          {step.description}
                        </p>

                        {/* Detalle expandible */}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-3 border-t border-slate-200 pt-3"
                          >
                            <p className="text-sm font-semibold text-slate-600 mb-1">
                              ¿Cómo se realiza esta etapa?
                            </p>
                            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                              {step.details.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
