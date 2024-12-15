import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Accueil from "./pages/Accueil.jsx"
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TestApiPost from './pages/TestApiPost.jsx'
import TestApiGet from './pages/TestApiGet.jsx'
import TestApiPut from './pages/TestApiPut.jsx'
import CGU from './pages/CGU.jsx'
import CGV from './pages/CGV.jsx'
import PDC from './pages/PDC.jsx'
import GetMeds from './components/GetMeds.jsx'
import MedsById from './components/MedsById.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PostMedForm from './components/PostMedForm.jsx'
import UpdateProduit from './components/PutMedForm.jsx'


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Accueil />
        },
        {
          path: "/register",
          element: <TestApiPost />
        },
        {
          path: "/list",
          element: <TestApiGet />
        },
        {
          path: "/update",
          element: <TestApiPut />
        },
        {
          path: "/cgu",
          element: <CGU />
        },
        {
          path: "/cgv",
          element: <CGV />
        },
        {
          path: "/pdc",
          element: <PDC />
        },
        {
          path: "/medicaments",
          element: <GetMeds />
        },
        {
          path: "/medsbyid",
          element: <MedsById />
        },
        {
          path: "/dashboard",
          element: <Dashboard />
        },
        {
          path: "/dashboard/createMed",
          element: <PostMedForm />
        },
        {
          path: "/dashboard/updateMed",
          element: <UpdateProduit />
        }

      ]
    }
  ]

)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
