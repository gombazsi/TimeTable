import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lesson } from 'src/app/shared/models/lesson';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  @Input() lesson: Lesson
  @Output() lessonChanged = new EventEmitter<Lesson>()
  @Output() deleteLesson = new EventEmitter<Lesson>()
  editing:boolean=false;

  constructor() { }

  ngOnInit() {
  }

  onEditLesson(){
    this.editing=true;    
    console.log("clicked on lesson",this.lesson)
  }

  onChangeLesson(lesson: Lesson) {
    this.editing=false;
    this.lessonChanged.emit(lesson)
  }

  onHandleClose(){
    console.log("closing")
    this.editing=false;
  }

  onDeleteLesson(){
    this.editing=false;
    this.deleteLesson.emit(this.lesson)
  }

}
