import {createContext, FC, useState, ReactNode} from 'react'

interface ContextProps {
  work: number
  shortBreak: number
  longBreak: number
  shortBreaksCounter: number
  showSettings: boolean
  setWork: (number: number) => void
  setShortBreak: (number: number) => void
  setLongBreak: (number: number) => void
  setShortBreaksCounter: (value: number) => void
  setShowSettings: (boolean: boolean) => void
  handleSettingsClick: () => void
}

export const PomodoroContext = createContext({} as ContextProps)

interface ProviderProps {
  children: ReactNode
}

const PomodoroProvider: FC<ProviderProps> = ({children}) => {
  const [work, setWork] = useState(25)
  const [shortBreak, setShortBreak] = useState(5)
  const [longBreak, setLongBreak] = useState(15)
  const [shortBreaksCounter, setShortBreaksCounter] = useState(1)
  const [showSettings, setShowSettings] = useState(false)

  const handleSettingsClick = () => setShowSettings((prev) => !prev)

  return (
    <PomodoroContext.Provider
      value={{
        work,
        setWork,
        shortBreak,
        setShortBreak,
        longBreak,
        setLongBreak,
        shortBreaksCounter,
        setShortBreaksCounter,
        showSettings,
        setShowSettings,
        handleSettingsClick,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  )
}

export default PomodoroProvider
