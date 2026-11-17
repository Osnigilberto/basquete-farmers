import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import { turmas } from '@/lib/site'
import styles from '../interno.module.css'

export const metadata = {
  title: 'Turmas',
  description: 'Turmas de basquete por faixa etária: Sub-15, Sub-17 e Adulto.',
}

export default function Turmas() {
  return (
    <>
      <PageHeader rotulo="Turmas" titulo="Escolha sua turma">
        Horários e locais estão sendo definidos. Faça a pré-inscrição e avisamos você assim que as aulas
        começarem.
      </PageHeader>

      <section className="secao">
        <div className="container">
          <div className={styles.grade3}>
            {turmas.map((t) => (
              <article key={t.id} className={styles.cartaoTurma}>
                <h3>{t.nome}</h3>
                <span className={styles.idade}>{t.idade}</span>
                <p>{t.foco}</p>
                <dl className={styles.detalhes}>
                  <dt>Dias</dt>
                  <dd>{t.dias}</dd>
                  <dt>Local</dt>
                  <dd>{t.local}</dd>
                </dl>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 40, textAlign: 'center' }}>
            <Link href="/inscricao" className="btn btn-vermelho">
              Fazer pré-inscrição
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
