import Image from 'next/image'
import Link from 'next/link'

export const Home = () => {
  return (
    <div className='my-4'>
      <Image
        src='/Logo.webp'
        alt='Picture of the author'
        width='0'
        height='0'
        sizes='200px'
        priority
        style={{ width: '200px', height: 'auto' }}
        className='mx-auto mb-3'
      />
      <h1 className='my-4 md:text-4xl text-2xl font-bold text-center'>Conversia Contact Book</h1>
      <p className='text-center text-lg'>
        An amazing platform to view, create, edit and delete your contacts.
      </p>
      <div className='my-4 text-center'>
        <Link href='/login'>
          <button
            type='button'
            className='mx-3 my-2 inline-block rounded border-2 border-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-white hover:border-primary '
          >
            Login
          </button>
        </Link>
        <Link href='/register'>
          <button
            type='button'
            className='mx-3 my-2 inline-block rounded border-2 border-secondary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-secondary transition duration-300 ease-in-out hover:bg-secondary hover:text-white hover:border-secondary'
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  )
}
