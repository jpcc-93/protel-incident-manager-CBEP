import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './register.html',
    styleUrls: ['./register.css']
})
export class RegisterComponent {
    username = '';
    password = '';
    errorMessage = '';
    successMessage = '';

    constructor(private authService: AuthService, private router: Router) { }

    // Método que se ejecuta al enviar el formulario de registro
    onSubmit() {
        this.authService.register(this.username, this.password).subscribe({
            next: (response) => {
                // Si el registro es exitoso, mostrar mensaje y redirigir
                this.successMessage = 'Usuario registrado exitosamente. Redirigiendo al login...';
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 2000);
            },
            error: (error) => {
                // Si hay error, mostrar mensaje
                this.errorMessage = 'Error en el registro. Intente nuevamente.';
                console.error('Registration error', error);
            }
        });
    }
}
