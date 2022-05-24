/* eslint-disable react/prop-types */
import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import Layout from './Layout'

import packagesReducer from '../reducers/packagesSlice'

describe('Layout', () => {
    const LayoutWrapper = ({ url }) => {
        const store = configureStore({
            reducer: {
                packages: packagesReducer,
            },
        })
        return (
            <MemoryRouter initialEntries={[url]}>
                <Provider store={store}>
                    <Routes>
                        <Route path="/" element={<Layout />} />
                    </Routes>
                </Provider>
            </MemoryRouter>
        )
    }

    test('Layout renderes correctly', () => {
        render(<LayoutWrapper url="/" />)

        const home = screen.getByText('Home', {
            exact: false,
        })
        const title = screen.getByText('Welcome to poetry-parser!', {
            exact: false,
        })
        const info = screen.getByText(
            'Begin explorating your poetry.lock -file by uploading file.',
            {
                exact: false,
            }
        )
        expect(home).toBeDefined()
        expect(title).toBeDefined()
        expect(info).toBeDefined()

        const tree = renderer.create(<LayoutWrapper url="/" />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
