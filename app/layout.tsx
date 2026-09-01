import "./globals.css"
import { Providers } from "@/components/Providers"
import { ClientShell } from "@/components/ClientShell"
import { Logo } from "@/components/ui/Logo"

export const metadata = {
  title: "YOR FEELINGS // anonymous campus signal",
  description: "A private campus conversation surface with visible moderation and mood-signal boundaries."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientShell>
            <div className="yor-shell min-h-screen text-white">
              <header className="yor-header border-b px-6 py-4">
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
