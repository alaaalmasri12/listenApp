import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ArticlesService } from '../articles.service';
import { EventsService } from '../events.service';
import { SettingsService } from '../settings.service';
import { SpotifyService } from '../spotify.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  events: any = [];
  artists: any = [];
  color:string=''
  eventsimages: any = [];
  access_token: string = '';
  articles:any=[];
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    margin:10,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  constructor(
    private _Eventservice: EventsService,
    private _Spotifyservice: SpotifyService,
    private _articlesservice: ArticlesService,
    private _settings:SettingsService,    
  ) {
  
    this._Spotifyservice.SaveTokenUser().subscribe({
      next: (data) => {
        console.log(data, 'Acssestoken');
        this.access_token = data.access_token;
        if (this.access_token != null) {
          localStorage.setItem('usertoken', this.access_token);
          console.log(localStorage.getItem('usertoken'), 'localstorage');
        }
      },
    });
  }
  ngOnInit(): void {
  console.log(this._settings.colorclass._value    )
      this._Eventservice.getevents().subscribe({
      next: (data) => {
        console.log(data._embedded.events, 'testtttttt');
        this.events = data._embedded.events.slice(3, 6);
      },
    });
    this._Spotifyservice.getArtists().subscribe({
      next: (data) => {
        console.log(data.artists, 'artistsss');
        this.artists=data.artists
      },
    });
    this._articlesservice.getArticles().subscribe({
      next: (data) => {
        console.log(data.articles, 'articles');
        this.articles=data.articles
      },
    })
  }
 
}
