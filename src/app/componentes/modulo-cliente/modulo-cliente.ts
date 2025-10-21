import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modulo-cliente',
  imports: [CommonModule, RouterModule],
  templateUrl: './modulo-cliente.html',
  styleUrl: './modulo-cliente.css'
})
export class ModuloCliente {

  // --- Datos de ejemplo (simulados) ---
  // En una aplicación real, estos datos vendrían de una API o servicio.
  clients = [
    { id: 1, name: 'Empresa A', document: 'NIT 900.123.456-7', phone: '3001234567', email: 'contacto@empresa-a.com' },
    { id: 2, name: 'Municipio X', document: 'NIT 800.789.123-4', phone: '3109876543', email: 'alcaldia@municipio-x.gov' },
    { id: 3, name: 'Juan Pérez', document: 'CC 1.234.567.890', phone: '3204567890', email: 'juan.perez@email.com' },
    { id: 4, name: 'Constructora Y', document: 'NIT 901.555.888-2', phone: '3157890123', email: 'proyectos@constructora-y.co' }
  ];

  // Métodos de ejemplo para las acciones
  viewClient(id: number) {
    console.log(`Ver detalles del cliente con ID: ${id}`);
    // Aquí iría la lógica para navegar a una vista de detalle
  }

  editClient(id: number) {
    console.log(`Editar cliente con ID: ${id}`);
    // Aquí iría la lógica para navegar al formulario de edición
  }

  deleteClient(id: number) {
    console.log(`Eliminar cliente con ID: ${id}`);
    // Aquí se mostraría una confirmación y luego se llamaría a un servicio para eliminar
  }

}
