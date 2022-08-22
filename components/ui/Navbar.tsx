import {FormControlLabel, FormGroup, Link, Switch} from '@mui/material'
import {useDispatch} from 'react-redux'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import NextLink from 'next/link'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import Cookies from 'js-cookie'
import {AppDispatch} from '../../redux/store'
import {ChangeEvent, useState, useEffect} from 'react'
import {toggleSidebar} from '../../redux/uiSlice'
import shareThemeInfo from '../../services/theme-info'

const Navbar = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light'
    const selectedTheme = cookieTheme === 'light' ? 'light' : 'dark'
    setTheme(selectedTheme)
  }, [])

  const dispatch = useDispatch<AppDispatch>()

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
    <AppBar color="primary" position="sticky">
      <Toolbar>
        <IconButton edge="start" size="large" onClick={toggle}>
          <MenuIcon sx={{color: '#ffffff'}} />
        </IconButton>
        <NextLink passHref href="/">
          <Link color="white" underline="none">
            <Typography variant="h6">MyTrello</Typography>
          </Link>
        </NextLink>
        <div style={{flex: 1}} />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={theme === 'dark'}
                color={theme === 'dark' ? 'primary' : 'secondary'}
                onChange={handleChange}
              />
            }
            label="Modo Oscuro"
          />
        </FormGroup>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
