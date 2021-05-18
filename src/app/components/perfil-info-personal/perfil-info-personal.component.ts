import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-info-personal',
  templateUrl: './perfil-info-personal.component.html',
  styleUrls: ['./perfil-info-personal.component.scss']
})
export class PerfilInfoPersonalComponent implements OnInit {
  datapersonales:any={}
  constructor() { }

  ngOnInit(): void {
  }

}
