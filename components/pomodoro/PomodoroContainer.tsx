import {Paper} from '@mui/material'
import {useContext} from 'react'

import {PomodoroContext} from '../../context/PomodoroContext'

import 'react-circular-progressbar/dist/styles.css'
import Settings from './Settings'
import CountDown from './CountDown'

const PomodoroContainer = () => {
  const {showSettings} = useContext(PomodoroContext)

  return (
    <Paper
      sx={{
        backgroundColor: 'transparent',
        paddingBottom: 1,
        paddingX: 1,
        marginTop: 8,
      }}
    >
      {showSettings && <Settings />}
      {!showSettings && <CountDown />}
    </Paper>
  )
}

export default PomodoroContainer
