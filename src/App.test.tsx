import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { render, screen } from '@testing-library/react';

test('renders learn react link', () => {
    render(<App />);

    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

describe('divide function', () => {
    describe('when given to integers', () => {
        it('should return a division result', () => {
            // ...

            it("should return a division result", () => {
                // Arrange: prepare function arguments
                // and the expected division result.
                // In this example 10 / 2 === 5:
                const [a, b, expected] = [10, 2, 5];

                // Here we use array destructuring
                // to assing `a === 10`, `b === 2`,
                // and `expected === 5`.

                // Act: use the `divide` function
                // to get an actual function result.
     //          const result = divide(a,b);
                // Assert: compare expected result
                // with a function result.
         //       expect(result).toEqual(expected);
            });

        })
    })
})