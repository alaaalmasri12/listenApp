import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  colorclass:any=new BehaviorSubject(null)
  constructor() { 
  }

  getcolor(color:string):void
  {
    let colorclass= color;
    this.colorclass.next(colorclass)
  }
 
}
