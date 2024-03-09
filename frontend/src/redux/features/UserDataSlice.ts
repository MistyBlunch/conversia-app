import { User } from '@/lib/interfaces/User'
import { createSlice } from '@reduxjs/toolkit'

const initialState = { UserData: {} as User }

export const UserDataSlice = createSlice({
  name: 'UserData',
  initialState,
  reducers: {
    set: (state, action) => {
      state.UserData = action.payload
    }
  }
})

export const { set } = UserDataSlice.actions

export default UserDataSlice.reducer
