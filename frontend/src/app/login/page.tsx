'use client'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { User } from '@/lib/interfaces/User'
import { SharedLayout } from '../components/shared/Layout'
import { FormErrorMessage } from '../components/shared/FormErrorMessage'
import { loginUser } from '@/services/User.service'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'

// Schema for validation
const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required()
  })
  .required()

export default function Login() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const useData = useAppSelector((state) => state.UserDataReducer.UserData)

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(loginSchema) })

  // Submit Form
  const onSubmit: SubmitHandler<User> = async (data) => {
    const user = await loginUser(data)

    if(!user) {
      toast.error('Invalid email or password', {
        position: 'top-right',
        autoClose: 1000
      })
      return;
    }

    dispatch({ type: 'UserData/set', payload: user })

    router.push('/dashboard')
  }

  return (
    <SharedLayout>
      <div className='p-10 max-sm:p-0'>
        <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-4'>
            <div className='rounded-lg bg-white p-8 shadow-lg lg:col-span-2 lg:col-start-2 lg:p-12'>
              <h3 className='text-2xl mb-4 text-center'>Login</h3>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div>
                  <label className='sr-only' htmlFor='email'>
                    Email
                  </label>
                  <input
                    {...register('email')}
                    className='w-full rounded-lg border border-gray-200 p-3 text-sm'
                    placeholder='Email'
                    type='email'
                    defaultValue={useData?.email}
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
                    Login
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
