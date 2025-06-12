import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { ModeToggle } from "@/components/ui/mode-toggle"

export const metadata: Metadata = {
  title: "Mood Tracker",
  description: "Track and monitor team mood",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          defaultTheme="light"
          storageKey="mood-tracker-theme"
        >
          <header className="w-full px-6 py-4 border-b flex justify-between items-center bg-background">
            <h1 className="text-lg font-semibold">Mood Tracker</h1>
            <ModeToggle />
          </header>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
