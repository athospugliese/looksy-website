import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "./language-switcher"

export function SiteHeader() {
  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Looksy
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/privacy" className="text-sm font-medium hover:underline underline-offset-4">
            Privacy
          </Link>
          <LanguageSwitcher />
          <Button size="sm">Sign In</Button>
        </nav>
      </div>
    </header>
  )
}

