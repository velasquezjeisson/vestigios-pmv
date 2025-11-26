// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import { ClientProvider } from "@/lib/clientStore"

export const metadata: Metadata = {
  title: "Vestigios PMV",
  description: "PMV Gestión Integrada Vestigios SAS",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}
