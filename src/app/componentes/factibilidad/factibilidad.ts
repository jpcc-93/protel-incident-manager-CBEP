import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FactibilidadService } from '../../services/factibilidad.service';
import { ClienteService } from '../../services/cliente.service';
import { Factibilidad as IFactibilidad } from '../../interfaces/factibilidad.interface';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-factibilidad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './factibilidad.html',
  styleUrls: ['./factibilidad.css']
})
export class Factibilidad implements OnInit {

  factibilidad: IFactibilidad = {
    idFactibilidad: 0,
    nombreProyecto: '',
    idCliente: 0,
    ubicacion: '', // Corregido de 'direccion' a 'ubicacion'
    descripcion: '', // Corregido de 'notas' a 'descripcion'
    fechaSolicitud: new Date(), // Corregido de 'fechaCreacion'
    idEstadoFactibilidad: 1, // Por defecto: 'Nuevo' o 'Pendiente'
  };

  clients: Cliente[] = [];

  constructor(
    private factibilidadService: FactibilidadService,
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(data => {
      // Filtramos para mostrar solo clientes activos
      this.clients = data.filter(cliente => cliente.idEstadoCliente === 1);
    });
  }

  onSubmit() {
    this.factibilidad.fechaSolicitud = new Date();
    this.factibilidad.idEstadoFactibilidad = 1; // Asignar estado inicial

    this.factibilidadService.guardarFactibilidad(this.factibilidad).subscribe(() => {
      // Navegar a una futura lista de factibilidades o al dashboard
      this.router.navigate(['/dashboard']); 
    });
  }
}
