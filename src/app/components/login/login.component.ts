import { Component, OnInit } from '@angular/core';
import { NgForm,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  constructor(private router: Router,
    private authservice:AuthenticationService,
    private _formBuilder: FormBuilder) { 
      this.loginForm=_formBuilder.group({
        dpi:['', Validators.compose([Validators.email,Validators.maxLength(50), Validators.required])],
        password:['', Validators.compose([Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),Validators.minLength(2),Validators.maxLength(15), Validators.required])],
      })
  }

  ngOnInit(): void {
  }
  goToRegistro(){
    this.router.navigate(['/registro'])
}
  recuperarContrasena(){
    this.router.navigate(['/recuperar-contrasena'])
  }
  login() {
    this.loginForm.markAllAsTouched()
    if (!this.loginForm.valid) {
      console.log("Formulario no valido")
    } else {
      this.authservice.login(this.loginForm.get('dpi').value,this.loginForm.get('password').value)
    }
  }
}
