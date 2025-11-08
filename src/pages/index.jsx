import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LayoutPublic from '../layout/LayoutPublic'
import Home from './Home'
import Registro from './Registro'
import NotFound from './NotFound'
import Listado from './Listado'
import Gafete from './Gafete'

// Creamos el router y su configuración básica
export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPublic />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />,
                index: true,
            },
            {
                path: "/listado",
                element: <Listado />
            },
            {
                path: "/registro",
                element: <Registro />,
            },
            {
                path: "/gafete/:id",
                element: <Gafete />,
            }
        ]
    }
])