import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { AuthorizeService } from "src/api-authorization/authorize.service";
import { ISubject } from "../shared/interfaces/subject-interface";
import { Subject } from "../shared/models/subject";

@Injectable()
export class SubjectsService {

    subjectsChanged = new EventEmitter<void>()
    url: string = 'https://orarend.azurewebsites.net/api/Subject/subjects'

    constructor(private http: HttpClient,private readonly authService:AuthorizeService) { }

    getSubjects() {      
      let myHeaders=new Headers();
      const authHeader=this.authService.getAuthCookie();
      myHeaders.append(authHeader.name,authHeader.value);
      const options:Object={headers:myHeaders}
        return this.http
            .get<{ [key: number]: ISubject }>(
              'https://localhost:44320/api/Subject/subjects',options
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
                    'Content-Type': 'application/json',
                })
            }
        )
    }

    changeSubject(id: number, newname: string) {
        const requestParam = '"'.concat(newname).concat('"')
        return this.http.put(
            this.url + "/" + id,
            requestParam,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            }
        )
    }

    deleteSubject(subjectId: number) {
        const requestParam = subjectId
        return this.http
            .delete(this.url + "/" + requestParam, {
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
