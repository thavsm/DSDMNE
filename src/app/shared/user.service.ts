import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './user.model';
import { environment } from '../../environments/environment';
import { role } from './lookup.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = environment.API_URL;
  //readonly BaseURI = 'https://app1.terra.group/MNE_API/api';
  
  public ulist:User[];

  getUsers(){
    this.http.get(this.BaseURI)
    .toPromise()
    .then(res=> this.ulist = res as User[]);

    console.log(this.ulist);
  }

  
  getAllUsers(){
    return this.http.get<any>(this.BaseURI + '/ApplicationUser');
  }


  register(body: any) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  login(formData: any) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  getUserProfile() {
    
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  getInbox() {
    return this.http.get<[]>(this.BaseURI + '/UserProfile/Inbox');
  }

  getuserTask(formData: any) {
    return this.http.post(this.BaseURI + '/UserProfile/Task', formData);
  }

  completeTask(formData: any) {
    return this.http.post(this.BaseURI + '/UserProfile/CompleteTask', formData);
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
      else {
        return true;
      }
    });
    return isMatch;
  }

  getRole(): string {
    let urole = '';
    if (localStorage.getItem('token') != null) {
    let payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    urole = payLoad.role;
    
    }
    return urole;
  }

  changePassword(body: any) {
    return this.http.post(this.BaseURI + '/ApplicationUser/ChangePassword', body);
  }

  roleUsersCount() {
    return this.http.get(this.BaseURI + '/ApplicationUser/RoleUsersCount');
  }

  getRoles() {

    return this.http.get<role[]>(this.BaseURI + '/Lookup/GetRoles');
  }

  addRole(body: string) {

    return this.http.post(this.BaseURI + '/Lookup/AddRole?roleName='+body,body);
    //return this.http.post(this.BaseURI + '/Lookup/AddRole', body);
  }

}
