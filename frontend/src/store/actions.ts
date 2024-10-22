/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, useEffect } from "react"
import { Actions, Action, ActionTypes, ClientInformation, Data} from "./types"
import { useLocalStorage } from "../hooks/useLocalStorage"

export const useActions = (dispatch: Dispatch<Action<ActionTypes, any>>): Actions => {
    const [storeClient, setStoredClient, clearStoredClient] = useLocalStorage<ClientInformation | null>('CLIENT_INFORMATION_V1', null);
    const [storeRows, setStoredRows, clearStoredRows] = useLocalStorage<Data[]>('ROWS_V1', [{ product: 'Pizza', quantity: 1, price: 0 }]);

    useEffect(() => {
        if(storeClient) setClientInformation(storeClient)
        if(storeRows && storeRows?.length > 0) setRows(storeRows)

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const setClientInformation = (client: ClientInformation) => {
        dispatch({type: ActionTypes.setClientInformation, payload: client})
        setStoredClient(client)
    }
    
    const cleanStore = () => {
        setClientInformation({client: "", address: ""})
        setRows([{ product: 'Pizza', quantity: 1, price: 0 }])
        clearStoredClient()
        clearStoredRows()
    }

    const setRows = (rows: Data[]) => {
        dispatch({type: ActionTypes.setRows, payload: rows})
        setStoredRows(rows)
    }

    return {
        setClientInformation,
        setRows,
        cleanStore
    }
}