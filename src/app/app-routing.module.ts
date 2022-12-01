import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { HomeComponent } from './componentes/home/home.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { AccessComponent } from './componentes/access/access.component';
import { AuthGuard } from './_guards/auth.guard';
import { LogoffComponent } from './componentes/access/logoff/logoff.component';
import { DashboardBasicoComponent } from './componentes/dashboard-basico/dashboard-basico.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  //{path: 'homee', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'listado', component: ListadoComponent},
  {path: 'detalle/:id', component: DetalleComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'tablero-adm', component: DashboardComponent, canActivate:[AuthGuard] },
  {path: 'tablero-bas', component: DashboardBasicoComponent, canActivate:[AuthGuard] },
  {path: 'logoff', component: LogoffComponent},
  {path: 'access', component: AccessComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
