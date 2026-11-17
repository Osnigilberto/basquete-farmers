import Image from 'next/image'
import PageHeader from '@/components/PageHeader'
import { site } from '@/lib/site'
import styles from '../interno.module.css'

export const metadata = {
  title: 'Sobre',
  description: `Quem somos e por que o ${site.nome} existe.`,
}

const simbolos = [
  {
    titulo: 'O leão-baio',
    texto: 'O leão-baio é o felino nativo das matas do Sul do Brasil, que tem esse nome pela cor amarelada da pelagem. É silencioso, focado e determinado, como queremos nossos atletas em quadra.',
  },
  {
    titulo: 'As folhas',
    texto: `${site.cidade} é terra de agricultura. Os "Farmers" homenageiam quem planta e colhe, dentro e fora da quadra.`,
  },
  {
    titulo: 'As cores',
    texto: 'Verde da nossa terra, creme da colheita e vermelho da garra. As mesmas da nossa bandeira.',
  },
]

export default function Sobre() {
  return (
    <>
      <PageHeader rotulo="Sobre" titulo="Quem somos">
        Um grupo de amigos apaixonados por basquete decidiu transformar a pelada de fim de semana em um
        projeto para a cidade inteira.
      </PageHeader>

      <section className="secao">
        <div className={`container ${styles.texto}`}>
          <h2>Nossa história</h2>
          <p>
            O {site.nome} começou com quase duas dezenas de jogadores que se reuniam para jogar em{' '}
            {site.cidade}. Com o tempo veio a vontade de ir além: abrir a quadra para crianças e jovens,
            formar novos atletas e criar um espaço de convivência saudável.
          </p>
          <p>
            Estamos formalizando a associação sem fins lucrativos para firmar parcerias com a prefeitura,
            escolas e empresas locais. Toda a prestação de contas será pública aqui no site.
          </p>
        </div>
      </section>

      <section className="secao secao-creme">
        <div className="container">
          <span className="rotulo">Identidade</span>
          <h2>O que nosso escudo diz</h2>
          <div className={styles.grade3}>
            {simbolos.map((s) => (
              <article key={s.titulo} className={styles.cartao}>
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </article>
            ))}
          </div>
          <Image
            src="/img/bandeira.jpg"
            alt="Bandeira do Farmers: faixas verde, creme e vermelha com o escudo circular"
            width={1500}
            height={1000}
            className={styles.bandeira}
            sizes="(max-width: 760px) 100vw, 720px"
          />
        </div>
      </section>

      <section className="secao">
        <div className={`container ${styles.texto}`}>
          <span className="rotulo">Diretoria</span>
          <h2>Quem faz acontecer</h2>
          <p>
            A diretoria e o conselho fiscal serão eleitos na assembleia de fundação. Assim que estiverem
            definidos, os nomes aparecem aqui.
          </p>
        </div>
      </section>
    </>
  )
}
