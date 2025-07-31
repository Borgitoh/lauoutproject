import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import type { Router } from "@angular/router"
import type { QueixaService } from "../../services/queixa.service"
import type { Queixa } from "../../models/queixa.model"

@Component({
  selector: "app-nova-queixa",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Nova Queixa</h1>
        <p class="text-gray-600">Registar nova queixa ou denúncia</p>
      </div>

      <form (ngSubmit)="onSubmit()" #queixaForm="ngForm" class="bg-white rounded-lg shadow p-6 space-y-6">
        <!-- Informações da Queixa -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Informações da Queixa</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Queixa</label>
              <select [(ngModel)]="queixa.tipoQueixa" name="tipoQueixa" required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Selecione o tipo</option>
                <option value="Roubo">Roubo</option>
                <option value="Furto">Furto</option>
                <option value="Agressão">Agressão</option>
                <option value="Vandalismo">Vandalismo</option>
                <option value="Fraude">Fraude</option>
                <option value="Violência Doméstica">Violência Doméstica</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Província</label>
              <select [(ngModel)]="queixa.provincia" name="provincia" required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Selecione a província</option>
                <option value="Luanda">Luanda</option>
                <option value="Benguela">Benguela</option>
                <option value="Huambo">Huambo</option>
                <option value="Lobito">Lobito</option>
                <option value="Cabinda">Cabinda</option>
                <option value="Huíla">Huíla</option>
                <option value="Malanje">Malanje</option>
                <option value="Namibe">Namibe</option>
              </select>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Município</label>
              <input type="text" [(ngModel)]="queixa.municipio" name="municipio" required
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Local Específico</label>
              <input type="text" [(ngModel)]="queixa.local" name="local" required
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Descrição da Ocorrência</label>
            <textarea [(ngModel)]="queixa.descricao" name="descricao" required rows="4"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Descreva detalhadamente o que aconteceu..."></textarea>
          </div>
        </div>

        <!-- Dados do Queixoso -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Dados do Queixoso</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
              <input type="text" [(ngModel)]="queixa.queixoso.nome" name="queixosoNome" required
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bilhete de Identidade</label>
              <input type="text" [(ngModel)]="queixa.queixoso.bi" name="queixosoBI" required
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
              <input type="tel" [(ngModel)]="queixa.queixoso.telefone" name="queixosoTelefone" required
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
              <input type="text" [(ngModel)]="queixa.queixoso.endereco" name="queixosoEndereco" required
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>
        </div>

        <!-- Dados do Suspeito (Opcional) -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Dados do Suspeito (Opcional)</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome</label>
              <input type="text" [(ngModel)]="queixa.suspeito.nome" name="suspeitoNome"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Alcunha</label>
              <input type="text" [(ngModel)]="queixa.suspeito.alcunha" name="suspeitoAlcunha"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Idade Aproximada</label>
              <input type="number" [(ngModel)]="queixa.suspeito.idade" name="suspeitoIdade"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Agente Responsável</label>
              <input type="text" [(ngModel)]="queixa.agente" name="agente" required
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Descrição Física do Suspeito</label>
            <textarea [(ngModel)]="queixa.suspeito.descricaoFisica" name="suspeitoDescricao" rows="3"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Altura, peso, cor da pele, sinais particulares, vestuário..."></textarea>
          </div>
        </div>

        <!-- Botões -->
        <div class="flex justify-end space-x-4 pt-6 border-t">
          <button type="button" (click)="cancelar()"
                  class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          <button type="submit" [disabled]="!queixaForm.valid"
                  class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Registar Queixa
          </button>
        </div>
      </form>
    </div>
  `,
})
export class NovaQueixaComponent {
  queixa: Partial<Queixa> = {
    tipoQueixa: "",
    descricao: "",
    local: "",
    provincia: "",
    municipio: "",
    queixoso: {
      nome: "",
      bi: "",
      telefone: "",
      endereco: "",
    },
    suspeito: {
      nome: "",
      alcunha: "",
      idade: undefined,
      descricaoFisica: "",
    },
    status: "Pendente",
    agente: "",
  }

  constructor(
    private queixaService: QueixaService,
    private router: Router,
  ) {}

  onSubmit() {
    if (this.queixa.tipoQueixa && this.queixa.descricao && this.queixa.queixoso?.nome) {
      this.queixaService.adicionarQueixa(this.queixa as Omit<Queixa, "id" | "numeroProcesso" | "dataRegistro">)
      this.router.navigate(["/queixas"])
    }
  }

  cancelar() {
    this.router.navigate(["/queixas"])
  }
}
