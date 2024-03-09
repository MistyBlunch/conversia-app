import { User } from '@/lib/interfaces/User'
import { logOut } from '@/services/User.service'
import { HeartIcon, ArrowUturnRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

export const SharedLayout = ({ children, user }: { children: React.ReactNode; user?: User }) => {
  return (
    <>
      <header className='bg-gray-50'>
        <div className='mx-auto py-4 px-8'>
          <div className='sm:flex sm:items-center sm:justify-between'>
            <div className='text-center sm:text-left'>
              <Link href='/'>
                <Image
                  src='/Logo.webp'
                  alt='Picture of the author'
                  width='0'
                  height='0'
                  sizes='200px'
                  priority
                  style={{ width: '200px', height: 'auto' }}
                  className='mx-auto'
                />
              </Link>
            </div>
            {user && (
              <div className='flex'>
                Hola {user.name}!
                <HeartIcon className='w-4 ml-2' />
                <ArrowUturnRightIcon onClick={logOut} className='w-4 ml-2' />
              </div>
            )}
          </div>
        </div>
      </header>
      <section className='p-10 max-w-screen-xl mx-auto'>{children}</section>
    </>
  )
}
