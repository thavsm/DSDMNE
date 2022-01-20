import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { LevelNodeEdit } from './hierarchy-management/level-node-edit/level-node-edit.model';
import { Targets } from './hierarchy-management/target-add/target-add.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreediagramService {
  
 
  //readonly API_URL ='https://localhost:44305/api/';

  readonly API_URL = environment.API_URL + '/'

  constructor(private http: HttpClient) { }


  hformData:LevelNodeEdit = new LevelNodeEdit();
  public LevelMetadata:LevelNodeEdit[];

  TargetsData:Targets = new Targets();
  public TargetsMetadata:Targets[];
  
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

  getNodeAttributesData(NodeID:number){
    //console.log(this.API_URL+'MetadataNodeForms/'+NodeID);
    return this.http.get<any>(this.API_URL+'MetadataNodeForms/'+NodeID);    
  }

  updateNodeDetails(nodeID:number,data:any){
    return this.http.put(this.API_URL+'Nodes/'+nodeID,data);
  }

  addNodeXMLForm(data:any){
    return this.http.post<any>(this.API_URL+'MetadataNodeForms',data)
  } 

  UpdateNodeXMLForm(MetadataNodeFormID:number,data:any){
    return this.http.put(this.API_URL+'MetadataNodeForms/'+MetadataNodeFormID,data);
  }

  GetMetadataNodeFormID(nodeID:number){
    return this.http.get<any>(this.API_URL+'MetadataNodeForms/GetMetadataNodeFormID/'+nodeID);
  }

  AddTargetsForm(data:any){

    return this.http.post<any>(this.API_URL+'Targets',data);

  }

  GetTargetsForm(nodeID:number){
    this.http.get(this.API_URL+'Targets/GetTargetsByNodeID/'+nodeID)
    .toPromise()
    .then(res=> this.TargetsMetadata = res as Targets[]);
    console.log(this.TargetsMetadata);
    
  }

  GetTargetsFinancialYear(nodeID:number){
    return this.http.get<any>(this.API_URL+'Targets/GetTargetsFinancialYear/'+nodeID);
  }

  updateTargetDetails(targetID:number,data:any){
    return this.http.put(this.API_URL+'Targets/'+targetID,data);
  }

}
