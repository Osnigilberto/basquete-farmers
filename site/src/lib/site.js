// Configuração central do site — edite aqui contatos, PIX e turmas.
// Campos vazios ('') fazem o site mostrar "em breve" no lugar.

export const site = {
  nome: 'Antônio Carlos Farmers',
  nomeCurto: 'Farmers',
  cidade: 'Antônio Carlos',
  estado: 'SC',
  slogan: 'Basquete que planta futuro.',
  descricao:
    'Projeto social de basquete em Antônio Carlos, Santa Catarina. Esporte, disciplina e comunidade para crianças, jovens e adultos.',
  url: 'https://antonio-carlos-farmers.vercel.app', // trocar quando o domínio próprio for registrado

  contato: {
    // Número no formato internacional, só dígitos. Ex.: '5548999999999'
    whatsapp: '',
    instagram: '', // ex.: 'acfarmers' (sem @)
    email: '',
  },

  pix: {
    chave: '', // preencher após abrir a conta PJ da associação
    favorecido: 'Associação Antônio Carlos Farmers',
  },
}

// Turmas planejadas — horários e locais ainda a definir
export const turmas = [
  {
    id: 'sub15',
    nome: 'Sub-15',
    idade: 'até 15 anos',
    foco: 'Fundamentos, jogo coletivo e primeiros amistosos. Porta de entrada para quem está começando.',
    dias: 'A definir',
    local: 'A definir',
  },
  {
    id: 'sub17',
    nome: 'Sub-17',
    idade: '16 a 17 anos',
    foco: 'Tática, preparo físico e competições regionais.',
    dias: 'A definir',
    local: 'A definir',
  },
  {
    id: 'adulto',
    nome: 'Adulto',
    idade: '18+',
    foco: 'Time da associação: treinos, amistosos e campeonatos. Também forma monitores para as turmas de base.',
    dias: 'A definir',
    local: 'A definir',
  },
]

export const nav = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/turmas', label: 'Turmas' },
  { href: '/apoie', label: 'Apoie' },
]

export function whatsappLink(mensagem = '') {
  if (!site.contato.whatsapp) return null
  const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : ''
  return `https://wa.me/${site.contato.whatsapp}${texto}`
}

export function instagramLink() {
  return site.contato.instagram ? `https://instagram.com/${site.contato.instagram}` : null
}
