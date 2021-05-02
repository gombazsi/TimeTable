import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from '../../shared/models/subject';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  @ViewChild('subjectNameInput', { static: false }) subjectNameInputRef: ElementRef

  subjects: Subject[]

  constructor(private subjectsService: SubjectsService) { }

  ngOnInit() {
    this.subjects = this.subjectsService.getSubjects()
    this.subjectsService.subjectsChanged
      .subscribe(
        (subjects: Subject[]) => { this.subjects = subjects}
      )
  }

  onAddSubject() {
    const subjectName = this.subjectNameInputRef.nativeElement.value
    this.subjectsService.addSubject(subjectName)
  }

}
