// Money is stored as whole cents (integers), never as dollars with decimals.
// 0.1 + 0.2 is 0.30000000000000004 in JavaScript, which is fine for physics
// and unacceptable for a bank balance.

const AMOUNT_PATTERN = /^\d+(\.\d{1,2})?$/;

/** Turns "25.10" into 2510. Throws on anything that isn't a plain, positive amount. */
export function parseAmountToCents(input: string): number {
  const trimmed = input.trim();
  if (!AMOUNT_PATTERN.test(trimmed)) {
    throw new Error(`Invalid amount: "${input}"`);
  }
  const [dollars, fraction = ""] = trimmed.split(".");
  const cents = Number(dollars) * 100 + Number(fraction.padEnd(2, "0"));
  if (!Number.isSafeInteger(cents)) {
    throw new Error(`Amount too large: "${input}"`);
  }
  return cents;
}

/** Turns 250010 into "$2,500.10" and -500 into "-$5.00". */
export function formatCents(cents: number): string {
  if (!Number.isInteger(cents)) {
    throw new Error(`Cents must be a whole number, got ${cents}`);
  }
  const sign = cents < 0 ? "-" : "";
  const absolute = Math.abs(cents);
  const dollars = Math.floor(absolute / 100).toLocaleString("en-US");
  const remainder = String(absolute % 100).padStart(2, "0");
  return `${sign}$${dollars}.${remainder}`;
}
