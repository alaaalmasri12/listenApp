import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'app',component:AppComponent,title:'Listen App - Angular Music Streaming App'},
  {path:'home',component:HomeComponent,title:'Listen App - Angular Music Streaming App'},
  {path:'about',component:AboutComponent,title:'About - Angular Music Streaming App'},
  {path:'blog',component:BlogComponent,title:'Blog - Angular Music Streaming App'},
  {path:'Contactus',component:ContactusComponent,title:'Contact us - Angular Music Streaming App'},

];
interface NgxSpinnerConfig {
  type?: string;
}
@NgModule({
  imports: [RouterModule.forRoot(routes),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  
  exports: [RouterModule],
})
export class AppRoutingModule { }
