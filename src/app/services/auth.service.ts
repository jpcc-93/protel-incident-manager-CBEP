import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  // Inyectar PLATFORM_ID en el constructor para saber dónde se ejecuta el código
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    let storageUser = null;

    // Verificar si estamos en el navegador antes de usar localStorage
    // Esto evita errores durante la renderización en el servidor (SSR)
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        storageUser = JSON.parse(stored);
      }
    }

    this.currentUserSubject = new BehaviorSubject<any>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Verificar si el usuario tiene una sesión activa
  isLoggedIn(): boolean {
    const user = this.currentUserSubject.value;
    return !!user && !!user.token;
  }

  // Método para iniciar sesión
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(tap(user => {
        // Verificar si es navegador antes de guardar en localStorage
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
      }));
  }

  // Método para registrar usuario
  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password });
  }

  // Método para cerrar sesión
  logout() {
    // Verificar si es navegador antes de borrar del localStorage
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }
}