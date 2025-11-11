import { EstadoCliente } from './estado-cliente.interface';

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
  seleccionado?: boolean; // Propiedad no mapeada, opcional
}
