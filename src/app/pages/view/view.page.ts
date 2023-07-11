import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private http = inject(HttpClient);

  public id!: string;
  public article: any;
  public author: any;
  public socials: any;
  public authorArticles: any;

  constructor() { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getArticle(this.id);
  }

  getArticle(id: string) {
    this.http.get(environment.apiURL + '/articles/' + id).subscribe((response) => {
      console.log('Artigo com id ' + id + ':', response);
      this.article = response;
      this.author = this.article.aauthor;
      this.author.age = moment().diff(this.author.ubirth, 'years');
      this.getSocial(this.author.uid);
      this.getAuthorArticles(this.author.uid, this.article.aid, 5);
    })
  }

  getSocial(id: number) {
    this.http.get(environment.apiURL + '/users/social/' + id).subscribe((response) => {
      console.log('Redes Sociais do autor:', response);
      this.socials = response;
    })
  }

  getAuthorArticles(uid: number, aid: number, limit: number) {
    this.http.get(environment.apiURL + '/articles/author?uid=' + uid + '&art=' + aid + '&lim=' + limit).subscribe((response) => {
      console.log('Mais artigos do autor:', response);
      this.authorArticles = response;
    })
  }

}
