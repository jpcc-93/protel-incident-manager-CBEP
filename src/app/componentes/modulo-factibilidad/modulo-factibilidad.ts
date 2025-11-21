import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FactibilidadService } from '../../services/factibilidad.service';
import { Factibilidad } from '../../interfaces/factibilidad.interface';

@Component({
  selector: 'app-modulo-factibilidad',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './modulo-factibilidad.html',
  styleUrls: ['./modulo-factibilidad.css']
})
export class ModuloFactibilidadComponent implements OnInit {

  filteredFactibilidades: Factibilidad[] = [];
  searchTerm: string = '';

  constructor(private factibilidadService: FactibilidadService, private router: Router) { }

  ngOnInit(): void {
    this.factibilidadService.searchFactibilidades('').subscribe({
      next: (data: Factibilidad[]) => {
        this.filteredFactibilidades = data;
      },
      error: (err: any) => {
        console.error('Error al cargar factibilidades:', err);
      }
    });
  }

  onSearch(): void {
    const term = this.searchTerm ? this.searchTerm.trim() : '';
    this.factibilidadService.searchFactibilidades(term).subscribe({
      next: (data: Factibilidad[]) => {
        this.filteredFactibilidades = data;
      },
      error: (err: any) => {
        console.error('Error al buscar factibilidades:', err);
      }
    });
  }

  viewFactibilidad(id: number): void {
    // Apuntará a una futura vista de detalle
    this.router.navigate(['/factibilidad-detalle', id]);
  }

  editFactibilidad(id: number): void {
    // El formulario de factibilidad existente podría necesitar un modo de edición
    this.router.navigate(['/factibilidad', id]);
  }

  deleteFactibilidad(id: number): void {
    this.factibilidadService.eliminarFactibilidad(id).subscribe(() => {
      this.filteredFactibilidades = this.filteredFactibilidades.filter(f => f.idFactibilidad !== id);
    });
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
