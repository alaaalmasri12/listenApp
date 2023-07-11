import { SocialUser, SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  RegisterForm: FormGroup=new FormGroup({
    userName:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(4)]),
    cPassword:new FormControl(null,[Validators.required,Validators.minLength(4)]),
  }, {
    validators: this.MatchValidator('password', 'cPassword') // working
  });
  Result:any=[]
  emailexist:string=""
  socialUser!: SocialUser;
  isLoggedin:boolean= false;
  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private _authservice:AuthService,
    private _router:Router,
    private spinner: NgxSpinnerService,private toastr: ToastrService
  ) {}
  ngOnInit() {

  this.socialAuthService.authState.subscribe((user) => {
    this.socialUser = user;
    this.isLoggedin = user != null;
    console.log(this.socialUser);
  });
}
loginWithGoogle(): any {
  console.log(GoogleLoginProvider.PROVIDER_ID)
  this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  localStorage.setItem("usertoken",this.socialUser.idToken)

}
logOut(): any {
  this.socialAuthService.signOut();
}
Register(Register:FormGroup)
{
  if(!Register.invalid)
  {
  this._authservice.Register(Register.value).subscribe({
    next:(data)=>{console.log(data)
      this.Result=data
      // localStorage.setItem("usertoken",data.token)

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
      this._router.navigate(['/login'])
    }, 4000);
    }
    },
    error:(error)=>{
if(error.status=="409")
{
  this.spinner.show();
if(error.message !=null)
{
  this.spinner.hide();

  this.emailexist=error.message
}
}
    }
  })
  }
}
get passwordMatchError() {
  return (
    this.RegisterForm.getError('mismatch') &&
    this.RegisterForm.get('cPassword')?.touched
  );
}
MatchValidator(source: string, target: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const sourceCtrl = control.get(source);
    const targetCtrl = control.get(target);

    return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
      ? { mismatch: true }
      : null;
  };
}
showSuccess() {
  this.toastr.success('Thank you have been Registred', 'Register form');
}
}
