import Image from 'next/image'
import Link from 'next/link'
import { site, turmas } from '@/lib/site'
import styles from './page.module.css'

const pilares = [
  {
    titulo: 'Esporte',
    texto: 'Treinos regulares com fundamentos, jogo coletivo e preparo físico, do iniciante ao competitivo.',
  },
  {
    titulo: 'Educação',
    texto: 'Disciplina, respeito e compromisso com a escola. Na quadra se aprende muito além do arremesso.',
  },
  {
    titulo: 'Comunidade',
    texto: 'Atletas, famílias e comércio local juntos, levando o nome de Antônio Carlos para as quadras de SC.',
  },
]

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroTexto}>
            <span className="rotulo">Projeto social de basquete · {site.cidade}/{site.estado}</span>
            <h1>
              Basquete que <em>planta</em> futuro.
            </h1>
            <p>
              O Farmers nasce para levar o basquete a crianças, jovens e adultos de {site.cidade}: treino
              sério, ambiente saudável e a força de uma cidade inteira por trás.
            </p>
            <div className={styles.acoes}>
              <Link href="/inscricao" className="btn btn-vermelho">
                Quero jogar
              </Link>
              <Link href="/apoie" className="btn btn-contorno">
                Quero apoiar
              </Link>
            </div>
          </div>
          <div className={styles.heroImagem}>
            <Image
              src="/img/escudo.png"
              alt="Escudo do Antônio Carlos Farmers com o leão-baio"
              width={900}
              height={760}
              preload
              sizes="(max-width: 760px) 80vw, 480px"
            />
          </div>
        </div>
        <div className="faixa-tricolor" />
      </section>

      <section className="secao">
        <div className="container">
          <span className="rotulo">Nossa missão</span>
          <h2>Mais que um time</h2>
          <div className={styles.pilares}>
            {pilares.map((p, i) => (
              <article key={p.titulo} className={styles.pilar}>
                <span className={styles.numero}>0{i + 1}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="secao secao-escura">
        <div className={`container ${styles.duasColunas}`}>
          <div>
            <span className="rotulo">Turmas</span>
            <h2>Tem lugar para você</h2>
            <p>
              Vamos começar com turmas por faixa etária. Horários e locais estão sendo definidos com a
              prefeitura e as escolas. Faça a pré-inscrição para ser avisado primeiro.
            </p>
            <Link href="/turmas" className="btn btn-vermelho">
              Ver turmas
            </Link>
          </div>
          <ul className={styles.listaTurmas}>
            {turmas.map((t) => (
              <li key={t.id}>
                <strong>{t.nome}</strong>
                <span>{t.idade}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao">
        <div className={`container ${styles.duasColunas}`}>
          <Image
            src="/img/uniforme-v3.jpg"
            alt="Uniformes casa e fora do Farmers: regata com FARMERS em arco na frente, nome e número nas costas, espaços para patrocínio"
            width={1600}
            height={947}
            className={styles.foto}
            sizes="(max-width: 760px) 100vw, 540px"
          />
          <div>
            <span className="rotulo">Faça parte</span>
            <h2>Vista essa camisa com a gente</h2>
            <p>
              O projeto se sustenta com apoio da comunidade: empresas patrocinadoras, sócios apoiadores e
              voluntários. Cada real vira bola, uniforme, transporte e inscrição em campeonato.
            </p>
            <Link href="/apoie" className="btn btn-verde">
              Como apoiar
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
