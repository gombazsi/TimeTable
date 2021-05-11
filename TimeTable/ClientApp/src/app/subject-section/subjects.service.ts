import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ISubject } from "../shared/interfaces/subject-interface";
import { Subject } from "../shared/models/subject";

@Injectable()
export class SubjectsService {

    subjectsChanged = new EventEmitter<void>()
    url: string = 'https://orarend.azurewebsites.net/api/Subject/subjects'

    constructor(private http: HttpClient) { }

    getSubjects() {
        return this.http
            .get<{ [key: number]: ISubject }>(
                this.url
            )
            .pipe(
                map(responseData => {
                    const subjectArray: Subject[] = []
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            subjectArray.push(
                                new Subject(
                                    responseData[key].subjectId,
                                    responseData[key].name
                                )
                            )
                        }
                    }
                    return subjectArray
                }))
    }

    addSubject(subjectName: string) {
        const requestParam = '"'.concat(subjectName).concat('"')
        return this.http.post(
            this.url,
            requestParam,
            {
                headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                })
            }
        )
    }

    changeSubject(id: number, newname: string) {

    }

    deleteSubject(subjectId: number) {
        const requestParam = subjectId
        return this.http.delete(
            this.url + ' /' + requestParam
        )
    }
}
