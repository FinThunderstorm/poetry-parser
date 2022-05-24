import { Grid } from '@mui/material'
import React from 'react'

import { Outlet } from 'react-router-dom'
import MainMenu from './MainMenu'
import Welcome from './Welcome'

const Layout = () => (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <MainMenu />
        </Grid>
        <Grid item xs={12}>
            <Welcome />
        </Grid>
        <Outlet />
    </Grid>
)

export default Layout
