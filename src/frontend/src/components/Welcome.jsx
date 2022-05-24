import React from 'react'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { Button, Paper, Stack } from '@mui/material'

const Welcome = () => {
    const packages = useSelector((state) => state.packages.packages)
    if (Object.keys(packages).length !== 0) {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <></>
    }
    return (
        <Paper elevation={6} sx={{ m: 1, p: 2 }}>
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
