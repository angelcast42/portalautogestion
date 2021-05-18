import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
//plugins

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http'
import { NgxSoapModule } from 'ngx-soap';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { TextMaskModule } from 'angular2-text-mask';
//angular material modules
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule}from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_FORMATS} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
//Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
var config = {
  apiKey: "AIzaSyCMWCqAjCrA9ns6x3oUIPCWY64ljdufeVY",
  authDomain: "bantrab-app.firebaseapp.com",
  databaseURL: "https://bantrab-app.firebaseio.com",
  projectId: "bantrab-app",
  storageBucket: "bantrab-app.appspot.com",
  messagingSenderId: "585148781171",
  appId: "1:585148781171:web:614c00fd07420a368d9006",
  measurementId: "G-3XLYT9QQP2"
};
//components
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HomeComponent} from './pages/home/home.component';
import { HomeNavBarComponent } from './components/home-nav-bar/home-nav-bar.component';
import { HomeInfoComponent } from './components/home-info/home-info.component';
import { HomeDescubreComponent } from './components/home-descubre/home-descubre.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';

//services
import{CaptchatokenService} from './services/captchatoken.service';

import { from } from 'rxjs';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterCnPipe } from './pipes/filter-cn.pipe';
import { ModalPatronosComponent } from './components/modal-patronos/modal-patronos.component';
import { ModalErrorFormComponent } from './components/modal-error-form/modal-error-form.component';
import { HomeCreditFormComponent } from './components/home-credit-form/home-credit-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { PerfilInfoComponent } from './components/perfil-info/perfil-info.component';
import { PerfilNavBarComponent } from './components/perfil-nav-bar/perfil-nav-bar.component';
import { PerfilInfoPersonalComponent } from './components/perfil-info-personal/perfil-info-personal.component';
import { PerfilInfoPatronoComponent } from './components/perfil-info-patrono/perfil-info-patrono.component';
import { PerfilInfoIngresosComponent } from './components/perfil-info-ingresos/perfil-info-ingresos.component';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',

  },
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeNavBarComponent,
    HomeInfoComponent,
    HomeDescubreComponent,
    HomeFooterComponent,
    FilterPipe,
    FilterCnPipe,
    ModalPatronosComponent,
    ModalErrorFormComponent,
    HomeCreditFormComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarContrasenaComponent,
    PerfilInfoComponent,
    PerfilNavBarComponent,
    PerfilInfoPersonalComponent,
    PerfilInfoPatronoComponent,
    PerfilInfoIngresosComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    NgxSoapModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
    MatDialogModule,
    RecaptchaModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSidenavModule,
    RecaptchaFormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    TextMaskModule,
    MatCardModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule
    ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-GT' },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ,CaptchatokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
