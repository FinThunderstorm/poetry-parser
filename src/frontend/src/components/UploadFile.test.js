/* eslint-disable react/prop-types */
import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import UploadFile from './UploadFile'

import packagesReducer from '../reducers/packagesSlice'

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
                        <Route path="/">
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
})
