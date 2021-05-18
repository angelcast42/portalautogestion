import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-nav-bar',
  templateUrl: './home-nav-bar.component.html',
  styleUrls: ['./home-nav-bar.component.scss']
})
export class HomeNavBarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const navbar = document.querySelector('.nav-fixed');
    window.onscroll = () => {
        if (window.scrollY > 20 && window.scrollY <900 && window.matchMedia("(min-width: 700px)").matches) {
          navbar.classList.remove('nav-active')
            navbar.classList.add('nav-active-header');
        }
        else if(window.scrollY > 900 && window.matchMedia("(min-width: 700px)").matches){
            navbar.classList.remove('nav-active-header')
            navbar.classList.add('nav-active');
        } 
        else if(window.scrollY > 600 && window.matchMedia("(max-width: 700px)").matches){
          navbar.classList.add('nav-active');
        } 
        else if(window.scrollY < 600 && window.matchMedia("(max-width: 700px)").matches){
          navbar.classList.remove('nav-active');
        } 
        else {
            navbar.classList.remove('nav-active-header');
        }
    }
  }
  goSection(section){
    document.getElementById(section).scrollIntoView({behavior:"smooth"})
  }
  navbarOpen = false;

  toggleNavbar(type) {
    this.navbarOpen = !this.navbarOpen;
  }
  togglechange(){
    console.log("change togle")
    this.navbarOpen = !this.navbarOpen;

  }
  goToSignUp(){
    this.router.navigate(['/login'])
  }
}
