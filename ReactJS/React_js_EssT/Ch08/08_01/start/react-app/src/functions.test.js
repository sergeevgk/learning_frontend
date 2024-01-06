import { timesTwo } from "./functions.js";

test("Multiplies by two", () => {
	expect(timesTwo(2)).toBe(4);
});
