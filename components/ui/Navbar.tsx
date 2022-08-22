import {Box, FormControlLabel, FormGroup, Link, Switch, Grid} from '@mui/material'
import {useDispatch} from 'react-redux'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import NextLink from 'next/link'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import {toggleSidebar} from '../../redux/uiSlice'
import shareThemeInfo from '../../services/theme-info'
import {ChangeEvent, useState} from 'react'

const Navbar = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  const dispatch = useDispatch()

  const toggle = () => dispatch(toggleSidebar())

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDarkTheme(event.target.checked)
    shareThemeInfo.setSubject(event.target.checked)
  }

  return (
    <AppBar color="primary" position="sticky">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <IconButton edge="start" size="large" onClick={toggle}>
              <MenuIcon sx={{color: '#ffffff'}} />
            </IconButton>
            <NextLink passHref href="/">
              <Link color="white" underline="none">
                <Typography variant="h6">MyTrello</Typography>
              </Link>
            </NextLink>
          </Grid>
          <Grid item>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={isDarkTheme}
                    color={isDarkTheme ? 'primary' : 'secondary'}
                    onChange={handleChange}
                  />
                }
                label="Dark"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
