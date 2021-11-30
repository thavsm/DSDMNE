import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormbuilderService {

  readonly APIUrl='https://localhost:44387/1/';

  constructor(private http:HttpClient) { }

//#region Forms

  getDynamicFormList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'forms/filter/type/2')
  }

  addDynamicForm(data:any){
    return this.http.post(this.APIUrl+'forms',data);
  }

  updateDynamicFormDetails(data:any){
    return this.http.put(this.APIUrl+'forms',data);
  }

  archiveDynamicForm(formID:any){
    return this.http.delete(this.APIUrl+'forms/?formID=+'+formID+'/archive');
  }

  getFormPages(formID:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'forms/?formID=+'+formID+'/pages');
  }

  getFormFieldsPerPage(formID:any,pageGuID:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'forms​/formID?='+formID+'/pages​/pageGUID?='+pageGuID+'​/fields');
  }

  addFormPage(data:any,formID:any){
    return this.http.post(this.APIUrl+'forms/formID?='+formID+'/pages',data);
  }

  addFieldPerPage(data:any,formID:any,pageGuID:any){
    return this.http.post(this.APIUrl+'forms​/formID?='+formID+'/pages​/pageGUID?​='+pageGuID+'/fields',data);
  }

//#endregion

}
