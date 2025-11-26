// lib/types.ts

export type Client = {
  id: string
  name: string
  nit: string
  contactName: string
  contactEmail: string
  contactPhone: string
  sector: string
  notes?: string
}

export type OpportunityStage =
  | "Prospecto"
  | "En negociación"
  | "Cerrada ganada"
  | "Cerrada perdida"

export type ActivityType = "Llamada" | "Correo" | "Reunión" | "Nota interna" | "Comentario"

export type ActivityStatus = "pendiente" | "completada"

export type ActivityOutcome =
  | "contactado"
  | "no_contesta"
  | "reprogramada"
  | "solicita_cotizacion"
  | "envia_informacion"
  | "rechaza"
  | "otro"

export type OpportunityActivity = {
  id: string
  opportunityId: string
  type: ActivityType
  actionDate: string          // fecha de acción / recordatorio
  detail: string              // lo que planeas hacer
  status: ActivityStatus      // pendiente | completada
  outcome?: ActivityOutcome   // qué pasó realmente (opcional)
  outcomeNote?: string        // nota libre del resultado
  createdAt: string
}

export type Opportunity = {
  id: string
  clientId: string
  title: string
  amount: number
  stage: OpportunityStage
  probability: number // 0–100
  notes?: string
  createdAt: string
  service: string
  // opcional: ya no la usamos, pero no estorba
  activities?: OpportunityActivity[]
}

export type QuoteStatus =
  | "Borrador"
  | "Enviada"
  | "Vista por el cliente"
  | "En negociación"
  | "Aprobada"
  | "Rechazada"

export type Quote = {
  id: string
  opportunityId: string
  clientId: string
  title: string
  amount: number
  description: string
  status: QuoteStatus
  createdAt: string
}
