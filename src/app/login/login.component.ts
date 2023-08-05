import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SocialUser, SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  Result:any=[];
  isLoggedin:boolean= false;
  username:string=""
  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private _authservice:AuthService,
    private _router:Router,
    private spinner: NgxSpinnerService,private toastr: ToastrService
  ) {}

  LoginForm: FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(4)]),
  }, {
  });
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
      localStorage.setItem('oauthtoken', JSON.stringify(this.socialUser));
      if(this.socialUser !=null)
      {
        this._router.navigate(['/dashbored'])

      }

    });
  }
  loginWithGoogle(): any {
    console.log(GoogleLoginProvider.PROVIDER_ID)
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  logOut(): any {
    this.socialAuthService.signOut();
  }
  Login(Login:FormGroup)
{
  if(!Login.invalid)
  {
    console.log(Login.value.email);
  this._authservice.Login(Login.value).subscribe({
    next:(data)=>{console.log(data)
      this.Result=data
      console.log(this.Result.email,"okkkkkkkkkkkkk");

      this.getusername(Login.value.email)

    if(this.Result.message="Done")
    {    
      this.spinner.show();
      
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.showSuccess();
      console.log("token",data.access_token)
      localStorage.setItem("usertoken",data.access_token)
      this._authservice.SaveCureentUser();
      this._router.navigate(['/dashbored'])
    }, 4000);
    }
    },
    error:(error)=>{
if(error.status=="409" ||error.status=="400" )
{
  this.spinner.show();
if(error.message !=null)
{
  this.showerror()
  this.spinner.hide();

}
}
    }
  })
  }
}
showSuccess() {
  this.toastr.success('Welcome  '+this.username, 'Dashbored');
}
showerror() {
  this.toastr.error('Invalid email or password', 'Login form');
}

getusername(email:any):any
{
this._authservice.getuser().subscribe({
  next:(data)=>{
    
this.Result=data
console.log(this.Result,"testt");

var user=this.Result.users.filter((_element: any) => {
  return _element.email==email
});
this.username=user[0].userName
console.log(this.username,"asdsadsads")

// this.Result = this.Result.filter((cat:any) => cat._id === id);
  }

})
}
}

