import type {NextPage} from 'next'
import Typography from '@mui/material/Typography'

import {Layout} from '../components/layouts'

const HomePage: NextPage = () => {
  return (
    <Layout title="My Trello">
      <Typography color="primary" variant="h1">
        Hola
      </Typography>
    </Layout>
  )
}

export default HomePage
