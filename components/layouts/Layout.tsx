import {Box, Container} from '@mui/material'
import {FC, ReactNode} from 'react'
import Head from 'next/head'

import {Navbar, Sidebar} from '../ui'
import Footer from '../ui/Footer'

interface Props {
  children: ReactNode
  title?: string
}

const origin = typeof window !== 'undefined' ? window.location.origin : ''

const Layout: FC<Props> = ({children, title = 'My Trello'}) => {
  return (
    <Box sx={{flexFlow: 1}}>
      <Head>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta property="og:image" content={`${origin}/static/mytrello.jpg`} />
        <title>{title}</title>
      </Head>
      <Navbar />
      <Sidebar />
      <Container maxWidth="xl" sx={{paddingY: 1, paddingX: 2}}>
        {children}
      </Container>
      <Footer />
    </Box>
  )
}

export default Layout
