import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
summaryCards = [
    {
      title: 'Clientes Registrados',
      value: 5,
      icon: 'bi bi-people-fill',
      color: '#6236CB' // Morado
    },
    {
      title: 'Estudios Activos',
      value: 2,
      icon: 'bi bi-file-earmark-text-fill',
      color: '#E91E63' // Rosa
    },
    {
      title: 'Estudios Totales',
      value: 4,
      icon: 'bi bi-check-circle-fill',
      color: '#4CAF50' // Verde
    }
  ];

  // Tabla de estudios recientes
  recentStudies = [
    { name: 'Fibra Óptica Zona Industrial', client: 'Cliente B', status: 'Activo', date: '20/04/2025' },
    { name: 'Conexión Rural Vereda Y', client: 'Cliente C', status: 'Completado', date: '15/03/2025' },
    { name: 'Proyecto Conectividad Alcaldía Z', client: 'Municipio X', status: 'Activo', date: '10/02/2025' },
    { name: 'Cobertura Barrio Bonito', client: 'Cliente A', status: 'Cancelado', date: '01/01/2025' },
  ];

}
