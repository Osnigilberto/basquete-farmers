'use client'

import { useState } from 'react'
import styles from './InscricaoForm.module.css'

function idadeEm(dataISO) {
  if (!dataISO) return null
  const nasc = new Date(dataISO + 'T00:00:00')
  const hoje = new Date()
  let idade = hoje.getFullYear() - nasc.getFullYear()
  const m = hoje.getMonth() - nasc.getMonth()
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--
  return idade
}

export default function InscricaoForm({ turmas, whatsapp }) {
  const [nascimento, setNascimento] = useState('')
  const idade = idadeEm(nascimento)
  const menor = idade !== null && idade < 18
  const aberto = Boolean(whatsapp)

  function enviar(e) {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.currentTarget))
    const turma = turmas.find((t) => t.id === d.turma)
    const linhas = [
      '*Pré-inscrição — Farmers*',
      `Atleta: ${d.nome}`,
      `Nascimento: ${d.nascimento.split('-').reverse().join('/')} (${idade} anos)`,
      `Turma: ${turma ? turma.nome : d.turma}`,
      menor ? `Responsável: ${d.responsavel}` : null,
      `Telefone: ${d.telefone}`,
      d.experiencia ? `Experiência: ${d.experiencia}` : null,
      menor
        ? 'O responsável autoriza a participação e o uso de imagem nas atividades do projeto.'
        : 'Autorizo o uso de imagem nas atividades do projeto.',
    ].filter(Boolean)
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener')
  }

  return (
    <form className={styles.form} onSubmit={enviar}>
      {!aberto && (
        <p className={styles.aviso} role="status">
          As pré-inscrições abrem em breve. Acompanhe pelas nossas redes!
        </p>
      )}

      <fieldset disabled={!aberto}>
        <label>
          Nome do atleta
          <input name="nome" required autoComplete="name" />
        </label>

        <div className={styles.linha}>
          <label>
            Data de nascimento
            <input
              name="nascimento"
              type="date"
              required
              value={nascimento}
              onChange={(e) => setNascimento(e.target.value)}
            />
          </label>
          <label>
            Turma
            <select name="turma" required defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              {turmas.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome} ({t.idade})
                </option>
              ))}
            </select>
          </label>
        </div>

        {menor && (
          <label>
            Nome do responsável
            <input name="responsavel" required />
          </label>
        )}

        <label>
          WhatsApp para contato{menor ? ' (do responsável)' : ''}
          <input name="telefone" type="tel" required autoComplete="tel" placeholder="(48) 9 0000-0000" />
        </label>

        <label>
          <span>
            Já jogou basquete? <span className={styles.opcional}>(opcional)</span>
          </span>
          <textarea name="experiencia" rows={3} />
        </label>

        <label className={styles.check}>
          <input type="checkbox" name="consentimento" required />
          <span>
            {menor
              ? 'Sou o responsável legal e autorizo a participação do atleta e o uso dos dados e da imagem apenas para as atividades do projeto.'
              : 'Autorizo o uso dos meus dados e da minha imagem apenas para as atividades do projeto.'}
          </span>
        </label>

        <button type="submit" className="btn btn-vermelho">
          Enviar pelo WhatsApp
        </button>
      </fieldset>
    </form>
  )
}
