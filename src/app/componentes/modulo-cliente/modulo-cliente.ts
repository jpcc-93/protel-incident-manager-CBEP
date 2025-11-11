import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-modulo-cliente',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modulo-cliente.html',
  styleUrls: ['./modulo-cliente.css']
})
export class ModuloCliente implements OnInit {

  clients: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(data => {
      this.clients = data;
    });
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
      this.clients = this.clients.filter(c => c.idCliente !== id);
    });
  }
}
