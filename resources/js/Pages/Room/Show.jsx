
import Swipe from '@/Components/Movies/Swipe'
import { MoviesProvider } from '@/Contexts/MoviesContext'
import { RoomProvider } from '@/Contexts/RoomContext'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Room({ movies, room }) {
    const [match, setMatch] = useState()

    useEffect(() => {
        window.Echo.channel('swipe').listen('SwipeMovie', (event) => {
            console.log(event)
            setMatch(event.movie)
        })
    }, [])

    return (
        <GuestLayout>
            <Head title="Room" />
            <RoomProvider initial={room}>
                <MoviesProvider initial={movies.results}>
                    <Swipe match={match} />
                </MoviesProvider>
            </RoomProvider>
        </GuestLayout>
    )
}
