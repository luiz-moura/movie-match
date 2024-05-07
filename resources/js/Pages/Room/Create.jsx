import { router } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'
import { useState } from 'react'
import { FiKey } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import GuestLayout from '@/Layouts/GuestLayout'

export default function CreateRoom() {
    const { post, processing } = useForm()
    const [ roomKey, setRoomKey ] = useState()

    const createRoom = (e) => {
        e.preventDefault()

        post(route('room.store'))
    }

    const enterRoom = (e) => {
        e.preventDefault()

        if (!roomKey) return

        router.replace(`/room/${roomKey}`)
    }

    return (
        <GuestLayout>
            <p className='inline-flex items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 w-full'>
                <span className='text-xs text-white px-4 py-1.5'>
                    <FaHeart color='red' className='text-lg'/>
                </span>
                <span className='text-sm font-medium'>Choose the best combination to watch now.</span>
            </p>

            <button
                type='button'
                className='px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full mb-5'
                onClick={createRoom}
                disabled={processing}
            >
                Create your room
            </button>

            <form onSubmit={enterRoom}>
                <label htmlFor='room-key' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Room key</label>
                <div className='relative mb-6'>
                    <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
                        <FiKey/>
                    </div>
                    <input
                        type='search'
                        name='room-key'
                        className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Type your room key here...'
                        onChange={(e) => setRoomKey(e.target.value)}
                    />
                    <button
                        type='submit'
                        className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >Enter</button>
                </div>
            </form>
        </GuestLayout>
    )
}
