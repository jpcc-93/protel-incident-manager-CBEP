import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-modulo-cliente',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Añadir FormsModule
  templateUrl: './modulo-cliente.html',
  styleUrls: ['./modulo-cliente.css']
})
export class ModuloCliente implements OnInit {

  filteredClients: Cliente[] = []; // Lista para mostrar en la tabla
  searchTerm: string = ''; // Término de búsqueda

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe({
      next: data => {
        console.log('ngOnInit: getClientes ->', data);
        this.filteredClients = data;
      },
      error: err => {
        console.error('ngOnInit: error getClientes ->', err);
      }
    });
  }

  onSearch(): void {
    // Siempre llamamos a searchClientes. El servicio se encarga de devolver
    // los clientes activos si el término de búsqueda es vacío.
    const term = this.searchTerm ? this.searchTerm.trim() : '';
    console.log('onSearch: termino ->', JSON.stringify(term));
    this.clienteService.searchClientes(term).subscribe({
      next: data => {
        console.log('onSearch: resultado ->', data);
        this.filteredClients = data;
      },
      error: err => {
        console.error('onSearch: error ->', err);
      }
    });
  }

  // Métodos para las acciones
  viewClient(id: number) {
    this.router.navigate(['/clientes', id]);
  }

  editClient(id: number) {
    this.router.navigate(['/formulario-cliente', id]);
  }

  deleteClient(id: number) {
    console.log(`Eliminar cliente con ID: ${id}`);
    this.clienteService.eliminarCliente(id).subscribe(() => {
      // Actualizar la lista después de eliminar
      this.filteredClients = this.filteredClients.filter(c => c.idCliente !== id);
    });
  }

  getStatusClass(statusName: string | undefined): string {
    if (!statusName) {
      return 'status-desconocido';
    }
    switch (statusName.toLowerCase()) {
      case 'activo':
        return 'status-aprobado'; // Reutilizamos la clase verde
      case 'inactivo':
        return 'status-cancelado'; // Reutilizamos la clase gris
      default:
        return 'status-desconocido';
    }
  }
}
