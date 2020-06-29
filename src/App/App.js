import React from "react";
import Meme from "../Meme/Meme";
import GeneratedMeme from "../GeneratedMeme/GeneratedMeme";
import {Switch, Route} from "react-router-dom";

const App = () => {
	return (
		<div>
			<h1>Meme Generator</h1>
			<Switch>
				<Route exact path='/'>
					<Meme />
				</Route>
				<Route path='/generated'>
					<GeneratedMeme />
				</Route>
			</Switch>
		</div>
	);
};

export default App;

/*
- anytime the user is at the base path,'/', they will get the <Meme /> component
- without exact, the Meme component will always display

*/
