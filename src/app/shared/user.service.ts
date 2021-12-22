import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './user.model';
import { environment } from '../../environments/environment';

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



  register(body: any) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  login(formData: any) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  getUserProfile() {
    //let httpOptions = new HttpHeaders()
    //.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    //return this.http.get(this.BaseURI + '/UserProfile',{ headers: httpOptions });
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  getInbox1() {
    //let httpOptions = new HttpHeaders()
    //.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    //return this.http.get(this.BaseURI + '/UserProfile',{ headers: httpOptions });
    return this.http.get<[]>(this.BaseURI + '/UserProfile/Inbox');
  }

  getuserTask(formData: any) {
    //let httpOptions = new HttpHeaders()
    //.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    //return this.http.get(this.BaseURI + '/UserProfile',{ headers: httpOptions });
    //return this.http.get(this.BaseURI + '/UserProfile/Task');
    return this.http.post(this.BaseURI + '/UserProfile/Task', formData);
  }

  completeTask(formData: any) {
    //let httpOptions = new HttpHeaders()
    //.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    //return this.http.get(this.BaseURI + '/UserProfile',{ headers: httpOptions });
    //return this.http.get(this.BaseURI + '/UserProfile/Task');
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
}
