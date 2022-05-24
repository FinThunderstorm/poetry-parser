import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Paper, Stack, Typography } from '@mui/material'

/** Welcome shows welcoming words to application
 */
const Welcome = () => {
    const status = useSelector((state) => state.packages.status)

    if (status === 'succeeded' || status === 'loading') {
        return <></>
    }
    return (
        <Paper elevation={6} sx={{ p: 2 }}>
            <Stack spacing={2} alignItems="center">
                <Typography variant="button" sx={{ fontSize: '3rem' }}>
                    Welcome to poetry-parser!
                </Typography>
                <Typography>
                    Begin explorating your poetry.lock -file by uploading file.
                </Typography>
                <Button component={Link} to="/upload" variant="contained">
                    Upload
                </Button>
            </Stack>
        </Paper>
    )
}

export default Welcome
