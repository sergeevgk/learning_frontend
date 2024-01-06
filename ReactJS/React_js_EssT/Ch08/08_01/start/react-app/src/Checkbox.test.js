import { fireEvent, render } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

test("Selecting the checkbox should change the value of checked to true", () => {
	const { getByLabelText } = render(<Checkbox />);
	const checkbox = getByLabelText(/unchecked/i);

	fireEvent.click(checkbox);
	expect(checkbox.checked).toEqual(true);
});
