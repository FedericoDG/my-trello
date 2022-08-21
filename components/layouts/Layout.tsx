import {Box, Container} from '@mui/material'
import {FC, ReactNode} from 'react'
import Head from 'next/head'

import {Navbar, Sidebar} from '../ui'

interface Props {
  children: ReactNode
  title?: string
}

const Layout: FC<Props> = ({children, title = 'My Trello'}) => {
  return (
    <Box sx={{flexFlow: 1}}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Sidebar />
      <Container maxWidth="xl" sx={{paddingY: 1, paddingX: 2}}>
        {children}
      </Container>
    </Box>
  )
}

export default Layout
