export type ClientInformation = {
    client: string
    address: string
}

export type Data = {
    product: string;
    quantity: number;
    price: number;
}

export type ContextType = {
    state: State
    actions: Actions
}

export interface Actions {
    setClientInformation: (client: ClientInformation) => void
    setRows: (rows:Data[]) => void
    cleanStore: () => void
}

export type State = {
    rows: Data[]
    clientInformation: ClientInformation | null
}

export enum ActionTypes {
    setClientInformation = "SET_CLIENT_INFORMATION",
    setRows = "SET_ROWS"
}

export type Action<ActionTypes, T> = {
    type: ActionTypes,
    payload?: T
}