import {Card, Grid, CardHeader, Stack} from '@mui/material'
import {GetServerSideProps} from 'next'
import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import type {NextPage} from 'next'

import {AppDispatch} from '../redux/store'
import {Layout} from '../components/layouts'
import {addTasks} from '../redux/tasksSlice'
import {Pomodoro} from '../components/pomodoro'
import NewTask from '../components/ui/NewTask'
import Task from '../interfaces/task'
import TaskContainer from '../components/ui/TaskContainer'
import Trash from '../components/ui/Trash'
import {getTasks} from '../database/dbTasks'
import Footer from '../components/ui/Footer'

interface Props {
  tasks: Task[]
}

const HomePage: NextPage<Props> = ({tasks}) => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(addTasks(tasks))
  }, [])

  return (
    <Layout title="My Trello">
      <Grid container spacing={2}>
        <Grid item md={3} sm={6} xs={12}>
          <Card sx={{height: 'calc(100vh - 100px)', padding: '0 8px'}}>
            <CardHeader title="Pendientes" />
            <NewTask />
            <TaskContainer px="227px" status="pending" />
          </Card>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Card sx={{height: 'calc(100vh - 100px)', padding: '0 8px'}}>
            <CardHeader title="En progreso" />
            <TaskContainer px="174px" status="in-progress" />
          </Card>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Card sx={{height: 'calc(100vh - 100px)', padding: '0 8px'}}>
            <CardHeader title="Terminadas" />
            <TaskContainer px="174px" status="finished" />
          </Card>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Stack
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            sx={{height: 'calc(100vh - 100px)'}}
          >
            <Card>
              <Pomodoro />
            </Card>
            <div style={{flex: 1}}></div>
            <Card sx={{marginBottom: 1}}>
              <Trash />
            </Card>
            <Footer />
          </Stack>
        </Grid>
      </Grid>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const tasks = await getTasks()

  if (!tasks) {
    return {
      props: {
        tasks: [],
      },
    }
  }

  return {
    props: {
      tasks,
    },
  }
}

export default HomePage
