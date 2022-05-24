/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const parsePackages = createAsyncThunk(
    'packages/parsePackages',
    async (selectedFile) => {
        const url = process.env.REACT_APP_BACKEND_API
        const response = await axios.post(url, selectedFile, {
            headers: { 'Content-Type': 'text/plain' },
        })
        return response.data
    }
)

export const packagesSlice = createSlice({
    name: 'packages',
    initialState: {
        packages: {},
        status: 'idle',
        error: null,
    },
    reducers: {
        parse: async (state, action) => {
            state.packages = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(parsePackages.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(parsePackages.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.packages = action.payload.packages
            })
            .addCase(parsePackages.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export const { parse } = packagesSlice.actions

export default packagesSlice.reducer

export const getPackage = (state, name) => state.packages.packages[name]
