import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "../models/subject";

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

    deleteSubject(subjectId: number) {
        this.subjects = this.subjects.filter( x => x.subjectId != subjectId)
        this.subjectsChanged.emit(this.subjects.slice())
    }
}
