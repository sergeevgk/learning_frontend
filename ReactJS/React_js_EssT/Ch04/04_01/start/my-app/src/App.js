import "./App.css";
import { useState } from "react";

function useInput(initialValue) {
	const [value, setValue] = useState(initialValue);
	return [
		{ value, onChange: (e) => setValue(e.target.value) },
		() => setValue(initialValue),
	];
}

function App() {
	const [{ value: title, onChange: setTitle }, resetTitle] = useInput("");
	const [colorProps, resetColor] = useInput("#000000");

	const submit = (e) => {
		e.preventDefault();
		alert(`${title} ${colorProps.value}`);
		resetTitle();
		resetColor();
	};

	return (
		<div className="App">
			<header className="App-header">
				<form className="App-container" onSubmit={submit}>
					<input
						className="App-item"
						type="text"
						placeholder="color title..."
						value={title}
						onChange={setTitle}
					/>
					<input
						{...colorProps}
						className="App-item"
						type="color"
					></input>
					<button className="App-item">ADD</button>
				</form>
			</header>
		</div>
	);
}

export default App;
