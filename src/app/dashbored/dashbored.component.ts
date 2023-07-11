import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-dashbored',
  templateUrl: './dashbored.component.html',
  styleUrls: ['./dashbored.component.css']
})
export class DashboredComponent {
  constructor(private socialAuthService:SocialAuthService,    private _router:Router,private ngZone:NgZone,private _spotify:SpotifyService
    )
  {
  }
  status: boolean = false;
  userdropdownactive:boolean=false;
  tracks:any=[];
  userimage:string="";
  username:string=""
  jsonString:string="";
clickEvent(){
    this.status = !this.status;       
}
toggledropdown()
{
  this.userdropdownactive = !this.userdropdownactive;       
 
}
ngOnInit(): void {
  let json:string =localStorage.getItem("oauthtoken") as string;

if(localStorage.getItem("oauthtoken") !=null)
{
  let jsonObject = JSON.parse( json);
  console.log(jsonObject);
  this.userimage=jsonObject.photoUrl
  this.username=jsonObject.firstName
}
else
{
  this.userimage="../../assets/images/user.png"

}
this._spotify.gettoptracks().subscribe({
  next: (data) => {
    console.log(data.tracks.items[0].track.href);
    this.tracks=data.tracks.items
  },
});

}
logOut(): any {
  this.socialAuthService.signOut();
  localStorage.removeItem("oauthtoken");
  this.ngZone.run(() => this._router.navigateByUrl("/"))


  this._router.navigate(['/']).then(() => window.location.reload());
}
}
