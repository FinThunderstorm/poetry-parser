/* eslint-disable react/prop-types */
import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { MemoryRouter, Route, Routes } from 'react-router-dom'
import MainMenu from './MainMenu'

describe('MainMenu', () => {
    const MainMenuWrapper = ({ url }) => (
        <MemoryRouter initialEntries={[url]}>
            <Routes>
                <Route path="/" element={<MainMenu />} />
            </Routes>
        </MemoryRouter>
    )

    test('MainMenu renderes correctly', () => {
        render(<MainMenuWrapper url="/" />)

        const title = screen.getByText('poetry-parser', {
            exact: false,
        })
        const home = screen.getByText('home', {
            exact: false,
        })
        const upload = screen.getByText('upload', {
            exact: false,
        })
        expect(title).toBeDefined()
        expect(home).toBeDefined()
        expect(upload).toBeDefined()

        const tree = renderer.create(<MainMenuWrapper url="/" />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
