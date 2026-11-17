import PageHeader from '@/components/PageHeader'
import InscricaoForm from '@/components/InscricaoForm'
import { turmas, site } from '@/lib/site'

export const metadata = {
  title: 'Pré-inscrição',
  description: `Pré-inscrição nas turmas de basquete do ${site.nome}.`,
}

export default function Inscricao() {
  return (
    <>
      <PageHeader rotulo="Inscrição" titulo="Pré-inscrição">
        Preencha os dados abaixo. A mensagem é enviada para o nosso WhatsApp e entramos em contato quando as
        turmas abrirem.
      </PageHeader>
      <section className="secao">
        <div className="container">
          <InscricaoForm
            turmas={turmas.map(({ id, nome, idade }) => ({ id, nome, idade }))}
            whatsapp={site.contato.whatsapp}
          />
        </div>
      </section>
    </>
  )
}
