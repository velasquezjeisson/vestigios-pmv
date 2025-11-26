// components/AppNav.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "Inicio" },
  { href: "/pmv", label: "Flujo PMV" },
  { href: "/clientes", label: "Clientes" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/cotizaciones", label: "Cotizaciones" },
]

export function AppNav() {
  const pathname = usePathname()

  return (
    <header className="w-full max-w-6xl mx-auto mb-6">
      <nav className="flex items-center justify-between bg-white/90 backdrop-blur rounded-2xl shadow-sm px-4 py-3 border border-slate-100">
        <div className="text-sm font-semibold text-slate-800">
          Vestigios S.A.S. · PMV Comercial
        </div>
        <div className="flex gap-2 text-xs sm:text-sm">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "px-3 py-1.5 rounded-xl transition-colors",
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 hover:bg-slate-100",
                ].join(" ")}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
