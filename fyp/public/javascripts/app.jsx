import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Main from './components/Main';

import injectTapEventPlugin from 'react-tap-event-plugin';



injectTapEventPlugin();

class App extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
			<MuiThemeProvider>
				<Main />
			</MuiThemeProvider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app-container'));