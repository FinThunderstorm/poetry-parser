/* eslint-disable react/prop-types */
import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import packagesReducer from '../reducers/packagesSlice'

describe('App', () => {
    const AppWrapper = ({ url }) => {
        const store = configureStore({
            reducer: {
                packages: packagesReducer,
            },
        })
        return (
            <MemoryRouter initialEntries={[url]}>
                <Provider store={store}>
                    <App />
                </Provider>
            </MemoryRouter>
        )
    }

    test('App renderes correctly', () => {
        render(<AppWrapper url="/" />)

        const home = screen.getByText('home', {
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

        const tree = renderer.create(<AppWrapper url="/" />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
