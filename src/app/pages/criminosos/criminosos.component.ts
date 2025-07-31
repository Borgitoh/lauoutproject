import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import type { CriminosoService } from "../../services/criminoso.service"
import type { Criminoso } from "../../models/queixa.model"

@Component({
  selector: "app-criminosos",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Criminosos Registrados</h1>
        <p class="text-gray-600">Base de dados de criminosos e seus registros</p>
      </div>

      <!-- Busca -->
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex space-x-4">
          <div class="flex-1">
            <input type="text" [(ngModel)]="termoBusca" (input)="buscar()"
                   placeholder="Buscar por nome, alcunha ou BI..."
                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <button (click)="limparBusca()"
                  class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
            Limpar
          </button>
        </div>
      </div>

      <!-- Lista de Criminosos -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let criminoso of criminososFiltrados" 
             class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">{{criminoso.nome}}</h3>
                <p *ngIf="criminoso.alcunha" class="text-sm text-gray-600">"{{criminoso.alcunha}}"</p>
                <p class="text-sm text-gray-500">{{criminoso.idade}} anos</p>
              </div>
              <span class="px-2 py-1 text-xs font-medium rounded-full"
                    [ngClass]="{
                      'bg-red-100 text-red-800': criminoso.status === 'Procurado',
                      'bg-orange-100 text-orange-800': criminoso.status === 'Detido',
                      'bg-green-100 text-green-800': criminoso.status === 'Em Liberdade',
                      'bg-purple-100 text-purple-800': criminoso.status === 'Foragido'
                    }">
                {{criminoso.status}}
              </span>
            </div>

            <div class="space-y-2 mb-4">
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 011-1h2a2 2 0 011 1v2m-4 0a2 2 0 01-2 2h-2a2 2 0 01-2-2m0 0h4v2m-4-2v2"></path>
                </svg>
                {{criminoso.bi || 'BI não informado'}}
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {{criminoso.naturalidade}}
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                {{criminoso.registroCriminal.length}} registro(s) criminal(is)
              </div>
            </div>

            <div class="border-t pt-4">
              <p class="text-sm text-gray-600 mb-3">Descrição Física:</p>
              <p class="text-sm text-gray-800">{{criminoso.descricaoFisica}}</p>
            </div>

            <div class="mt-4 pt-4 border-t">
              <a [routerLink]="['/criminoso', criminoso.id]"
                 class="w-full inline-flex justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Ver Detalhes
              </a>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="criminososFiltrados.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum criminoso encontrado</h3>
        <p class="mt-1 text-sm text-gray-500">Tente ajustar os termos de busca.</p>
      </div>
    </div>
  `,
})
export class CriminososComponent implements OnInit {
  criminosos: Criminoso[] = []
  criminososFiltrados: Criminoso[] = []
  termoBusca = ""

  constructor(private criminosoService: CriminosoService) {}

  ngOnInit() {
    this.criminosoService.getCriminosos().subscribe((criminosos) => {
      this.criminosos = criminosos
      this.criminososFiltrados = criminosos
    })
  }

  buscar() {
    if (this.termoBusca.trim()) {
      this.criminososFiltrados = this.criminosoService.buscarCriminosos(this.termoBusca)
    } else {
      this.criminososFiltrados = this.criminosos
    }
  }

  limparBusca() {
    this.termoBusca = ""
    this.criminososFiltrados = this.criminosos
  }
}
