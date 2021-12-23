import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormbuilderService {

  readonly APIUrl='https://localhost:44305/1/';
  // readonly APIUrl='https://app.terra.group/forms-builder-api/1/';

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
//#endregion

}
