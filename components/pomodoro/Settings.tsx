import {Box, Typography, Slider, Button, Stack} from '@mui/material'
import {lightBlue, lightGreen, red, grey} from '@mui/material/colors'
import {useContext} from 'react'
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'

import {PomodoroContext} from '../../context/PomodoroContext'

const redColor = red[700]
const lightGreenColor = lightGreen.A400
const lightBlueColor = lightBlue.A200
const greyColor = grey['600']

const Settings = () => {
  const {work, setWork, shortBreak, setShortBreak, longBreak, setLongBreak, handleSettingsClick} =
    useContext(PomodoroContext)

  return (
    <Box marginX="auto" paddingTop={3} sx={{width: 200, height: 309}}>
      <Box marginBottom={6}>
        <Typography variant="overline">Focus</Typography>
        <Stack alignItems="center" direction="row" spacing={2} sx={{mb: 1}}>
          <AccessAlarmOutlinedIcon fontSize="small" sx={{color: redColor}} />
          <Slider
            max={60}
            min={5}
            name="work"
            step={5}
            sx={{color: `${greyColor}`}}
            value={work}
            valueLabelDisplay="auto"
            onChange={(e: any) => {
              setWork(e.target.value)
              stop()
            }}
          />
        </Stack>
        <Typography variant="overline">Descanso corto</Typography>
        <Stack alignItems="center" direction="row" spacing={2} sx={{mb: 1}}>
          <AccessAlarmOutlinedIcon fontSize="small" sx={{color: lightGreenColor}} />
          <Slider
            max={60}
            min={5}
            name="shortBreak"
            step={5}
            sx={{color: `${greyColor}`}}
            value={shortBreak}
            valueLabelDisplay="auto"
            onChange={(e: any) => {
              setShortBreak(e.target.value)
              stop()
            }}
          />
        </Stack>
        <Typography variant="overline">Descanso largo</Typography>
        <Stack alignItems="center" direction="row" spacing={2} sx={{mb: 1}}>
          <AccessAlarmOutlinedIcon fontSize="small" sx={{color: lightBlueColor}} />
          <Slider
            max={60}
            min={5}
            name="longBreak"
            step={5}
            sx={{color: `${greyColor}`}}
            value={longBreak}
            valueLabelDisplay="auto"
            onChange={(e: any) => {
              setLongBreak(e.target.value)
              stop()
            }}
          />
        </Stack>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          color="inherit"
          startIcon={<KeyboardBackspaceOutlinedIcon />}
          variant="text"
          onClick={handleSettingsClick}
        >
          volver
        </Button>
      </Box>
    </Box>
  )
}

export default Settings
