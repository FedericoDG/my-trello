import {Link} from '@mui/material'
import {useDispatch} from 'react-redux'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import NextLink from 'next/link'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import {toggleSidebar} from '../../redux/uiSlice'

const Navbar = () => {
  const dispatch = useDispatch()

  const toggle = () => dispatch(toggleSidebar())

  return (
    <AppBar color="primary" position="sticky">
      <Toolbar>
        <IconButton edge="start" size="large" onClick={toggle}>
          <MenuIcon />
        </IconButton>
        <NextLink passHref href="/">
          <Link color="white" underline="none">
            <Typography variant="h6">MyTrello</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
