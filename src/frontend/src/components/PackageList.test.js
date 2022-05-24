/* eslint-disable react/prop-types */
import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import PackageList from './PackageList'

import packagesReducer from '../reducers/packagesSlice'

describe('PackageList', () => {
    const packages = {
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
            lockVersion: '1.1',
        },
    }

    const PackageListWrapper = ({ url, preloadedState }) => {
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
                            <Route path="packages" element={<PackageList />} />
                        </Route>
                    </Routes>
                </Provider>
            </MemoryRouter>
        )
    }

    test('PackageList shows packages', () => {
        packages.packages.status = 'succeeded'
        render(<PackageListWrapper url="/packages" preloadedState={packages} />)

        const name = screen.getByText('Packages:', {
            exact: false,
        })
        const atomicwrites = screen.getByText('atomicwrites', {
            exact: false,
        })
        const cachecontrol = screen.getByText('cachecontrol', {
            exact: false,
        })
        expect(name).toBeDefined()
        expect(atomicwrites).toBeDefined()
        expect(cachecontrol).toBeDefined()

        const warning = screen.queryByText(
            'Currently supported poetry.lock -file version is 1.1',
            {
                exact: false,
            }
        )
        expect(warning).toBeNull()

        const tree = renderer
            .create(
                <PackageListWrapper url="/packages" preloadedState={packages} />
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    test('PackageList shows nothing if idle', () => {
        packages.packages.status = 'idle'
        render(<PackageListWrapper url="/packages" preloadedState={packages} />)

        const name = screen.queryByText('Packages:', {
            exact: false,
        })
        expect(name).toBeNull()

        const tree = renderer
            .create(
                <PackageListWrapper url="/packages" preloadedState={packages} />
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    test('PackageList shows loading', () => {
        packages.packages.status = 'loading'
        render(<PackageListWrapper url="/packages" preloadedState={packages} />)

        const name = screen.getByText('Packages:', {
            exact: false,
        })
        const loading = screen.getByText('Loading...', {
            exact: false,
        })

        expect(name).toBeDefined()
        expect(loading).toBeDefined()

        const tree = renderer
            .create(
                <PackageListWrapper url="/packages" preloadedState={packages} />
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    test('PackageList shows error', () => {
        packages.packages.status = 'failed'
        render(<PackageListWrapper url="/packages" preloadedState={packages} />)

        const name = screen.getByText('Packages:', {
            exact: false,
        })
        const error = screen.getByText('Error while parsing packages.', {
            exact: false,
        })

        expect(name).toBeDefined()
        expect(error).toBeDefined()

        const tree = renderer
            .create(
                <PackageListWrapper url="/packages" preloadedState={packages} />
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    test('PackageList not shows warning if lockVersion undefined', () => {
        packages.packages.status = 'succeeded'
        packages.packages.lockVersion = undefined
        render(<PackageListWrapper url="/packages" preloadedState={packages} />)

        const warning = screen.queryByText(
            'Currently supported poetry.lock -file version is 1.1',
            {
                exact: false,
            }
        )
        expect(warning).toBeNull()

        const tree = renderer
            .create(
                <PackageListWrapper url="/packages" preloadedState={packages} />
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    test('PackageList shows warning if not lockVersion 1.1', () => {
        packages.packages.status = 'succeeded'
        packages.packages.lockVersion = '1.0'
        render(<PackageListWrapper url="/packages" preloadedState={packages} />)

        const warning = screen.getByText(
            'Currently supported poetry.lock -file version is 1.1, other versions might have errors in parsing.',
            {
                exact: false,
            }
        )
        expect(warning).toBeDefined()

        const tree = renderer
            .create(
                <PackageListWrapper url="/packages" preloadedState={packages} />
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})
