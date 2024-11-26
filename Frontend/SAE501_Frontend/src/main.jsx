import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Accueil from "./pages/Accueil.jsx"
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TestApiPost from './pages/TestApiPost.jsx'
import TestApiGet from './pages/TestApiGet.jsx'

const router = createBrowserRouter(
[
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path: "/",
        element: <Accueil/>
      },
      {
        path: "/register",
        element: <TestApiPost/>
      },
      {
        path: "/list",
        element: <TestApiGet/>
      }
    ]
  }
]

)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
