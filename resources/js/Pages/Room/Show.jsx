
import Swipe from '@/Components/Movies/Swipe'
import { MoviesProvider } from '@/Contexts/MoviesContext'
import { RoomProvider } from '@/Contexts/RoomContext'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Room({ movies, room }) {
    const [match, setMatch] = useState()
    const channelName = `swipe.${room.key}`

    useEffect(() => {
        window.Echo.channel(channelName)
            .listen('SwipeMovie', ({ movie }) => handleMatch(movie))
    }, [])

    const handleMatch = (movie) => {
        setMatch(movie)
        window.Echo.leaveChannel(channelName)
    }

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
