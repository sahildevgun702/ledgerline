import { describe, expect, it } from "vitest";
import { formatCents, parseAmountToCents } from "../../src/domain/money";

describe("parseAmountToCents", () => {
  it.each([
    ["25", 2500],
    ["25.1", 2510],
    ["25.10", 2510],
    ["0.01", 1],
    ["0", 0],
    ["  7.50  ", 750],
    ["1000000", 100_000_000],
  ])("parses %j as %i cents", (input, expected) => {
    expect(parseAmountToCents(input)).toBe(expected);
  });

  it.each(["", "abc", "-5", "1.234", "1,000", "$5", "1e3", ".5", "5."])(
    "rejects %j",
    (input) => {
      expect(() => parseAmountToCents(input)).toThrow("Invalid amount");
    },
  );
});

describe("formatCents", () => {
  it.each([
    [0, "$0.00"],
    [1, "$0.01"],
    [2510, "$25.10"],
    [250_010, "$2,500.10"],
    [-500, "-$5.00"],
  ])("formats %i as %s", (cents, expected) => {
    expect(formatCents(cents)).toBe(expected);
  });

  it("refuses fractional cents", () => {
    expect(() => formatCents(10.5)).toThrow("whole number");
  });
});
