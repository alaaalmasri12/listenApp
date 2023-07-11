import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  client_id:string="771925af55fc4f77b9dbe4a6cf3edaec";
  client_secret:string= "ee68c5c42a4f48f48e51f119c103186e";
  tokenUrl: string = "https://accounts.spotify.com/api/token";
  artistsurl:string="https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ/related-artists"
  idAndSecret: string = btoa(this.client_id + ":" + this.client_secret);
  topatracks:string="https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF"
  constructor(private _httpclient:HttpClient) {
 
    this.SaveTokenUser()
   }
   options = {
    headers: new HttpHeaders({
        'Authorization': 'Basic '.concat(this.idAndSecret),
        'Content-Type': 'application/x-www-form-urlencoded'
    })
};
   SaveTokenUser():Observable<any>
  {
  var   body = 'grant_type=client_credentials';    
    return this._httpclient.post(this.tokenUrl,body,this.options)
  }
  gettoptracks():Observable<any>
    {
      return this._httpclient.get(this.topatracks,{
        headers:{
          Authorization:'Bearer '+localStorage.getItem('Spotifyusertoken')
        }
    })
  }
  getArtists(): Observable<any>{
    return this._httpclient.get(this.artistsurl,{
      headers:{
        Authorization:'Bearer '+localStorage.getItem('Spotifyusertoken')
      }
    })

    
  

  }
}
