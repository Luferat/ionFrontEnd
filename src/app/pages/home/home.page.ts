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
  public articles: any;
  public mostVieweds: any;
  public lastComments: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getAll();
    this.getMostVieweds(5);
    this.getLastComments(5);
  }

  getAll() {
    this.http.get(environment.apiURL + '/articles').subscribe((response) => {
      console.log('Todos os artigos:', response);
      this.articles = response;
    });
  }

  getMostVieweds(limit: number) {
    this.http.get(environment.apiURL + '/articles/views/' + limit).subscribe((response) => {
      console.log('Artigos + visitados:', response);
      this.mostVieweds = response;
    });
  }

  getLastComments(limit: number) {
    this.http.get(environment.apiURL + '/comments/last/' + limit).subscribe((response) => {
      console.log('Comentátios recentes:', response);
      this.lastComments = response;
    })
  }

}
