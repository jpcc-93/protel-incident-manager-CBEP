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

// Definiendo las rutas

export const routes: Routes = [

    // Esta regla dice: si el usuario llega a la página principal (ej: localhost:4200),
    // envíalo automáticamente a la ruta '/dashboard'.
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },


    // Definiendo las rutas y los componentes asociados
    { path: 'dashboard', component: Dashboard },
    { path: 'formulario-cliente', component: FormularioCliente }, // Para crear un nuevo cliente
    { path: 'formulario-cliente/:id', component: FormularioCliente }, // Para editar un cliente existente
    { path: 'clientes', component: ModuloCliente }, // Ruta para el módulo de clientes
    { path: 'clientes/:id', component: ClienteDetalleComponent }, // Ruta para el detalle del cliente
    
    // Rutas para Factibilidad
    { path: 'factibilidades', component: ModuloFactibilidadComponent }, // La nueva lista de consulta
    { path: 'factibilidad', component: Factibilidad }, // El formulario para crear
    { path: 'factibilidad/:id', component: Factibilidad }, // El formulario para editar
    { path: 'factibilidad-detalle/:id', component: FactibilidadDetalleComponent }, // La nueva vista de detalles

    { path: 'acerca-de', component: AcercaDe },
];
