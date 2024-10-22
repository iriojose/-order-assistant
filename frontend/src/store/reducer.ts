/* eslint-disable @typescript-eslint/no-explicit-any */
import { State, ActionTypes, Action } from "./types"

export const initialState: State = {
    rows: [],
    clientInformation: null
}

const reducerObject = (state: State, payload: any): Record<ActionTypes, State> => ({
    [ActionTypes.setClientInformation]: {
        ...state,
        clientInformation: payload
    },
    [ActionTypes.setRows]: {
        ...state,
        rows: payload
    }
})

export const reducer = <T>(state:State, action: Action<ActionTypes, T>): State => {
    if(reducerObject(state, action.payload)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    }else {
        return state
    }
}