import React from 'react';
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'


let basicCounter
let increaseCount
let decreaseCount

beforeEach(() => {
    render(<div />)
    basicCounter = screen.getByRole('spinbutton')
    increaseCount = screen.getByRole('button', { name: '+' })
    decreaseCount = screen.getByRole('button', { name: '-' })
})
it('should render a counter with value of 1', () => {
    let basicCounter
    expect(basicCounter).toHaveValue(1)
})

