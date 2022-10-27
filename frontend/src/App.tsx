import React from 'react';
import { Counter } from './features/counter/Counter';
import LoginPage from "./views/LoginPage";
import './App.css';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from "react-router-dom";



function App() {
	return (
		<div className="App">

			<Router>
				<header>
					<nav>
						<ul>
							<li>
								<Link to="/">Login</Link>
							</li>
							<li>
								<Link to="/about">About</Link>
							</li>
							<li>
								<Link to="/users">Users</Link>
							</li>
						</ul>
					</nav>
				</header>


				<main>
					<Routes>
						<Route path="/about" element={<About />} />

						<Route path="/users" element={<Users />} />

						<Route path="/" element={<LoginPage />} />
					</Routes>
				</main>


			</Router>
		</div>
	);
}

function About() {
	return <h2>About</h2>;
}

function Users() {
	return <Counter />;
}


export default App;
