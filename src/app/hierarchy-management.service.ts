import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { hierarchyManagement } from './hierarchy-management/hierarchy-management.model';


@Injectable({
  providedIn: 'root'
})
export class HierarchyManagementService {

  constructor(private http:HttpClient) { }
  readonly APIUrl='https://localhost:44305/api/';

  hformData:hierarchyManagement = new hierarchyManagement();
  public hlist:hierarchyManagement[];
  
  refreshhlist(){
    this.http.get(this.APIUrl + 'Trees')
    .toPromise()
    .then(res=> this.hlist = res as hierarchyManagement[]);

    console.log(this.hlist);
  }

  openDialogAdd(val:any){
    return this.http.post(this.APIUrl+'/',val);
  }
  addTree(data:any){
    return this.http.post(this.APIUrl+'Trees',data);
  }

  archiveTree(treeID:any){
    return this.http.delete(this.APIUrl+'Trees' + '/' + treeID);
  }

  updateTreeDetails(treeID:number,data:any){
    return this.http.put(this.APIUrl+'Trees/'+treeID,data);
  }

  getLevelsList(treeID:number){
    return this.http.get<any>(this.APIUrl+'Levels?id='+treeID);
  }

  getNodes(levelID:number){
    return this.http.get<any>(this.APIUrl+'Nodes/GetNodeByLevelID/'+levelID);
  }

  addNode(data:any){
    return this.http.post(this.APIUrl+'Nodes',data);
  }
}

