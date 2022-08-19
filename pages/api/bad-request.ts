import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
  message: string | string[]
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {message = 'Bad request'} = req.query

  res.status(400).json({message})
}

export default handler
