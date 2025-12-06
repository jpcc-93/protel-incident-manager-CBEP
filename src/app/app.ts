import { Component, signal, WritableSignal, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from './componentes/navbar/navbar';
import { TopbarComponent } from './componentes/topbar/topbar';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, TopbarComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Usamos una señal para manejar el estado de la barra lateral.
  // Esto permite que los cambios se detecten automáticamente en la plantilla.
  isSidebarOpen: WritableSignal<boolean> = signal(true);

  // Variable para controlar si mostramos el layout completo (sidebar/topbar)
  showLayout: boolean = true;

  private router = inject(Router);

  constructor() {
    // Escuchar cambios de ruta para ocultar layout en login/register
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const currentUrl = event.urlAfterRedirects;
      // Ocultar si la ruta es /login o /register
      this.showLayout = !currentUrl.includes('/login') && !currentUrl.includes('/register');
    });
  }

  /**
   * Cambia el estado de la barra lateral (abierta/cerrada).
   * Se llama desde el componente de la barra superior (topbar).
   */
  toggleSidebar(): void {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }
}
