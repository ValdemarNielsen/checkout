import React from "react";
import DiscountBox from "../src/assets/components/discountCodeBox";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

describe("DiscountBox", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should apply the discount when a valid code is entered and 'Apply' is clicked", async () => {
    const handleApplyDiscount = vi.fn();

    render(<DiscountBox onApply={handleApplyDiscount} />);

    const codeInput = screen.getByPlaceholderText("DISCOUNT HERE");
    const applyButton = screen.getByRole("button", { name: "APPLY" });

    fireEvent.change(codeInput, { target: { value: "10PERCENT" } });
    fireEvent.click(applyButton);

    expect(handleApplyDiscount).toHaveBeenCalledTimes(1);
    expect(handleApplyDiscount).toHaveBeenCalledWith("10PERCENT");
  });
});
