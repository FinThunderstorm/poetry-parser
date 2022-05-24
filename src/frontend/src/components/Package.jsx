import React from 'react'
import { Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getPackage } from '../reducers/packagesSlice'
import Dependencies from './Dependencies'
import ReverseDependencies from './ReverseDependencies'

/** Package holds all information related to specific package
 */
const Package = () => {
    const params = useParams()
    const pack = useSelector((state) => getPackage(state, params.name))

    if (pack === undefined) {
        return (
            <Paper elevation={6} sx={{ height: '80vh', p: 2 }}>
                <Stack alignItems="center" justifyContent="center">
                    <Typography variant="button" sx={{ fontSize: '1.5rem' }}>
                        😭 Error while selecting package.
                    </Typography>
                </Stack>
            </Paper>
        )
    }

    return (
        <Paper elevation={6} sx={{ height: '80vh', p: 2 }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="button" sx={{ fontSize: '1.5rem' }}>
                        {pack.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{pack.description}</Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
                    <Divider variant="middle" />
                </Grid>
                <Grid item xs={8} sx={{ p: 4 }}>
                    <Dependencies dependencies={pack.dependencies} />
                </Grid>

                <Grid item xs={4} sx={{ p: 4 }}>
                    <ReverseDependencies
                        reverseDependencies={pack.reverseDependencies}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Package
