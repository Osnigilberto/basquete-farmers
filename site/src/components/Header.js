'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { nav, site } from '@/lib/site'
import styles from './Header.module.css'

export default function Header() {
  const pathname = usePathname()
  const [aberto, setAberto] = useState(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.marca} onClick={() => setAberto(false)}>
          <Image src="/img/circular.png" alt="" width={44} height={44} />
          <span>
            <small>{site.cidade}</small>
            {site.nomeCurto}
          </span>
        </Link>

        <button
          className={styles.toggle}
          aria-expanded={aberto}
          aria-controls="menu-principal"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setAberto((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="menu-principal" className={`${styles.nav} ${aberto ? styles.aberto : ''}`}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              onClick={() => setAberto(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/inscricao" className="btn btn-vermelho" onClick={() => setAberto(false)}>
            Inscreva-se
          </Link>
        </nav>
      </div>
    </header>
  )
}
