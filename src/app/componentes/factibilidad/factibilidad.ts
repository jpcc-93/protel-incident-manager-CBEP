import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs'; // Importar Observable
import { FactibilidadService } from '../../services/factibilidad.service';
import { ClienteService } from '../../services/cliente.service';
import { Factibilidad as IFactibilidad } from '../../interfaces/factibilidad.interface';
import { Cliente } from '../../interfaces/cliente.interface';
import { EstadoFactibilidad } from '../../interfaces/estado-factibilidad.interface'; // Importar la interfaz

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
    ubicacion: '',
    descripcion: '',
    fechaSolicitud: new Date(),
    idEstadoFactibilidad: 1, // Por defecto: 'Pendiente'
  };

  clients: Cliente[] = [];
  isEditMode: boolean = false;
  estadosFactibilidad$!: Observable<EstadoFactibilidad[]>; // Nueva propiedad para los estados

  constructor(
    private factibilidadService: FactibilidadService,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadClients();
    this.loadEstados(); // Cargar los estados
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.factibilidadService.getFactibilidad(+id).subscribe(data => {
        this.factibilidad = data;
      });
    }
  }

  loadClients(): void {
    this.clienteService.getClientes().subscribe(data => {
      this.clients = data.filter(cliente => cliente.idEstadoCliente === 1);
    });
  }

  loadEstados(): void {
    this.estadosFactibilidad$ = this.factibilidadService.getEstadosFactibilidad();
  }

  onSubmit() {
    // Si no estamos en modo edición, es un nuevo registro con valores por defecto
    if (!this.isEditMode) {
      this.factibilidad.fechaSolicitud = new Date();
      this.factibilidad.idEstadoFactibilidad = 1; // Asignar estado inicial "Pendiente"
    }

    this.factibilidadService.guardarFactibilidad(this.factibilidad).subscribe(() => {
      // Navegar a la lista de factibilidades
      this.router.navigate(['/factibilidades']); 
    });
  }
}
