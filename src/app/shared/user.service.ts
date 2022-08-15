import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './user.model';
import { environment } from '../../environments/environment';
import { role } from './lookup.model';
import { FormRole } from '../usermanager/formrole.model';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import {MatTableModule} from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = environment.API_URL;
  //readonly BaseURI = 'https://app.terra.group/DSDFormWeb/api';
  
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

  getAllFacilities(): Observable<any[]> {
    return this.http.get<any>(this.BaseURI + '/Facilities');
  }

  UpdateFacilities(ID:number,formData: any) {
    return this.http.put(this.BaseURI + '/Facilities/' + ID, formData);
  }
  
  addFacility(formData: any) {
    return this.http.post(this.BaseURI + '/Facilities', formData);
  }

  register(body: any) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  InsertFinancialPeriod(data: any) {
    return this.http.post(this.BaseURI + '/Scheduler/InsertFinancialPeriod', data);
  }
  
  UpdateFinancialPeriod(data: any) {
    return this.http.post(this.BaseURI + '/Scheduler/UpdateFinancialPeriod', data);
  }

  InsertPeriods(data: any) {
    return this.http.post(this.BaseURI + '/Scheduler/InsertPeriods', data);
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

  rejectTask(formData: any, id: string) {
    return this.http.post(this.BaseURI + '/UserProfile/TerminateWorkflow', formData);
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
    //return this.http.get(this.BaseURI + '/ApplicationUser/RoleUsersCount');
    return this.http.get<any>(this.BaseURI + '/ApplicationUser/RoleUsersCount');
  }

  getRoles() {

    return this.http.get<role[]>(this.BaseURI + '/Lookup/GetRoles');
  }


  addRole(body: string) {

    return this.http.post(this.BaseURI + '/Lookup/AddRole?roleName='+body,body);
    //return this.http.post(this.BaseURI + '/Lookup/AddRole', body);
  }

  
  addNewRole(role: string,concurrency:any,roleID:any,typeID:any) {
    return this.http.post(this.BaseURI + '/ApplicationUser/AddNewRole?role='+role+'&concurrency='+concurrency+'&roleID='+roleID+'&typeID='+typeID,  role);
  }

  deleteFormRoles(formID: number) {
    return this.http.delete(this.BaseURI + '/ApplicationUser/DeleteFormRoles?formID='+formID);
  }

  
  addFormRole(formRole: any) {
    return this.http.post(this.BaseURI + '/ApplicationUser/AddFormRole', formRole);
  }

  
  addFormRoles(formRoles: any,role) {
    return this.http.post(this.BaseURI + '/ApplicationUser/AddFormRoles?roleID='+role, formRoles);
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

  addMenusRole(menusRole: any,role:any) {
    return this.http.post(this.BaseURI + '/ApplicationUser/AddRoleMenus?roleID='+role, menusRole);
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

  getNodesByParent(parentNode:number){
    return this.http.get<any>(this.BaseURI+'/Nodes/GetnodesByParentID/'+parentNode);
  }

  getBranches() {

    return this.http.get<any>(this.BaseURI + '/ApplicationUser/GetBranches');
  }

  getRoleTypes() {
    return this.http.get<any>(this.BaseURI + '/ApplicationUser/GetRoleTypes');
  }

  addTypeRoles(typeRole: any,role:any) {
    return this.http.post(this.BaseURI + '/ApplicationUser/AddTypeRoles?roleID='+role,typeRole);
  }

  
  getAllData(): Observable<any[]> {
    return this.http.get<any[]>('./assets/data/cars-large.json');
  }

  
  getFinancialYears() {
    return this.http.get<any>(this.BaseURI + '/FinancialYears');
  }

  getFinancialYear(id:number) {
    return this.http.get<any>(this.BaseURI + '/FinancialYears/'+ id);
  }


  getSchedule() {
    return this.http.get<any>(this.BaseURI + '/Schedules');
  }

  getFinancialPeriods(id:number) {
    return this.http.get<any>(this.BaseURI + '/Scheduler/SelectFinancialPeriods/'+ id);
  }

}
