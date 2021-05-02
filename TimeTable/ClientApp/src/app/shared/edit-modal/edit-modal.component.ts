import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LocationsService } from 'src/app/locations-section/locations.service';
import { SubjectsService } from 'src/app/subject-section/subjects.service';
import { Location } from '../models/location';
import { Subject } from '../models/subject';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  @Input() name: string
  @Input() id: string
  @Input() type: object
  @Output() close = new EventEmitter<void>()

  @ViewChild('editedNameInput', { static: false }) editedNameInput: ElementRef

  constructor(
    private subjectsService: SubjectsService,
    private locationsService: LocationsService) { }

  ngOnInit() { }

  onNameChanged() {
    const newName = this.editedNameInput.nativeElement.value
    if(this.type instanceof Subject) this.subjectsService.changeSubject(+this.id, newName)
    if(this.type instanceof Location) this.locationsService.changeLocation(+this.id, newName)
  }

  onClose() {
    this.close.emit()
  }

}
