import { Component, OnInit, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private auth: Auth = inject(Auth),
    private router: Router
  ) { }

  ngOnInit() { }

  login() {

    if (environment.authMethod === 'redirect') {
      signInWithRedirect(this.auth, new GoogleAuthProvider())
    } else {
      signInWithPopup(this.auth, new GoogleAuthProvider())
        .then((a) => {
          location.href = '/home';
        })
        .catch((error) => {
          console.error(error.code, error.message, error.customData.email);
          alert("Oooops! Ocorreram erros ao fazer login.");
        })
    }
  }

}
