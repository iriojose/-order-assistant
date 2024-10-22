import { createElement } from "react"
import { useRoutes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Checkout } from "../pages/Checkout"
import { NotFound } from "../pages/NotFound"
import { OrderDetails } from "../pages/OrderDetails"

const RouterProvider = () => {
    const routes = useRoutes([
        { path: "/", element: createElement(Home) },
        { path: "/detail/:id", element: createElement(OrderDetails) },
        { path: "/checkout", element: createElement(Checkout) },
        { path: "/*", element: createElement(NotFound) },
    ])

    return routes
}

export { RouterProvider }