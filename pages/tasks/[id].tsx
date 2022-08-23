import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import {ChangeEvent, useMemo, useState} from 'react'
import {GetServerSideProps, NextPage} from 'next'
import {useDispatch} from 'react-redux'
import SaveIcon from '@mui/icons-material/Save'
import {useRouter} from 'next/router'
import {useSnackbar} from 'notistack'

import {AppDispatch} from '../../redux/store'
import {Layout} from '../../components/layouts'
import {putTask} from '../../redux/tasksSlice'
import getFormatDistanceToNow from '../../utils/date'
import getTaskById from '../../database/dbTasks'
import Task, {TaskStatus} from '../../interfaces/task'

const statusValues: TaskStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  task: Task
}

const TaskPage: NextPage<Props> = ({task}) => {
  const {description, status, createdAt} = task

  const [inputValue, setInputValue] = useState(description)
  const [statusValue, setStatusValue] = useState<TaskStatus>(status)
  const [touch, setTouch] = useState(false)

  const isNotValid = useMemo(() => inputValue.length <= 0 && touch, [inputValue, touch])

  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()

  const {enqueueSnackbar} = useSnackbar()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) =>
    setStatusValue(e.target.value as TaskStatus)

  const handleOnSave = async () => {
    const updatedTask = {
      ...task,
      description: inputValue,
      status: statusValue,
    }

    await dispatch(putTask(updatedTask))

    enqueueSnackbar('Tarea actualizada', {
      variant: 'success',
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    })
    router.push('/')
  }

  return (
    <Layout title={`${inputValue.substring(0, 20)}...`}>
      <Grid container justifyContent="center" sx={{marginTop: 2}}>
        <Grid item md={6} sm={8} xs={12}>
          <Card>
            <CardHeader title="Editar tarea" />
            <CardContent>
              <TextField
                autoFocus
                fullWidth
                multiline
                error={isNotValid}
                helperText={isNotValid && ''}
                label="Escribe aquí"
                placeholder="Ingrese una descripción"
                sx={{marginTop: 2, marginBottom: 1}}
                value={inputValue}
                onBlur={() => setTouch(true)}
                onChange={handleInputChange}
              />
              <Typography align="right" variant="body2">
                {getFormatDistanceToNow(createdAt)}
              </Typography>
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <RadioGroup row value={statusValue} onChange={handleRadioChange}>
                  {statusValues.map((status) => (
                    <FormControlLabel
                      key={status}
                      control={<Radio />}
                      label={capitalize(status)}
                      value={status}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                disabled={inputValue.length <= 0}
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={handleOnSave}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const {id} = params as {id: string}

  const task = await getTaskById(id)

  if (!task) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      task,
    },
  }
}

export default TaskPage
