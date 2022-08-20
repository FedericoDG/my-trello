import {useState, useRef, useCallback, useEffect} from 'react'

type Mode = 'work' | 'shortBreak' | 'longBreak'

interface Props {
  work: number
  shortBreak: number
  longBreak: number
  shortBreaksCounter: number
  setShortBreaksCounter: (value: number) => void
}

const usePomodoro = ({
  work = 25,
  shortBreak = 5,
  longBreak = 15,
  shortBreaksCounter = 4,
  setShortBreaksCounter,
}: Props) => {
  const [mode, setMode] = useState<Mode>('work')
  const [isPaused, setIsPaused] = useState(true)
  const [secondLeft, setSecondLeft] = useState(work * 60)

  const secondsLeftRef = useRef(secondLeft)
  const isPausedRef = useRef(isPaused)
  const modeRef = useRef<Mode>(mode)
  const audioRef = useRef<HTMLAudioElement>(null)

  const getNextMode = useCallback(
    (mode: Mode): Mode => {
      if (mode === 'shortBreak') {
        setShortBreaksCounter(shortBreaksCounter + 1)

        return 'work'
      }
      if (mode === 'longBreak') {
        setShortBreaksCounter(1)

        return 'work'
      }
      if (mode === 'work' && shortBreaksCounter === 4) {
        return 'longBreak'
      }

      return 'shortBreak'
    },
    [setShortBreaksCounter, shortBreaksCounter]
  )

  const getNextSeconds = useCallback(
    (mode: Mode): number => {
      if (mode === 'work') return work * 60
      if (mode === 'shortBreak') return shortBreak * 60

      return longBreak * 60
    },
    [longBreak, shortBreak, work]
  )

  const getTotalSeconds = (mode: Mode): number => {
    if (mode === 'work') return work * 60
    if (mode === 'shortBreak') return shortBreak * 60

    return longBreak * 60
  }

  const switchMode = useCallback(() => {
    const nextMode = getNextMode(modeRef.current)
    const nextSeconds = getNextSeconds(nextMode)

    setMode(nextMode)
    modeRef.current = nextMode

    setSecondLeft(nextSeconds)

    secondsLeftRef.current = nextSeconds

    setIsPaused(true)
    isPausedRef.current = true
  }, [getNextMode, getNextSeconds])

  const init = useCallback(() => {
    setSecondLeft(getNextSeconds(mode))
  }, [getNextSeconds, mode])

  const stop = () => {
    setMode('longBreak')
    modeRef.current = 'longBreak'
    setShortBreaksCounter(0)
    switchMode()
  }

  const tick = () => {
    secondsLeftRef.current--
    setSecondLeft(secondsLeftRef.current)
  }

  useEffect(() => {
    init()
    const interval = setInterval(() => {
      if (isPausedRef.current) return
      if (secondsLeftRef.current === 0) {
        audioRef.current!.play()
        switchMode()
      }
      tick()
    }, 1000)

    return () => clearInterval(interval)
  }, [work, shortBreak, longBreak, init, switchMode])

  const percentage = Math.round((secondLeft / getTotalSeconds(mode)) * 100)

  const minutes = Math.floor(secondLeft / 60)

  let seconds: number | string = secondLeft % 60

  if (seconds < 10) seconds = `0${seconds}`

  return {
    mode,
    setMode,
    isPaused,
    setIsPaused,
    secondLeft,
    setSecondLeft,
    secondsLeftRef,
    isPausedRef,
    modeRef,
    audioRef,
    getNextMode,
    getNextSeconds,
    percentage,
    minutes,
    seconds,
    switchMode,
    stop,
  } as const
}

export default usePomodoro
