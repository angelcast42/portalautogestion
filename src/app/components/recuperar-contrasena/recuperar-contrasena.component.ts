import { Component, OnInit } from '@angular/core';
import { NgForm,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss']
})
export class RecuperarContrasenaComponent implements OnInit {
  recuperarForm: FormGroup
  pasoRecuperacion=1
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  changePasoRecuperacion() {
    this.pasoRecuperacion = this.pasoRecuperacion == 1 ? 2 : 1
  }
  goToPerfil(){
    this.router.navigate(['/perfil'])
  }
}
