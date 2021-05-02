import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "../shared/models/subject";

@Injectable()
export class SubjectsService {

    subjectsChanged = new EventEmitter<Subject[]>()

    private subjects: Subject[] = [
        new Subject(
            11,
            "magyar"
        ),
        new Subject(
            12,
            "matek"
        )
    ]

    getSubjects() {
        return this.subjects.slice()
    }

    addSubject(subjectName: string) {
        this.subjects.push(
            new Subject(
                0,
                subjectName
            )
        )
        this.subjectsChanged.emit(this.subjects.slice())
    }

    changeSubject(id: number, newname: string) {
        let subjectToChange = this.subjects.find(
            (subject: Subject) => subject.subjectId === id
        )
        if(subjectToChange) subjectToChange.name = newname
    }

    deleteSubject(subjectId: number) {
        this.subjects = this.subjects.filter( x => x.subjectId != subjectId)
        this.subjectsChanged.emit(this.subjects.slice())
    }
}
