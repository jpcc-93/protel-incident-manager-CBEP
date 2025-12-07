import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factibilidad } from '../interfaces/factibilidad.interface';
import { EstadoFactibilidad } from '../interfaces/estado-factibilidad.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactibilidadService {
  private apiUrl = `${environment.apiUrl}/factibilidades`; // URL base de la API
  private apiEstadoUrl = `${environment.apiUrl}/EstadoFactibilidad`; // URL para los estados

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de todos los posibles estados de factibilidad.
   * @returns Un Observable con un arreglo de estados de factibilidad.
   */
  getEstadosFactibilidad(): Observable<EstadoFactibilidad[]> {
    return this.http.get<EstadoFactibilidad[]>(this.apiEstadoUrl);
  }

  /**
   * Obtiene todos los estudios de factibilidad.
   * @returns Un Observable con un arreglo de factibilidades.
   */
  getFactibilidades(): Observable<Factibilidad[]> {
    return this.http.get<Factibilidad[]>(this.apiUrl);
  }

  /**
   * Busca factibilidades activas por un término específico (ej: nombre de proyecto).
   * Si el término es vacío, devuelve todas las factibilidades activas.
   * @param term El término de búsqueda.
   * @returns Un Observable con un arreglo de factibilidades.
   */
  searchFactibilidades(term: string): Observable<Factibilidad[]> {
    return this.http.get<Factibilidad[]>(`${this.apiUrl}/search?term=${term}`);
  }

  /**
   * Obtiene un estudio de factibilidad específico por su ID.
   * @param id El ID de la factibilidad.
   * @returns Un Observable con la factibilidad encontrada.
   */
  getFactibilidad(id: number): Observable<Factibilidad> {
    return this.http.get<Factibilidad>(`${this.apiUrl}/${id}`);
  }

  /**
   * Guarda un estudio de factibilidad. Si tiene un ID, lo actualiza (PUT).
   * Si no tiene ID, lo crea (POST).
   * @param factibilidad El objeto de factibilidad a guardar.
   * @returns Un Observable con la factibilidad guardada.
   */
  guardarFactibilidad(factibilidad: Factibilidad): Observable<Factibilidad> {
    if (factibilidad.idFactibilidad) {
      return this.http.put<Factibilidad>(`${this.apiUrl}/${factibilidad.idFactibilidad}`, factibilidad);
    } else {
      return this.http.post<Factibilidad>(this.apiUrl, factibilidad);
    }
  }

  /**
   * Realiza un borrado lógico de un estudio de factibilidad (Soft Delete).
   * @param id El ID de la factibilidad a eliminar lógicamente.
   * @returns Un Observable que se completa cuando la operación termina.
   */
  eliminarFactibilidad(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/SoftDelete/${id}`, null);
  }
}
