import React from 'react'
import { Outlet } from 'react-router-dom'
import MainMenu from './components/MainMenu'
import Welcome from './components/Welcome'

const App = () => (
    <>
        <MainMenu />
        <Welcome />
        <Outlet />
    </>
)

export default App
