import { HolidayManagement } from '../holiday/holiday-management.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  
  constructor(private http:HttpClient) { }
  readonly API_URL = environment.API_URL + '/'

  hldData:HolidayManagement = new HolidayManagement();
  public hlist: HolidayManagement[];
  public holYears: Number [];

  refreshhlist(){
    this.http.get(this.API_URL + 'Holidays/GetAllHolidays')
    .toPromise()
    .then(res=> this.hlist = res as HolidayManagement[]);
    console.log(this.hlist);
  }
  refreshHYears(){ 
 return this.http.get<{}>(this.API_URL +'Holidays/GetHolYears');
  }

  refreshhlistbyYear(year:Number){
    this.http.get(this.API_URL + 'Holidays/GetAllHolidaysByYear'+ '?year=' +year)
    .toPromise()
    .then(res=> this.hlist = res as HolidayManagement[]);
    console.log(this.hlist);
  }

  getHolidayById(HolidayId:any):Observable<any[]>{
    return this.http.get<any>(this.API_URL + 'Holidays/GetHoliday' + '/' + HolidayId);
  }

  openDialogAdd(val:any){
    return this.http.post(this.API_URL+'/',val);
  }
  addHoliday(data:any){
    return this.http.post(this.API_URL+'Holidays/InsertHoliday',data);
  }

  

  deleteHoliday(holidayId:number){
    return this.http.delete(this.API_URL+'Holidays/DeleteHoliday' + '?Id=' + holidayId);
  }

  updateHoliday(holidayId:number,data:any){
    return this.http.put(this.API_URL+'Holidays/UpdateHoliday?Id='+holidayId,data);
  }

  


}
