import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"
import type { Criminoso } from "../models/queixa.model"

@Injectable({
  providedIn: "root",
})
export class CriminosoService {
  private criminosos: Criminoso[] = [
    {
      id: "1",
      nome: "António dos Santos",
      alcunha: "Toninho",
      bi: "006789012LA043",
      dataNascimento: new Date("1998-05-15"),
      idade: 26,
      genero: "M",
      naturalidade: "Luanda",
      endereco: "Bairro Rangel, Luanda",
      telefone: "+244 925 678 901",
      descricaoFisica: "Alto, magro, cicatriz no rosto esquerdo, tatuagem no braço direito",
      registroCriminal: [
        {
          id: "1",
          dataOcorrencia: new Date("2023-08-10"),
          tipoCrime: "Roubo",
          descricao: "Roubo à mão armada em estabelecimento comercial",
          local: "Rua da Missão, Luanda",
          provincia: "Luanda",
          status: "Condenado",
          pena: "2 anos de prisão",
          dataCondenacao: new Date("2023-12-15"),
        },
        {
          id: "2",
          dataOcorrencia: new Date("2024-01-15"),
          tipoCrime: "Roubo",
          descricao: "Roubo de telemóvel na via pública",
          local: "Rua da Missão, Luanda",
          provincia: "Luanda",
          status: "Em Investigação",
        },
      ],
      status: "Procurado",
    },
    {
      id: "2",
      nome: "Carlos Alberto Ferreira",
      alcunha: "Carlitos",
      bi: "007890123LA044",
      dataNascimento: new Date("1995-03-22"),
      idade: 29,
      genero: "M",
      naturalidade: "Benguela",
      endereco: "Bairro Cazenga, Luanda",
      descricaoFisica: "Médio, forte, barba, sem sinais particulares",
      registroCriminal: [
        {
          id: "3",
          dataOcorrencia: new Date("2022-11-05"),
          tipoCrime: "Furto",
          descricao: "Furto de veículo",
          local: "Bairro Miramar, Luanda",
          provincia: "Luanda",
          status: "Condenado",
          pena: "1 ano de prisão",
          dataCondenacao: new Date("2023-02-20"),
        },
      ],
      status: "Em Liberdade",
    },
  ]

  private criminososSubject = new BehaviorSubject<Criminoso[]>(this.criminosos)

  getCriminosos(): Observable<Criminoso[]> {
    return this.criminososSubject.asObservable()
  }

  getCriminosoPorId(id: string): Criminoso | undefined {
    return this.criminosos.find((c) => c.id === id)
  }

  buscarCriminosos(termo: string): Criminoso[] {
    return this.criminosos.filter(
      (c) =>
        c.nome.toLowerCase().includes(termo.toLowerCase()) ||
        c.alcunha?.toLowerCase().includes(termo.toLowerCase()) ||
        c.bi?.includes(termo),
    )
  }
}
