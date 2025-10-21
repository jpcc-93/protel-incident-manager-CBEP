import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {

  // Variable para controlar el estado de la sidebar
  isSidebarOpen = true;

  // Función para abrir/cerrar la sidebar
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  // Función para cerrar la sidebar (útil para móvil)
  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

}
