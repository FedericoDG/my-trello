import {FC, useState, useEffect, DragEvent} from 'react'
import {List, Paper} from '@mui/material'
import {useSelector, useDispatch} from 'react-redux'

import {AppDispatch, RootState} from '../../redux/store'
import {TaskStatus} from '../../interfaces/task'
import {isDraggingTask} from '../../redux/uiSlice'
import {putTask} from '../../redux/tasksSlice'

import TaskItem from './TaskItem'
import style from './TaskContainer.module.css'

interface Props {
  status: TaskStatus
}

const TaskContainer: FC<Props> = ({status}) => {
  /* const [hydrated, setHydrated] = useState(false) */

  const dispatch = useDispatch<AppDispatch>()
  const {tasks} = useSelector((state: RootState) => state.tasks)
  const {draggingTask} = useSelector((state: RootState) => state.ui)

  const taskByStatus = tasks.filter((task) => task.status === status)

  /* useEffect(() => {
    setHydrated(true)
  }, []) */

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

  /* if (!hydrated) return null */

  return (
    <div className={draggingTask ? style.dragging : ''} onDragOver={allowDrop} onDrop={onDrop}>
      <Paper
        sx={{
          height: 'calc(100vh - 250px)',
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