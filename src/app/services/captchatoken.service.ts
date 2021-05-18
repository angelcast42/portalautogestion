import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CaptchatokenService {
  constructor(
     private http:Http
  ) { }

 sendToken(token){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    let item={
      recaptcha:token
    };
    return this.http.post('https://us-central1-bantrab-app.cloudfunctions.net/validateTokenCaptcha',JSON.stringify(item),{headers:headers})
  }
    
  
  }