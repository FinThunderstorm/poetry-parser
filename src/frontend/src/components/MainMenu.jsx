import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const MainMenu = () => {
    const appName = 'poetry-parser'
    return (
        <>
            <AppBar color="primary">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {appName}
                    </Typography>
                    <Button component={Link} to="/" color="inherit">
                        Home
                    </Button>
                    <Button component={Link} to="/upload" color="inherit">
                        Upload
                    </Button>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    )
}

export default MainMenu
