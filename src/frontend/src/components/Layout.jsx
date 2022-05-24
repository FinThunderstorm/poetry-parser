import { Grid } from '@mui/material'
import React from 'react'

import { Outlet } from 'react-router-dom'
import MainMenu from './MainMenu'
import Welcome from './Welcome'

/** Layout handles basic layout of application
 */
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
