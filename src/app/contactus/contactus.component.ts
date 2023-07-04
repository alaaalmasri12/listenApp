import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  constructor(private spinner: NgxSpinnerService,private toastr: ToastrService)
  {

  }
  Contactform:FormGroup=new FormGroup({
firstname:new FormControl(null,[Validators.required]),
lastname:new FormControl(null,[Validators.required]),
mail:new  FormControl(null,[Validators.email,Validators.required]),
Phonenumber:new FormControl(null,[Validators.required]),
Message:new FormControl(null,[Validators.required])
  })

  ContactUsubmit(contactform:FormGroup)
  {
    if(contactform.valid)
    {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.showSuccess();
    }, 6000);
  }
}
showSuccess() {
  this.toastr.success('Thank your Application has been submited', 'Contactus form');
}
}
