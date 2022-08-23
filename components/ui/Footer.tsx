import {grey} from '@mui/material/colors'
import {Paper, Grid, useTheme} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import WhatsappOutlinedIcon from '@mui/icons-material/WhatsappOutlined'

const greyColorLight = grey['200']
const greyColor = grey['900']

const Footer = () => {
  const {palette} = useTheme()
  const {mode: theme} = palette

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        paddingX: 1,
      }}
    >
      <Grid container alignItems="center" justifyContent="space-evenly">
        <a
          href="https://github.com/federicodg"
          target="_blank"
          style={{color: 'unset', opacity: '0.85'}}
        >
          <GitHubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/fededg/"
          target="_blank"
          style={{color: 'unset', opacity: '0.85'}}
        >
          <LinkedInIcon />
        </a>
        <a href="mailto:fede@nazgul.com.ar" style={{color: 'unset', opacity: '0.85'}}>
          <EmailOutlinedIcon />
        </a>
        <a
          href="https://api.whatsapp.com/send/?phone=5493516114150&text=Hola%2C+pasaba+a+saludar!"
          style={{color: 'unset', opacity: '0.85'}}
        >
          <WhatsappOutlinedIcon />
        </a>
      </Grid>
    </Paper>
  )
}

export default Footer
