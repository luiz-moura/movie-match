
import Swipe from '@/Components/Movies/Swipe'
import { RoomProvider, useRoomContext } from '@/Contexts/RoomContext'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head } from '@inertiajs/react'

export default function Room({ movies, room }) {
    useEffect(() => {
        window.Echo.channel('swipe').listen('SwipeMovie', (event) => {
            console.log(event)
        })
    }, [])

    return (
        <GuestLayout>
            <Head title="Room" />
            <RoomProvider initial={movies.results}>
                <Swipe />
            </RoomProvider>
        </GuestLayout>
    )
}
