import { describe, it, expect } from "vitest";
import App from "../src/App";
import { render, screen } from "@testing-library/react";


describe(App.name, () => {
    it("It should display the correct initial total price", () => {
        render(<App />);
        expect(screen.findByText("791.10")).not.toBeNull();
    });

    it("It should display the correct price of the first basket item", () => {
        render(<App />);
        expect(screen.findByText("150")).not.toBeNull();
    });

    it("It should display the correct price of the second basket item", () => {
        render(<App />);
        expect(screen.findByText("170")).toBeDefined();

    });

});



