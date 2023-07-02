import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private _HttpClient:HttpClient) { 
    
  }
  getArticles():Observable<any>
  {
    return this._HttpClient.get("https://newsapi.org/v2/everything?q=music&sortBy=popularity&apiKey=f7c960d24e2f485481ff2c6f1b5e9094")
  }
  getArticlesbysize(Pagenumber:any):Observable<any>
  {
    return this._HttpClient.get(`https://newsapi.org/v2/everything?q=music&sortBy=popularity&apiKey=f7c960d24e2f485481ff2c6f1b5e9094&page=${Pagenumber}&pageSize=9 `)
  }

 
}
