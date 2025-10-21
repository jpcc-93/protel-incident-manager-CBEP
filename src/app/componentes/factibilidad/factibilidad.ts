import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-factibilidad',
  imports: [CommonModule, FormsModule],
  templateUrl: './factibilidad.html',
  styleUrl: './factibilidad.css'
})
export class Factibilidad {

  // Objeto para almacenar los datos del formulario
  // Usamos 'any' para este ejemplo, pero en un proyecto real
  // es mejor crear una interfaz (interface) para definir la estructura.
  studyData: any = {
    projectName: '',
    client: '',
    address: '',
    serviceType: 'Fibra Óptica', // Valor por defecto
    technicalNotes: ''
  };

  // Lista de clientes de ejemplo para el dropdown
  clients = ['Cliente A', 'Cliente B', 'Municipio X', 'Empresa Y'];

  onSubmit() {
    console.log('Datos del estudio de factibilidad:', this.studyData);
    // Aquí iría la lógica para enviar los datos a un servidor o servicio.
  }

}
