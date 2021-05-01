import { Component, Input, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location';
import { LocationsService } from '../locations.service';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.css']
})
export class LocationItemComponent implements OnInit {

  @Input() locationItem: Location

  constructor(private locationService: LocationsService) { }

  ngOnInit() {
  }

  onDeleteLocation() {
    this.locationService.deleteLocation(this.locationItem.locationId)
  }

}
