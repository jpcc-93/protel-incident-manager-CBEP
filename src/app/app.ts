import { Component, signal } from '@angular/core';
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
  protected readonly title = signal('ProtelApp');
}
