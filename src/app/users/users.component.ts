import { Component } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  UsersList:any = [];
  modalTitle:any;
  activateAddEditStuCom:boolean = false;
  Users:any;

  constructor(private usersservice: UsersService) { }

  ngOnInit(): void {
    this.refreshUsersList();
  }

  refreshUsersList() {
    this.usersservice.getUsersList().subscribe(data =>{
      console.log(data,"asdasdsadsadsad");
      this.UsersList = data;
    });
  }

  AddUsers(){
    this.Users={
      UsersId:0,
      FullName:"",
      Class:""
    }
    this.modalTitle = "Add Users";
    this.activateAddEditStuCom = true;
  }

  EditUsers(item: any){
    this.Users = item;
    this.activateAddEditStuCom = true;
    this.modalTitle = "Update Users";
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.usersservice.deleteUsers(item.UsersId).subscribe(data =>{
        alert(data.toString());
        this.refreshUsersList();
      })
    }
  }

  closeClick(){
    this.activateAddEditStuCom=false;
    this.refreshUsersList();
  }
}
