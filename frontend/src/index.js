import React from 'react';
import ReactDOM from 'react-dom';
import Home from './component/Home';
import Top from './component/Top';
//import Login from './component/Login';
import NoMatch from './component/NoMatch';
import {Container} from 'semantic-ui-react';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<Container>
			<Top />
			<Switch>
				{/*<Route path="/" exact={true} component={Login} /> */}
				<Route path="/" exact={true} component={Home} />
				<Route component={NoMatch} />
			</Switch>
		</Container>
	</BrowserRouter>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
serviceWorker.register();
