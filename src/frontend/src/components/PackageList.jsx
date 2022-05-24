import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Alert, Button, Grid, Paper, Stack, Typography } from '@mui/material'

const PackageList = () => {
    const packages = useSelector((state) => state.packages.packages)
    const status = useSelector((state) => state.packages.status)
    const params = useParams()

    if (status === 'idle') {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <></>
    }

    return (
        <>
            <Grid item xs={3}>
                <Paper
                    elevation={6}
                    sx={{ height: '80vh', p: 2, overflowY: 'scroll' }}
                >
                    <Typography variant="button" sx={{ fontSize: '1.5rem' }}>
                        Packages:
                    </Typography>
                    <Stack spacing={1} alignItems="stretch">
                        {status === 'loading' && (
                            <Alert severity="info">Loading...</Alert>
                        )}
                        {status === 'failed' && (
                            <Alert severity="error">
                                Error while parsing packages.
                            </Alert>
                        )}
                        {status === 'succeeded' &&
                            Object.values(packages).map((pack) => (
                                <Button
                                    variant={
                                        params.name === pack.name
                                            ? 'contained'
                                            : 'outlined'
                                    }
                                    component={Link}
                                    key={pack.name}
                                    to={`/packages/${pack.name}`}
                                >
                                    {pack.name}
                                </Button>
                            ))}
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <Outlet />
            </Grid>
        </>
    )
}

export default PackageList
