/* eslint-disable react/prop-types */
import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import Package from './Package'

import packagesReducer from '../reducers/packagesSlice'

describe('Package', () => {
    const preloadedState = {
        packages: {
            packages: {
                atomicwrites: {
                    name: 'atomicwrites',
                    description: 'Atomic file writes.',
                    optional: 'false',
                    pythonVersions: [
                        '>=2.7',
                        '!=3.0.*',
                        '!=3.1.*',
                        '!=3.2.*',
                        '!=3.3.*',
                    ],
                    dependencies: {},
                    reverseDependencies: [
                        {
                            name: 'pytest',
                            installed: true,
                        },
                    ],
                },
                cachecontrol: {
                    name: 'cachecontrol',
                    description: 'httplib2 caching for requests',
                    optional: 'false',
                    pythonVersions: ['>=3.6'],
                    dependencies: {
                        lockfile: {
                            name: 'lockfile',
                            category: 'filecache',
                            optional: true,
                            source: 'extras',
                            installed: true,
                        },
                        msgpack: {
                            name: 'msgpack',
                            optional: false,
                            source: 'dependencies',
                            installed: true,
                        },
                        requests: {
                            name: 'requests',
                            optional: false,
                            source: 'dependencies',
                            installed: true,
                        },
                        redis: {
                            name: 'redis',
                            category: 'redis',
                            optional: true,
                            source: 'extras',
                            installed: false,
                        },
                    },
                    reverseDependencies: [],
                },
            },
            status: 'succeeded',
            error: null,
        },
    }

    const PackageWrapper = ({ url }) => {
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
                        <Route path="/">
                            <Route path="packages">
                                <Route path=":name" element={<Package />} />
                            </Route>
                        </Route>
                    </Routes>
                </Provider>
            </MemoryRouter>
        )
    }

    test('Package works with reverse dependencies (atomicwrites)', () => {
        render(<PackageWrapper url="/packages/atomicwrites" />)

        const name = screen.getByText('atomicwrites', {
            exact: false,
        })
        const description = screen.getByText('Atomic file writes.', {
            exact: false,
        })
        const pytest = screen.getByText('pytest', {
            exact: false,
        })
        expect(name).toBeDefined()
        expect(description).toBeDefined()
        expect(pytest).toBeDefined()

        const tree = renderer
            .create(<PackageWrapper url="/packages/atomicwrites" />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    test('Package works with dependencies (cachecontrol)', () => {
        render(<PackageWrapper url="/packages/cachecontrol" />)

        const name = screen.getByText('cachecontrol', {
            exact: false,
        })
        const description = screen.getByText('httplib2 caching for requests', {
            exact: false,
        })
        const lockfile = screen.getByText('lockfile', {
            exact: false,
        })
        const filecache = screen.getByText('filecache', {
            exact: false,
        })
        const msgpack = screen.getByText('msgpack', {
            exact: false,
        })

        expect(name).toBeDefined()
        expect(description).toBeDefined()
        expect(lockfile).toBeDefined()
        expect(filecache).toBeDefined()
        expect(msgpack).toBeDefined()

        const tree = renderer
            .create(<PackageWrapper url="/packages/cachecontrol" />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    test('Package shows error if not found', () => {
        render(<PackageWrapper url="/packages/invalid" />)

        const error = screen.getByText('😭 Error while selecting package.', {
            exact: false,
        })
        expect(error).toBeDefined()

        const tree = renderer
            .create(<PackageWrapper url="/packages/invalid" />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})
