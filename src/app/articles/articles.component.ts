import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Article } from '../article';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  public articles: Article[] = [];
  public articlesPerPage = 10;
  public currentPage = 1;
  public totalArticles;
  public searchTerm = 'Search';

  constructor(private http: HttpService) { }

  public pageChanged( currentPageNumber ) {
    this.currentPage = currentPageNumber;
    this.http.getArticles(currentPageNumber).subscribe(
      (data: []) => {
        this.articles = [];
        data.forEach((article) => {
          let tempArticle = new Article();
          tempArticle.title = article['title'];
          tempArticle.description = article['description'];
          this.articles.push(tempArticle);
        });
      }
    );
  }

  public searchArticles(event) {
    if ( !(event.length >= 3)) {
      return;
    } else {
    this.http.getMatchedArticles(event).subscribe((data) => {
      this.articles = [];
      data.forEach((article) => {
        let tempArticle = new Article();
        tempArticle.title = article['title'];
        tempArticle.description = article['description'];
        this.articles.push(tempArticle);
      });
    });
  }
  }

  ngOnInit() {
    this.http.getArticles(1).subscribe(
      (data: []) => {
        data.forEach((article) => {
          let tempArticle = new Article();
          tempArticle.title = article['title'];
          tempArticle.description = article['description'];
          this.articles.push(tempArticle);
        });
      }
    );

    this.http.getTotalArticles().subscribe((totalCount) => {
      this.totalArticles = totalCount;
    });

  }


}
