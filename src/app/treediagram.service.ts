import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { LevelNodeEdit } from './hierarchy-management/level-node-edit/level-node-edit.model';

@Injectable({
  providedIn: 'root'
})
export class TreediagramService {
  
 
  readonly API_URL ='https://localhost:44305/api/';

  constructor(private http: HttpClient) { }


  hformData:LevelNodeEdit = new LevelNodeEdit();
  public LevelMetadata:LevelNodeEdit[];
  
  addLevel(data:any){
    return this.http.post<any>(this.API_URL+'Levels',data)
  }

  public getNodes(treeID:any):Observable<any[]>{

    return this.http.get<any>(this.API_URL+'nodes/'+treeID);

  }
  
  public getRoles():Observable<any[]>{

    return this.http.get<any>(this.API_URL+'Rolezs');

  }

  public getUserfieldTypes():Observable<any[]>{

    return this.http.get<any>(this.API_URL+'UserfieldTypes');

  }

  addLevelAttributes(data:any){
    return this.http.post<any>(this.API_URL+'MetadataLevels',data)
  } 

  updateLevelDetails(LevelD:number,data:any){
    return this.http.put(this.API_URL+'Levels/'+LevelD,data);
  }

  
    
  getLevelMetadata(LevelD:number){
    this.http.get(this.API_URL+'MetadataLevels/'+LevelD)
    .toPromise()
    .then(res=> this.LevelMetadata = res as LevelNodeEdit[]);
    console.log(this.LevelMetadata);
    
  }

  getLevelsList(treeID:number){
    return this.http.get<any>(this.API_URL+'Levels?id='+treeID);
  }

  getNodesLevelID(levelID:number){
    return this.http.get<any>(this.API_URL+'Nodes/GetNodeByLevelID/'+levelID);
  }
  
  archiveAttributes(metadataLevelID:any){
    return this.http.delete(this.API_URL+'MetadataLevels' + '/' + metadataLevelID);
  }

  updateLevelAttributes(metadataLevelID:number,data:any){
    return this.http.put(this.API_URL+'MetadataLevels/'+metadataLevelID,data);
  }

  public getAttributesDataExportName(DataExportName:any, LevelID:any ):Observable<any[]>{

    return this.http.get<any>(this.API_URL+'MetadataLevels/GetMLUniqueDataExport/'+DataExportName + '/' + LevelID);

  }

  getNodeAttributes(LevelD:number){
    return this.http.get<any>(this.API_URL+'MetadataLevels/'+LevelD);
  }

}
