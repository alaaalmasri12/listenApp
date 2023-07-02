import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
logo:string="../../assets/images/logo.svg";
logourl:string="#"
scrollTo(idName: string):void {
  const elementList = document.querySelectorAll(idName);
  const element = elementList[0] as HTMLElement;
  element.scrollIntoView({ behavior: 'smooth' });
}
}
