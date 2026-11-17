import Image from 'next/image'
import PageHeader from '@/components/PageHeader'
import { site, whatsappLink } from '@/lib/site'
import styles from '../interno.module.css'

export const metadata = {
  title: 'Apoie',
  description: `Patrocine, doe ou seja voluntário no ${site.nome}.`,
}

const formas = [
  {
    titulo: 'Empresa patrocinadora',
    texto:
      'Sua marca na faixa da quadra, no backdrop de entrevistas, nas redes sociais e aqui no site. Cotas sob medida para o comércio local.',
    msg: 'Olá! Tenho uma empresa e quero saber sobre patrocínio do Farmers.',
  },
  {
    titulo: 'Sócio apoiador',
    texto:
      'Uma contribuição mensal, de qualquer valor, via PIX. É o que garante bola, coletes e material de treino o ano todo.',
    msg: 'Olá! Quero ser sócio apoiador do Farmers.',
  },
  {
    titulo: 'Voluntário',
    texto:
      'Precisamos de técnicos, monitores, fotógrafos, motoristas e gente boa de organização. Seu tempo vale muito.',
    msg: 'Olá! Quero ser voluntário no Farmers.',
  },
]

export default function Apoie() {
  return (
    <>
      <PageHeader rotulo="Apoie" titulo="Jogue junto com a gente">
        O Farmers é um projeto social sem fins lucrativos. Todo apoio vira esporte para a juventude de{' '}
        {site.cidade}.
      </PageHeader>

      <section className="secao">
        <div className="container">
          <div className={styles.grade3}>
            {formas.map((f) => {
              const link = whatsappLink(f.msg)
              return (
                <article key={f.titulo} className={`${styles.cartao} ${styles.cartaoAcao}`}>
                  <h3>{f.titulo}</h3>
                  <p>{f.texto}</p>
                  {link ? (
                    <a href={link} className="btn btn-verde">
                      WhatsApp
                    </a>
                  ) : (
                    <span className="btn btn-verde" aria-disabled="true">
                      Em breve
                    </span>
                  )}
                </article>
              )
            })}
          </div>

          <div className={styles.destaque}>
            <span className="rotulo">PIX</span>
            <h2>Doe qualquer valor</h2>
            {site.pix.chave ? (
              <>
                <p>Favorecido: {site.pix.favorecido}</p>
                <span className={styles.pix}>{site.pix.chave}</span>
              </>
            ) : (
              <p>
                A chave PIX da associação será publicada aqui assim que a conta oficial (CNPJ) estiver aberta.
                Não aceitamos doações em contas pessoais.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="secao secao-creme">
        <div className="container">
          <span className="rotulo">Visibilidade</span>
          <h2>Onde sua marca aparece</h2>
          <Image
            src="/img/faixa.jpg"
            alt="Faixa de quadra do Farmers, 3 x 0,9 metros"
            width={1600}
            height={480}
            className={styles.bandeira}
            style={{ maxWidth: '100%', marginTop: 24 }}
            sizes="(max-width: 1120px) 100vw, 1080px"
          />
          <ul className={styles.cotas}>
            <li>Faixas na quadra em treinos e jogos</li>
            <li>Backdrop de entrevistas e fotos oficiais</li>
            <li>Posts de dia de jogo no Instagram</li>
            <li>Logo na página de patrocinadores deste site</li>
          </ul>
        </div>
      </section>
    </>
  )
}
