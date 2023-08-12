import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly APIUrl = "https://localhost:44385/api";
    constructor(private http: HttpClient) {}
    getUsersList(): Observable <any> {
        return this.http.get(this.APIUrl + '/Users');
    }
    addUsers(val: any) {
        return this.http.post(this.APIUrl + '/Users', val);
    }
    updateUsers(val: any) {
        return this.http.put(this.APIUrl + '/Users', val);
    }
    deleteUsers(id: any) {
        return this.http.delete(this.APIUrl + '/Users/' + id);
    }
    getDepartmentList(): Observable < any[] > {
        return this.http.get < any > (this.APIUrl + '/Users');
    }
    addDepartment(val: any) {
        return this.http.post(this.APIUrl + '/Users', val);
    }
    updateDepartment(val: any) {
        return this.http.put(this.APIUrl + '/Users', val);
    }
    deleteDepartment(id: any) {
        return this.http.delete(this.APIUrl + '/Users/' + id);
    }
}
