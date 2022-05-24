/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Button, Paper, Stack, Typography } from '@mui/material'
import { parsePackages } from '../reducers/packagesSlice'

const UploadFile = () => {
    const dispatch = useDispatch()
    const [selectedFile, setSelectedFile] = useState()
    const navigate = useNavigate()

    const fileSelector = (event) => {
        setSelectedFile(event.target.files[0])
    }
    const handleSubmission = async () => {
        dispatch(parsePackages(selectedFile))
        navigate('/packages')
    }

    const Input = styled('input')({
        display: 'none',
    })

    return (
        <Paper elevation={6} sx={{ m: 1, mt: 3, p: 2 }}>
            <Stack spacing={2} alignItems="center">
                <Typography variant="button" sx={{ fontSize: '1.5rem' }}>
                    Upload poetry.lock -file
                </Typography>
                <Typography>
                    {selectedFile && `Selected file: ${selectedFile.name}`}
                </Typography>
                <Stack direction="row" spacing={2}>
                    <label htmlFor="contained-button-file">
                        <Input
                            id="contained-button-file"
                            type="file"
                            name="file"
                            onChange={fileSelector}
                        />
                        <Button variant="outlined" component="span">
                            Select file
                        </Button>
                    </label>

                    <Button
                        variant="contained"
                        type="button"
                        onClick={handleSubmission}
                    >
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default UploadFile
