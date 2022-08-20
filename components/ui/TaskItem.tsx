import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Box,
} from '@mui/material'
import {DragEvent, FC, MouseEvent} from 'react'
import {useDispatch} from 'react-redux'
import {useRouter} from 'next/router'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import {AppDispatch} from '../../redux/store'
import {deleteTask} from '../../redux/tasksSlice'
import {isDraggingTask} from '../../redux/uiSlice'
import {Task} from '../../interfaces'
import getFormatDistanceToNow from '../../utils/date'

interface Props {
  task: Task
}

const TaskItem: FC<Props> = ({task}) => {
  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()

  const onDragStart = (e: DragEvent) => {
    e.dataTransfer.setData('text/plain', task._id)
    dispatch(isDraggingTask(true))
  }
  const onDragEnd = () => {
    dispatch(isDraggingTask(false))
  }

  const handleDelete = (e: MouseEvent<HTMLButtonElement>, id: string): void => {
    e.stopPropagation()
    dispatch(deleteTask(id))
  }

  const onClick = () => router.push(`/tasks/${task._id}`)

  return (
    <>
      <Card
        draggable
        sx={{marginBottom: 1}}
        onClick={onClick}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        <Box display={{xs: 'block', sm: 'block', md: 'none'}}>
          <IconButton
            aria-label="delete"
            size="small"
            sx={{position: 'absolute', right: 0, zIndex: 9}}
            onClick={(e) => handleDelete(e, task._id)}
          >
            <HighlightOffIcon color="error" fontSize="inherit" />
          </IconButton>
        </Box>
        <CardActionArea>
          <CardContent sx={{marginTop: 1}}>
            <Typography sx={{whiteSpace: 'pre-line'}}>{task.description}</Typography>
            <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
              <Typography variant="caption" sx={{opacity: 0.5}}>
                {getFormatDistanceToNow(task.createdAt)}
              </Typography>
            </CardActions>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default TaskItem
