import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboredComponent } from './dashbored/dashbored.component';
import { AuthGuardService } from './auth-guard-service.guard';
import { UsersService } from './users.service';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'app',component:AppComponent,title:'Listen App - Angular Music Streaming App'},
  {path:'home',component:HomeComponent,title:'Listen App - Angular Music Streaming App'},
  {path:'about',component:AboutComponent,title:'About - Angular Music Streaming App'},
  {path:'blog',component:BlogComponent,title:'Blog - Angular Music Streaming App'},
  {path:'Contactus',component:ContactusComponent,title:'Contact us - Angular Music Streaming App'},
  {path:'Register',component:RegisterComponent,title:'Register  - Angular Music Streaming App'},
  {path:'login',component:LoginComponent,title:'Login  - Angular Music Streaming App'},
  {path:'dashbored',canActivate:[AuthGuardService], component:DashboredComponent,title:'Dashnored  - Angular Music Streaming App'},
  {path:'users', component:UsersComponent,title:'users  - Angular Music Streaming App'}

];
interface NgxSpinnerConfig {
  type?: string;
}
@NgModule({
  imports: [RouterModule.forRoot(routes),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    SocialLoginModule
  ],
  
  
  
  exports: [RouterModule],
})
export class AppRoutingModule { }
