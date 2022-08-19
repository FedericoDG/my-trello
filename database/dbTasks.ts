import {isValidObjectId} from 'mongoose'

import {Task} from '../models'
import {ITask} from '../models/Task'

import {disconnect} from './db'
import connect from './db'

const getTaskById = async (id: string): Promise<ITask | null> => {
  if (!isValidObjectId) return null

  await connect()
  const task = await Task.findById(id).lean()

  await disconnect()

  return JSON.parse(JSON.stringify(task))
}

export default getTaskById
