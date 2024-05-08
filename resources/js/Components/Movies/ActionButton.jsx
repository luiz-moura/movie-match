import { motion } from 'framer-motion'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

const buttonProps = {
    left: {
        bgColor: 'bg-red-500',
        icon: FaArrowLeft,
    },
    right: {
        bgColor: 'bg-green-500',
        icon: FaArrowRight,
    },
}

export default function ActionButton({
    scale,
    direction,
    iconColor,
    ...props
}) {
    const Icon = buttonProps[direction].icon
    const defaultColor = direction == 'left' ? 'red-500' : 'green-500'

    return (
        <motion.button whileTap={{ scale: 0.9 }} {...props}>
            <motion.div
                className={`flex items-center justify-center w-[60px] h-[60px] rounded-full shadow ${buttonProps[direction].bgColor}`}
                style={{ scale: scale }}
            >
                <Icon className={`w-[24px] h-[24px] duration-100 ease-out text-${iconColor ?? defaultColor}`}/>
            </motion.div>
        </motion.button>
    )
}
