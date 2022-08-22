import type {NextApiRequest, NextApiResponse} from 'next'

import connect, {disconnect} from '../../../database/db'
import {Task} from '../../../models'
import {ITask} from '../../../models/Task'

type Data = {message: string} | ITask[] | ITask

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'GET':
      return getTasks(res)
    case 'POST':
      return postTask(req, res)
    default:
      res.status(404).json({message: 'No existe'})
  }
}

const getTasks = async (res: NextApiResponse<Data>) => {
  try {
    await connect()
    const tasks = await Task.find().sort({createdAt: 'ascending'})

    await disconnect()
    res.status(200).json(tasks)
  } catch (error) {
    await disconnect()
    res.status(500).json({message: 'Server error.'})
  }
}

const postTask = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {description = ''} = req.body

  const newTask = new Task({
    description,
    createdAt: Date.now(),
  })

  try {
    await connect()
    await newTask.save()
    await disconnect()

    res.status(201).json(newTask)
  } catch (error) {
    await disconnect()
    res.status(500).json({message: 'Server error.'})
  }
}

export default handler
