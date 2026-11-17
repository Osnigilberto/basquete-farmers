import { Inter, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { site } from '@/lib/site'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-barlow',
})

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} · Basquete em ${site.cidade}/${site.estado}`,
    template: `%s · ${site.nome}`,
  },
  description: site.descricao,
  openGraph: {
    title: site.nome,
    description: site.descricao,
    locale: 'pt_BR',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#0E3A1E',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // usa a tela toda no iPhone com notch (com safe-area no CSS)
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${barlow.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
