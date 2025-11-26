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
