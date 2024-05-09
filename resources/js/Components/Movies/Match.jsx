import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

export default function Match({ movie }) {
    return (
        <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25 }}
        >
            <figure className='relative max-w-sm transition-all duration-300 cursor-pointer'>
                <a href='#'>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className='rounded-lg'
                    />
                </a>
                <figcaption className='absolute px-4 text-lg text-white text-center bottom-40 w-full flex justify-center'>
                    <div className='rounded-lg border-4 border-yellow-200 bg-black/70 p-2'>
                        <span className='text-3xl md:text-5xl lg:text-6xl font-extrabold text-blue-500'>
                            MATCH
                        </span>
                    </div>
                </figcaption>
            </figure>
            <div className='mt-5'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{movie.title}</h5>
                <p className='flex items-center'>
                    <FaStar className='text-yellow-500 mr-2' />
                    {movie.vote_average?.toFixed(2)}
                </p>
            </div>
        </motion.div>
    )
}
