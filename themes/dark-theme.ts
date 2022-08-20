import {createTheme} from '@mui/material'
import {red} from '@mui/material/colors'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red[600],
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#4a148c',
        },
      },
    },
  },
})

export default darkTheme
