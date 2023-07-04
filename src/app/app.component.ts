import { Component } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private spinner: NgxSpinnerService)
  {

  }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }
  colorstyle:string="test";

  addItem(newItem: string) {
   console.log(newItem);
   this.colorstyle=newItem
  }

  title = 'ListenApp';  
}
