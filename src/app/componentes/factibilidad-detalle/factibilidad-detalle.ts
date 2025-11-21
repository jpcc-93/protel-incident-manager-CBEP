import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FactibilidadService } from '../../services/factibilidad.service';
import { Factibilidad } from '../../interfaces/factibilidad.interface';

@Component({
  selector: 'app-factibilidad-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factibilidad-detalle.html',
  styleUrls: ['./factibilidad-detalle.css']
})
export class FactibilidadDetalleComponent implements OnInit {
  factibilidad: Factibilidad | undefined;
  isLoading: boolean = true;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private factibilidadService: FactibilidadService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.factibilidadService.getFactibilidad(+id).subscribe({
        next: (data) => {
          this.factibilidad = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al obtener la factibilidad:', err);
          this.errorMessage = 'No se pudo cargar la información de la factibilidad.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'ID de factibilidad no proporcionado.';
      this.isLoading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/factibilidades']);
  }

  getStatusClass(statusName: string | undefined): string {
    if (!statusName) {
      return 'status-desconocido';
    }
    switch (statusName.toLowerCase()) {
      case 'pendiente':
        return 'status-pendiente';
      case 'aprobado':
        return 'status-aprobado';
      case 'rechazado':
        return 'status-rechazado';
      case 'cancelado':
        return 'status-cancelado';
      default:
        return 'status-desconocido';
    }
  }
}
