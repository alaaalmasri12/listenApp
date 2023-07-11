import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Curentuser:any=new BehaviorSubject(null)
  constructor(private _httpclient:HttpClient) { 
    if(localStorage.getItem("usertoken") !=null)
    {
      this.SaveCureentUser()
    }
  }
  Register(user:any):Observable<any>
  {
    return   this._httpclient.post(`https://king-prawn-app-3mgea.ondigitalocean.app/auth/signup`,user);

  }

  Login(user:any):Observable<any>
  {
    return   this._httpclient.post(`https://king-prawn-app-3mgea.ondigitalocean.app/auth/login`,user);

  }
  getuser():Observable<User>
  {
    return this._httpclient.get<User>(`https://king-prawn-app-3mgea.ondigitalocean.app/user`);


  }
  SaveCureentUser()
  {
    let Token= JSON.stringify(localStorage.getItem("usertoken"));
    let decode=jwtDecode(Token)
    console.log(decode,"mmmmmmmmmmmmm")
    this.Curentuser.next(decode)

  }
}
