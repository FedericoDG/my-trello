import {FC, DragEvent} from 'react'
import {List, Paper, useTheme} from '@mui/material'
import {useSelector, useDispatch} from 'react-redux'

import {AppDispatch, RootState} from '../../redux/store'
import {TaskStatus} from '../../interfaces/task'
import {isDraggingTask} from '../../redux/uiSlice'
import {putTask} from '../../redux/tasksSlice'

import TaskItem from './TaskItem'
import style from './TaskContainer.module.css'

interface Props {
  status: TaskStatus
  px?: string
}

const TaskContainer: FC<Props> = ({status, px = '250px'}) => {
  const {palette} = useTheme()
  const {mode: theme} = palette

  const dispatch = useDispatch<AppDispatch>()
  const {tasks} = useSelector((state: RootState) => state.tasks)
  const {draggingTask} = useSelector((state: RootState) => state.ui)

  const taskByStatus = tasks.filter((task) => task.status === status)

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    const task = tasks.find((task) => task._id === id)!

    dispatch(putTask({...task, status: status}))
    dispatch(isDraggingTask(false))
  }

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div className={draggingTask ? style.dragging : ''} onDragOver={allowDrop} onDrop={onDrop}>
      <Paper
        elevation={theme === 'light' ? 0 : 1}
        sx={{
          height: `calc(100vh - ${px})`,
          overflowY: 'auto',
          backgroundColor: 'transparent',
          paddingX: 1,
        }}
      >
        <List sx={{opacity: draggingTask ? 0.2 : 1, transition: '0.25s'}}>
          {taskByStatus.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </List>
      </Paper>
    </div>
  )
}

export default TaskContainer
