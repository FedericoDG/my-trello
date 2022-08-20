import PomodoroProvider from '../../context/PomodoroContext'

import {PomodoroContainer} from './'

const Pomodoro = () => {
  return (
    <PomodoroProvider>
      <PomodoroContainer />
    </PomodoroProvider>
  )
}

export default Pomodoro
