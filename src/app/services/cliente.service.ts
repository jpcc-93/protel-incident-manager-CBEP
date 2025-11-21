import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:5194/api/clientes'; // URL base de la API

  constructor(private http: HttpClient) { }

  // Obtiene TODOS los clientes (activos e inactivos)
  getAllClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // Obtiene solo los clientes ACTIVOS para la vista inicial
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/search`);
  }

  // Busca clientes activos por un término específico
  searchClientes(term: string): Observable<Cliente[]> {
    // Si el término está vacío o solo espacios, devolvemos la lista por defecto
    // que consulta a `${apiUrl}/search` (clientes activos).
    const t = term ? term.trim() : '';
    if (!t) {
      return this.getClientes();
    }

    // Codificar el término para evitar problemas con caracteres especiales
    const encoded = encodeURIComponent(t);
    return this.http.get<Cliente[]>(`${this.apiUrl}/search?term=${encoded}`);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  guardarCliente(cliente: Cliente): Observable<Cliente> {
    if (cliente.idCliente) {
      return this.http.put<Cliente>(`${this.apiUrl}/${cliente.idCliente}`, cliente);
    } else {
      return this.http.post<Cliente>(this.apiUrl, cliente);
    }
  }

  eliminarCliente(id: number): Observable<any> {
    // Se cambia a un PATCH para borrado lógico en la API
    return this.http.patch(`${this.apiUrl}/SoftDelete/${id}`, null);
  }
}
