import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  //readonly API_URL = 'https://localhost:44305/api/';
  readonly API_URL = environment.API_URL + '/'

  constructor(private http: HttpClient) { }
  
  public getDataServiceTypes(): Observable<any[]> {
    return this.http.get<any>(this.API_URL + 'DataServiceTypes/');
  }
  public getextlDataList() {
    return this.http.get<any>(this.API_URL + 'DataServices/');
  }
  addExternalDatas(data: any) {
    return this.http.post<any>(this.API_URL + 'DataServices', data)
  }
  public TestSqlDatas(dataSource: any, initialCatalog: any, userID: any, password: string) {
    return this.http.get(this.API_URL + 'DataServices/TestConn/' + dataSource + '/' + initialCatalog + '/' + userID + '/' + password, { responseType: 'text' })
  }

  updateExternalDatas(dataServiceID: number, data: any) {
    return this.http.put(this.API_URL + 'DataServices/' + dataServiceID, data);
  }
  archiveLookUp(TreeUploadID){
    return this.http.delete(this.API_URL+'LookupFieldNames' + '/' + TreeUploadID);
  }
  DeleteTreeUpload(TreeUploadID){
    return this.http.delete(this.API_URL+'TreeUploads' + '/' + TreeUploadID);
  }
  updateTreeUpload(treeUploadID: number, data: any) {
    return this.http.put(this.API_URL + 'TreeUploads/' + treeUploadID, data);
  }
  updateLookupFieldName(treeuploadid: number, data: any) {
    return this.http.put(this.API_URL + 'LookupFieldName/' + treeuploadid, data);
  }
  public getintlDataList(): Observable<any[]> {
    return this.http.get<any>(this.API_URL + 'TreeUploads/getTreeUploads');
  }
  CreateTableandColumns(data: any) {
    return this.http.post(this.API_URL + 'InternalData', data, { responseType: 'text' });
  }
  CreateTableandColumn(data: any) {
    return this.http.post(this.API_URL + 'InternalData/InternalUpdate', data, { responseType: 'text' });
  }

  dropTable(TreeUploadID){
    return this.http.delete(this.API_URL+'TreeUploads/droptable' + '/' + TreeUploadID);
  }
  addDataToTreeUpload(data: any) {
    return this.http.post(this.API_URL + 'TreeUploads', data, { responseType: 'text' });
  }
  addDataToLookupFieldName(data: any) {
    return this.http.post(this.API_URL + 'LookupFieldName', data, { responseType: 'text' });
  }
  SaveExcelInfo(data: any) {
    return this.http.post(this.API_URL + 'LookupFieldNames', data, { responseType: 'text' });
  }

  public getDataImportTypes() {
    return this.http.get<any>(this.API_URL + 'InternalData/getDataImportTypes');
  }
  public getDataImport(uploadName:string): Observable<any[]> {
    return this.http.get<any>(this.API_URL + 'InternalData/dataImport/'+uploadName);
  }
  public getDataUploadType() {
    return this.http.get<any>(this.API_URL + 'InternalData/getDataUploadType');
  }
  public getDatatableStructure() {
    return this.http.get<any>(this.API_URL + 'InternalData/getDatatableStructure');
  }
  public getLookupFieldNameByUploadId(UploadID: number) {
    return this.http.get<any>(this.API_URL + 'InternalData/getLookupFieldNameByUploadId/' + UploadID);
  }
}