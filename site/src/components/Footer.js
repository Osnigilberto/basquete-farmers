import Image from 'next/image'
import Link from 'next/link'
import { nav, site, whatsappLink, instagramLink } from '@/lib/site'
import styles from './Footer.module.css'

export default function Footer() {
  const wpp = whatsappLink('Olá! Vim pelo site do Farmers.')
  const insta = instagramLink()

  return (
    <footer className={styles.footer}>
      <div className="faixa-tricolor" />
      <div className={`container ${styles.grid}`}>
        <div className={styles.marca}>
          <Image src="/img/escudo.png" alt={site.nome} width={150} height={127} />
          <p>{site.slogan}</p>
        </div>

        <div>
          <h3>Navegue</h3>
          <ul>
            {nav.map((i) => (
              <li key={i.href}>
                <Link href={i.href}>{i.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/inscricao">Inscrição</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Contato</h3>
          <ul>
            <li>{wpp ? <a href={wpp}>WhatsApp</a> : 'WhatsApp — em breve'}</li>
            <li>{insta ? <a href={insta}>Instagram</a> : 'Instagram — em breve'}</li>
            {site.contato.email && (
              <li>
                <a href={`mailto:${site.contato.email}`}>{site.contato.email}</a>
              </li>
            )}
            <li>
              {site.cidade} · {site.estado}
            </li>
          </ul>
        </div>
      </div>
      <div className={`container ${styles.base}`}>
        © {new Date().getFullYear()} {site.nome} · Associação sem fins lucrativos (em formação)
      </div>
    </footer>
  )
}
