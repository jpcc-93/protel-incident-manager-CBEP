import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-cliente-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente-detalle.html',
  styleUrls: ['./cliente-detalle.css']
})
export class ClienteDetalleComponent implements OnInit {
  cliente: Cliente | undefined;
  isLoading: boolean = true;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.clienteService.getCliente(+id).subscribe({
          next: (data) => {
            this.cliente = data;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error al obtener el cliente:', err);
            this.errorMessage = 'No se pudo cargar la información del cliente.';
            this.isLoading = false;
          }
        });
      } else {
        this.errorMessage = 'ID de cliente no proporcionado.';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/clientes']);
  }
}
