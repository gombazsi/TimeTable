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

  subjects: Subject[] = []
  isFetching: boolean = false
  error = null

  constructor(private subjectsService: SubjectsService) { }

  ngOnInit() {
    this.isFetching = true
    this.subjectsService.getSubjects().subscribe(
      subjects => {
        this.isFetching = false
        this.subjects = subjects
      },
      error => {
        this.isFetching = false
        this.error = error.message
      }
    )
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
      },
      error => {
        this.isFetching = false
        this.error = error.message
      }
    )
  }

  onChangeSubject(subjectItem: Subject) {
    this.subjectsService.changeSubject(subjectItem.subjectId, subjectItem.name)
      .subscribe(
        result => {
          console.log(result)
          const changeIndex = this.subjects.findIndex(
            subject => subject.subjectId === subjectItem.subjectId)
            this.subjects[changeIndex].name = subjectItem.name
        },
        error => {
          this.isFetching = false
          this.error = error.message
        }
    )
  }

  onDeleteSubject(subjectItem: Subject) {
    this.subjectsService.deleteSubject(subjectItem.subjectId)
      .subscribe(
        result => {
          console.log(result)
          const deleteIndex = this.subjects.findIndex(
            subject => subject.subjectId === subjectItem.subjectId)

          if (deleteIndex > -1) {
            this.subjects.splice(deleteIndex, 1)
          }
        },
        error => {
          this.isFetching = false
          this.error = error.message
        }
      )
  }
}
