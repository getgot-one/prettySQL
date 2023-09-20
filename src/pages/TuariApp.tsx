import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Store } from "tauri-plugin-store-api";

export default function TuariApp() {
	const [greetMsg, setGreetMsg] = useState("");
	// const [databases, setDatabases] = useState("");
	const [name, setName] = useState("");

	const store = new Store(".settings.dat");

	const initalial = async () => {
		const val = await store.get("databases");
		console.log("val", val);
	};

	useEffect(() => {
		// store.set("databases", { databases: 'luz222'});
		initalial();
		// await store.set("databases", { value: 5 });
		//  await store.save();
	}, []);
	async function greet() {
		// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
		setGreetMsg(await invoke("greet", { name }));
	}

	return (
		<div className="container">
			<h1>Welcome to Tauri!</h1>

			<div className="row">
				<a href="https://vitejs.dev" target="_blank">
					<img src="/vite.svg" className="logo vite" alt="Vite logo" />
				</a>
				<a href="https://tauri.app" target="_blank">
					<img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
				</a>
				<a href="https://reactjs.org" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>

			<p>Click on the Tauri, Vite, and React logos to learn more.</p>

			<form
				className="row"
				onSubmit={(e) => {
					e.preventDefault();
					greet();
				}}
			>
				<input
					id="greet-input"
					onChange={(e) => setName(e.currentTarget.value)}
					placeholder="Enter a name..."
				/>
				<button type="submit">Greet</button>
			</form>

			<p>{greetMsg}</p>
		</div>
	);
}
