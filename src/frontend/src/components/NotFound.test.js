/* eslint-disable react/prop-types */
import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import NotFound from './NotFound'

describe('NotFound', () => {
    test('NotFound renderes correctly', () => {
        render(<NotFound />)

        const title = screen.getByText('404 NOT FOUND', {
            exact: false,
        })
        const info = screen.getByText(
            'Our pear eating robots was too lazy and could not catch page behind given url.',
            {
                exact: false,
            }
        )
        expect(title).toBeDefined()
        expect(info).toBeDefined()

        const tree = renderer.create(<NotFound />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
