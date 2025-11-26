// lib/clientStore.tsx
"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import type {
  Client,
  Opportunity,
  OpportunityStage,
  Quote,
  QuoteStatus,
} from "./types"

type DataContextType = {
  // clientes
  clients: Client[]
  addClient: (client: Omit<Client, "id">) => void
  updateClient: (
    id: string,
    data: Partial<
      Pick<
        Client,
        "name" | "nit" | "contactName" | "contactEmail" | "sector"
      >
    >
  ) => void

  // oportunidades
  opportunities: Opportunity[]
  addOpportunity: (opp: Omit<Opportunity, "id" | "createdAt">) => void
  updateOpportunityStage: (id: string, stage: OpportunityStage) => void
  updateOpportunity: (
    id: string,
    data: Partial<
      Pick<
        Opportunity,
        "title" | "amount" | "probability" | "stage" | "notes" | "service"
      >
    >
  ) => void

  // cotizaciones
  quotes: Quote[]
  addQuote: (q: Omit<Quote, "id" | "createdAt">) => void
  updateQuoteStatus: (id: string, status: QuoteStatus) => void
  updateQuote: (
    id: string,
    data: Partial<
      Pick<Quote, "title" | "description" | "amount" | "status">
    >
  ) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])

  // cargar desde localStorage
  useEffect(() => {
    if (typeof window === "undefined") return

    const sc = localStorage.getItem("vestigios_clients")
    if (sc) setClients(JSON.parse(sc))

    const so = localStorage.getItem("vestigios_opps")
    if (so) setOpportunities(JSON.parse(so))

    const sq = localStorage.getItem("vestigios_quotes")
    if (sq) setQuotes(JSON.parse(sq))
  }, [])

  // guardar cambios
  useEffect(() => {
    localStorage.setItem("vestigios_clients", JSON.stringify(clients))
  }, [clients])

  useEffect(() => {
    localStorage.setItem("vestigios_opps", JSON.stringify(opportunities))
  }, [opportunities])

  useEffect(() => {
    localStorage.setItem("vestigios_quotes", JSON.stringify(quotes))
  }, [quotes])

  // ----- clientes -----
  const addClient = (data: Omit<Client, "id">) => {
    const newClient = { id: crypto.randomUUID(), ...data }
    setClients((prev) => [...prev, newClient])
  }

  const updateClient = (
    id: string,
    data: Partial<
      Pick<
        Client,
        "name" | "nit" | "contactName" | "contactEmail" | "sector"
      >
    >,
  ) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c)),
    )
  }

  // ----- oportunidades -----
  const addOpportunity = (data: Omit<Opportunity, "id" | "createdAt">) => {
    const newOpp: Opportunity = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...data,
    }
    setOpportunities((prev) => [...prev, newOpp])
  }

  const updateOpportunityStage = (id: string, stage: OpportunityStage) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, stage } : o)),
    )
  }

  const updateOpportunity = (
    id: string,
    data: Partial<
      Pick<
        Opportunity,
        "title" | "amount" | "probability" | "stage" | "notes" | "service"
      >
    >,
  ) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...data } : o)),
    )
  }

  // ----- cotizaciones -----
  const addQuote = (data: Omit<Quote, "id" | "createdAt">) => {
    const newQuote: Quote = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...data,
    }
    setQuotes((prev) => [...prev, newQuote])
  }

  const updateQuoteStatus = (id: string, status: QuoteStatus) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q)),
    )
  }

  const updateQuote = (
    id: string,
    data: Partial<
      Pick<Quote, "title" | "description" | "amount" | "status">
    >,
  ) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...data } : q)),
    )
  }

  return (
    <DataContext.Provider
      value={{
        clients,
        addClient,
        updateClient,
        opportunities,
        addOpportunity,
        updateOpportunityStage,
        updateOpportunity,
        quotes,
        addQuote,
        updateQuoteStatus,
        updateQuote,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

// ----- hooks -----
export function useClients() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error("useClients must be used inside ClientProvider")
  return {
    clients: ctx.clients,
    addClient: ctx.addClient,
    updateClient: ctx.updateClient,
  }
}

export function useOpportunities() {
  const ctx = useContext(DataContext)
  if (!ctx)
    throw new Error("useOpportunities must be used inside ClientProvider")
  return {
    opportunities: ctx.opportunities,
    addOpportunity: ctx.addOpportunity,
    updateOpportunityStage: ctx.updateOpportunityStage,
    updateOpportunity: ctx.updateOpportunity,
    clients: ctx.clients,
  }
}

export function useQuotes() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error("useQuotes must be used inside ClientProvider")
  return {
    quotes: ctx.quotes,
    addQuote: ctx.addQuote,
    updateQuoteStatus: ctx.updateQuoteStatus,
    updateQuote: ctx.updateQuote,
    opportunities: ctx.opportunities,
    clients: ctx.clients,
  }
}
