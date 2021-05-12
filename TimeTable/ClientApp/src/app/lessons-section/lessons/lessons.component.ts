import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/shared/models/lesson';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  days: string[] = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek']
  lessonNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  lessons: Lesson[][] = [[],[]]

  constructor() {
    for (var lessonNumber: number = 0; lessonNumber < this.lessonNumbers.length; lessonNumber++) {
      this.lessons[lessonNumber] = [];
      for (var dayOfWeekNumber: number = 0; dayOfWeekNumber < this.days.length; dayOfWeekNumber++) {
        this.lessons[lessonNumber][dayOfWeekNumber] = new Lesson(
          null,
          dayOfWeekNumber + 1,
          lessonNumber + 1,
          null,
          null,
          null,
          null);
      }
    }
  }

  ngOnInit() {
  }

}
