import {Subject} from 'rxjs'

class SubjectManager {
  subject$ = new Subject()

  getSubject() {
    return this.subject$.asObservable()
  }

  setSubject(value: any) {
    return this.subject$.next(value)
  }
}

export default SubjectManager
