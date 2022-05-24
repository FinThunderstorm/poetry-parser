/* eslint-disable react/prop-types */
import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import Dependencies from './Dependencies'

describe('Dependencies', () => {
    const DependenciesWrapper = ({ url, dependencies }) => (
        <MemoryRouter initialEntries={[url]}>
            <Routes>
                <Route path="/">
                    <Route path="packages">
                        <Route
                            path=":name"
                            element={
                                <Dependencies dependencies={dependencies} />
                            }
                        />
                    </Route>
                </Route>
            </Routes>
        </MemoryRouter>
    )

    test('Dependencies renderes correctly', () => {
        const dependencies = {
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
        }
        render(
            <DependenciesWrapper
                url="/packages/cachecontrol"
                dependencies={dependencies}
            />
        )

        const title = screen.getByText('Dependencies:', {
            exact: false,
        })
        const name = screen.getByText('Name', {
            exact: false,
        })
        const required = screen.getByText('Required', {
            exact: false,
        })
        const installed = screen.getByText('Installed', {
            exact: false,
        })
        const source = screen.getByText('Source', {
            exact: false,
        })
        const category = screen.getByText('Category', {
            exact: false,
        })
        expect(title).toBeDefined()
        expect(name).toBeDefined()
        expect(required).toBeDefined()
        expect(installed).toBeDefined()
        expect(source).toBeDefined()
        expect(category).toBeDefined()

        const lockfile = screen.getByText('lockfile', {
            exact: false,
        })
        const filecache = screen.getByText('filecache', {
            exact: false,
        })

        expect(lockfile).toBeDefined()
        expect(filecache).toBeDefined()

        const extras = screen.queryAllByText('extras', {
            exact: false,
        })
        expect(extras.length).toBe(2)

        const check = screen.queryAllByText('✅', {
            exact: false,
        })
        expect(check.length).toBe(5)
        const notCheck = screen.queryAllByText('❌', {
            exact: false,
        })
        expect(notCheck.length).toBe(3)

        const tree = renderer
            .create(
                <DependenciesWrapper
                    url="/packages/cachecontrol"
                    dependencies={dependencies}
                />
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})
