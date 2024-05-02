import GuestLayout from '@/Layouts/GuestLayout'
import { Head, router } from '@inertiajs/react'
import { FiKey } from 'react-icons/fi'

export default function ShareRoom({ room }) {
    const enterRoom = (e) => {
        e.preventDefault()

        router.replace(`/room/${room.key}`)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(room.key)
    }

    return (
        <GuestLayout>
            <Head title='Share your room' />

            <form onSubmit={enterRoom}>
                <label htmlFor='search' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Share the key</label>
                <div className='relative'>
                    <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                        <FiKey/>
                    </div>
                    <input
                        type='search'
                        id='search'
                        className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Search'
                        required
                        readOnly
                        value={room.key}
                    />
                    <button
                        type='button'
                        onClick={handleCopy}
                        className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >Copy</button>
                </div>

                <button
                    type="submit"
                    className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full mt-5"
                >Enter the room</button>
            </form>
        </GuestLayout>
    )
}
