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

    const PackageListWrapper = ({ url }) => {
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

    test('PackageList works with reverse dependencies (atomicwrites)', () => {
        render(<PackageListWrapper url="/packages" />)

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

        const tree = renderer
            .create(<PackageListWrapper url="/packages" />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})
