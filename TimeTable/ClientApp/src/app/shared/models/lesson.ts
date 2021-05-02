export class Lesson {
    constructor(
        public lessonId: number,
        public dayOfWeek: number,
        public lessonNumber: number,
        public subjectId: number,
        public subjectName: string,

        public locationId: number,
        public locationName: string
    ) { }
}
