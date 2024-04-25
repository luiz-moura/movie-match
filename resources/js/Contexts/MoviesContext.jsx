import { createContext, useContext, useState } from 'react'

const MoviesContext = createContext()

export const MoviesProvider = ({ initial, children }) => {
    const [ movies, setMovies ] = useState(initial)

    return (
        <MoviesContext.Provider value={[ movies, setMovies ]}>
            {children}
        </MoviesContext.Provider>
    )
}

export const useMoviesContext = () => {
    return useContext(MoviesContext)
}
