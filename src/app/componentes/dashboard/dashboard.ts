import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { FactibilidadService } from '../../services/factibilidad.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Factibilidad as IFactibilidad } from '../../interfaces/factibilidad.interface';
import { EstadoFactibilidad } from '../../interfaces/estado-factibilidad.interface';
import { combineLatest } from 'rxjs'; // Import combineLatest

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalClients: number = 0;
  activeStudies: number = 0;
  totalStudies: number = 0;
  recentStudiesList: IFactibilidad[] = [];
  estadosFactibilidad: EstadoFactibilidad[] = []; // Para mapear los IDs a nombres

  summaryCards = [
    {
      title: 'Clientes Registrados',
      value: 0,
      icon: 'bi bi-people-fill',
      color: '#6236CB' // Morado
    },
    {
      title: 'Estudios Activos',
      value: 0,
      icon: 'bi bi-file-earmark-text-fill',
      color: '#E91E63' // Rosa
    },
    {
      title: 'Estudios Totales',
      value: 0,
      icon: 'bi bi-check-circle-fill',
      color: '#4CAF50' // Verde
    }
  ];

  constructor(
    private clienteService: ClienteService,
    private factibilidadService: FactibilidadService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    combineLatest([
      this.clienteService.getAllClientes(),
      this.factibilidadService.getFactibilidades(),
      this.factibilidadService.getEstadosFactibilidad() // Fetch states
    ]).subscribe(([clientes, factibilidades, estados]) => {
      this.totalClients = clientes.length;
      this.totalStudies = factibilidades.length;
      this.estadosFactibilidad = estados; // Store states

      this.activeStudies = factibilidades.filter(f => f.idEstadoFactibilidad === 1).length; // Assuming 1 is 'Activo'

      // Sort factibilities by date and take the most recent ones
      this.recentStudiesList = factibilidades
        .sort((a, b) => new Date(b.fechaSolicitud).getTime() - new Date(a.fechaSolicitud).getTime())
        .slice(0, 4); // Get top 4 recent studies

      // Update summary cards
      this.summaryCards[0].value = this.totalClients;
      this.summaryCards[1].value = this.activeStudies;
      this.summaryCards[2].value = this.totalStudies;
    });
  }

  // Helper to get status name by ID
  getStatusName(id: number): string {
    const estado = this.estadosFactibilidad.find(e => e.idEstadoFactibilidad === id);
    return estado ? estado.nombre : 'Desconocido';
  }
}
