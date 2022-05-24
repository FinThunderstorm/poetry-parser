/* eslint-disable react/prop-types */
import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Stack, Grid, Paper, Typography } from '@mui/material'

const PackageList = () => {
    const packages = useSelector((state) => state.packages.packages)
    const params = useParams()
    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <Paper
                    elevation={6}
                    sx={{ height: '80vh', m: 1, p: 2, overflowY: 'scroll' }}
                >
                    <Typography variant="button" sx={{ fontSize: '1.5rem' }}>
                        Packages:
                    </Typography>
                    <Stack spacing={1}>
                        {Object.values(packages).map((pack) => (
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
            <Grid item xs={10}>
                <Outlet />
            </Grid>
        </Grid>
    )
}

export default PackageList
