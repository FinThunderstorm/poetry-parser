/* eslint-disable react/prop-types */
import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import UploadFile from './UploadFile'

import packagesReducer from '../reducers/packagesSlice'

jest.mock('axios') // eslint-disable-line no-undef

describe('UploadFile', () => {
    const UploadFileWrapper = ({ url }) => {
        const store = configureStore({
            reducer: {
                packages: packagesReducer,
            },
        })
        return (
            <MemoryRouter initialEntries={[url]}>
                <Provider store={store}>
                    <Routes>
                        <Route path="/" element={<Outlet />}>
                            <Route path="upload" element={<UploadFile />} />
                        </Route>
                    </Routes>
                </Provider>
            </MemoryRouter>
        )
    }

    test('UploadFile renderes correctly', () => {
        render(<UploadFileWrapper url="/upload" />)

        const title = screen.getByText('UPLOAD POETRY.LOCK -FILE', {
            exact: false,
        })
        expect(title).toBeDefined()

        const tree = renderer
            .create(<UploadFileWrapper url="/upload" />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    test('UploadFile functions correctly', async () => {
        render(<UploadFileWrapper url="/upload" />)

        const fakeFile = new File(['invalid'], 'poetry.lock', {
            type: 'text/plain',
        })

        const input = screen.getByTestId('poetry-lock')
        await act(async () => {
            await userEvent.upload(input, fakeFile)
        })

        expect(input.files[0]).toBe(fakeFile)
        expect(input.files).toHaveLength(1)

        const submitButton = screen.getByText('Submit')
        await act(async () => {
            await userEvent.click(submitButton)
        })

        expect(axios.post).toHaveBeenCalledWith('/parse', fakeFile, {
            headers: { 'Content-Type': 'text/plain' },
        })
    })
})
