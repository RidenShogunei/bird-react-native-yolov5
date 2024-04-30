import { createSlice } from '@reduxjs/toolkit'

export const processSlice = createSlice({
  name: 'process',
  initialState: {
    completed: false,
  },
  reducers: {
    setCompleted: state => {
      state.completed = true;
    },
    setUncompleted: state => {
      state.completed = false;
    }
  },
})

// 导出 action
export const { setCompleted, setUncompleted } = processSlice.actions

// 导出 reducer
export default processSlice.reducer 