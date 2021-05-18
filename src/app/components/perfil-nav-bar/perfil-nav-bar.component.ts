import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-nav-bar',
  templateUrl: './perfil-nav-bar.component.html',
  styleUrls: ['./perfil-nav-bar.component.scss']
})
export class PerfilNavBarComponent implements OnInit {
  navbarOpen = false
  constructor() { }

  ngOnInit(): void {
  }
  toggleNavbar(type) {
    this.navbarOpen = !this.navbarOpen;
  }
  togglechange(){
    
    this.navbarOpen = !this.navbarOpen;

  }
}
