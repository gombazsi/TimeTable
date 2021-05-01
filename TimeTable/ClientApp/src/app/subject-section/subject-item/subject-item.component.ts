import { Component, Input, OnInit } from '@angular/core';
import { Subject } from '../../models/subject';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-subject-item',
  templateUrl: './subject-item.component.html',
  styleUrls: ['./subject-item.component.css']
})
export class SubjectItemComponent implements OnInit {

  @Input() subjectItem: Subject

  constructor(private subjectService: SubjectsService) { }

  ngOnInit() {
  }

  onDeleteLesson() {
    this.subjectService.deleteSubject(this.subjectItem.subjectId)
  }

}
