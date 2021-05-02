import { Component, Input, OnInit } from '@angular/core';
import { Subject } from '../../shared/models/subject';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-subject-item',
  templateUrl: './subject-item.component.html',
  styleUrls: ['./subject-item.component.css']
})
export class SubjectItemComponent implements OnInit {

  @Input() subjectItem: Subject

  editing: boolean = false

  constructor(private subjectService: SubjectsService) { }

  ngOnInit() {
  }

  onEditSubject() {
    this.editing = true
  }

  onHandleClose() {
    this.editing = false
  }

  onDeleteSubject() {
    this.subjectService.deleteSubject(this.subjectItem.subjectId)
  }

  

}
