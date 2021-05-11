import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from 'src/app/shared/models/location';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.css']
})
export class LocationItemComponent implements OnInit {

  @Input() locationItem: Location
  @Output() locationItemChanged = new EventEmitter<Location>()
  @Output() locationItemDeleted = new EventEmitter<Location>()

  constructor() { }

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
    this.locationItemDeleted.emit(this.locationItem)
  }

  onChangeLocation(locationItem: Location) {
    this.locationItemChanged.emit(locationItem)
  }
}
