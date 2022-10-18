import { Component, OnInit, ViewChild, ElementRef, NgZone, Input, Inject } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HierarchyManagementService } from 'src/app/hierarchy-management.service';
declare var $: any;


@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css'],
  providers: []
})
export class GoogleMapsComponent implements OnInit {

  title: string = '';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  nodeID: number;
  nodeAddress: any = '';
  nodeX: any = '';
  nodeY: any = '';
  public x: any;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  @Input() fromParent;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public dialogRef: MatDialogRef<GoogleMapsComponent>,
    public Hierarchyservice: HierarchyManagementService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.nodeID = data;
  }


  getNodeGeoCords() {
    this.Hierarchyservice.getGeoCords(this.nodeID).subscribe(data => {
      this.x = data;
      var address = Object.values(Object.values(this.x)[0])[0];
      this.nodeAddress = address;
      var xCoord = Object.values(Object.values(this.x)[0])[1];
      var yCoord = Object.values(Object.values(this.x)[0])[2];
      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation(address, xCoord, yCoord);
        this.geoCoder = new google.maps.Geocoder;
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.getAddress(this.latitude, this.longitude);
            this.zoom = 18;
          });
        });
      });
    });
  }

  ngOnInit() {
    this.getNodeGeoCords();
    //load Places Autocomplete
  }

  // Get Current Location Coordinates
  private setCurrentLocation(address, xCoord, yCoord) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (xCoord != undefined && xCoord != '' && xCoord != null && yCoord != undefined && yCoord != '' && yCoord != null) {
          this.latitude = Number(xCoord);
          this.longitude = Number(yCoord);
        }
        else {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        }
        this.zoom = 18;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: any) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 18;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  closeModal(sendData) {
    this.dialogRef.close();
  }

  saveLocation() {
    this.Hierarchyservice.UpdateGeoCords(this.nodeID, this.address, this.latitude, this.longitude).subscribe(data => {
      this.showNotification('top', 'center', 'Coordinates saved successfully', '', 'success');
    });
  }

  showNotification(from: any, align: any, message: any, title: any, type: string) {
    $.notify({
      icon: 'notifications',
      title: title,
      message: message
    }, {
      type: type,
      delay: 1500,
      timer: 1500,
      placement: {
        from: from,
        align: align
      },

      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}