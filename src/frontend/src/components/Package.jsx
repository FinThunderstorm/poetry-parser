import React from 'react'
import {
    Divider,
    Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getPackage } from '../reducers/packagesSlice'

const Package = () => {
    const params = useParams()
    const pack = useSelector((state) => getPackage(state, params.name))

    if (pack === undefined) {
        return (
            <Paper elevation={6} sx={{ height: '80vh', m: 1, p: 2 }}>
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
                <Grid item xs={6} sx={{ p: 4 }}>
                    {pack.dependencies && (
                        <>
                            <Typography variant="button" color="text.secondary">
                                Dependencies:
                            </Typography>
                            <TableContainer sx={{ height: '60vh' }}>
                                <Table stickyHeader size="small">
                                    <TableHead>
                                        <TableRow key="head-row">
                                            <TableCell>Name</TableCell>
                                            <TableCell>Required</TableCell>
                                            <TableCell>Installed</TableCell>
                                            <TableCell>Category</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.values(pack.dependencies).map(
                                            (value) => (
                                                <TableRow
                                                    key={`${value.name}-row`}
                                                >
                                                    {value.installed ? (
                                                        <TableCell>
                                                            <Link
                                                                to={`/packages/${value.name}`}
                                                                title={`dependency-${value.name}`}
                                                            >
                                                                {value.name}
                                                            </Link>
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell>
                                                            {value.name}
                                                        </TableCell>
                                                    )}

                                                    <TableCell>
                                                        {value.optional
                                                            ? '❌'
                                                            : '✅'}
                                                    </TableCell>

                                                    <TableCell>
                                                        {value.installed
                                                            ? '✅'
                                                            : '❌'}
                                                    </TableCell>

                                                    <TableCell>
                                                        {value.category}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </Grid>

                <Grid item xs={6} sx={{ p: 4 }}>
                    {pack.reverseDependencies && (
                        <>
                            <Typography variant="button" color="text.secondary">
                                Reverse dependencies:
                            </Typography>
                            <TableContainer sx={{ height: '60vh' }}>
                                <Table stickyHeader size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pack.reverseDependencies.map(
                                            (value) => (
                                                <TableRow key={value.name}>
                                                    {value.installed ? (
                                                        <TableCell>
                                                            <Link
                                                                to={`/packages/${value.name}`}
                                                                title={`reverseDependency-${value.name}`}
                                                            >
                                                                {value.name}
                                                            </Link>
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell>
                                                            {value.name}
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Package
