/* eslint-disable react/prop-types */
import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import ReverseDependencies from './ReverseDependencies'

describe('ReverseDependencies', () => {
    const ReverseDependenciesWrapper = ({ url, reverseDependencies }) => (
        <MemoryRouter initialEntries={[url]}>
            <Routes>
                <Route path="/">
                    <Route path="packages">
                        <Route
                            path=":name"
                            element={
                                <ReverseDependencies
                                    reverseDependencies={reverseDependencies}
                                />
                            }
                        />
                    </Route>
                </Route>
            </Routes>
        </MemoryRouter>
    )

    test('ReverseDependencies renderes correctly', () => {
        const reverseDependencies = [
            {
                name: 'pytest',
                installed: true,
            },
            {
                name: 'tottoroo',
                installed: true,
            },
        ]
        render(
            <ReverseDependenciesWrapper
                url="/packages/atomicwrites"
                reverseDependencies={reverseDependencies}
            />
        )

        const title = screen.getByText('Reverse dependencies:', {
            exact: false,
        })
        const name = screen.getByText('Name', {
            exact: false,
        })

        expect(title).toBeDefined()
        expect(name).toBeDefined()

        const pytest = screen.getByText('pytest', {
            exact: false,
        })
        const tottoroo = screen.getByText('tottoroo', {
            exact: false,
        })

        expect(pytest).toBeDefined()
        expect(tottoroo).toBeDefined()

        const tree = renderer
            .create(
                <ReverseDependenciesWrapper
                    url="/packages/atomicwrites"
                    reverseDependencies={reverseDependencies}
                />
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})
