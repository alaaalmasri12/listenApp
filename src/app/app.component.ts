import { Component } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  colorstyle:string="test";

  addItem(newItem: string) {
   console.log(newItem);
   this.colorstyle=newItem
  }

  title = 'ListenApp';  
}
