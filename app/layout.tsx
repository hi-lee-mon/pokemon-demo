import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

const notoSansJp = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | kame',
    default: 'kame',
  },
  description: 'Generated by create next app',
}

const navItems = [
  { label: 'バトル', href: '/' },
  { label: 'About', href: '/about' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={cn(notoSansJp.className, 'min-h-dvh')}>
        <header className="container h-16 flex items-center border-b justify-between">
          <h1 className="font-bold">ポケモン</h1>
          <nav>
            <ul className="flex gap-4">
              {navItems.map((navItem) => (
                <li key={navItem.href}>
                  <Link
                    href={navItem.href}
                    className={buttonVariants({ variant: 'ghost' })}
                  >
                    {navItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="container sticky top-full h-16 flex items-center border-t justify-between">
          <p>&copy; Kame</p>
        </footer>
      </body>
    </html>
  )
}
