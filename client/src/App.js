import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
	return (
		<Router>
			<div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
					<li>
						<Link to="/dashboard">Dashboard</Link>
					</li>
				</ul>

				<hr />

				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;

const Home = () => {
	return (
		<div>
			<h2>Home</h2>
		</div>
	);
}

const About = () => {
	return (
		<div>
			<h2>About</h2>
		</div>
	);
}

const Dashboard = () => {
	return (
		<div>
			<h2>Dashboard</h2>
		</div>
	);
}
