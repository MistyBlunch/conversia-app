'use client'

import { SharedLayout } from '../components/shared/Layout'
import { FormContactModal } from '../components/forms/FormContactModal'
import { useEffect, useState } from 'react'
import { TableContacts } from '../components/tables/TableContacts'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { ToastContainer } from 'react-toastify'
import { FormNotificationToast } from '../components/shared/FormNotificationToast'
import { isAuthenticated } from '@/lib/auth/auth'
import { useRouter } from 'next/navigation'
import { getAccessTokenData } from '@/services/User.service'

export default function Dashboard() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [loadData, setLoadData] = useState(false);
  const [modalFormContactVisible, setModalFormContactVisible] = useState(false)
  const user = useAppSelector((state) => state.UserDataReducer.UserData)

  useEffect(() => {
    if(!isAuthenticated()) {
      router.push('/');
      return
    }

    if(!user.id) {
      const userData = getAccessTokenData();
      if(userData) {
        dispatch({ type: 'UserData/set', payload: userData })
      }
    }

    setLoadData(true);
  })

  const closeModalFormContactVisible = () => {
    setModalFormContactVisible(false)
  }

  const openModalFormContactVisible = () => {
    setModalFormContactVisible(true)
  }

  return (
    <SharedLayout user={user}>
      <div>
        <h3 className='text-2xl mb-4 text-left font-semibold'>Contacts Dashboard</h3>
        <div className='text-end'>
          <button
            type='button'
            onClick={() => {
              openModalFormContactVisible()
            }}
            className='inline-block rounded px-4 py-2 text-md font-medium text-white bg-primary mb-4'
          >
            Create Contact
          </button>
          <FormContactModal
            modalVisible={modalFormContactVisible}
            closeModal={closeModalFormContactVisible}
            notifyHandler={FormNotificationToast}
          />
        </div>
        <TableContacts load={loadData}/>
      </div>
      <ToastContainer />
    </SharedLayout>
  )
}
