import ActionButtons from '@/Components/Movies/ActionButtons'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMoviesContext } from '@/Contexts/MoviesContext'
import Card from './Card'
import apiClient from '@/api'

export default function Swipe() {
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

        apiClient.post('api/movies/swipe', {
            direction,
            movieId: movies[0].id,
            roomId: movies[0].room_id,
        })

        setTimeout(() => {
            setMovies(movies.slice(0, -1))
        }, 5)
    }

    return (
        <motion.div className={`flex p-5 flex-col justify-center items-center ${isDragging ? 'cursor-grabbing' : ''}`}>
            <div className='w-full aspect-[100/150] max-w-xs mb-[20px] relative z-10'>
                <AnimatePresence>
                    {!!movies && movies.map((movie, i) => {
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

            <div className='flex items-center justify-center w-full gap-4 relative z-10 mt-6'>
                <ActionButtons
                    direction={directions.left}
                    scale={cardDrivenProps.leftButtonScale}
                    isDragOffBoundary={isDragOffBoundary}
                    onClick={() => offBoundaryHandle(directions.left)}
                />
                <ActionButtons
                    direction={directions.right}
                    scale={cardDrivenProps.rightButtonScale}
                    isDragOffBoundary={isDragOffBoundary}
                    onClick={() => offBoundaryHandle(directions.right)}
                />
            </div>
        </motion.div>
    )
}
