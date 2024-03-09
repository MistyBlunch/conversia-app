import { Contact } from '@/lib/interfaces/Contact'
import { createSlice } from '@reduxjs/toolkit'

const initialState = { ContactsData: [] as Contact[] }

export const ContactsDataSlice = createSlice({
  name: 'ContactsData',
  initialState,
  reducers: {
    create: (state, action) => {
      state.ContactsData.push(action.payload)
    },
    set: (state, action) => {
      state.ContactsData = action.payload
    },
    update: (state, action) => {
      const index = state.ContactsData.findIndex((contact) => contact.id === action.payload.id)
      if (index) state.ContactsData[index] = action.payload
    },
    remove: (state, action) => {
      state.ContactsData = state.ContactsData.filter((contact) => contact.id !== action.payload.id)
    }
  }
})

export const { create, set, update, remove } = ContactsDataSlice.actions

export default ContactsDataSlice.reducer
