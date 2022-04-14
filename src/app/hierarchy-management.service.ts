import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { hierarchyManagement } from './hierarchy-management/hierarchy-management.model';


@Injectable({
  providedIn: 'root'
})
export class HierarchyManagementService {

  constructor(private http:HttpClient) { }

  //readonly API_URL = environment.API_URL + '/'
  readonly API_URL='https://localhost:44305/api/';


  hformData:hierarchyManagement = new hierarchyManagement();
  public hlist:hierarchyManagement[];
  
  refreshhlist(TreeCategoryID:any){
    this.http.get(this.API_URL + 'Trees/GettreesCategoryID' + '/' + TreeCategoryID)
    .toPromise()
    .then(res=> this.hlist = res as hierarchyManagement[]);
    console.log(this.hlist);
  }

  getTreeByCatergory(TreeCategoryID:any):Observable<any[]>{
    return this.http.get<any>(this.API_URL + 'Trees/GettreesCategoryID' + '/' + TreeCategoryID);
  }

  openDialogAdd(val:any){
    return this.http.post(this.API_URL+'/',val);
  }
  addTree(data:any){
    return this.http.post(this.API_URL+'Trees',data);
  }

  archiveTree(treeID:any){
    return this.http.delete(this.API_URL+'Trees' + '/' + treeID);
  }

  updateTreeDetails(treeID:number,data:any){
    return this.http.put(this.API_URL+'Trees/'+treeID,data);
  }

  getLevelsList(treeID:number){
    return this.http.get<any>(this.API_URL+'Levels?id='+treeID);
  }

  getNodes(levelID:number){
    return this.http.get<any>(this.API_URL+'Nodes/GetNodeByLevelID/'+levelID);
  }

  addNode(data:any){
    return this.http.post(this.API_URL+'Nodes',data);
  }

<<<<<<< HEAD
  getIsIndicatorLevelbyLevelID(levelID:number){
    return this.http.get<any>(this.API_URL+'Levels/SelectIsIndicatorLevelbyLevelID/'+levelID);
  }

  getIndicatorNodes():Observable<any[]>{
    return this.http.get<any>(this.API_URL+'Trees/indicatorNodes');
  }
  
=======
  //#region Indicator Nodes
  getIndicatorNodes():Observable<any[]>{
    return this.http.get<any>(this.API_URL+'Trees/indicatorNodes');
  }

  getAssignedIndicatorNodesByTreeRoleID(RoleID :any ,treeID):Observable<any[]>{
    return this.http.get<any>(this.API_URL+'Trees/'+RoleID+'/'+treeID+'/AssignedIndicatorNodesByRole');
  }

  getUnassignedIndicatorNodesByTreeRoleID(RoleID :any ,treeID):Observable<any[]>{
    return this.http.get<any>(this.API_URL+'Trees/'+RoleID+'/'+treeID+'/UnassignedIndicatorNodesByRole');
  }

  assignIndicators(data:any,roleID:any,treeID:any){
    return this.http.post(this.API_URL+'Trees/'+roleID+'/'+treeID+'/AssignIndicatorRole',data,{responseType: 'text'});
  }
  //#endregion
>>>>>>> 6c09d2d3b3e414c142985e7e6e7ce7750baf73c8
}

