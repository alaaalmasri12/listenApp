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
query:string=""
  constructor(private _articlesservice:ArticlesService) { }
  ngOnInit(): void {
    localStorage.setItem("pagenumber","1")
    this._articlesservice.getArticles().subscribe({
      next: (data) => {
        this.blogarticles=data.articles
      }
    })
    this._articlesservice.getArticlesbysize(1,"music").subscribe({
      next: (data) => {
        this.blogarticleslist=data.articles
      }
    })
  }
  getArticlesbysize(pagenumber:any)
  {
    if(pagenumber>0)
    {
      this._articlesservice.getArticlesbysize(this.pagenumber,"music").subscribe({
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
    var skipcounter=this.pagenumber-1*8;
    this.setactive(this.pagenumber)
    if  (this.query !='')
    {
      this._articlesservice.getArticlesbytitle(this.query).subscribe({
        next: (data) => {
          this.blogarticleslist=data.articles.slice(skipcounter)
          this.blogarticles=data.articles.slice(skipcounter)
        }
      })
    }
    else
    {
      this._articlesservice.getArticlesbysize(this.pagenumber,"music").subscribe({
        next: (data) => {
          if(skipcounter>0)
          {
          this.blogarticleslist=data.articles.slice(skipcounter)
          this.blogarticles=data.articles.slice(skipcounter)
        }
        else
        {
          this.blogarticleslist=data.articles
          this.blogarticles=data.articles
        }
      }
    }
      )   
    }
  }
  }
  previous()
  {
  
    if(this.pagenumber>0)
    {

      if(this.pagenumber==1)
      {
        this.pagenumber = 1
        this.setactive(this.pagenumber)
      }
      else
      {
        this.pagenumber = this.pagenumber-1;
        this.setactive(this.pagenumber)
      }
    if  (this.query !='')
    {
      alert(this.pagenumber)

      var skipcounter=this.pagenumber-1*8;

      this._articlesservice.getArticlesbytitle(this.query).subscribe({
        next: (data) => {
          if(skipcounter>0)
          {
          this.blogarticleslist=data.articles.slice(skipcounter)
          this.blogarticles=data.articles.slice(skipcounter)
  
        }
        else
        {
          this.blogarticleslist=data.articles
          this.blogarticles=data.articles
        }
        }
      })
    }
    else
    {
      alert(this.pagenumber)
      this._articlesservice.getArticlesbysize(this.pagenumber,"music").subscribe({
        next: (data) => {
          this.blogarticleslist=data.articles
          this.blogarticles=data.articles
        }
      })
    }
  }
  else
  {
    this.pagenumber = this.pagenumber+1;
    this.setactive(this.pagenumber)
  }
}

setactive(number:number) { this.isactive = number; 
}
searchbytitle(event: any){
  var query=event.target.value;
  console.log(query);
  this.query=query
  this._articlesservice.getArticlesbytitle(query).subscribe({
    next: (data2) => {
      this.blogarticleslist=data2.articles
      this.blogarticles=data2.articles
    }
  })
}
}
