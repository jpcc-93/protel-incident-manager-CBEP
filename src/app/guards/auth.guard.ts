import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard de autenticación.
 * Verifica si el usuario tiene una sesión activa antes de permitir el acceso a una ruta.
 */
export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Verificar si el usuario está logueado
    if (authService.isLoggedIn()) {
        return true; // Permitir acceso
    }

    // Si no está logueado, redirigir al login
    router.navigate(['/login']);
    return false;
};
