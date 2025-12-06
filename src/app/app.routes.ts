import { Routes } from '@angular/router';

// Importando elementos de rutas
import { Dashboard } from './componentes/dashboard/dashboard';
import { FormularioCliente } from './componentes/formulario-cliente/formulario-cliente';
import { Factibilidad } from './componentes/factibilidad/factibilidad';
import { AcercaDe } from './componentes/acerca-de/acerca-de';
import { ModuloCliente } from './componentes/modulo-cliente/modulo-cliente';
import { ClienteDetalleComponent } from './componentes/cliente-detalle/cliente-detalle';
import { ModuloFactibilidadComponent } from './componentes/modulo-factibilidad/modulo-factibilidad';
import { FactibilidadDetalleComponent } from './componentes/factibilidad-detalle/factibilidad-detalle';
import { RegisterComponent } from './componentes/register/register';
import { LoginComponent } from './componentes/login/login';

// Guard de autenticación
import { authGuard } from './guards/auth.guard';

// Definiendo las rutas
export const routes: Routes = [

    // Esta regla dice: si el usuario llega a la página principal (ej: localhost:4200),
    // envíalo automáticamente a la ruta '/dashboard'.
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },


    // Definiendo las rutas y los componentes asociados
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
    { path: 'formulario-cliente', component: FormularioCliente, canActivate: [authGuard] }, // Para crear un nuevo cliente
    { path: 'formulario-cliente/:id', component: FormularioCliente, canActivate: [authGuard] }, // Para editar un cliente existente
    { path: 'clientes', component: ModuloCliente, canActivate: [authGuard] }, // Ruta para el módulo de clientes
    { path: 'clientes/:id', component: ClienteDetalleComponent, canActivate: [authGuard] }, // Ruta para el detalle del cliente

    // Rutas para Factibilidad
    { path: 'factibilidades', component: ModuloFactibilidadComponent, canActivate: [authGuard] }, // La nueva lista de consulta
    { path: 'factibilidad', component: Factibilidad, canActivate: [authGuard] }, // El formulario para crear
    { path: 'factibilidad/:id', component: Factibilidad, canActivate: [authGuard] }, // El formulario para editar
    { path: 'factibilidad-detalle/:id', component: FactibilidadDetalleComponent, canActivate: [authGuard] }, // La nueva vista de detalles

    { path: 'acerca-de', component: AcercaDe },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
];
