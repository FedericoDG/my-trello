import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface ui {
  sidebarOpen: boolean
  addingTask: boolean
  draggingTask: boolean
}
const initialState: ui = {
  sidebarOpen: false,
  addingTask: false,
  draggingTask: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => ({
      ...state,
      sidebarOpen: !state.sidebarOpen,
    }),
    isAddingTask: (state, action: PayloadAction<true | false>) => ({
      ...state,
      addingTask: action.payload,
    }),
    isDraggingTask: (state, action: PayloadAction<true | false>) => ({
      ...state,
      draggingTask: action.payload,
    }),
  },
})

export const {isAddingTask, isDraggingTask, toggleSidebar} = uiSlice.actions

export default uiSlice.reducer
