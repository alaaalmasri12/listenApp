import { Component, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from './settings.service';
import { Location } from '@angular/common';
import { CustompipePipe } from './custompipe.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    CustompipePipe
]
})
export class AppComponent implements OnInit {
  url:string=""
  colorstyle:string="";
  CustompipePipe:CustompipePipe= new CustompipePipe()
  constructor(private spinner: NgxSpinnerService,private location: Location, private validate: CustompipePipe,  private _router:Router  )
  {
    
    this.url=window.location.pathname.toString().toLowerCase()
  }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  }
  addItem(newItem: string) {
   console.log(newItem);
   this.colorstyle=newItem
  }

  title = 'ListenApp';  
}
