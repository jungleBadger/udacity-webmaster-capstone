import React from 'react';
import { Counter } from './features/counter/Counter';
import LoginPage from "./views/LoginPage";
import SignupPage from "./views/SignupPage";
import './App.css';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Navigate
} from "react-router-dom";




import {
	performJWTRefresh, authorized, performLogin, performLogout
} from './features/login/loginSlice';

import {useAppDispatch, useAppSelector} from "./app/hooks";


export function App() {

	const dispatch = useAppDispatch();


	const isAuthorized: boolean = useAppSelector(authorized);


	return (
		<div className="App">

			<Router>
				<header>
					<nav className="App-header">
						<ul>



							{
								!isAuthorized &&
								<li>
									<Link to="/signup">Signup</Link>
								</li>
							}


							{
								!isAuthorized &&
								<li>
									<Link to="/login">Login</Link>
								</li>
							}




							{
								isAuthorized &&
								<li>
									<Link to="/feature">Protected feature</Link>
								</li>
							}

							{
								isAuthorized &&
								<li onClick={() => dispatch(performLogout())}>
									<span>Logout</span>
								</li>
							}
						</ul>
					</nav>
				</header>


				<main className={"wrapper"}>
					<Routes>

						{
							isAuthorized &&
							<Route path="/" element={<About />} />
						}

						{
							isAuthorized &&
							<Route path="/feature" element={<Users />} />
						}


						{
							!isAuthorized &&
							<Route path="/signup" element={<SignupPage />} />
						}

						{
							!isAuthorized &&
							<Route path="/login" element={<LoginPage />} />
						}

						<Route path="*" element={<Navigate to={isAuthorized ? "/feature" : "/login"} />} />

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
