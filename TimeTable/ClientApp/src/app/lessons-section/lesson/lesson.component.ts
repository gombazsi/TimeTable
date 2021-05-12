import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from 'src/app/shared/models/lesson';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  @Input() lessonItem: Lesson

  constructor() { }

  ngOnInit() {
  }

}
