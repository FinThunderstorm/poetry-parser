import React from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const MainMenu = () => (
    <AppBar color="primary" position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                poetry-parser
            </Typography>
            <Button component={Link} to="/" color="inherit">
                Home
            </Button>
            <Button component={Link} to="/upload" color="inherit">
                Upload
            </Button>
        </Toolbar>
    </AppBar>
)

export default MainMenu
