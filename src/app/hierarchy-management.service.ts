//* <summary>
//* Methods for sending HTTP requests to Hierarchy Controllers 
//* </summary>
//* <author>Mpilo Msomi,Katelyn Govender</author>
//* <dateLastModified>May 2022</dateLastModified>
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

  readonly API_URL = environment.API_URL + '/'
  //readonly API_URL='https://localhost:44305/api/';


  hformData:hierarchyManagement = new hierarchyManagement();
  public hlist:hierarchyManagement[];
  
  refreshhlist(TreeCategoryID:any){
    this.http.get(this.API_URL + 'Trees/GettreesCategoryID' + '/' + TreeCategoryID)
    .toPromise()
    .then(res=> this.hlist = res as hierarchyManagement[]);
    console.log(this.hlist);
  }

  refreshlist(TreeCategoryID:any, RoleID:any, ProvinceID:any){
    this.http.get(this.API_URL + 'Trees/GetHtreesCategoryID' + '/' + TreeCategoryID + '/' +RoleID+ '/' +ProvinceID)
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

  addIndicator(data:any){
    return this.http.post(this.API_URL+'Nodes/AddIndicatorNode',data);
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

  getNodeRoleFacilityType(NodeID:number){
    return this.http.get<any>(this.API_URL+'Nodes/SelectNodeRoleFacilityType/'+NodeID);
  }

  addNode(data:any){
    return this.http.post(this.API_URL+'Nodes',data);
  }

  
  InsertUpdateNodeRoleFacilityType(data:any){
    return this.http.post(this.API_URL+'Nodes/InsertUpdateNodeRoleFacilityType',data);
  }

  getIsIndicatorLevelbyLevelID(levelID:number){
    return this.http.get<any>(this.API_URL+'Levels/SelectIsIndicatorLevelbyLevelID/'+levelID);
  }

  getFacilityTypes(){
    return this.http.get<any>(this.API_URL+'Levels/SelectFacilityTypes');
  }

  //#region Indicator Nodes
  getIndicatorNodes():Observable<any[]>{
    return this.http.get<any>(this.API_URL+'Trees/indicatorNodes');
  }

  getIndicatorNodesByUserProvinceID(ProvinceID:any):Observable<any[]>{
    return this.http.get<any>(this.API_URL+'Trees/indicatorNodesByUserProvinceID/'+ProvinceID);
  }

  getIndicatorNodesByLocation(LocationID:any):Observable<any[]>{
    return this.http.get<any>(this.API_URL+'Trees/'+LocationID+'/getIndicatorNodesByLocation');
  }

  getAllIndicatorNodes(ProvinceID:any){
    return this.http.get<any>(this.API_URL+'nodes/getAllIndicatorNodes/'+ProvinceID);
  }

  getIndicatorAttributesDataByIndicatorID(IndicatorID:number){
    //console.log(this.API_URL+'MetadataNodeForms/'+NodeID);
    return this.http.get<any>(this.API_URL+'MetadataNodeForms/getIndicatorAttributesDataByIndicatorID/'+IndicatorID);    
  }

  getMetadataIndicatorLevel(){
    return this.http.get<any>(this.API_URL+'nodes/getMetadataIndicatorLevel');
  }

  DeleteIndiactorByID(IndicatorID :number){
    return this.http.post<any>(this.API_URL+'nodes/DeleteIndiactorByID/'+IndicatorID, "");
  }
  getAssignedIndicatorNodesByTreeRoleID(RoleID :any ,treeID):Observable<any[]>{
    return this.http.get<any>(this.API_URL+'Trees/'+RoleID+'/'+treeID+'/AssignedIndicatorNodesByRole');
  }

  getAssignedIndicatorNodesByTreeRoleIDProvID(RoleID :any ,treeID, ProvID):Observable<any[]>{
    return this.http.get<any>(this.API_URL+'Trees/'+RoleID+'/'+treeID+'/'+ProvID+'/AssignedIndicatorNodesByRoleProvID');
  }

  getUnassignedIndicatorNodesByTreeRoleID(RoleID :any ,treeID):Observable<any[]>{
    return this.http.get<any>(this.API_URL+'Trees/'+RoleID+'/'+treeID+'/UnassignedIndicatorNodesByRole');
  }

  assignIndicators(data:any,roleID:any,treeID:any){
    return this.http.post(this.API_URL+'Trees/'+roleID+'/'+treeID+'/AssignIndicatorRole',data,{responseType: 'text'});
  }

  assignIndicatorsProvID(data:any,roleID:any,treeID:any, ProvID:any){
    return this.http.post(this.API_URL+'Trees/'+roleID+'/'+treeID+'/'+ProvID+'/AssignIndicatorRoleProvID',data,{responseType: 'text'});
  }


  AssignRoles(indicatorID:any,data:any,treeID:any){
    return this.http.post(this.API_URL+'Trees/'+indicatorID+'/'+treeID+'/AssignRole',data,{responseType: 'text'});
  }

  getAssignedRolesNodesByTreeIndicatorID(indicatorID :any ,treeID):Observable<any[]>{
    return this.http.get<any>(this.API_URL+'Trees/'+indicatorID+'/'+treeID+'/AssignedRolesNodesByIndicator');
  }

  getFacilityType(){
    return this.http.get<any>(this.API_URL+'Trees/getFacilityType');
  }

  getGeoCords(nodeID:any){
    return this.http.get<any>(this.API_URL+'Trees/'+nodeID+'/getGeoCords');
  }

  UpdateGeoCords(nodeID:any,Address:any,Xcoordinate:any,Ycoordinate:any){
    return this.http.post(this.API_URL+'Trees/'+nodeID+'/'+Address+'/'+Xcoordinate+'/'+Ycoordinate+'/updateGeoCords',{},{responseType:  'text'});
  }
  //#endregion
}