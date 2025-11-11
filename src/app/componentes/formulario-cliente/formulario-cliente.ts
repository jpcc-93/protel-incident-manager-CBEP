import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-formulario-cliente',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-cliente.html',
  styleUrls: ['./formulario-cliente.css']
})
export class FormularioCliente {
  cliente: Cliente = {
    idCliente: 0,
    nombre: '',
    documento: '',
    tipoCliente: '',
    personaContacto: '',
    direccion: '',
    telefono: '',
    email: '',
    fechaCreacion: new Date(), // Se inicializa con la fecha actual
    fechaActualizacion: null,
    idEstadoCliente: 1, // Valor por defecto para el estado del cliente (ej. Activo)
  };

  constructor(private clienteService: ClienteService, private router: Router) { }

  onSubmit() {
    // Asignar valores antes de enviar
    this.cliente.fechaCreacion = new Date();
    this.cliente.idEstadoCliente = 1; // Asignar un estado por defecto, por ejemplo, 1 para 'Activo'

    this.clienteService.guardarCliente(this.cliente).subscribe(() => {
      this.router.navigate(['/clientes']);
    });
  }
}
