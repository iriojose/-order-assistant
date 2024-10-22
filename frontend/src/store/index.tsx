import { FC, createContext, ReactNode, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import { ContextType } from "./types";
import { useActions } from "./actions";

type Props = { children: ReactNode }

const Context = createContext<ContextType | undefined>(undefined)

const ContextProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const actions = useActions(dispatch)
    
    return (
        <Context.Provider value={{ state, actions }}>
            {children}
        </Context.Provider>
    )   
}

const useContextProvider = (): ContextType => {
	const context = useContext(Context);
	if (!context) throw new Error('must be used within a Provider');
	return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { ContextProvider, useContextProvider }