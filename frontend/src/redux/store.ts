import { configureStore } from '@reduxjs/toolkit'
import ContactsDataReducer from './features/ContactsDataSlice'
import UserDataReducer from './features/UserDataSlice'

export const store = configureStore({
  reducer: { ContactsDataReducer, UserDataReducer }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
