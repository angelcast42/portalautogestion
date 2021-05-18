import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { PerfilInfoComponent } from './components/perfil-info/perfil-info.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'autoevaluacion',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'recuperar-contrasena',component:RecuperarContrasenaComponent},
  {path:'perfil',component:PerfilInfoComponent},
  {path:'perfil/:userID',component:PerfilInfoComponent},
  //{path:'perfil/:dpi/:monto/:plazo/:telefono/:email/:patrono',component:PerfilInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
