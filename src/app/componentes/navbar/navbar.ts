import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  // Recibe el estado de la barra lateral desde el componente padre (app.component).
  // El decorador @Input() permite que este valor se pase a través de la plantilla.
  @Input() isSidebarOpen: boolean = true;
}
