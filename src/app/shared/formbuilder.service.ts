import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormbuilderService {

  readonly APIUrl='https://localhost:44305/1/';

  constructor(private http:HttpClient) { }

//#region Forms

  getDynamicFormList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'forms/filter/type/2')
  }

  addDynamicForm(data:any){
    return this.http.post(this.APIUrl+'forms',data);
  }

  updateDynamicFormDetails(formID:number,data:any){
    return this.http.put(this.APIUrl+'forms/'+formID,data);
  }

  archiveDynamicForm(formID:any){
    return this.http.delete(this.APIUrl+'forms/'+formID+'/archive');
  }

  getFormPages(formID:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'forms/'+formID+'/pages');
  }

  getFormFieldsPerPage(formID:any,pageGuID:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'forms/'+formID+'/pages/'+pageGuID+'/fields');
  }

  getFormGroupsPerPage(formID:any,pageGuID:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'forms/'+formID+'/pages/'+pageGuID+'/groups');
  }


  addFormPage(data:any){
    return this.http.post(this.APIUrl+'forms/'+data.formID+'/pages',data);
  }

  addFieldPerPage(data:any,formID:any,pageGuID:any){
    return this.http.post(this.APIUrl+'forms/'+formID+'/pages/'+pageGuID+'/fields',data);
  }

  deleteFormPage(pageID:any,data:any){
    return this.http.put(this.APIUrl+'forms/'+pageID+'/removepage',data);
  }

  addGroupOrSection(data:any,pageGUID:any){
    return this.http.post(this.APIUrl+'forms/'+pageGUID+'/groups',data);
  }

  getFieldsInGroup(groupGUID:any){
    return this.http.get<any>(this.APIUrl+'forms/pages/'+groupGUID+'/fieldspergroup');
  }

  getformCategoryList(){
    return this.http.get<any>(this.APIUrl+'formcategories');
  }

  updateformCategoryDetails(formCategoryID:number,data:any){
    return this.http.put(this.APIUrl+'formcategories/'+formCategoryID,data);
  }

  addformcategories(data:any){
    return this.http.post(this.APIUrl+'formcategories',data);
  }

  createTemplateFormTable(data:any){
    return this.http.post(this.APIUrl+'FormTables',data,{responseType: 'text'});
  }

  getCapturedForms(){
    return this.http.get<any>(this.APIUrl+'CapturedForms');
  }

  addCapturedForms(data:any){
    return this.http.post(this.APIUrl+'CapturedForms',data,{responseType: 'text'});
  }

  getMetadataValue(pageGUID:any,columnName:any,formCaptureID:any){
    return this.http.get(this.APIUrl+pageGUID+'/'+columnName+'/'+formCaptureID+'/MetadataValue',{responseType: 'text'});
  }

  getTableNameForGroup(groupGUID:any){
    return this.http.get(this.APIUrl+groupGUID+'/GroupTableName',{responseType: 'text'});
  }

  saveFormMetadata(formCaptureID:any,data:any){
    return this.http.post(this.APIUrl+formCaptureID+'/AddMetadata',data,{responseType: 'text'});
  }

  saveGroupMetadata(formCaptureID:any,groupGUID:any,data:any){
    return this.http.post(this.APIUrl+formCaptureID+'/'+groupGUID+'/AddGroupMetadata',data,{responseType: 'text'});
  }
  
  UpdateFormMetadata(formCaptureID:any,data:any){
    return this.http.put(this.APIUrl+formCaptureID+'/UpdateMetadata',data,{responseType: 'text'});
  }

  createGroupTable(data:any){
    return this.http.post(this.APIUrl+'GroupTables',data,{responseType: 'text'});
  }

  getGroupTableData(groupGUID:any,formCaptureID:any){
    return this.http.get<any>(this.APIUrl+groupGUID+'/'+formCaptureID+'/GroupTableData');
  }

  deleteClone(groupGUID:any,formCaptureID:any,cloneNUM:any){
    return this.http.delete(this.APIUrl+groupGUID+'/'+formCaptureID+'/'+cloneNUM+'/'+'DeleteRepeat',{responseType: 'text'});
  }

  getMetadataValuePerGroup(groupGUID:any,columnName:any,formCaptureID:any,cloneNum:any){
    return this.http.get(this.APIUrl+groupGUID+'/'+columnName+'/'+formCaptureID+'/'+cloneNum+'/MetadataValue',{responseType: 'text'});
  }

  UpdateGroupMetadata(formCaptureID:any,groupGUID:any,cloneNum:any,data:any){
    return this.http.put(this.APIUrl+formCaptureID+'/'+groupGUID+'/'+cloneNum+'/UpdateGroupMetadata',data,{responseType: 'text'});
  }

  deleteCapturedForm(formCaptureID:any){
    return this.http.delete(this.APIUrl+formCaptureID+'/'+'DeleteCapturedForm',{responseType: 'text'});
  }

  lockForm(formID:any,item:any){
    return this.http.patch(this.APIUrl+'forms/'+formID+'/lock',item);
  }

  unlockForm(formID:any,item:any){
    return this.http.patch(this.APIUrl+'Forms/'+formID+'/unlock',item);
  }

//#endregion

}
