import { Component, OnInit } from '@angular/core';
import { NgForm,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registroForm:FormGroup

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private authservice:AuthenticationService
  ) {
    this.registroForm=_formBuilder.group({
      dpi:['', Validators.compose([Validators.pattern(/^\d{13}$/), Validators.required])],
      correo:['', Validators.compose([Validators.email,Validators.maxLength(50), Validators.required])],
      password:['', Validators.compose([Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),Validators.minLength(2),Validators.maxLength(15), Validators.required])],
      confirmpassword:['', Validators.compose([Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),Validators.minLength(2), Validators.maxLength(15),Validators.required])],
    })
   }

  ngOnInit(): void {
  }
  signup() {
    this.registroForm.markAllAsTouched()
    if (!this.registroForm.valid) {
      console.log("formulario invalido")
    }
    else {
      if (this.registroForm.get('password').value != this.registroForm.get('confirmpassword').value) {
        console.log("Error, contraseñas no coinciden")
      }
      else {
        this.authservice.register(this.registroForm.get('correo').value,this.registroForm.get('password').value,this.registroForm.get('dpi').value)
      }
    }
  }
}
