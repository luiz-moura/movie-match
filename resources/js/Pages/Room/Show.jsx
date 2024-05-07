import { useEffect, useState } from 'react'
import { Head } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout'
import Swipe from '@/Components/Movies/Swipe'
import apiClient from '@/api'
import Cookies from 'js-cookie'

export default function ShowRoom({ room }) {
    const [movies, setMovies] = useState()
    const [match, setMatch] = useState(room.match)
    const [currentPage, setCurrentPage] = useState()

    const channelName = `swipe.${room.key}`
    const eventToListen = 'SwipeMovie'
    const cacheRoomId = `room-${room.key}`

    useEffect(() => {
        if (room.finished_at) return

        listenToEvents()

        const { page } = getLastSwipedMovie()
        setCurrentPage(page)
    }, [])

    useEffect(() => {
        if (!currentPage) return

        middleman(currentPage)
    }, [currentPage])

    useEffect(() => {
        if (movies?.length !== 0 || movies.length === 20) return

        setCurrentPage((previous) => previous + 1)
    }, [movies])

    const middleman = async (page) => {
        const movies = await fetchMovies(page)
        setMovies(movies)

        const movieId = movies.at(-1).id
        saveLastSwipedMovie({
            page,
            movieId,
        })
    }

    const getLastSwipedMovie = () => {
        let lastSwiped = Cookies.get(cacheRoomId)

        if (!lastSwiped) {
            return { page: 1, movieId: null }
        }

        lastSwiped = JSON.parse(lastSwiped)

        return {
            page: lastSwiped.page ?? 1,
            movieId: lastSwiped.movieId ?? null,
        }
    }

    const listenToEvents = () => {
        window.Echo.channel(channelName).listen(
            eventToListen,
            ({ movie }) => handleMatch(movie)
        )
    }

    const fetchMovies = async (page) => {
        const result = await apiClient.get(`/api/movie?page=${page}`)

        return result.status === 200 ? result.data.results : []
    }

    const saveLastSwipedMovie = ({ page, movieId }) => {
        Cookies.set(cacheRoomId, JSON.stringify({ page, movieId }))
    }

    const handleMatch = (movie) => {
        setMatch(movie)
        stopListeningToEvents()
    }

    const stopListeningToEvents = () => {
        window.Echo.leaveChannel(channelName)
    }

    const handleSwipe = (direction) => {
        const movieId = movies.at(-1).id
        apiClient.post('/api/movie/swipe', {
            direction,
            movie_id: movieId,
            room_id: room.id,
        })

        saveLastSwipedMovie({
            page: currentPage,
            movieId,
        })

        setMovies(movies.slice(0, -1))
    }

    return (
        <GuestLayout>
            <Head title="Room" />
            <Swipe
                movies={movies}
                match={match}
                handleSwipe={handleSwipe}
            />
        </GuestLayout>
    )
}
