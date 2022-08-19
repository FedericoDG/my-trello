import {configureStore} from '@reduxjs/toolkit'

import uiSlice from './uiSlice'
import tasksSlice from './tasksSlice'

const store = configureStore({
  reducer: {
    ui: uiSlice,
    tasks: tasksSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
