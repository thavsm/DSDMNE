import { HttpClient } from '@angular/common/http';
import { Text } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormbuilderService {

   readonly APIUrl='https://localhost:44305/1/';
  //readonly APIUrl='https://app.terra.group/DSDFormWeb/1/';
  // readonly APIUrl = environment.API_FormURL;

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

  archiveDynamicForm(formID:any,userID:any){
    return this.http.delete(this.APIUrl+'forms/'+formID+'/'+userID+'/archive');
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

  getFormAttachments(formCaptureID:any): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + formCaptureID +'/FormAttachment')
  }

  addFormAttachments(data:any){
    return this.http.post(this.APIUrl+'FormAttachment',data,{responseType: 'text'});
  }

  getFormPhotos(formCaptureID:any): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + formCaptureID +'/FormPhoto')
  }

  addFormPhotos(data:any){
    return this.http.post(this.APIUrl+'FormPhoto',data,{responseType: 'text'});
  }

  UpdateFormVersion(formID:any){
    return this.http.put(this.APIUrl+formID+'/UpdateFormVersion','',{responseType: 'text'});
  }

  getPublishedListOfForms():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'getDynamicPublishedFormList');
  }

  getGroupType(groupGUID:any){
    return this.http.get(this.APIUrl + groupGUID +'/getGroupType',{responseType: 'text'})
  }

  getFormComments(formCaptureID:any): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + formCaptureID +'/FormComment')
  }

  addFormComment(data:any){
    return this.http.post(this.APIUrl+'AddFormComment',data,{responseType: 'text'});
  }

  updateFormComment(data:any,commentID:any){
    return this.http.put(this.APIUrl+commentID+'/UpdateFormComment',data,{responseType: 'text'});
  }

  getLockedByUserName(userID:any){
    return this.http.get(this.APIUrl + userID +'/getLockedUserName',{responseType: 'text'})
  }

  DeleteFile(AttachmentID:any){
    return this.http.delete(this.APIUrl+AttachmentID+'/'+'DeleteFile',{responseType: 'text'});
  }

  DeleteComment(AttachmentID:any){
    return this.http.delete(this.APIUrl+AttachmentID+'/'+'DeleteComment',{responseType: 'text'});
  }

  DeletePhoto(PhotoGUID:any){
    return this.http.delete(this.APIUrl+PhotoGUID+'/'+'DeletePhoto',{responseType: 'text'});
  }

  PublishForm(formID:any){
    return this.http.post(this.APIUrl+'Forms/forms/'+formID+'/PublishForm','',{responseType:'text'});
  }

  GetDisplayables(formID:any): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + formID +'/GetDisplayables')
  }

  getPageStatus(formCaptureID:any,pageGUID:any){
    return this.http.get(this.APIUrl + formCaptureID +'/'+pageGUID+'/PageStatus',{responseType: 'text'})
  }

  modifyPageStatus(formCaptureID:any,pageGUID:any,data:any){
    return this.http.post(this.APIUrl + formCaptureID +'/'+pageGUID+'/PageStatus',data,{responseType: 'text'});
  }

  insertSkipLogic(data:any){
    return this.http.post(this.APIUrl + 'skipLogic',data,{responseType: 'text'});
  }

  GetSkipLogicRules(PageGUID:any,xmlElementName:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl+PageGUID+'/'+xmlElementName+'/skipLogic');
  }

  DeleteSkipRule(PageGUID:any,xmlElementName:any){
    return this.http.delete(this.APIUrl+PageGUID+'/'+xmlElementName+'/skipLogic',{responseType: 'text'});
  }

  insertAdvancedValidation(data:any){
    return this.http.post(this.APIUrl + 'AdvancedValidation',data,{responseType: 'text'});
  }

  GetAdvancedValidation(PageGUID:any,xmlElementName:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl+PageGUID+'/'+xmlElementName+'/AdvancedValidation');
  }

  DeleteAdvancedValidation(PageGUID:any,xmlElementName:any){
    return this.http.delete(this.APIUrl+PageGUID+'/'+xmlElementName+'/AdvancedValidation',{responseType: 'text'});
  }

  getFormAttachCount(fieldName:any,formCaptureID:any){
    return this.http.get(this.APIUrl + fieldName + '/' + formCaptureID +'/AttachCount',{responseType: 'text'})
  }

  getFormPhotoCount(fieldName:any,formCaptureID:any){
    return this.http.get(this.APIUrl + fieldName +'/' + formCaptureID +'/PhotoCount',{responseType: 'text'})
  }

  getFormCommentCount(fieldName:any,formCaptureID:any){
    return this.http.get(this.APIUrl + fieldName +'/' + formCaptureID +'/CommentCount',{responseType: 'text'})
  }

  DeleteFormCategory(formCategoryID:any){
    return this.http.delete(this.APIUrl+formCategoryID+'/FormCategory',{responseType: 'text'});
  }
//#endregion
}
