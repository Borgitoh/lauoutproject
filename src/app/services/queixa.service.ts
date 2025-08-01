import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"
import type { Queixa } from "../models/queixa.model"

@Injectable({
  providedIn: "root",
})
export class QueixaService {
  private queixas: Queixa[] = [
    {
      id: "1",
      numeroProcesso: "PNA-2024-001",
      dataRegistro: new Date("2024-01-15"),
      tipoQueixa: "Roubo",
      descricao: "Roubo de telemóvel na via pública durante o período da manhã",
      local: "Rua da Missão, Luanda",
      provincia: "Luanda",
      municipio: "Luanda",
      queixoso: {
        nome: "João Manuel Silva",
        bi: "004567890LA041",
        telefone: "+244 923 456 789",
        endereco: "Bairro Maianga, Luanda",
      },
      suspeito: {
        nome: "António dos Santos",
        alcunha: "Toninho",
        idade: 25,
        descricaoFisica: "Alto, magro, cicatriz no rosto esquerdo",
      },
      status: "Em Investigação",
      agente: "Inspetor Carlos Mendes",
    },
    {
      id: "2",
      numeroProcesso: "PNA-2024-002",
      dataRegistro: new Date("2024-01-16"),
      tipoQueixa: "Furto",
      descricao: "Furto em residência durante a madrugada, levaram televisão e outros objetos",
      local: "Bairro Alvalade, Luanda",
      provincia: "Luanda",
      municipio: "Luanda",
      queixoso: {
        nome: "Maria Fernanda Costa",
        bi: "005678901LA042",
        telefone: "+244 924 567 890",
        endereco: "Bairro Alvalade, Luanda",
      },
      status: "Pendente",
      agente: "Agente Ana Rodrigues",
    },
    {
      id: "3",
      numeroProcesso: "PNA-2024-003",
      dataRegistro: new Date("2024-01-17"),
      tipoQueixa: "Agressão",
      descricao: "Agressão física em estabelecimento comercial",
      local: "Mercado do Roque Santeiro, Luanda",
      provincia: "Luanda",
      municipio: "Luanda",
      queixoso: {
        nome: "Pedro António Neto",
        bi: "006789012LA043",
        telefone: "+244 925 678 901",
        endereco: "Bairro Sambizanga, Luanda",
      },
      status: "Resolvido",
      agente: "Sargento Miguel Santos",
    },
  ]

  private queixasSubject = new BehaviorSubject<Queixa[]>(this.queixas)

  getQueixas(): Observable<Queixa[]> {
    return this.queixasSubject.asObservable()
  }

  adicionarQueixa(queixa: Omit<Queixa, "id" | "numeroProcesso" | "dataRegistro">): void {
    const novaQueixa: Queixa = {
      ...queixa,
      id: Date.now().toString(),
      numeroProcesso: `PNA-2024-${String(this.queixas.length + 1).padStart(3, "0")}`,
      dataRegistro: new Date(),
    }

    this.queixas.push(novaQueixa)
    this.queixasSubject.next(this.queixas)
  }

  getQueixaPorId(id: string): Queixa | undefined {
    return this.queixas.find((q) => q.id === id)
  }
}
