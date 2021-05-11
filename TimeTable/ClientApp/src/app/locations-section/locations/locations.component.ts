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

  locations: Location[] = []
  isFetching: boolean = false
  error = null

  constructor(private locationService: LocationsService) { }

  ngOnInit() {
    this.isFetching = true
    this.locationService.getLocations().subscribe(
      locations => {
        this.isFetching = false
        this.locations = locations
      },
      error => {
        this.isFetching = false
        this.error = error.message
      }
    )
  }

  onAddLocation() {
    const locationName = this.locationNameInputRef.nativeElement.value
    this.locationService.addLocation(locationName).subscribe(
      result => {
        console.log(result)
        this.locations.push(
          // { subjectId: +result, name: subjectName }
          new Location(
            +result,
            locationName
          ))
      },
      error => {
        this.isFetching = false
        this.error = error.message
      }
    )
  }

  onChangeLocation(locationItem: Location) {
    this.locationService.changeLocation(locationItem.locationId, locationItem.name)
      .subscribe(
        result => {
          const changeIndex = this.locations.findIndex(
            subject => subject.locationId === locationItem.locationId)
            this.locations[changeIndex].name = locationItem.name
        },
        error => {
          this.isFetching = false
          this.error = error.message
        }
    )
  }

  onDeleteLocation(locationItem: Location) {
    this.locationService.deleteLocation(locationItem.locationId)
      .subscribe(
        result => {
          const deleteIndex = this.locations.findIndex(
            location => location.locationId === locationItem.locationId)

          if (deleteIndex > -1) {
            this.locations.splice(deleteIndex, 1)
          }
        },
        error => {
          this.isFetching = false
          this.error = error.message
        }
      )
  }
}
