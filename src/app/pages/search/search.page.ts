import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public query!: string;
  private activatedRoute = inject(ActivatedRoute);
  public articles: any;

  constructor(
    private menuctrl: MenuController,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.menuctrl.close();
    this.query = this.activatedRoute.snapshot.paramMap.get('query')?.trim() as string;
    if (this.query !== '') {
      console.log('Procurando por:', this.query);
      this.http.get(environment.apiURL + `/articles/find?q=${this.query}`).subscribe((response) => {
        console.log(`Resposta da busca por '${this.query}':`, response);
        this.articles = response;
      })
    }
  }

  searchEvent(event: any) {
    let query = event.target.value.trim();
    if (query !== '') this.router.navigate(['/search/' + query]);
    return false;
  }

}
