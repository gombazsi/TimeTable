import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Lesson } from 'src/app/shared/models/lesson';
import { LessonPost } from 'src/app/shared/models/lesson-post';
import { LessonsService } from '../lessons.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  
  @Output() locationItemChanged = new EventEmitter<Lesson>()
  isFetching: boolean = false
  error = null

  constructor(private readonly lessonsService:LessonsService) {

  }

  days: string[] = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek']
  lessonNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  lessons: Lesson[]=[]//[new Lesson(null,2,2,1,"asd",1,"asd"),new Lesson(null,4,4,1,"asd",1,"asd")]

  getLesson(dayOfWeek:number,lessonNumber:number):Lesson{
    let ret:Lesson= this.lessons.find(l=>l.dayOfWeek==dayOfWeek&&l.lessonNumber==lessonNumber)
    if(!ret)
      return new Lesson(null,dayOfWeek,lessonNumber,null,null,null,null)
    return ret;
  }

  ngOnInit() {
    this.lessonsService.getLessons().subscribe(
    lessons => {
      this.isFetching = false
      this.lessons = lessons
    },
    error => {
      this.isFetching = false
      this.error = error.message
    })
  }

  onDeleteLesson(lesson: Lesson){
    this.lessonsService.deleteLesson(lesson.lessonId).subscribe(
      result => {
        this.lessonsService.getLessons().subscribe(
          lessons => {
            this.isFetching = false
            this.lessons = lessons
          }
        )
      }
    )
  }

  onChangeLesson(lesson: Lesson) {
    if(lesson.lessonId)
      this.lessonsService.changeLesson(lesson.lessonId, new LessonPost(lesson.dayOfWeek,lesson.lessonNumber,lesson.subjectId,lesson.locationId))
        .subscribe(
          result => {
              this.lessonsService.getLessons().subscribe(
                lessons => {
                  this.isFetching = false
                  this.lessons = lessons
                }
              )
          },
          error => {
            this.isFetching = false
            this.error = error.message
          }
      )
    else{
      this.lessonsService.addLesson(new LessonPost(lesson.dayOfWeek,lesson.lessonNumber,lesson.subjectId,lesson.locationId))
        .subscribe(
          result => {
              this.lessonsService.getLessons().subscribe(
                lessons => {
                  this.isFetching = false
                  this.lessons = lessons
                }
              )
          },
          error => {
            this.isFetching = false
            this.error = error.message
          }
      )
    }
  }

}
