import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public env = environment;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get(environment.apiURL + '/articles').subscribe((response) => {
      console.log('Todos os artigos:', response);
    }, (error) => {
      console.error(error)
    })
  }

}
