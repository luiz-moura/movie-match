import { useEffect, useState } from 'react'
import { Head } from '@inertiajs/react'
import Swipe from '@/Components/Movies/Swipe'
import apiClient from '@/api'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import Match from '@/Components/Movies/Match'
import CardSkeleton from '@/Components/Movies/CardSkeleton'
import RoomLayout from '@/Layouts/RoomLayout'

export default function ShowRoom({ room }) {
    const [movies, setMovies] = useState()
    const [match, setMatch] = useState(room.match)
    const [currentPage, setCurrentPage] = useState()
    const [isBlocked, setIsBlocked] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

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

    useEffect(() => {
        if (!match) return

        clearRoomData()
    }, [match])

    const middleman = async (page) => {
        setIsLoading(true)

        let movies = await fetchMovies(page)

        if (!movies) {
            toast.error('An error occurred when searching for movies')

            return
        }

        const { page: lastPageLoaded, movieId: lastSwipedMovieId } = getLastSwipedMovie()
        const isBeingResumed = page === lastPageLoaded
        if (isBeingResumed) {
            movies = removeSwipedMovies(movies, lastSwipedMovieId)
        }

        setMovies(movies)
        setIsLoading(false)
        setIsBlocked(false)

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
        try {
            const response = await apiClient.get(`/api/movie?page=${page}`)

            return response.data.results
        } catch (error) {
            return false
        }
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

    const handleSwipe = async(direction) => {
        setIsBlocked(true)

        const movieId = movies.at(-1).id
        const response = await sendSwipedMovie(movieId, direction)

        if (!response) {
            toast.error('Failed to register movie swipe')

            return
        }

        if (204 === response.status) return

        saveLastSwipedMovie(movieId, currentPage)
        setMovies(movies.slice(0, -1))
        setIsBlocked(false)
    }

    const sendSwipedMovie = async (movieId, direction) => {
        try {
            const response = await apiClient.post('/api/movie/swipe', {
                direction,
                movie_id: movieId,
                room_id: room.id,
            })

            return response
        } catch (error) {
            return false
        }
    }

    const clearRoomData = () => {
        Cookies.remove(cacheRoomId)
    }

    return (
        <RoomLayout>
            <Head title='Room' />
            {match
                ? <Match movie={match} />
                : isLoading
                    ? <CardSkeleton/>
                    : <Swipe movies={movies} isBlocked={isBlocked} handleSwipe={handleSwipe}/>
            }
        </RoomLayout>
    )
}
