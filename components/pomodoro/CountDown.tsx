import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar'
import {Box, Typography, ButtonGroup, IconButton, Button} from '@mui/material'
import {useContext} from 'react'
import {lightBlue, lightGreen, red} from '@mui/material/colors'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

import usePomodoro from '../../hooks/usePomodoro'
import {PomodoroContext} from '../../context/PomodoroContext'

const redColor = red[600]
const lightGreenColor = lightGreen.A700
const lightBlueColor = lightBlue.A200

const CountDown = () => {
  const {
    work,
    shortBreak,
    longBreak,
    shortBreaksCounter,
    setShortBreaksCounter,
    handleSettingsClick,
  } = useContext(PomodoroContext)

  const {
    mode,
    isPaused,
    setIsPaused,
    isPausedRef,
    percentage,
    minutes,
    seconds,
    switchMode,
    stop,
    audioRef,
  } = usePomodoro({
    work,
    shortBreak,
    longBreak,
    shortBreaksCounter,
    setShortBreaksCounter,
  })

  return (
    <>
      <Box paddingTop={1}>
        <Box sx={{maxWidth: 200, margin: '0 auto'}}>
          <CircularProgressbarWithChildren
            strokeWidth={2}
            styles={buildStyles({
              pathColor:
                mode === 'work'
                  ? redColor
                  : mode === 'shortBreak'
                  ? lightGreenColor
                  : lightBlueColor,
              trailColor: '#FFFFFF',
              textColor: '#FFFFFF',
            })}
            text={minutes + ':' + seconds}
            value={percentage}
          >
            <Box
              paddingTop={10}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alingItems: 'center',
              }}
            >
              <Typography
                sx={{
                  color: `${
                    mode === 'work'
                      ? redColor
                      : mode === 'shortBreak'
                      ? lightGreenColor
                      : lightBlueColor
                  }`,
                }}
                variant="button"
                align="center"
              >
                {mode === 'work' ? 'focus' : mode === 'shortBreak' ? 'pausa corta' : 'pausa larga'}
              </Typography>
              <Typography align="center" variant="caption">
                {`vuelta: ${shortBreaksCounter}/4`}
              </Typography>
            </Box>
          </CircularProgressbarWithChildren>
        </Box>
        <Box display="flex" justifyContent="center" marginY={1}>
          <ButtonGroup disableElevation variant="text">
            {isPaused ? (
              <IconButton
                sx={{fontSize: '2em'}}
                onClick={() => {
                  setIsPaused(false)
                  isPausedRef.current = false
                }}
              >
                <PlayCircleFilledWhiteOutlinedIcon fontSize="inherit" />
              </IconButton>
            ) : (
              <IconButton
                sx={{fontSize: '2em'}}
                onClick={() => {
                  setIsPaused(true)
                  isPausedRef.current = true
                }}
              >
                <PauseCircleOutlineOutlinedIcon fontSize="inherit" />
              </IconButton>
            )}
            <IconButton sx={{fontSize: '2em'}} onClick={switchMode}>
              <SkipNextIcon fontSize="inherit" />
            </IconButton>
            <IconButton sx={{fontSize: '2em'}} onClick={stop}>
              <StopCircleOutlinedIcon fontSize="inherit" />
            </IconButton>
          </ButtonGroup>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            color="inherit"
            startIcon={<SettingsOutlinedIcon />}
            variant="text"
            onClick={handleSettingsClick}
          >
            ajustes
          </Button>
        </Box>
        <audio ref={audioRef}>
          <source src="./statics/sound.mp3" />
        </audio>
      </Box>
    </>
  )
}

export default CountDown
