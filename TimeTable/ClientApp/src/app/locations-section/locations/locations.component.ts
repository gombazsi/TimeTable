import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from 'src/app/shared/models/location';
import { LocationsService } from '../locations.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  @ViewChild('locationNameInput', { static: false }) locationNameInputRef: ElementRef

  locations: Location[]

  constructor(private locationService: LocationsService) { }

  ngOnInit() {
    this.locations = this.locationService.getLocations()
    this.locationService.locationsChanged
      .subscribe(
        (locations: Location[]) => { this.locations = locations}
      )
  }

  onAddLocation() {
    const locationName = this.locationNameInputRef.nativeElement.value
    this.locationService.addLocation(locationName)
  }

}
