import { FC } from "react"
import { BrowserRouter } from "react-router-dom"
import { RouterProvider } from "./router"
import { ContextProvider } from "./store"
import { ApolloProvider } from '@apollo/client';
import { client } from "./client";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: FC = () => {
  	return (
		<ApolloProvider client={client}>
			<ContextProvider>
				<BrowserRouter>
					<ToastContainer 
						position="top-right" 
						autoClose={5000} 
						hideProgressBar 
						newestOnTop 
						closeOnClick 
						rtl={false} 
						pauseOnFocusLoss 
						draggable 
						pauseOnHover 
					/>
					
					<RouterProvider />
				</BrowserRouter>	
			</ContextProvider>
		</ApolloProvider>
  	)
}

export default App
