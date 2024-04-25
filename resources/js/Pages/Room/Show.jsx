
import Swipe from '@/Components/Movies/Swipe'
import { MoviesProvider } from '@/Contexts/MoviesContext'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head } from '@inertiajs/react'
import { useEffect } from 'react'

export default function Room({ movies, room }) {
    useEffect(() => {
        window.Echo.channel('swipe').listen('SwipeMovie', (event) => {
            console.log(event)
        })
    }, [])

    return (
        <GuestLayout>
            <Head title="Room" />
            <MoviesProvider initial={movies.results}>
                <Swipe />
            </MoviesProvider>
        </GuestLayout>
    )
}
