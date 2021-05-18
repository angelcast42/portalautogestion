import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-descubre',
  templateUrl: './home-descubre.component.html',
  styleUrls: ['./home-descubre.component.scss']
})
export class HomeDescubreComponent implements OnInit {
  @Output() tipoPrestamo = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

}
