import React from 'react'
const { createContext, useReducer, useContext } = require("react")
export const StateContext = createContext()

export const StateProvider = ({initialState, reducer, children}) =>(
    <StateContext.Provider value = {useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

export const useStatevalue = () => useContext(StateContext) 