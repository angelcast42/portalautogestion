import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from "../services/user";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: User
  constructor(public afAuth: AngularFireAuth,
    public firestore:AngularFirestore,
    public router: Router) {
   /* this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })*/
  }
  async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['/perfil'])
  }
  async register(email: string, password: string,dpi:string) {
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
    let newUser = {
      email: email,
      dpi:dpi
    }
    this.firestore.collection('users').doc(result.user.uid).set(newUser).then(result => {
      this.router.navigate(['/perfil'])
    }).catch(error => {
      console.log("Error register",error)
    })
    //this.sendEmail();
  }
  async sendEmail() {
    await (await this.afAuth.currentUser).sendEmailVerification
    this.router.navigate(['admin/verify-email']);
}
}
