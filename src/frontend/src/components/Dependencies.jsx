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

/** Dependencies converts dependencies object into table
 */
const Dependencies = ({ dependencies }) => (
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
                        <TableCell>Source</TableCell>
                        <TableCell>Category</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(dependencies)
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
                        .map((dependency) => (
                            <TableRow key={`${dependency.name}-row`}>
                                {dependency.installed ? (
                                    <TableCell>
                                        <Link
                                            to={`/packages/${dependency.name}`}
                                            title={`dependency-${dependency.name}`}
                                        >
                                            {dependency.name}
                                        </Link>
                                    </TableCell>
                                ) : (
                                    <TableCell>{dependency.name}</TableCell>
                                )}

                                <TableCell>
                                    {dependency.optional ? '❌' : '✅'}
                                </TableCell>

                                <TableCell>
                                    {dependency.installed ? '✅' : '❌'}
                                </TableCell>
                                <TableCell>{dependency.source}</TableCell>
                                <TableCell>{dependency.category}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
)

export default Dependencies
