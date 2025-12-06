import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent {
    username = '';
    password = '';
    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) { }

    // Método que se ejecuta al enviar el formulario
    onSubmit() {
        this.authService.login(this.username, this.password).subscribe({
            next: (response) => {
                // Si el login es exitoso, redirigir al dashboard
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                // Si hay error, mostrar mensaje
                this.errorMessage = 'Credenciales inválidas. Intente nuevamente.';
                console.error('Login error', error);
            }
        });
    }
}
