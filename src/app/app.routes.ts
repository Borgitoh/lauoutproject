import type { Routes } from "@angular/router"

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    loadComponent: () => import("./pages/dashboard/dashboard.component").then((m) => m.DashboardComponent),
  },
  {
    path: "queixas",
    loadComponent: () => import("./pages/queixas/queixas.component").then((m) => m.QueixasComponent),
  },
  {
    path: "nova-queixa",
    loadComponent: () => import("./pages/nova-queixa/nova-queixa.component").then((m) => m.NovaQueixaComponent),
  },
  {
    path: "criminosos",
    loadComponent: () => import("./pages/criminosos/criminosos.component").then((m) => m.CriminososComponent),
  },
  {
    path: "criminoso/:id",
    loadComponent: () =>
      import("./pages/detalhes-criminoso/detalhes-criminoso.component").then((m) => m.DetalhesCriminosoComponent),
  },
]
