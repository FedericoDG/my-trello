import {Card, Grid, CardHeader} from '@mui/material'
import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import type {NextPage} from 'next'

import {AppDispatch} from '../redux/store'
import {Layout} from '../components/layouts'
import {loadTasks} from '../redux/tasksSlice'
import NewTask from '../components/ui/NewTask'
import TaskContainer from '../components/ui/TaskContainer'

const HomePage: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(loadTasks())
  }, [dispatch])

  return (
    <Layout title="My Trello">
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Pendientes" />
            <NewTask />
            <TaskContainer status="pending" />
          </Card>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title="En progreso" />
            <TaskContainer status="in-progress" />
          </Card>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Terminadas" />
            <TaskContainer status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage
