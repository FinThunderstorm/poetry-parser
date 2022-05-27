import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Alert, Button, Grid, Paper, Stack, Typography } from '@mui/material'

/** PackageList gives list of all packages and offers links to more information
 */
const PackageList = () => {
    const packages = useSelector((state) => state.packages.packages)
    const status = useSelector((state) => state.packages.status)
    const lockVersion = useSelector((state) => state.packages.lockVersion)
    const params = useParams()

    if (status === 'idle') {
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
                            lockVersion !== '1.1' &&
                            lockVersion !== undefined && (
                                <Alert severity="warning">
                                    Currently supported poetry.lock -file
                                    version is 1.1, other versions might have
                                    errors in parsing.
                                </Alert>
                            )}
                        {status === 'succeeded' &&
                            Object.values(packages)
                                .sort((a, b) => {
                                    const nameA = a.name.toLowerCase()
                                    const nameB = b.name.toLowerCase()
                                    if (nameA < nameB) {
                                        return -1
                                    }
                                    if (nameA > nameB) {
                                        return 1
                                    }
                                    return 0
                                })
                                .map((pack) => (
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
