import { Cliente } from './cliente.interface';
import { EstadoFactibilidad } from './estado-factibilidad.interface';

export interface Factibilidad {
  idFactibilidad: number;
  idCliente: number;
  nombreProyecto: string;
  descripcion?: string | null; // Puede ser nulo
  ubicacion: string;
  fechaSolicitud: Date;
  fechaRespuesta?: Date | null; // Puede ser nulo
  idEstadoFactibilidad: number;
  cliente?: Cliente; // Propiedad de navegación opcional
  estadoFactibilidad?: EstadoFactibilidad; // Propiedad de navegación opcional
  seleccionado?: boolean; // Propiedad no mapeada, opcional
}
