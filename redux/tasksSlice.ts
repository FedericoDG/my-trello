import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit'

import {Task} from '../interfaces'
import tasksApi from '../services/tasksApi'

export interface Tasks {
  tasks: Task[]
}

const initialState: Tasks = {
  tasks: [],
}

export const loadTasks = createAsyncThunk('tasks/load', async () => {
  try {
    const {data} = await tasksApi.get<Task[]>('/tasks')

    return data
  } catch (error) {
    throw new Error('error')
  }
})

export const postTask = (description: string) => async (dispatch: Dispatch) => {
  try {
    const {data} = await tasksApi.post<Task>('/tasks', {description})

    dispatch(addTask(data))
  } catch (error) {
    throw new Error('error')
  }
}

export const putTask = (task: Task) => async (dispatch: Dispatch) => {
  try {
    const {data} = await tasksApi.put<Task>(`/tasks/${task._id}`, task)

    dispatch(updateTask(data))
  } catch (error) {
    throw new Error('error')
  }
}

export const deleteTask = (id: string) => async (dispatch: Dispatch) => {
  try {
    const {data} = await tasksApi.delete<Task>(`/tasks/${id}`)

    dispatch(removeTask(data._id))
  } catch (error) {
    throw new Error('error')
  }
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => ({
      ...state,
      tasks: [...state.tasks, action.payload],
    }),
    updateTask: (state, action: PayloadAction<Task>) => ({
      ...state,
      tasks: state.tasks.map((task) => {
        if (task._id === action.payload._id) {
          return {
            ...task,
            status: action.payload.status,
            description: action.payload.description,
          }
        }

        return task
      }),
    }),
    removeTask: (state, action: PayloadAction<string>) => ({
      ...state,
      tasks: state.tasks.filter((task) => task._id !== action.payload),
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(loadTasks.fulfilled, (state, action) => ({
      ...state,
      tasks: action.payload,
    }))
  },
})

export const {addTask, removeTask, updateTask} = tasksSlice.actions

export default tasksSlice.reducer
