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
        if (movies?.length !== 0) return

        setCurrentPage((previous) => previous + 1)
    }, [movies])

    const middleman = async (page) => {
        let movies = await fetchMovies(page)

        const { page: lastPageLoaded, movieId: lastSwipedMovieId } = getLastSwipedMovie()
        const isBeingResumed = page === lastPageLoaded
        if (isBeingResumed) {
            movies = removeSwipedMovies(movies, lastSwipedMovieId)
        }

        setMovies(movies)

        if (isBeingResumed) return

        const movieId = movies.at(-1).id
        saveLastSwipedMovie(movieId, page)
    }

    const removeSwipedMovies = (movies, lastSwipedMovieId) => {
        const index = movies.findIndex(movie => movie.id === lastSwipedMovieId)

        return movies.slice(0, index)
    }

    const getLastSwipedMovie = () => {
        const lastSwipedJson = Cookies.get(cacheRoomId)

        if (!lastSwipedJson) {
            return { page: 1, movieId: null }
        }

        const lastSwiped = JSON.parse(lastSwipedJson)

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

    const saveLastSwipedMovie = (movieId, page) => {
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
        sendSwipedMovie(movieId, direction)
        saveLastSwipedMovie(movieId, currentPage)
        setMovies(movies.slice(0, -1))
    }

    const sendSwipedMovie = (movieId, direction) => {
        apiClient.post('/api/movie/swipe', {
            direction,
            movie_id: movieId,
            room_id: room.id,
        })
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
