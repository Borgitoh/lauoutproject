export interface Queixa {
  id: string
  numeroProcesso: string
  dataRegistro: Date
  tipoQueixa: string
  descricao: string
  local: string
  provincia: string
  municipio: string
  queixoso: {
    nome: string
    bi: string
    telefone: string
    endereco: string
  }
  suspeito?: {
    nome?: string
    alcunha?: string
    idade?: number
    descricaoFisica?: string
  }
  status: "Pendente" | "Em Investigação" | "Resolvido" | "Arquivado"
  agente: string
}

export interface Criminoso {
  id: string
  nome: string
  alcunha?: string
  bi?: string
  dataNascimento: Date
  idade: number
  genero: "M" | "F"
  naturalidade: string
  endereco: string
  telefone?: string
  descricaoFisica: string
  foto?: string
  registroCriminal: RegistroCriminal[]
  status: "Procurado" | "Detido" | "Em Liberdade" | "Foragido"
}

export interface RegistroCriminal {
  id: string
  dataOcorrencia: Date
  tipoCrime: string
  descricao: string
  local: string
  provincia: string
  status: string
  pena?: string
  dataCondenacao?: Date
}
