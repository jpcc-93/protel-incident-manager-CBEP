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

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
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
