import {
    motion,
    useMotionValue,
    useTransform,
    useMotionValueEvent
} from 'framer-motion'

const Card = ({
    movie,
    isDragging,
    setIsDragging,
    setIsDragOffBoundary,
    setCardDrivenProps,
    offBoundaryHandle,
}) => {
    const offsetBoundary = 150
    const inputX = [offsetBoundary * -1, 0, offsetBoundary]
    const outputX = [-400, 0, 400]
    const outputY = [50, 0, 50]
    const outputRotate = [-40, 0, 40]

    const x = useMotionValue(0)
    let drivenX = useTransform(x, inputX, outputX)
    let drivenY = useTransform(x, inputX, outputY)
    let drivenRotation = useTransform(x, inputX, outputRotate)

    const leftButtonScale = useTransform(x, inputX, [3, 1, 0.3])
    const rightButtonScale = useTransform(x, inputX, [0.3, 1, 3])

    useMotionValueEvent(x, 'change', () => {
        setCardDrivenProps(() => ({
            leftButtonScale,
            rightButtonScale
        }))
    })

    return (
        <>
            <motion.div
                className='absolute w-full pointer-events-none text-black origin-bottom shadow-card select-none'
                style={{
                    y: drivenY,
                    rotate: drivenRotation,
                    x: drivenX,
                }}
            >
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className='absolute object-cover object-center duration-500 ease-out w-full'
                />
            </motion.div>

            <motion.div
                className={`absolute w-full aspect-[100/150] ${!isDragging ? 'hover:cursor-grab' : ''}`}
                drag='x'
                dragSnapToOrigin
                dragElastic={0.06}
                dragConstraints={{ left: 0, right: 0 }}
                dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
                onDragStart={() => setIsDragging(true)}
                onDrag={(_, info) => {
                    const offset = info.offset.x

                    if (offset < 0 && offset < offsetBoundary * -1) {
                        setIsDragOffBoundary(`left`)
                    } else if (offset > 0 && offset > offsetBoundary) {
                        setIsDragOffBoundary(`right`)
                    } else {
                        setIsDragOffBoundary(null)
                    }
                }}
                onDragEnd={(_, info) => {
                    setIsDragging(false)
                    setIsDragOffBoundary(null)

                    const isOffBoundary = info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary
                    const direction = info.offset.x > 0 ? 'right' : 'left'

                    if (isOffBoundary) {
                        offBoundaryHandle(direction)
                    }
                }}
                style={{ x }}
            />
        </>
    )
}

export default Card
