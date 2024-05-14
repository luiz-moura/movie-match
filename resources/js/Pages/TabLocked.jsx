import { Link } from '@inertiajs/react'

export default function TabLocked({ status }) {


    return (
        <section className='bg-white dark:bg-gray-900 h-screen flex items-center justify-center'>
            <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
                <div className='mx-auto max-w-screen-sm text-center'>
                    <h1 className='mb-4 text-5xl tracking-tight font-extrabold lg:text-5xl text-primary-600 dark:text-primary-500'>
                        This room has been opened in another tab
                    </h1>
                    <Link href='/' className='inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4'>
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </section>
    )
}
