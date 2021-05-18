import { Component, OnInit } from '@angular/core';
import { NgForm,FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home-credit-form',
  templateUrl: './home-credit-form.component.html',
  styleUrls: ['./home-credit-form.component.scss']
})
export class HomeCreditFormComponent implements OnInit {
  dpi
  monto
  creditForm:FormGroup
  constructor() { }

  ngOnInit(): void {
  }
  goCreditForm(){
    let url=''
  }
}
