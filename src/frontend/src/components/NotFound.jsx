import React from 'react'
import { Paper, Stack, Typography } from '@mui/material'

/** NotFound is used if given page is not found
 */
const NotFound = () => (
    <Paper elevation={6} sx={{ m: 1, mt: 3, p: 2 }}>
        <Stack spacing={2} alignItems="center">
            <Typography variant="button" sx={{ fontSize: '1.5rem' }}>
                404 NOT FOUND
            </Typography>
            <Typography>
                Our pear eating robots was too lazy and could not catch page
                behind given url.
            </Typography>
        </Stack>
    </Paper>
)

export default NotFound
