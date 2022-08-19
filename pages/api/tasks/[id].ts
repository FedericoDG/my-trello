import type {NextApiRequest, NextApiResponse} from 'next'

import connect, {disconnect} from '../../../database/db'
import {Task} from '../../../models'
import {ITask} from '../../../models/Task'

type Data = {message: string} | ITask

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'PUT':
      return putTask(req, res)
    case 'DELETE':
      return deleteTask(req, res)
    case 'GET':
      return getTask(req, res)
    default:
      res.status(404).json({message: 'No existe.'})
  }
}

const putTask = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id} = req.query

  try {
    await connect()
    const taskToUpdate = await Task.findById(id)

    if (!taskToUpdate) {
      await disconnect()

      return res.status(404).json({message: 'No existe.'})
    }
    const {description = taskToUpdate.description, status = taskToUpdate.status} = req.body

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {description, status},
      {runValidators: true, new: true}
    )

    await disconnect()

    res.status(200).json(updatedTask!)
  } catch (error) {
    await disconnect()
    res.status(500).json({message: 'Server error.'})
  }
}

const deleteTask = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id} = req.query

  try {
    await connect()
    const taskToUpdate = await Task.findById(id)

    if (!taskToUpdate) {
      await disconnect()

      return res.status(404).json({message: 'No existe.'})
    }

    const deleteTask = await Task.findByIdAndDelete(id)

    await disconnect()

    res.status(200).json(deleteTask!)
  } catch (error) {
    await disconnect()
    res.status(500).json({message: 'Server error.'})
  }
}

const getTask = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id} = req.query

  try {
    await connect()
    const task = await Task.findById(id)

    if (!task) {
      await disconnect()

      return res.status(404).json({message: 'No existe.'})
    }

    await disconnect()

    res.status(200).json(task!)
  } catch (error) {
    await disconnect()
    res.status(500).json({message: 'Server error.'})
  }
}

export default handler
