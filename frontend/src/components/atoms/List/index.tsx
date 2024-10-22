import { ReactNode } from "react";

type Props<T> = {
    children: (value: T, index: number) => ReactNode,
    values: Array<T>,
}

export const List = <T, >({ values, children }: Props<T>) => {
    return (
        <>{values.slice().reverse().map(children)}</>
    )
}
