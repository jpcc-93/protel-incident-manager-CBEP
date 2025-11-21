import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { FactibilidadService } from '../../services/factibilidad.service';
import { Factibilidad as IFactibilidad } from '../../interfaces/factibilidad.interface';
import { EstadoFactibilidad } from '../../interfaces/estado-factibilidad.interface';
import { combineLatest } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartData } from 'chart.js';

// Colores para el gráfico de dona
const DOUGHNUT_CHART_COLORS: string[] = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9933'
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  isBrowser: boolean;

  totalClients: number = 0;
  activeStudies: number = 0;
  totalStudies: number = 0;
  recentStudiesList: IFactibilidad[] = [];
  estadosFactibilidad: EstadoFactibilidad[] = [];

  // Bar Chart (Histogram)
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Nº de Estudios', backgroundColor: '#36A2EB' }
    ]
  };

  // Doughnut Chart
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
  };
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      { data: [], backgroundColor: [] }
    ]
  };

  summaryCards = [
    { title: 'Clientes Registrados', value: 0, icon: 'bi bi-people-fill', color: '#6236CB' },
    { title: 'Estudios Activos', value: 0, icon: 'bi bi-file-earmark-text-fill', color: '#E91E63' },
    { title: 'Estudios Totales', value: 0, icon: 'bi bi-check-circle-fill', color: '#4CAF50' }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private clienteService: ClienteService,
    private factibilidadService: FactibilidadService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadDashboardData();
    }
  }

  loadDashboardData(): void {
    combineLatest([
      this.clienteService.getAllClientes(),
      this.factibilidadService.getFactibilidades(),
      this.factibilidadService.getEstadosFactibilidad()
    ]).subscribe(([clientes, factibilidades, estados]) => {
      // Summary Cards Data
      this.totalClients = clientes.length;
      this.totalStudies = factibilidades.length;
      this.activeStudies = factibilidades.filter(f => f.idEstadoFactibilidad === 1).length;
      
      this.summaryCards[0].value = this.totalClients;
      this.summaryCards[1].value = this.activeStudies;
      this.summaryCards[2].value = this.totalStudies;

      // Recent Studies List
      this.recentStudiesList = factibilidades
        .sort((a, b) => new Date(b.fechaSolicitud).getTime() - new Date(a.fechaSolicitud).getTime())
        .slice(0, 4);

      // Chart Data Processing
      this.estadosFactibilidad = estados;
      const stateCounts: { [key: string]: number } = {};

      // Initialize counts to 0
      estados.forEach(e => stateCounts[e.nombre] = 0);
      
      // Count studies per state
      factibilidades.forEach(f => {
        const estado = this.getStatusName(f.idEstadoFactibilidad);
        if (estado !== 'Desconocido') {
          stateCounts[estado]++;
        }
      });
      
      // Prepare chart data
      const chartLabels = Object.keys(stateCounts);
      const chartData = Object.values(stateCounts);
      const chartColors = chartLabels.map((_, i) => DOUGHNUT_CHART_COLORS[i % DOUGHNUT_CHART_COLORS.length]);

      // Bar Chart
      this.barChartData.labels = chartLabels;
      this.barChartData.datasets[0].data = chartData;

      // Doughnut Chart
      this.doughnutChartLabels = chartLabels;
      this.doughnutChartData = {
        labels: chartLabels,
        datasets: [{ data: chartData, backgroundColor: chartColors }]
      };
    });
  }

  getStatusName(id: number): string {
    const estado = this.estadosFactibilidad.find(e => e.idEstadoFactibilidad === id);
    return estado ? estado.nombre : 'Desconocido';
  }
}
