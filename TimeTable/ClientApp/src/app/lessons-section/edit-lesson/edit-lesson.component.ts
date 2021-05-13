import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LocationsService } from 'src/app/locations-section/locations.service';
import { Lesson } from 'src/app/shared/models/lesson';
import { Location } from 'src/app/shared/models/location';
import { Subject } from 'src/app/shared/models/subject';
import { SubjectsService } from 'src/app/subject-section/subjects.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.scss']
})
export class EditLessonComponent implements OnInit {

  @Input() lesson: Lesson
  @Output() close = new EventEmitter<void>()
  @Output() lessonChanged = new EventEmitter<Lesson>()
  @Output() delete = new EventEmitter<Lesson>()

  locations:Location[];
  subjects:Subject[];
  newLocation:Location;
  newSubject:Subject;

  constructor(private readonly locationService:LocationsService, private readonly subjectService: SubjectsService) { }

  ngOnInit() {
    this.locationService.getLocations().subscribe(loc=>this.locations=loc)
    this.subjectService.getSubjects().subscribe(sub=>this.subjects=sub)
    if(this.lesson.lessonId){
      this.newLocation=new Location(this.lesson.locationId,this.lesson.locationName) 
      this.newSubject=new Subject(this.lesson.subjectId,this.lesson.subjectName) 
      console.log(this.newSubject,this.newLocation)

    }
   }

  onLessonChanged() {
    console.log('lesson-change')
    this.lesson.locationId=this.newLocation.locationId
    this.lesson.subjectId=this.newSubject.subjectId;
    console.log(this.lesson)
    this.lessonChanged.emit(this.lesson)
  }

  onClose() {
    this.close.emit()
  }

  onDelete(){
    this.delete.emit()
  }


}
