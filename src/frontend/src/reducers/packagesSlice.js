/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

/** parsePackages handles
 * @param {ArrayBuffer} selectedFile - selected file
 */
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

/** packagesSlice handles storing package information
 */
export const packagesSlice = createSlice({
    name: 'packages',
    initialState: {
        packages: {},
        lockVersion: undefined,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(parsePackages.pending, (state) => {
                state.status = 'loading'
                state.packages = {}
                state.lockVersion = undefined
                state.error = null
            })
            .addCase(parsePackages.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.packages = action.payload.packages
                state.lockVersion = action.payload.lockVersion
            })
            .addCase(parsePackages.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export default packagesSlice.reducer

/** getPackage finds wanted package from state
 * @param {RootState} state - holds all information
 * @param {string} name - name of package
 */
export const getPackage = (state, name) => {
    if (!(name in state.packages.packages)) {
        return undefined
    }
    return state.packages.packages[name]
}
