import { EstadoCliente } from './estado-cliente.interface';
import { Factibilidad } from './factibilidad.interface';

export interface Cliente {
  idCliente: number;
  nombre: string;
  documento: string;
  tipoCliente: string;
  personaContacto: string;
  direccion: string;
  telefono: string;
  email: string;
  fechaCreacion: Date;
  fechaActualizacion?: Date | null; // Puede ser nulo
  idEstadoCliente: number;
  estadoCliente?: EstadoCliente; // Propiedad de navegación opcional
  factibilidades?: Factibilidad[]; // Lista de factibilidades
  seleccionado?: boolean; // Propiedad no mapeada, opcional
}
