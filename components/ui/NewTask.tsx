import {Box, Button, TextField} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {ChangeEvent, MouseEvent, useState} from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SaveIcon from '@mui/icons-material/Save'

import {AppDispatch, RootState} from '../../redux/store'
import {isAddingTask} from '../../redux/uiSlice'
import {postTask} from '../../redux/tasksSlice'

const NewTask = () => {
  const [inputValue, setinputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  const {addingTask} = useSelector((state: RootState) => state.ui)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setinputValue(e.target.value)

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setTouched(false)
    dispatch(isAddingTask(false))
    setinputValue('')
  }

  const handleSubmit = () => {
    if (inputValue.length === 0) return
    dispatch(postTask(inputValue))
    setTouched(false)
    dispatch(isAddingTask(false))
    setinputValue('')
  }

  return (
    <Box sx={{marginBottom: 2, paddingX: 1}}>
      {addingTask ? (
        <>
          <TextField
            autoFocus
            fullWidth
            multiline
            error={inputValue.length <= 0 && touched}
            helperText={inputValue.length <= 0 && touched && 'Ingrese una descripción'}
            label="Escribe aquí"
            placeholder="Nueva tarea"
            sx={{marginTop: 2, marginBottom: 1, color: 'inherit'}}
            value={inputValue}
            onBlur={() => setTouched(true)}
            onChange={handleChange}
          />
          <Box display="flex" justifyContent="space-between">
            <Button color="error" variant="text" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button endIcon={<SaveIcon />} variant="outlined" onClick={handleSubmit}>
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          color="inherit"
          fullWidth
          startIcon={<AddCircleIcon />}
          variant="outlined"
          onClick={() => dispatch(isAddingTask(true))}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  )
}

export default NewTask
