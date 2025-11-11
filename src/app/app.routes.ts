import { Routes } from '@angular/router';

// Importando elementos de rutas
import { Dashboard } from './componentes/dashboard/dashboard';
import { FormularioCliente } from './componentes/formulario-cliente/formulario-cliente';
import { Factibilidad } from './componentes/factibilidad/factibilidad';
import { AcercaDe } from './componentes/acerca-de/acerca-de';
import { ModuloCliente } from './componentes/modulo-cliente/modulo-cliente';

// Definiendo las rutas

export const routes: Routes = [

    // Esta regla dice: si el usuario llega a la página principal (ej: localhost:4200),
    // envíalo automáticamente a la ruta '/dashboard'.
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },


    // Definiendo las rutas y los componentes asociados
    { path: 'dashboard', component: Dashboard },
    { path: 'formulario-cliente', component: FormularioCliente },
    { path: 'modulo-cliente', component: ModuloCliente },
    { path: 'factibilidad', component: Factibilidad },
    { path: 'acerca-de', component: AcercaDe },
];
