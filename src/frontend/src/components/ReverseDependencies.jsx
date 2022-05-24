import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

/** ReverseDependencies converts reverseDependencies array to table
 */
const ReverseDependencies = ({ reverseDependencies }) => (
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
                    {reverseDependencies.map((reverseDependency) => (
                        <TableRow key={reverseDependency.name}>
                            {reverseDependency.installed ? (
                                <TableCell>
                                    <Link
                                        to={`/packages/${reverseDependency.name}`}
                                        title={`reverseDependency-${reverseDependency.name}`}
                                    >
                                        {reverseDependency.name}
                                    </Link>
                                </TableCell>
                            ) : (
                                <TableCell>{reverseDependency.name}</TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
)

export default ReverseDependencies
