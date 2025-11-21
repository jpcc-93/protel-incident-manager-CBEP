import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-formulario-cliente',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-cliente.html',
  styleUrls: ['./formulario-cliente.css']
})
export class FormularioCliente implements OnInit {
  cliente: Cliente = {
    idCliente: 0,
    nombre: '',
    documento: '',
    tipoCliente: '',
    personaContacto: '',
    direccion: '',
    telefono: '',
    email: '',
    fechaCreacion: new Date(),
    fechaActualizacion: null,
    idEstadoCliente: 1,
  };
  isEditMode = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.clienteService.getCliente(+id).subscribe(cliente => {
        if (cliente) {
          this.cliente = cliente;
        }
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.cliente.fechaActualizacion = new Date();
    } else {
      this.cliente.fechaCreacion = new Date();
      this.cliente.idEstadoCliente = 1; // Asignar estado activo solo al crear
    }

    this.clienteService.guardarCliente(this.cliente).subscribe(() => {
      this.router.navigate(['/clientes']); // Navegar a la lista de clientes
    });
  }

  onCancel(): void {
    this.router.navigate(['/clientes']); // Navegar de vuelta a la lista de clientes
  }
}
