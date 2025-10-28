import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css'
})
export class Topbar {
  // Declara un emisor de eventos llamado 'toggleSidebar'.
  // El componente padre (app.component) puede escuchar este evento.
  @Output() toggleSidebar = new EventEmitter<void>();

  /**
   * Se llama cuando se hace clic en el botón del menú.
   * Emite el evento 'toggleSidebar' para notificar al componente padre.
   */
  onMenuClick(): void {
    this.toggleSidebar.emit();
  }
}
