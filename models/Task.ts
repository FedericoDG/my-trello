import mongoose, {Model, Schema} from 'mongoose'

import Task from '../interfaces/task'

export interface ITask extends Task {}

const taskSchema = new Schema({
  description: {type: String, required: true},
  createdAt: {type: Number, required: true},
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'finished'],
      message: '{VALUE} no es un estado permitido',
    },
    default: 'pending',
  },
})

const TaskModel: Model<ITask> = mongoose.models.Task || mongoose.model('Task', taskSchema)

export default TaskModel
