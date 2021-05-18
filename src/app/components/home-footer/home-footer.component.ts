import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Http,Headers } from '@angular/http';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.scss']
})
export class HomeFooterComponent implements OnInit {
  email
  constructor(private _snackBar: MatSnackBar,
    private http:Http
    ) { }

  ngOnInit(): void {
  }
  showSnackbar(message){
    this._snackBar.open(message,'',{
      duration:3000,
    })
  }
  suscribir(){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    let item={
      email:this.email
    }
    console.log("email",this.email)
    this.http.post('https://us-central1-bantrab-app.cloudfunctions.net/addSuscription',JSON.stringify(item),{headers:headers}).subscribe(
      data => {
        console.log(data)
      },
      err => {
        console.log(err)
      },
      () => {}
    );
    this.showSnackbar('Excelente, te has suscrito exitosamente')
  }
  goSection(section){
    document.getElementById(section).scrollIntoView({behavior:"smooth"})
  }
  openURL(url){
    window.open(url);
  }

}
