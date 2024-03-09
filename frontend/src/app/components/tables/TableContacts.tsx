'use client'

import { useEffect, useState } from 'react'
import { Contact } from '@/lib/interfaces/Contact'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { FormContactModal } from '../forms/FormContactModal'
import { getContacts, removeContact, updateContact } from '@/services/Contact.service'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { FormNotificationToast } from '../shared/FormNotificationToast'

// Load data from the server
const loadData = async (): Promise<Contact[]> => {
  const contacts = await getContacts()
  return contacts;
}

export const TableContacts = ({ load }: {load: boolean}) => {
  const dispatch = useAppDispatch()

  const [modalFormContactVisible, setModalFormContactVisible] = useState(false)
  const [formContactData, setFormContactData] = useState({} as Contact)

  const contacts = useAppSelector((state) => state.ContactsDataReducer.ContactsData)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await loadData()
        dispatch({ type: 'ContactsData/set', payload: data })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if(load) {
      getData()
    }
  }, [load])

  const closeModalFormContactVisible = () => {
    setModalFormContactVisible(false)
  }

  const openModalFormContactVisible = () => {
    setModalFormContactVisible(true)
  }

  const setFormContactDataModal = (data: Contact) => {
    setFormContactData(data)
  }

  const removeContactTable = (data: Contact) => {
    if (!data.id) return
    removeContact(data.id)
    dispatch({ type: 'ContactsData/remove', payload: data })
    FormNotificationToast()
  }

  const updateContactTable = (data: Contact) => {
    if (!data.id) return
    openModalFormContactVisible()
    setFormContactDataModal(data)
    updateContact(data)
    dispatch({ type: 'ContactsData/update', payload: data })
  }

  const headers = [
    { name: 'Name', key: 'name' },
    { name: 'Last Name', key: 'lastName' },
    { name: 'Age', key: 'age' },
    { name: 'Phone number', key: 'phone' },
    { name: 'Actions', key: 'actions' }
  ]

  return (
    <>
      {contacts.length > 0 ? (
        <div className='rounded-lg border border-gray-200'>
          <div className='overflow-x-auto rounded-t-lg'>
            <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
              <thead className='ltr:text-left rtl:text-right'>
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header.key}
                      className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'
                    >
                      {header.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200'>
                {contacts.map((data, key) => (
                  <tr key={key}>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700 text-center'>
                      {data.name}
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700 text-center'>
                      {data.lastName}
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700 text-center'>
                      {data.age}
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700 text-center'>
                      {data.phone}
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700 text-center'>
                      <button className='m-1' onClick={() => updateContactTable(data)}>
                        <PencilIcon className='w-5' />
                      </button>
                      <button className='m-1' onClick={() => removeContactTable(data)}>
                        <TrashIcon className='w-5' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <FormContactModal
            modalVisible={modalFormContactVisible}
            closeModal={closeModalFormContactVisible}
            formData={formContactData}
            notifyHandler={FormNotificationToast}
          />
        </div>
      ) : (
        <div className='text-gray-500 text-center'>No contacts yet :(</div>
      )}
    </>
  )
}
