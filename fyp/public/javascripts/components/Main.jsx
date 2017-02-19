import React from 'react';

import AppHeader from './AppHeader';
import AppBody from './AppBody';

class Main extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return(
			<div>
				<AppHeader />
				<AppBody />
			</div>
		);
	}
}

export default Main;