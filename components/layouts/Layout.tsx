import {Box} from '@mui/material'
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
      <Box sx={{paddingY: 1, paddingX: 2}}>{children}</Box>
    </Box>
  )
}

export default Layout
