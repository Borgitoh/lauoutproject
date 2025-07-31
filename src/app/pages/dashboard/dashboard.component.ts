import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import type { QueixaService } from "../../services/queixa.service"
import type { CriminosoService } from "../../services/criminoso.service"
import type { Queixa } from "../../models/queixa.model"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-gray-600">Visão geral do sistema</p>
      </div>

      <!-- Estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total de Queixas</p>
              <p class="text-2xl font-semibold text-gray-900">{{totalQueixas}}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-full">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Em Investigação</p>
              <p class="text-2xl font-semibold text-gray-900">{{queixasEmInvestigacao}}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 bg-red-100 rounded-full">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Criminosos Registrados</p>
              <p class="text-2xl font-semibold text-gray-900">{{totalCriminosos}}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-full">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Casos Resolvidos</p>
              <p class="text-2xl font-semibold text-gray-900">{{casosResolvidos}}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Queixas Recentes -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Queixas Recentes</h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div *ngFor="let queixa of queixasRecentes" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-900">{{queixa.numeroProcesso}}</p>
                <p class="text-sm text-gray-600">{{queixa.tipoQueixa}} - {{queixa.local}}</p>
                <p class="text-xs text-gray-500">{{queixa.dataRegistro | date:'dd/MM/yyyy'}}</p>
              </div>
              <div>
                <span class="px-3 py-1 text-xs font-medium rounded-full"
                      [ngClass]="{
                        'bg-yellow-100 text-yellow-800': queixa.status === 'Pendente',
                        'bg-blue-100 text-blue-800': queixa.status === 'Em Investigação',
                        'bg-green-100 text-green-800': queixa.status === 'Resolvido',
                        'bg-gray-100 text-gray-800': queixa.status === 'Arquivado'
                      }">
                  {{queixa.status}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  totalQueixas = 0
  queixasEmInvestigacao = 0
  totalCriminosos = 0
  casosResolvidos = 0
  queixasRecentes: Queixa[] = []

  constructor(
    private queixaService: QueixaService,
    private criminosoService: CriminosoService,
  ) {}

  ngOnInit() {
    this.queixaService.getQueixas().subscribe((queixas) => {
      this.totalQueixas = queixas.length
      this.queixasEmInvestigacao = queixas.filter((q) => q.status === "Em Investigação").length
      this.casosResolvidos = queixas.filter((q) => q.status === "Resolvido").length
      this.queixasRecentes = queixas.slice(-5).reverse()
    })

    this.criminosoService.getCriminosos().subscribe((criminosos) => {
      this.totalCriminosos = criminosos.length
    })
  }
}
