import "./App.css";
import { useState, useEffect } from "react";

const query = `query Query {
  countries {
    capital
    code
    languages {
      code
      name
      native
    }
    name
    emojiU
  }
}`;

const queryOptions = {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({ query }),
};

function RenderList({ data, renderItem, renderEmpty }) {
	return !data.length ? (
		renderEmpty
	) : (
		<ul>
			{data.map((item) => (
				<li key={item.name}>{renderItem(item)}</li>
			))}
		</ul>
	);
}

function RenderCountryItem({ name, capital, emojiU, languages }) {
	const languageList = languages.map((l) => (
		<li>
			{l.code} | {l.name}-{l.native}
		</li>
	));

	const emojiCodes = emojiU
		.split(" ")
		.map((s) => parseInt(s.substring(2), 16));

	return (
		<>
			<h1>
				{name} {String.fromCodePoint(emojiCodes[0], emojiCodes[1])}
			</h1>
			<p>Capital is {capital}</p>
			<ul>{languageList}</ul>
		</>
	);
}

function App() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch(`https://countries.trevorblades.com/graphql/`, queryOptions)
			.then((response) => response.json())
			.then(setData)
			.then(() => setLoading(false))
			.catch(setError);
	}, []);

	if (loading) {
		return <h1>Loading</h1>;
	}
	if (error) {
		return <pre>{JSON.stringify(error)}</pre>;
	}
	if (!data) {
		return null;
	}

	return (
		<div>
			<RenderList
				data={data.data.countries}
				renderEmpty={<p>No data to display in the list.</p>}
				renderItem={RenderCountryItem}
			/>
		</div>
	);
}

export default App;
