import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataManagementService {
  
 
  readonly API_URL ='https://localhost:44305/api/';

  constructor(private http: HttpClient) { }

  

  
  public getDataServiceTypes():Observable<any[]>{
    return this.http.get<any>(this.API_URL+'DataServiceTypes/');
  }
  addExternalDatas(data:any){
    return this.http.post<any>(this.API_URL+'DataServices',data)
  }
  public TestSqlDatas(dataSource:any, initialCatalog:any, userID:any, password:string){
    return this.http.get(this.API_URL+'DataServices/TestConn/'+dataSource+'/'+initialCatalog +'/'+ userID +'/'+ password,{responseType:'text'})
  }


  updateExternalDatas(dataServiceID:number,data:any){
    return this.http.put(this.API_URL+'DataServices/'+dataServiceID,data);
  }
  public getintlDataList():Observable<any[]>{
    return this.http.get<any>(this.API_URL+'TreeUploads/');
  }
  getPatientInfo():Observable<any[]>{
    return this.http.get<any>(this.API_URL+'PatientInfo_DataImport/');
  }
 
  public getextlDataList(){
    return this.http.get<any>(this.API_URL+'DataServices/');
  }
}
