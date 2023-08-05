import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
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
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    margin:10,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
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
    // console.log(data.tracks.items[0].track.href);
        console.log(data.tracks.items[0].track.album.images)        ;

    this.tracks=data.tracks.items;
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
