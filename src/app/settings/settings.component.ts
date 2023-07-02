import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SettingsService } from '../settings.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  isValue: string = "";
  @Output() newItemEvent = new EventEmitter<string>();

   subject:any = new BehaviorSubject(null);
constructor(private _settings:SettingsService,private _routerlink:Router)
{

}
  toggle(color:string) { this.isValue = color; 
   this.subject.subscribe(color);
   this._settings.getcolor(color);   
   this.newItemEvent.emit(color);

  }
  public ngOnDestroy(): void{
    this.subject.unsubscribe() ;
  }

};
