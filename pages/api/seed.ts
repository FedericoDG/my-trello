import type {NextApiRequest, NextApiResponse} from 'next'

import {seeddata} from '../../database'
import {Task} from '../../models'
import connect, {disconnect} from '../../database/db'

type Data = {
  message: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(4001).json({message: 'No tiene permisos.'})
  }

  await connect()
  await Task.deleteMany()
  await Task.insertMany(seeddata.tasks)
  await disconnect()

  res.status(200).json({message: 'Seed data cargada'})
}

export default handler
