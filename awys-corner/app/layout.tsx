import './globals.css'
import localFont from 'next/font/local'
import Navbar from '@/components/Navbar'

const seasons = localFont({
  src: '../public/fonts/TheSeasons.ttf',
  variable: '--font-seasons'
})

const tanpearl = localFont({
  src: '../public/fonts/TanPearl.ttf',
  variable: '--font-tanpearl'
})

export const metadata = {
  title: "Awy's Corner -",
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${seasons.variable} ${tanpearl.variable} bg-awy-light text-awy-espresso font-seasons m-0 p-0 flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow flex flex-col pt-10 px-8">
          {children}
        </main>
        <footer className="bg-awy-sand py-2 text-center border-t border-awy-espresso">
          <p className="text-sm md:text-base font-tanpearl tracking-widest text-awy-espresso">
            © 2026 AWY'S CORNER. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </body>
    </html>
  )
}