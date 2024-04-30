import { motion } from 'framer-motion'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

const actionProps = {
    left: {
        bgColorClass: 'bg-red-500',
        icon: FaArrowLeft,
        iconBaseColorClass: 'text-[#701823]',
    },
    right: {
        bgColorClass: 'bg-green-500',
        icon: FaArrowRight,
        iconBaseColorClass: 'text-[#2C5B10]',
    },
}

export default function ActionButton({
    scale,
    direction,
    isDragOffBoundary,
    onClick,
}) {
    const Icon = actionProps[direction].icon
    const textColor = isDragOffBoundary === direction
        ? ' text-white'
        : actionProps[direction].iconBaseColorClass

    return (
        <motion.button onClick={onClick} whileTap={{ scale: 0.9 }}>
            <motion.div
                className={`flex items-center justify-center w-[60px] h-[60px] rounded-full shadow ${actionProps[direction].bgColorClass}`}
                style={{ scale: scale }}
            >
                <Icon className={`w-[24px] h-[24px] duration-100 ease-out ${textColor}`}/>
            </motion.div>
        </motion.button>
    )
}
