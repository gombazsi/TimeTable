import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  @Output() subjectNameChanged = new EventEmitter<Subject>()
  @Output() locationNameChanged = new EventEmitter<Location>()

  @ViewChild('editedNameInput', { static: false }) editedNameInput: ElementRef

  constructor() { }

  ngOnInit() { }

  onNameChanged() {
    console.log('edit-modal')
    const newName = this.editedNameInput.nativeElement.value
    if (this.type instanceof Subject) {
      this.type.name = newName
      this.subjectNameChanged.emit(this.type)
    }
    if (this.type instanceof Location) {
      this.type.name = newName
      this.locationNameChanged.emit(this.type)
    }
  }

  onClose() {
    this.close.emit()
  }

}
