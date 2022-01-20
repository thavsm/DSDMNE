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
  //readonly APIUrl='https://localhost:44305/api/';

  hformData:hierarchyManagement = new hierarchyManagement();
  public hlist:hierarchyManagement[];
  
  refreshhlist(TreeCategoryID:any){
    this.http.get(this.API_URL + 'Trees/GettreesCategoryID' + '/' + TreeCategoryID)
    .toPromise()
    .then(res=> this.hlist = res as hierarchyManagement[]);

    console.log(this.hlist);
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
}

