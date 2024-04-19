export default function Card({ movie }) {
    const image = `https://image.tmdb.org/t/p/w185${movie.poster_path}`

    return (
        <>
            <figure>
                <img src={image} alt={movie.title} />
                <figcaption>
                    <h1>{movie.title}</h1>
                    <p>⭐ {movie.vote_average}</p>
                </figcaption>
            </figure>
        </>
    )
}
