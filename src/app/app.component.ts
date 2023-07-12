import { Component, inject } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public env = environment;

  public appPages = [
    { title: 'Início', url: '/home', icon: 'home' },
    { title: 'Contatos', url: '/contacts', icon: 'chatbubbles' },
    { title: 'Sobre', url: '/about', icon: 'information-circle' },
    { title: 'Sua Privacidade', url: '/policies', icon: 'document-lock' }
  ];

  public appUser = {
    logged: false,
    title: 'Login / Entrar',
    url: '/login',
    icon: 'log-in',
    avatar: ''
  }

  private authState = authState(this.auth);
  private authStateSubscription = new Subscription;

  constructor(
    private auth: Auth = inject(Auth),
    private router: Router
  ) { }

  ngOnInit() {
    this.authStateSubscription = this.authState.subscribe(
      (userData: User | null) => {
        if (userData) {
          this.appUser = {
            logged: true,
            title: userData.displayName + '',
            url: '/profile',
            icon: 'log-out',
            avatar: userData.photoURL + ''
          }
        }
      }
    )
  }

  searchEvent(event: any) {
    let query = event.target.value.trim();
    if (query !== '') this.router.navigate(['/search/' + query]);
    return false;
  }

}
