import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import type { ActivatedRoute, Router } from "@angular/router"
import type { CriminosoService } from "../../services/criminoso.service"
import type { Criminoso } from "../../models/queixa.model"

@Component({
  selector: "app-detalhes-criminoso",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="criminoso" class="max-w-4xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <button (click)="voltar()" 
                class="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Voltar
        </button>
        <span class="px-3 py-1 text-sm font-medium rounded-full"
              [ngClass]="{
                'bg-red-100 text-red-800': criminoso.status === 'Procurado',
                'bg-orange-100 text-orange-800': criminoso.status === 'Detido',
                'bg-green-100 text-green-800': criminoso.status === 'Em Liberdade',
                'bg-purple-100 text-purple-800': criminoso.status === 'Foragido'
              }">
          {{criminoso.status}}
        </span>
      </div>

      <!-- Informações Pessoais -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h1 class="text-2xl font-bold text-gray-900">{{criminoso.nome}}</h1>
          <p *ngIf="criminoso.alcunha" class="text-gray-600">"{{criminoso.alcunha}}"</p>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Bilhete de Identidade</label>
                <p class="text-gray-900">{{criminoso.bi || 'Não informado'}}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Data de Nascimento</label>
                <p class="text-gray-900">{{criminoso.dataNascimento | date:'dd/MM/yyyy'}} ({{criminoso.idade}} anos)</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Gênero</label>
                <p class="text-gray-900">{{criminoso.genero === 'M' ? 'Masculino' : 'Feminino'}}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Naturalidade</label>
                <p class="text-gray-900">{{criminoso.naturalidade}}</p>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Endereço</label>
                <p class="text-gray-900">{{criminoso.endereco}}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Telefone</label>
                <p class="text-gray-900">{{criminoso.telefone || 'Não informado'}}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Descrição Física</label>
                <p class="text-gray-900">{{criminoso.descricaoFisica}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Registro Criminal -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Registro Criminal</h2>
          <p class="text-gray-600">{{criminoso.registroCriminal.length}} ocorrência(s) registrada(s)</p>
        </div>
        <div class="p-6">
          <div *ngIf="criminoso.registroCriminal.length === 0" class="text-center py-8">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum registro criminal</h3>
            <p class="mt-1 text-sm text-gray-500">Este indivíduo não possui registros criminais.</p>
          </div>

          <div *ngIf="criminoso.registroCriminal.length > 0" class="space-y-6">
            <div *ngFor="let registro of criminoso.registroCriminal" 
                 class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{{registro.tipoCrime}}</h3>
                  <p class="text-sm text-gray-500">{{registro.dataOcorrencia | date:'dd/MM/yyyy'}}</p>
                </div>
                <span class="px-2 py-1 text-xs font-medium rounded-full"
                      [ngClass]="{
                        'bg-yellow-100 text-yellow-800': registro.status === 'Em Investigação',
                        'bg-green-100 text-green-800': registro.status === 'Condenado',
                        'bg-red-100 text-red-800': registro.status === 'Foragido',
                        'bg-gray-100 text-gray-800': registro.status === 'Arquivado'
                      }">
                  {{registro.status}}
                </span>
              </div>
              
              <div class="space-y-2">
                <div>
                  <label class="block text-sm font-medium text-gray-500">Descrição</label>
                  <p class="text-gray-900">{{registro.descricao}}</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-500">Local</label>
                    <p class="text-gray-900">{{registro.local}}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-500">Província</label>
                    <p class="text-gray-900">{{registro.provincia}}</p>
                  </div>
                </div>
                <div *ngIf="registro.pena" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-500">Pena</label>
                    <p class="text-gray-900">{{registro.pena}}</p>
                  </div>
                  <div *ngIf="registro.dataCondenacao">
                    <label class="block text-sm font-medium text-gray-500">Data da Condenação</label>
                    <p class="text-gray-900">{{registro.dataCondenacao | date:'dd/MM/yyyy'}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="!criminoso" class="text-center py-12">
      <h3 class="text-lg font-medium text-gray-900">Criminoso não encontrado</h3>
      <p class="text-gray-500">O criminoso solicitado não foi encontrado no sistema.</p>
      <button (click)="voltar()" 
              class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Voltar
      </button>
    </div>
  `,
})
export class DetalhesCriminosoComponent implements OnInit {
  criminoso: Criminoso | undefined

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private criminosoService: CriminosoService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id")
    if (id) {
      this.criminoso = this.criminosoService.getCriminosoPorId(id)
    }
  }

  voltar() {
    this.router.navigate(["/criminosos"])
  }
}
