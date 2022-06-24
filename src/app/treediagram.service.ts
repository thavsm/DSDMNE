import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { LevelNodeEdit } from './hierarchy-management/level-node-edit/level-node-edit.model';
import { Targets } from './hierarchy-management/target-add/target-add.model';
import { environment } from 'src/environments/environment';
import { ExternalEdit } from './hierarchy-management/externaldata-add/externaldata-add.model';

@Injectable({
  providedIn: 'root'
})
export class TreediagramService {
  
 
  // readonly API_URL ='https://localhost:44305/api/';
  // readonly APIUrl ='https://localhost:44305/1/';

  readonly API_URL = environment.API_URL + '/'
  readonly APIUrl = environment.API_FormURL;

  constructor(private http: HttpClient) { }


  hformData:LevelNodeEdit = new LevelNodeEdit();
  public LevelMetadata:LevelNodeEdit[];

  TargetsData:Targets = new Targets();
  public TargetsMetadata:Targets[];

  External:ExternalEdit = new ExternalEdit();
  public ExternalMetadata:ExternalEdit[];
  
  addLevel(data:any){
    return this.http.post<any>(this.API_URL+'Levels',data)
  }

  public getNodes(treeID:any):Observable<any[]>{

    return this.http.get<any>(this.API_URL+'nodes/'+treeID);

  }

  addIndicatorNode(data:any){
    return this.http.post(this.API_URL+'nodes/IndicatorNode/',data)
  }

  addupdateIndicatorNode(data:any){
    return this.http.post(this.API_URL+'nodes/AddUpdateIndicatorNode/',data)
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

  addLevelIndicatorAttributes(LevelD:number){
    return this.http.post(this.API_URL+'MetadataLevels/IndicatorMetadataLevels/'+LevelD,"")
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

  DeleteLevel(LevelD:any){
    return this.http.post<any>(this.API_URL+'Levels/DeleteLevelByLevelID/'+LevelD,"")
  } 

  DeleteNode(NodeID:any){
    return this.http.post<any>(this.API_URL+'Nodes/DeleteNodeByNodeID/'+NodeID,"")
  } 

  updateNodeDetails(nodeID:number,data:any){
    return this.http.put(this.API_URL+'Nodes/'+nodeID,data);
  }

  UpdateIndicatorNodeByID(data:any){
    return this.http.post<any>(this.API_URL+'Nodes/UpdateIndicatorNodeByID',data)
  } 

  UpdateMetadataIndicatorForm(data:any){
    return this.http.post<any>(this.API_URL+'MetadataNodeForms/UpdateMetadataIndicatorForm',data)
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


  public getExternalDataType():Observable<any[]>{

    return this.http.get<any>(this.API_URL+'ExternalDataTypes');

  }

  getformCategoryList(){
    return this.http.get<any>(this.APIUrl+'formcategories');
  }

  GetFormCategoryId(CategoryID:number){
    return this.http.get<any>(this.APIUrl+'Forms/GetFormCategoryId/'+CategoryID);
  }

  GetFormFieldsById(FormID:number){
    return this.http.get<any>(this.APIUrl+'Forms/'+FormID+'/pages/FieldsByFormID');
  }

  GetFormFieldsByFormId(FormID:number){
    return this.http.get<any>(this.APIUrl+'Forms/'+FormID+'/pages/FormFieldsByFormID');
  }


  GetFormFieldsByFieldID(FieldID:number){
    return this.http.get<any>(this.APIUrl+'Forms/'+FieldID+'/pages/FieldsByFieldID');
  }

  getIndicatorNode(NodeID:number){
    console.log(this.API_URL+'nodes/'+NodeID);
    return this.http.get<any>(this.API_URL+'nodes/getIndicatorNode/'+NodeID);

  }
  
  CountColumnData(columnName :any,dataValue :any,tableName :any){
    return this.http.get<any>(this.API_URL+'Trees/CountColumnData/'+columnName+'/'+dataValue+'/'+tableName);
  }

  ExtrenalCountColumnData(columnName :any,dataValue :any,tableName :any, Connstring: any){
    return this.http.get<any>(this.API_URL+'Trees/ExtrenalCountColumnData/'+columnName+'/'+dataValue+'/'+tableName+'/'+Connstring);
  }

  insertExternalCalculation(NodeID :number,ExternalDataName :any,ExternalDataTypeID :number,CriteriaCol :any,CriteriaRow :any,calcField :any,value :number){
    return this.http.post<any>(this.API_URL+'Trees/insertExternalCalculation/'+NodeID+'/'+ExternalDataName+'/'+ExternalDataTypeID+'/'+CriteriaCol+'/'+CriteriaRow+'/'+calcField+'/'+value, "");
  }

  UpdateExternalCalculation(CalculationID :number,NodeID :number,ExternalDataName :any,ExternalDataTypeID :number,CriteriaCol :any,value :number){
    return this.http.post<any>(this.API_URL+'Trees/UpdateExternalCalculation/'+CalculationID+'/'+NodeID+'/'+ExternalDataName+'/'+ExternalDataTypeID+'/'+CriteriaCol+'/'+value, "");
  }
  addNodeVal(NodeID :number,ExternalDataName :any,CriteriaCol :any,CriteriaRow :any,calcField :any,value :number,ExternalDataTypeID :number, calcFieldCommas: any){

    return this.http.post<any>(this.API_URL+'Trees/addNodeVal/'+NodeID+'/'+ExternalDataName+'/'+CriteriaCol+'/'+CriteriaRow+'/'+calcField+'/'+value+'/'+ExternalDataTypeID+'/'+calcFieldCommas, "");
  }

  getExternalTotalCalculationByNodeID(NodeID :number){
    return this.http.get<any>(this.API_URL+'Trees/getExternalTotalCalculationByNodeID/'+NodeID);
  }


  getExternalCalculationByNodeID(NodeID:number){
    this.http.get(this.API_URL+'Trees/getExternalCalculationByNodeID/'+NodeID)
    .toPromise()
    .then(res=> this.ExternalMetadata = res as ExternalEdit[]);
    console.log(this.ExternalMetadata);
    
  }

  getTreeUpload(){
    return this.http.get<any>(this.API_URL+'Trees/getTreeUpload');
  }

  getTableColumns(Table :any){
    return this.http.get<any>(this.API_URL+'Trees/getTableColumns/'+Table);
  }

  
  getDataService(){
    return this.http.get<any>(this.API_URL+'Trees/getDataService')
  }


  CreateProcs(Connstring :any,Database :any){
    return this.http.post<any>(this.API_URL+'Trees/CreateProcs/'+Connstring+'/'+Database, "");
  }

  DeleteExternalCalculation(CalculationID :number){
    return this.http.post<any>(this.API_URL+'Trees/DeleteExternalCalculation/'+CalculationID, "");
  }

  getExternalTables(Connstring :any){
    return this.http.get<any>(this.API_URL+'Trees/getExternalTables/'+Connstring);
  }

  getCalculationsReport(){
    return this.http.get<any>(this.API_URL+'Trees/getCalculationsReport')
  }

  getExternalTableColumns(Connstring :any, Table : any){
    return this.http.get<any>(this.API_URL+'Trees/getExternalTableColumns/'+Connstring+'/'+Table);
  }

  insertExternalConnection(dataServiceID :any){
    return this.http.post<any>(this.API_URL+'Trees/insertExternalConnection/'+dataServiceID, "");
  }

  RefreshExternalFormCalculation(formData :any,tableName :any,CalculationID :any, Connstring:any, externalDataTypeID:any){
    return this.http.post<any>(this.API_URL+'Trees/RefreshExternalCalculation/'+formData+'/'+tableName+'/'+CalculationID+'/'+Connstring+'/'+externalDataTypeID, "");
  }

  getIndicatorsDataApproval(locationType:number, locationID:number, monthID:number, year:number){
    return this.http.get<any>(this.API_URL+'Trees/getIndicatorsDataApproval?locationType='+locationType+'&locationID='+locationID+'&monthID='+monthID+'&year='+year);
  }

  getFacilityIndicatorsDataApproval(indicatorID:number, locationType:number, locationID:number, year:number, monthID:number){
    return this.http.get<any>(this.API_URL+'Trees/getFacilityIndicatorsDataApproval?indicatorID='+indicatorID+'&locationType='+locationType+'&locationID='+locationID+'&year='+year+'&monthID='+monthID);
  }

  getTaskDetails(taskID:number){
    return this.http.get<any>(this.API_URL+'Trees/getTaskDetails?taskID='+taskID);
  }
}
