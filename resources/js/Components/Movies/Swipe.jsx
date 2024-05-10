import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ActionButton from '@/Components/Movies/ActionButton'
import Card from '@/Components/Movies/Card'
import Match from '@/Components/Movies/Match'

export default function Swipe({ movies, match, handleSwipe }) {
    const [isDragging, setIsDragging] = useState(false)
    const [isDragOffBoundary, setIsDragOffBoundary] = useState(null)
    const [draggedOut, setDraggedOut] = useState(null)

    const [buttonProps, setButtonProps] = useState({
        leftButtonScale: 1,
        rightButtonScale: 1,
    })

    const animationVariations = {
        current: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
            },
        },
        upcoming: {
            opacity: 0.3,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
                delay: 0
            },
        },
        remainings: {
            opacity: 0,
            y: 0,
            scale: 1,
        },
        exit: {
            opacity: 0,
            y: 40,
            x: draggedOut === 'left' ? -300 : 300,
            rotate: draggedOut === 'left' ? -20 : 20,
            transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
            },
        },
    }

    useEffect(() => {
        if (!draggedOut) return

        middleman()
    }, [draggedOut])

    const middleman = async () => {
        await handleSwipe(draggedOut)
        setDraggedOut(false)
    }

    return (
        <motion.div className={`w-full flex p-5 flex-col justify-center items-center ${isDragging ? 'cursor-grabbing' : ''}`}>
            {match && (
                <div className='w-full max-w-xs relative z-10'>
                    <Match movie={match} />
                </div>
            )}

            {!match && (
                <div className='w-full aspect-[100/150] max-w-xs relative z-10'>
                    <AnimatePresence>
                        {!!movies && movies.map((movie, i) => {
                            const isLast = i === movies.length - 1
                            const isUpcoming = i === movies.length - 2

                            return (
                                <motion.div
                                    key={movie.id}
                                    className={'relative'}
                                    variants={animationVariations}
                                    initial='remainings'
                                    animate={isLast ? 'current' : isUpcoming ? 'upcoming' : 'remainings'}
                                    exit='exit'
                                >
                                    <Card
                                        movie={movie}
                                        isDragging={isDragging}
                                        setIsDragging={setIsDragging}
                                        setIsDragOffBoundary={setIsDragOffBoundary}
                                        setDraggedOut={setDraggedOut}
                                        setButtonProps={setButtonProps}
                                    />
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>
            )}

            {(!match && !!movies) && (
                <div className='flex items-center justify-center w-full gap-4 relative z-10 mt-6'>
                    <ActionButton
                        direction={'left'}
                        scale={buttonProps.leftButtonScale}
                        iconColor={isDragOffBoundary === 'left' ? 'white' : null}
                        onClick={() => setDraggedOut('left')}
                    />
                    <ActionButton
                        direction={'right'}
                        scale={buttonProps.rightButtonScale}
                        iconColor={isDragOffBoundary === 'right' ? 'white' : null}
                        onClick={() => setDraggedOut('right')}
                    />
                </div>
            )}
        </motion.div>
    )
}
