import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-blue-900 text-white shadow-lg">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
              <span class="text-blue-900 font-bold text-lg">PNA</span>
            </div>
            <div>
              <h1 class="text-xl font-bold">Polícia Nacional de Angola</h1>
              <p class="text-blue-200 text-sm">Sistema de Registro de Queixas e Denúncias</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm">Agente: João Silva</span>
            <div class="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
              <span class="text-xs font-bold">JS</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {}
