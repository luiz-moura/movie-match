export default function Match({ movie }) {
    return (
        <div>
            <figure className='relative max-w-sm transition-all duration-300 cursor-pointer'>
                <a href='#'>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className='rounded-lg'
                    />
                </a>
                <figcaption className='absolute px-4 text-lg text-white text-center bottom-40 w-full flex justify-center'>
                    <div className="rounded-lg border-2 border-yellow-600 bg-black/70 p-2">
                        <span className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-purple-700 from-yellow-500"><i>MATCH</i></span>
                    </div>
                </figcaption>
            </figure>
        </div>
    )
}
