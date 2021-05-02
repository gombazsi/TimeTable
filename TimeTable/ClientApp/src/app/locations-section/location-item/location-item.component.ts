import { Component, Input, OnInit } from '@angular/core';
import { Location } from 'src/app/shared/models/location';
import { LocationsService } from '../locations.service';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.css']
})
export class LocationItemComponent implements OnInit {

  @Input() locationItem: Location

  constructor(private locationService: LocationsService) { }

  editing = false

  ngOnInit() {
  }

  onEditLocation() {
    this.editing = true
  }

  onHandleClose() {
    this.editing = false
  }
  
  onDeleteLocation() {
    this.locationService.deleteLocation(this.locationItem.locationId)
  }

}
