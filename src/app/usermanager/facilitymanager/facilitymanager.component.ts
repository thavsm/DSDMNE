import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/user.service';
import { FacilityUpdateComponent } from './facility-update/facility-update.component';
import { FacilityaddComponent } from './facilityadd/facilityadd.component';

@Component({
  selector: 'app-facilitymanager',
  templateUrl: './facilitymanager.component.html',
  styleUrls: ['./facilitymanager.component.css']
})
export class FacilitymanagerComponent implements OnInit {

  constructor(public service: UserService, public dialog: MatDialog) { }
  facilitiesVar:any;
  public Facilities:any [];
  ngOnInit(): void {
    this.service.getAllFacilities().subscribe(data => {
      this.Facilities = data;
    });
    this.RefreshAllFacilities();
  }

  openDialogAdd(): void {
    this.facilitiesVar = {
      facilityType: "",
    }
    const dialogRef = this.dialog.open(FacilityaddComponent, {
      width: '60%', 
      height:'70%',
      data: this.facilitiesVar,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.RefreshAllFacilities()
    });
  }

  clickEdit(item: any) {
    this.facilitiesVar = item;
    const dialogRef = this.dialog.open(FacilityUpdateComponent, {
      width: '60%', 
      height:'70%',
      data: this.facilitiesVar,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.service.getAllFacilities();
    });
  }

  RefreshAllFacilities(){
    this.service.getAllFacilities().subscribe(data=>{
      this.Facilities=data;
    })
  }
  
  public doFilter = (event: any) => {
    this.Facilities.filter = event.target.value.trim();
  }

}