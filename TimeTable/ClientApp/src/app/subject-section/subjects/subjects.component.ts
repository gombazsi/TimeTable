import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from '../../shared/models/subject';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  @ViewChild('subjectNameInput', { static: false }) subjectNameInputRef: ElementRef
  @Output()

  subjects: Subject[] = []
  isFetching: boolean = false

  constructor(private subjectsService: SubjectsService) { }

  ngOnInit() {
    this.isFetching = true
    this.subjectsService.getSubjects().subscribe(
      subjects => {
        this.isFetching = false
        this.subjects = subjects
      })
  }

  onAddSubject() {
    const subjectName = this.subjectNameInputRef.nativeElement.value
    this.subjectsService.addSubject(subjectName).subscribe(
      result => {
        console.log(result)
        this.subjects.push(
          // { subjectId: +result, name: subjectName }
          new Subject(
            +result,
            subjectName
        ))
      }
    )


    
  }

}
