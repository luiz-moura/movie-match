import { createContext, useContext, useState } from 'react'

const RoomContext = createContext()

export const RoomProvider = ({ initial, children }) => {
    const [ room ] = useState(initial)

    return (
        <RoomContext.Provider value={room}>
            {children}
        </RoomContext.Provider>
    )
}

export const useRoomContext = () => {
    return useContext(RoomContext)
}
