import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { ILesson } from "../shared/interfaces/lesson-interface";
import { Lesson } from "../shared/models/lesson";
import { LessonPost } from "../shared/models/lesson-post";

@Injectable()
export class LessonsService {

    lessonsChanged = new EventEmitter<void>()
    url: string = 'https://orarend.azurewebsites.net/api/Lesson/lessons'

    constructor(private http: HttpClient) { }

    getLessons() {
        return this.http
            .get<{ [key: number]: ILesson }>(
                this.url
            )
            .pipe(
                map(responseData => {
                    const lessonArray: Lesson[] = []
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            lessonArray.push(
                                new Lesson(
                                    responseData[key].lessonId,
                                    responseData[key].dayOfWeek,
                                    responseData[key].lessonNumber,
                                    responseData[key].subjectId,
                                    responseData[key].subjectName,
                                    responseData[key].locationId,
                                    responseData[key].locationName                                    
                                )
                            )
                        }
                    }
                    return lessonArray
                }))
    }

    addLesson(lessonPost: LessonPost) {
        return this.http.post<number>(
            this.url,
            lessonPost,
            {
              headers: new HttpHeaders({
                  'Content-Type': 'application/json',
              })
            }
        )
    }

    changeLesson(id:number,lessonPost: LessonPost) {
        return this.http.put(
            this.url + "/" + id,
            lessonPost,
            {
              headers: new HttpHeaders({
                  'Content-Type': 'application/json',
              })
            }
        )
    }

    deleteLesson(id: number) {
        return this.http
            .delete(this.url + "/" + id, {
                observe: 'events',
                responseType: 'text'
            })
            .pipe(
                tap(event => {
                    if (event.type === HttpEventType.Sent) {
                        console.log("Delete request was sent.")
                    }
                    if (event.type === HttpEventType.Response) {
                        console.log(event.body);
                    }
                })
            );
    }
}
