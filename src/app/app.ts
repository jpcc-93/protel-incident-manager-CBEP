import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './componentes/navbar/navbar';
import { Topbar } from './componentes/topbar/topbar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Navbar,Topbar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
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
