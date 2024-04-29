import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import apiClient from '@/api'
import { useMoviesContext } from '@/Contexts/MoviesContext'
import { useRoomContext } from '@/Contexts/RoomContext'
import ActionButton from '@/Components/Movies/ActionButton'
import Card from './Card'
import Match from './Match'

export default function Swipe({ match }) {
    const room = useRoomContext()
    const [movies, setMovies] = useMoviesContext()

    const [isDragging, setIsDragging] = useState(false)
    const [isDragOffBoundary, setIsDragOffBoundary] = useState(null)
    const [cardDrivenProps, setCardDrivenProps] = useState({
        leftButtonScale: 1,
        rightButtonScale: 1,
    })

    const directions = {
        left: 'left',
        right: 'right'
    }
    const easeOutExpo = [0.16, 1, 0.3, 1]
    const variants = {
        current: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.3, ease: easeOutExpo },
        },
        upcoming: {
            opacity: 0.3,
            y: 0,
            scale: 1,
            transition: { duration: 0.3, ease: easeOutExpo, delay: 0 },
        },
        remainings: {
            opacity: 0,
            y: 0,
            scale: 1,
        },
        exit: {
            opacity: 0,
            y: 40,
            transition: { duration: 0.3, ease: easeOutExpo },
            x: isDragOffBoundary === directions.left ? -300 : 300,
            rotate: isDragOffBoundary === directions.left ? -20 : 20,
        },
    }

    const offBoundaryHandle = (direction) => {
        setIsDragOffBoundary(direction)

        apiClient.post('/api/movie/swipe', {
            direction,
            movie_id: movies.at(-1).id,
            room_id: room.id,
        })

        setTimeout(() => setMovies(movies.slice(0, -1)), 5)
    }

    return (
        <motion.div className={`flex p-5 flex-col justify-center items-center ${isDragging ? 'cursor-grabbing' : ''}`}>
            <div className='w-full aspect-[100/150] max-w-xs mb-[20px] relative z-10'>
                <AnimatePresence>
                    {match && <Match movie={match} />}

                    {(!match && !!movies) && movies.map((movie, i) => {
                        const isLast = i === movies.length - 1
                        const isUpcoming = i === movies.length - 2

                        return (
                            <motion.div
                                key={movie.id}
                                className={`relative`}
                                variants={variants}
                                initial='remainings'
                                animate={isLast ? 'current' : isUpcoming ? 'upcoming' : 'remainings'}
                                exit='exit'
                            >
                                <Card
                                    movie={movie}
                                    isDragging={isDragging}
                                    setIsDragging={setIsDragging}
                                    setIsDragOffBoundary={setIsDragOffBoundary}
                                    setCardDrivenProps={setCardDrivenProps}
                                    offBoundaryHandle={offBoundaryHandle}
                                />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>

            {!match ? (
                <div className='flex items-center justify-center w-full gap-4 relative z-10 mt-6'>
                    <ActionButton
                        direction={directions.left}
                        scale={cardDrivenProps.leftButtonScale}
                        isDragOffBoundary={isDragOffBoundary}
                        onClick={() => offBoundaryHandle(directions.left)}
                    />
                    <ActionButton
                        direction={directions.right}
                        scale={cardDrivenProps.rightButtonScale}
                        isDragOffBoundary={isDragOffBoundary}
                        onClick={() => offBoundaryHandle(directions.right)}
                    />
                </div>
            ) : ''}
        </motion.div>
    )
}
