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
import {ChangeEvent, useEffect, useState} from 'react'
import {FormGroup, FormControlLabel, Switch} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import Cookies from 'js-cookie'
import InboxIcon from '@mui/icons-material/Inbox'

import {RootState} from '../../redux/store'
import {shareThemeInfo} from '../../services'
import {toggleSidebar} from '../../redux/uiSlice'

const menuItems: string[] = ['por ahora nada', 'se vienen cositas']

const Sidebar = () => {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'dark'
    const selectedTheme = cookieTheme === 'light' ? 'light' : 'dark'
    setTheme(selectedTheme)
  }, [])

  const {sidebarOpen} = useSelector((state: RootState) => state.ui)

  const dispatch = useDispatch()

  const toggle = () => dispatch(toggleSidebar())

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setTheme('dark')
      Cookies.set('theme', 'dark', {sameSite: 'strict'})
      shareThemeInfo.setSubject('dark')
    } else {
      setTheme('light')
      Cookies.set('theme', 'light', {sameSite: 'strict'})
      shareThemeInfo.setSubject('light')
    }
  }

  return (
    <Drawer anchor="left" open={sidebarOpen} onClose={toggle}>
      <Box sx={{width: 250}}>
        <Box sx={{paddingY: 1, paddingX: 2}}>
          <Typography textAlign="center" variant="h5">
            Menu
          </Typography>
        </Box>
        <Box marginLeft="0px">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  sx={{marginLeft: 3}}
                  checked={theme === 'dark'}
                  color={theme === 'dark' ? 'primary' : 'secondary'}
                  onChange={handleChange}
                />
              }
              label="Modo Oscuro"
            />
          </FormGroup>
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
