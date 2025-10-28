import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './componentes/navbar/navbar';
import { Topbar } from './componentes/topbar/topbar';
import { FormularioCliente } from './componentes/formulario-cliente/formulario-cliente';
import { Dashboard } from './componentes/dashboard/dashboard';
import { Factibilidad } from './componentes/factibilidad/factibilidad';
import { AcercaDe } from './componentes/acerca-de/acerca-de';
import { ModuloCliente } from './componentes/modulo-cliente/modulo-cliente';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,Topbar,FormularioCliente,Dashboard
    ,Factibilidad,AcercaDe,ModuloCliente],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Usamos una señal para manejar el estado de la barra lateral.
  // Esto permite que los cambios se detecten automáticamente en la plantilla.
  isSidebarOpen: WritableSignal<boolean> = signal(true);

  /**
   * Cambia el estado de la barra lateral (abierta/cerrada).
   * Se llama desde el componente de la barra superior (topbar).
   */
  toggleSidebar(): void {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }
}
