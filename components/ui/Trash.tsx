import {DragEvent} from 'react'
import {grey} from '@mui/material/colors'
import {Paper, Grid, useTheme} from '@mui/material'
import {useSelector, useDispatch} from 'react-redux'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import {AppDispatch, RootState} from '../../redux/store'
import {deleteTask} from '../../redux/tasksSlice'
import {isDraggingTask} from '../../redux/uiSlice'

import style from './TaskContainer.module.css'

const greyColorLight = grey['200']
const greyColor = grey['900']

const Trash = () => {
  const {palette} = useTheme()
  const {mode: theme} = palette

  const {draggingTask} = useSelector((state: RootState) => state.ui)
  const dispatch = useDispatch<AppDispatch>()

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')

    dispatch(deleteTask(id))
    dispatch(isDraggingTask(false))
  }

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div
      className={draggingTask ? style.dragging_to_trash : ''}
      onDragOver={allowDrop}
      onDrop={onDrop}
    >
      <Paper
        elevation={theme === 'light' ? 0 : 1}
        sx={{
          backgroundColor: 'transparent',
          paddingX: 1,
        }}
      >
        <Grid container alignItems="center" justifyContent="center" sx={{height: '100px'}}>
          <DeleteForeverIcon
            sx={{fontSize: 80, color: theme === 'dark' ? greyColor : greyColorLight}}
          />
        </Grid>
      </Paper>
    </div>
  )
}

export default Trash
