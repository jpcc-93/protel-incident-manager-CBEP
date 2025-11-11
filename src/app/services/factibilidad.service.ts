import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factibilidad } from '../interfaces/factibilidad.interface';

@Injectable({
  providedIn: 'root'
})
export class FactibilidadService {
  private apiUrl = 'http://localhost:5194/api/factibilidades'; // URL base de la API

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los estudios de factibilidad.
   * @returns Un Observable con un arreglo de factibilidades.
   */
  getFactibilidades(): Observable<Factibilidad[]> {
    return this.http.get<Factibilidad[]>(this.apiUrl);
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
   * Realiza un borrado lógico de un estudio de factibilidad, cambiándolo a un estado "Cancelado".
   * @param id El ID de la factibilidad a cancelar.
   * @returns Un Observable que se completa cuando la operación termina.
   */
  cancelarFactibilidad(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/SoftDelete/${id}`, null);
  }
}
