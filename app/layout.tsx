import "./globals.css"
import { Providers } from "@/components/Providers"
import { ClientShell } from "@/components/ClientShell"
import { Logo } from "@/components/ui/Logo"

export const metadata = {
  title: "Echo",
  description: "KIIT anonymous communication platform"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientShell>
            <div className="min-h-screen bg-slate-950 text-white">
              <header className="border-b border-white/10 px-6 py-4">
                <Logo />
              </header>
              {children}
            </div>
          </ClientShell>
        </Providers>
      </body>
    </html>
  )
}
