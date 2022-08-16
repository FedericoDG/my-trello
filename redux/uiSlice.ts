import {createSlice} from '@reduxjs/toolkit'

export interface ui {
  sidebarOpen: boolean
}

const initialState: ui = {
  sidebarOpen: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => ({
      ...state,
      sidebarOpen: !state.sidebarOpen,
    }),
  },
})

export const {toggleSidebar} = uiSlice.actions

export default uiSlice.reducer
