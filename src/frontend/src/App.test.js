import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import App from './App'

test('test', () => {
    render(<App />)

    const element = screen.getByText('and save to reload', { exact: false })
    expect(element).toBeDefined()
})

it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
})
