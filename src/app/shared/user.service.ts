import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './user.model';
import { environment } from '../../environments/environment';
import { role } from './lookup.model';
import { FormRole } from '../usermanager/formrole.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = environment.API_URL;
  //readonly BaseURI = 'https://app1.terra.group/MNE_API/api';
  
  public ulist:User[];
  private showMenu = new BehaviorSubject(true);
  public sm = this.showMenu.asObservable();


  setMenuShow(show: boolean)
  {
    this.showMenu.next(show);
  }

  getMenuShow()
  {
    return this.showMenu;
  }

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
    this.showMenu.next(true);
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

  UpdateUserProfile(formData: any) {
    return this.http.post(this.BaseURI + '/UserProfile/UpdateUserProfile', formData);
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

  deleteFormRoles(formID: number) {
    return this.http.delete(this.BaseURI + '/ApplicationUser/DeleteFormRoles?formID='+formID);
  }

  
  addFormRole(formRole: any) {
    return this.http.post(this.BaseURI + '/ApplicationUser/AddFormRole', formRole);
  }

  
  addFormRoles(formRoles: any) {
    return this.http.post(this.BaseURI + '/ApplicationUser/AddFormRoles', formRoles);
  }

  
  getFormRoles(formID: number) {
    return this.http.get<any>(this.BaseURI + '/ApplicationUser/GetFormRoles?formID='+formID);
  }

  
  getMenusRole(roleID: number) {
    return this.http.get<any>(this.BaseURI + '/ApplicationUser/GetRoleMenus?roleID='+roleID);
  }

  
  getFormsRole(roleID: number) {
    return this.http.get<any>(this.BaseURI + '/ApplicationUser/GetRoleForms?roleID='+roleID);
  }

  
  getTypeRoles(roleID: number) {
    return this.http.get<any>(this.BaseURI + '/ApplicationUser/GetTypeRoles?roleID='+roleID);
  }

  addMenusRole(menusRole: any) {
    return this.http.post(this.BaseURI + '/ApplicationUser/AddRoleMenus', menusRole);
  }
  
  getRoleMenus(role: string) {
    return this.http.get<any>(this.BaseURI + '/ApplicationUser/GetRoleNameMenus?role='+role);
  }

  getPasswordResetToken(email: string) {
    
    return this.http.get(this.BaseURI + '/ApplicationUser/GeneratePasswordResetToken/'+email);
  }

  resetPassword(resetModel: any) {
    return this.http.post(this.BaseURI + '/ApplicationUser/ResetPassword', resetModel);
  }

  
  getLocations(treeID: number) {
    return this.http.get<any>(this.BaseURI + '/ApplicationUser/GetLocations?treeID='+treeID);
  }
  
  getLevels(treeID: number) {
    return this.http.get<any>(this.BaseURI + '/ApplicationUser/GetLevels?treeID='+treeID);
  }

  getLevelsList(treeID:number){
    return this.http.get<any>(this.BaseURI+'/Levels?id='+treeID);
  }

  getNodes(levelID:number){
    return this.http.get<any>(this.BaseURI+'/Nodes/GetNodeByLevelID/'+levelID);
  }

  getBranches() {

    return this.http.get<any>(this.BaseURI + '/ApplicationUser/GetBranches');
  }

  getRoleTypes() {
    return this.http.get<any>(this.BaseURI + '/ApplicationUser/GetRoleTypes');
  }

  addTypeRoles(typeRoles: any) {
    return this.http.post(this.BaseURI + '/ApplicationUser/AddTypeRoles', typeRoles);
  }
}
