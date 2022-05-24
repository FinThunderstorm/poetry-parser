/* eslint-disable react/prop-types */
import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'

import Welcome from './Welcome'

import packagesReducer from '../reducers/packagesSlice'

describe('Welcome', () => {
    const init = {
        packages: {
            packages: {},
            status: 'idle',
            error: null,
        },
    }

    const WelcomeWrapper = ({ url, preloadedState }) => {
        const store = configureStore({
            reducer: {
                packages: packagesReducer,
            },
            preloadedState,
        })
        return (
            <MemoryRouter initialEntries={[url]}>
                <Provider store={store}>
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                    </Routes>
                </Provider>
            </MemoryRouter>
        )
    }

    test('Welcome renderes correctly', () => {
        init.packages.status = 'idle'
        render(<WelcomeWrapper url="/" preloadedState={init} />)

        const title = screen.getByText('Welcome to poetry-parser!', {
            exact: false,
        })
        const info = screen.getByText(
            'Begin explorating your poetry.lock -file by uploading file.',
            {
                exact: false,
            }
        )
        expect(title).toBeDefined()
        expect(info).toBeDefined()

        const tree = renderer
            .create(<WelcomeWrapper url="/" preloadedState={init} />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    test('Welcome shows if failed', () => {
        init.packages.status = 'failed'
        render(<WelcomeWrapper url="/" preloadedState={init} />)

        const title = screen.getByText('Welcome to poetry-parser!', {
            exact: false,
        })
        const info = screen.getByText(
            'Begin explorating your poetry.lock -file by uploading file.',
            {
                exact: false,
            }
        )
        expect(title).toBeDefined()
        expect(info).toBeDefined()

        const tree = renderer
            .create(<WelcomeWrapper url="/" preloadedState={init} />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    test('Welcome is not shown if packages occurs', () => {
        init.packages.status = 'succeeded'
        render(<WelcomeWrapper url="/" preloadedState={init} />)

        const name = screen.queryByText('Welcome to poetry-parser!', {
            exact: false,
        })
        expect(name).toBeNull()

        const tree = renderer
            .create(<WelcomeWrapper url="/" preloadedState={init} />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    test('Welcome is not shown if loading packages', () => {
        init.packages.status = 'loading'
        render(<WelcomeWrapper url="/" preloadedState={init} />)

        const name = screen.queryByText('Welcome to poetry-parser!', {
            exact: false,
        })
        expect(name).toBeNull()

        const tree = renderer
            .create(<WelcomeWrapper url="/" preloadedState={init} />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})
