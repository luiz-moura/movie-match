import Card from '@/Components/Card';
import GuestLayout from '@/Layouts/GuestLayout';
import apiClient from '@/api';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Room({ movies, room }) {
    useEffect(() => {
        window.Echo.channel('swipe').listen('SwipeMovie', (event) => {
            console.log(event);
        })
    }, [])

    const directions = {
        left: 'left',
        right: 'right',
    }

    const swipe = (direction, movieId) => {
        apiClient.post(`/api/movie/swipe-${direction}`, {
            movie_id: movieId,
            room_id: room.id
        })
    }

    const movie = movies.results[0]

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <Card movie={movie} />

            <div onClick={() => swipe(directions.left, movie.id)}>👈</div>
            <div onClick={() => swipe(directions.right, movie.id)}>👉</div>
        </GuestLayout>
    )
}
