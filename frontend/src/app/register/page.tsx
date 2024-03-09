'use client'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { User } from '@/lib/interfaces/User'
import { SharedLayout } from '../components/shared/Layout'
import { FormErrorMessage } from '../components/shared/FormErrorMessage'
import { emailIsAvailable, registerUser } from '@/services/User.service'
import { ToastContainer, toast } from 'react-toastify'
import { useAppDispatch } from '@/redux/hooks'
import { useRouter } from 'next/navigation'

// Schema for validation
const registerSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16).required()
  })
  .required()

export default function Register() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(registerSchema) })

  // Submit Form
  const onSubmit: SubmitHandler<User> = async (data) => {
    const emailAvailable = await emailIsAvailable(data.email);

    if(!emailAvailable) {
      toast.error('Email is already in use', {
        position: 'top-right',
        autoClose: 1000
      })
      return;
    }

    const timeToRedirect = 1000
    const userData = await registerUser(data)

    if(!userData) {
      toast.error('Internal Server Error', {
        position: 'top-right',
        autoClose: 1000
      })
      return;
    }

    dispatch({ type: 'UserData/set', payload: userData })

    toast.success('User registered successfully', {
      position: 'top-right',
      autoClose: timeToRedirect
    })

    setTimeout(() => {
      router.push('/dashboard')
    }, timeToRedirect)
  }

  return (
    <SharedLayout>
      <div className='p-10 max-sm:p-0'>
        <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-4'>
            <div className='rounded-lg bg-white p-8 shadow-lg lg:col-span-2 lg:col-start-2 lg:p-12'>
              <h3 className='text-2xl mb-4 text-center'>Register</h3>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div>
                  <label className='sr-only' htmlFor='name'>
                    Name
                  </label>
                  <input
                    {...register('name')}
                    className='w-full rounded-lg border border-gray-200 p-3 text-sm'
                    placeholder='Name'
                    type='text'
                    id='name'
                  />
                  <FormErrorMessage error={errors.name?.message ?? ''} />
                </div>
                <div>
                  <label className='sr-only' htmlFor='email'>
                    Email
                  </label>
                  <input
                    {...register('email')}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    className='w-full rounded-lg border border-gray-200 p-3 text-sm'
                    placeholder='Email address'
                    type='email'
                    id='email'
                    autoComplete='on'
                  />
                  <FormErrorMessage error={errors.email?.message ?? ''} />
                </div>
                <div>
                  <label className='sr-only' htmlFor='password'>
                    Password
                  </label>
                  <input
                    {...register('password')}
                    className='w-full rounded-lg border border-gray-200 p-3 text-sm'
                    placeholder='Password'
                    type='password'
                    id='password'
                    autoComplete='on'
                  />
                  <FormErrorMessage error={errors.password?.message ?? ''} />
                </div>

                <div className='mt-4'>
                  <button
                    type='submit'
                    className='inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white'
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </SharedLayout>
  )
}
