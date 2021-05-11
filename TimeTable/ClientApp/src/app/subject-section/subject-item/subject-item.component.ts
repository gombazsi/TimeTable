import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from '../../shared/models/subject';

@Component({
  selector: 'app-subject-item',
  templateUrl: './subject-item.component.html',
  styleUrls: ['./subject-item.component.css']
})
export class SubjectItemComponent implements OnInit {

  @Input() subjectItem: Subject
  @Output() subjectItemChanged = new EventEmitter<Subject>()
  @Output() subjectItemDeleted = new EventEmitter<Subject>()

  editing: boolean = false

  constructor() { }

  ngOnInit() {
  }

  onEditSubject() {
    this.editing = true
  }

  onHandleClose() {
    this.editing = false
  }

  onDeleteSubject() {
    this.subjectItemDeleted.emit(this.subjectItem)
  }

  onChangeSubject(subjectItem: Subject) {
    this.subjectItemChanged.emit(subjectItem)
  }
}
