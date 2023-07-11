import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custompipe'
})
export class CustompipePipe implements PipeTransform {

  url:string=''
  transform(url:string): boolean {
    enum Example {
      Register = "/register",
      Login = "/login",
      dashbored="/dashbored"
    }
    if(url ==Example.Register.toString() )
    {
      return false
    }
    else if(url ==Example.Login.toString())
    {
      return false

    }
    else if(url ==Example.dashbored.toString())
    {
      return false

    }
    else
    {
      return true;
    }
  }

}
