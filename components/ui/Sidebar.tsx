import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import {useDispatch, useSelector} from 'react-redux'

import {RootState} from '../../redux/store'
import {toggleSidebar} from '../../redux/uiSlice'

const menuItems: string[] = ['por ahora nada', 'se vienen cositas']

const Sidebar = () => {
  const {sidebarOpen} = useSelector((state: RootState) => state.ui)

  const dispatch = useDispatch()

  const toggle = () => dispatch(toggleSidebar())

  return (
    <Drawer anchor="left" open={sidebarOpen} onClose={toggle}>
      <Box sx={{width: 250}}>
        <Box sx={{paddingY: 1, paddingX: 2}}>
          <Typography textAlign="center" variant="h5">
            Menu
          </Typography>
        </Box>
        <List>
          {menuItems.map((text, index) => (
            <ListItem key={text} button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText>{text}</ListItemText>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  )
}

export default Sidebar
