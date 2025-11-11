import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

  clients: Cliente[] = []; // Lista original sin filtrar
  filteredClients: Cliente[] = []; // Lista para mostrar en la tabla
  searchTerm: string = ''; // Término de búsqueda

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(data => {
      this.clients = data.filter(c => c.idEstadoCliente === 1); // Mostrar solo activos
      this.filteredClients = this.clients;
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    if (!term) {
      this.filteredClients = this.clients;
    } else {
      this.filteredClients = this.clients.filter(client =>
        client.nombre.toLowerCase().includes(term) ||
        client.documento.toLowerCase().includes(term)
      );
    }
  }

  // Métodos para las acciones
  viewClient(id: number) {
    console.log(`Ver detalles del cliente con ID: ${id}`);
    // Lógica para ver detalles
  }

  editClient(id: number) {
    console.log(`Editar cliente con ID: ${id}`);
    // Lógica para editar
  }

  deleteClient(id: number) {
    console.log(`Eliminar cliente con ID: ${id}`);
    this.clienteService.eliminarCliente(id).subscribe(() => {
      // Actualizar ambas listas después de eliminar
      this.clients = this.clients.filter(c => c.idCliente !== id);
      this.filteredClients = this.filteredClients.filter(c => c.idCliente !== id);
    });
  }
}
