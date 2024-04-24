import { createContext, useContext, useState } from 'react'

const RoomContext = createContext()

export const RoomProvider = ({ initial, children }) => {
    const [ movies, setMovies ] = useState(initial)

    return (
        <RoomContext.Provider value={[ movies, setMovies ]}>
            {children}
        </RoomContext.Provider>
    )
}

export const useRoomContext = () => {
    return useContext(RoomContext)
}
