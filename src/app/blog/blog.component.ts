import { Component } from '@angular/core';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blogarticles:any=[];
  blogarticleslist:any=[];
pagenumber:number=1;
isactive:number=1;
  constructor(private _articlesservice:ArticlesService) { }
  ngOnInit(): void {
    localStorage.setItem("pagenumber","1")
    this._articlesservice.getArticles().subscribe({
      next: (data) => {
        this.blogarticles=data.articles
      }
    })
    this._articlesservice.getArticlesbysize(1).subscribe({
      next: (data) => {
        this.blogarticleslist=data.articles
      }
    })
  }
  getArticlesbysize(pagenumber:any)
  {
    if(pagenumber>0)
    {
    this._articlesservice.getArticlesbysize(pagenumber).subscribe({
      next: (data) => {
      this.pagenumber=pagenumber;
        this.blogarticleslist=data.articles
        this.blogarticles=data.articles

      }
    })
  }
  }
  next()
  {
    if(this.pagenumber>0)
    {
    this.pagenumber = this.pagenumber+1;
    this._articlesservice.getArticlesbysize(this.pagenumber).subscribe({
      next: (data) => {
        this.blogarticleslist=data.articles
        this.blogarticles=data.articles

      }
    })
  }
  }

  previous()
  {
  
    if(this.pagenumber>0)
    {
      if(this.pagenumber==1)
      {
        this.pagenumber = 1
      }
      else
      {
        this.pagenumber = this.pagenumber-1;
      }
    
    this._articlesservice.getArticlesbysize(this.pagenumber).subscribe({
      next: (data) => {
        this.blogarticleslist=data.articles
        this.blogarticles=data.articles
      }
    })
   
  }
  else
  {
    this.pagenumber = this.pagenumber+1;

  }
}

setactive(number:number) { this.isactive = number; 


}
}
