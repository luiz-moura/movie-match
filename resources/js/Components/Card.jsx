export default function Card({ movie }) {
    const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    return (
        <>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img src={image} alt={movie.title} className='w-full' />
                </a>
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {movie.title}
                        <span class="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 ml-3">⭐ {movie.vote_average}</span>
                    </h5>
                </div>
            </div>
        </>
    )
}
