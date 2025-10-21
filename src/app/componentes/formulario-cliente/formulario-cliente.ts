import { Component } from '@angular/core';

@Component({
  selector: 'app-formulario-cliente',
  imports: [],
  templateUrl: './formulario-cliente.html',
  styleUrl: './formulario-cliente.css'
})
export class FormularioCliente {
    // Esta función se llamará cuando el usuario envíe el formulario
  onSubmit() {
    // Por ahora, solo mostraremos un mensaje en la consola.
    // Aquí es donde, en el futuro, conectarías la lógica para guardar los datos.
    console.log('Formulario enviado correctamente');
  }

}
