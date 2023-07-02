import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private _HttpClient:HttpClient) { }
  getevents():Observable<any>
  {
    return this._HttpClient.get("https://app.ticketmaster.com/discovery/v2/events.json?keyword=music&source=universe&countryCode=US&apikey=EjJCrafP3GPSO8Fgvzgehd1uGoWYJA5i")
  }
}
