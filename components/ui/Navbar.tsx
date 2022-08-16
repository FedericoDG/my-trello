import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {useDispatch} from 'react-redux'

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
        <Typography variant="h6">MyTrello</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
