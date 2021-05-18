import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm,FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Http,Headers } from '@angular/http';
import {ClienteService} from '../../services/cliente.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild("montoCredito")montoinput: ElementRef;
  autoevaluacion:any={}
  creditForm:FormGroup
  submitAttemp=false
  publicIP: string;
  indexUrl=0
  dpi
  monto
  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private http:Http,
    private clienteService:ClienteService
    ) { 
      
      /*
      this.creditForm=_formBuilder.group({
        monto:['', Validators.compose([Validators.pattern(/^\d{1,8}$/), Validators.required])],
        dpi:['', Validators.compose([Validators.pattern(/^\d{13}$/), Validators.required])],
        telefono:['', Validators.compose([Validators.pattern(/^\d{8}$/), Validators.required])],
      })
      */
      //se limpia el local storage
      /*
      localStorage.removeItem('laborales')
      localStorage.removeItem('personales')
      localStorage.removeItem('dpi')
      localStorage.removeItem('telefono')
      localStorage.removeItem('plazo')
      localStorage.removeItem('monto')
      */
    }

  ngOnInit(): void {
    this.changeBackground()

  }
  goCreditForm(){
    let url=''
  }
  showSnackbar(message){
    this._snackBar.open(message,'',{
      duration:3000,
    })
  }

  changeBackground(){
    const navbar = document.getElementById('header-form'); 
    setTimeout(() => {
      if(this.indexUrl==0){
        this.indexUrl++
        navbar.classList.add('section-header-2')
      }
      else if(this.indexUrl==1){
        this.indexUrl++
        navbar.classList.add('section-header-3')
        navbar.classList.remove('section-header-2')
      }
      else if(this.indexUrl==2){
        this.indexUrl++
        navbar.classList.add('section-header-4')
        navbar.classList.remove('section-header-3')
      }
      else{
        navbar.classList.remove('section-header-4')
        this.indexUrl=0
      }
      this.changeBackground()
    }
    , 4000);
  }
  generatePdf(){
  }
}
