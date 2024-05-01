import { useEffect, useState } from 'react'
import { Head } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout'
import Swipe from '@/Components/Movies/Swipe'
import { MoviesProvider } from '@/Contexts/MoviesContext'
import { RoomProvider } from '@/Contexts/RoomContext'

export default function ShowRoom({ movies, room }) {
    const [match, setMatch] = useState()

    const channelName = `swipe.${room.key}`
    const eventToListen = 'SwipeMovie'

    const openTheRoom = () => {
        if (!!room.finished_at) {
            setMatch(room.match)

            return
        }

        listen()
    }

    useEffect(() => {
        openTheRoom()
    }, [])

    const listen = () => {
        window.Echo.channel(channelName).listen(
            eventToListen,
            ({ movie }) => handleMatch(movie)
        )
    }

    const handleMatch = (movie) => {
        setMatch(movie)
        stopListening()
    }

    const stopListening = () => {
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
