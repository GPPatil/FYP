import React from 'react';

import AppBar from 'material-ui/AppBar';
import Badge from 'material-ui/Badge';
import FontIcon from 'material-ui/FontIcon';

const styles = {
	fontIcon: {
		color: 'white',
	},
};

class AppHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			usersOnline: 0
		};
	}

	userConnected(usersOnline) {
		this.setState({
			usersOnline: usersOnline
		});
	}

	userDisconnected(usersOnline) {
		this.setState({
			usersOnline: usersOnline
		});
	}

	componentWillMount() {
		socket.on('user-connected', (usersOnline) => {
			this.userConnected(usersOnline);
		});
		socket.on('user-disconnected', (usersOnline) => {
			this.userDisconnected(usersOnline);
		});
	}

	render() {
		return (
			<div>
				<AppBar 
					title="WSN"
					showMenuIconButton={false}
					iconElementLeft={<FontIcon className="fa fa-rocket" style={styles.fontIcon} />}
					iconElementRight={<Badge badgeContent={this.state.usersOnline} secondary={true}><FontIcon className="fa fa-user" style={styles.fontIcon} /></Badge>}
				/>
			</div>
		);
	}
}

export default AppHeader;