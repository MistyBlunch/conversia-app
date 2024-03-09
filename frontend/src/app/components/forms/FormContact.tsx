'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Contact } from '@/lib/interfaces/Contact'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormErrorMessage } from '../shared/FormErrorMessage'
import { createContact, updateContact } from '@/services/Contact.service'
import { useAppDispatch } from '@/redux/hooks'

// Schema for validation
const contactSchema = yup
  .object({
    name: yup.string().required(),
    lastName: yup.string().required(),
    age: yup.number().min(18).max(100).required().typeError('age is a required field'),
    phone: yup.string().required().typeError('phone is a required field')
  })
  .required()

export const FormContact = ({
  formData,
  closeModal,
  notifyHandler
}: {
  formData?: Contact
  closeModal: () => void
  notifyHandler?: () => void
}) => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(contactSchema) })

  const onSubmit: SubmitHandler<Contact> = async (data) => {
    if (formData?.id) {
      updateContact({ ...data, id: formData.id })
      dispatch({ type: 'ContactsData/update', payload: { ...data, id: formData.id } })
    } else {
      const id = await createContact(data)
      dispatch({ type: 'ContactsData/create', payload: { ...data, id } })
    }

    notifyHandler && notifyHandler()
    closeModal()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label className='sr-only' htmlFor='name'>
            Name
          </label>
          <input
            {...register('name')}
            className='w-full rounded-lg border border-gray-200 p-3 text-sm'
            defaultValue={formData?.name}
            placeholder='Name'
            type='text'
            id='name'
          />
          <FormErrorMessage error={errors.name?.message ?? ''} />
        </div>
        <div>
          <label className='sr-only' htmlFor='lastName'>
            Last Name
          </label>
          <input
            {...register('lastName')}
            className='w-full rounded-lg border border-gray-200 p-3 text-sm'
            defaultValue={formData?.lastName}
            placeholder='Last Name'
            type='text'
            id='lastName'
          />
          <FormErrorMessage error={errors.lastName?.message ?? ''} />
        </div>
        <div className='flex '>
          <div className='mr-2 w-full'>
            <label className='sr-only' htmlFor='age'>
              Age
            </label>
            <input
              {...register('age')}
              className='w-full rounded-lg border border-gray-200 p-3 text-sm'
              defaultValue={formData?.age}
              placeholder='Age'
              type='number'
              id='age'
            />
            <FormErrorMessage error={errors.age?.message ?? ''} />
          </div>
          <div className='ml-2 w-full'>
            <label className='sr-only' htmlFor='number'>
              Phone Number
            </label>
            <input
              {...register('phone')}
              className='w-full rounded-lg border border-gray-200 p-3 text-sm'
              defaultValue={formData?.phone}
              placeholder='Phone Number'
              type='number'
              id='number'
            />
            <FormErrorMessage error={errors.phone?.message ?? ''} />
          </div>
        </div>
        <div className='mt-4'>
          <button
            type='submit'
            className='inline-block rounded px-4 py-2 text-sm font-medium border border-primary text-primary bg-white hover:bg-primary hover:text-white transition duration-300 w-full'
          >
            {formData?.id ? 'Update Contact' : 'Create Contact'}
          </button>
        </div>
      </form>
    </div>
  )
}
