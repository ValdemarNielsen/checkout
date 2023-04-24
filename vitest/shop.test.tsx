import { describe, it, expect } from "vitest";

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });

  describe("Testing the shop", () => {
    it("should have a title", () => {
      expect(document.title);
    });

    it("should have a header", () => {
      expect(document.querySelector("header"));
    });

    it("should have a footer", () => {
      expect(document.querySelector("footer"));
    });
  });
});