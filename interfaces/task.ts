interface Task {
  _id: string
  description: string
  createdAt: number
  status: TaskStatus
}

export type TaskStatus = 'pending' | 'in-progress' | 'finished'

export default Task
