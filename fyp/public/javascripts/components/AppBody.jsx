import React from 'react';

import { Card, CardHeader, CardMedia, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';
import Divider from 'material-ui/Divider';

import RTChart from 'react-rt-chart';

class AppBody extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expandedHumidity: false,
			expandedTemparature: false,
			expandedBrightness: false,
			
			humidity: 0,
			temperature: 0,
			brightness: 0,

			loadLightValue: 0,
		};
	}

	// handleToggle = (event, isChecked) => {
	// 	if (isChecked)
	// 		socket.emit('turn-on-loadLight');
	// 	else
	// 		socket.emit('turn-off-loadLight');
	// };

	handleSliderChange = (event, newValue) => {
		socket.emit('loadLight-value-change', `loadLight:${newValue}`);
	};

	updateReadings(readings) {
		this.setState({
			humidity: readings.humidity,
			temperature: readings.temperature,
			brightness: readings.brightness,

			loadLightValue: readings.loadLightValue,
		});
	}

	componentWillMount() {
		socket.on('readings', (readings) => {
			// console.log(readings);
			this.updateReadings(readings);
		});
		this.forceUpdate();
	}

	render() {
		const dataArray = [
			{
				sensor: "DHT11",
				quantity: "Humidity",
				unit: "%",
				currentReading: this.state.humidity,
				expanded: this.state.expandedHumidity,
				expand: (expanded) => this.setState({expandedHumidity: !this.state.expandedHumidity}),
			},
			{
				sensor: "DHT11",
				quantity: "Temperature",
				unit: "℃",
				currentReading: this.state.temperature,
				expanded: this.state.expandedTemparature,
				expand: (expanded) => this.setState({expandedTemparature: !this.state.expandedTemparature}),
			},
			{
				sensor: "LDR",
				quantity: "Brightness",
				unit: "%",
				currentReading: this.state.brightness,
				load: "Load Light",
				loadValue: this.state.loadLightValue,
				expanded: this.state.expandedBrightness,
				expand: (expanded) => this.setState({expandedBrightness: !this.state.expandedBrightness}),
			}
		];
		return (

			<div style={{margin: 'auto', marginTop: 20}} >
				{dataArray.map((obj, index) => (
					<Card style={{width: '96%', margin: 'auto', marginTop: 8}} key={index} expanded={obj.expanded} onExpandChange={() => obj.expand(obj.expanded)}>
						<CardHeader
							title={obj.sensor}
							subtitle={obj.quantity}
							actAsExpander={true}
							showExpandableButton={true}
						 />
						 <Divider />
				 		<CardMedia
				 			expandable={true}
				 			overlay={<CardTitle title={`Current ${obj.quantity}: ${obj.currentReading} ${obj.unit}`} subtitle={""} />}
				 		>
				 			<RTChart
				 				flow={{duration: 5000}}
				 				maxValues={12} 
				 				fields={[obj.quantity]}
				 				data={
				 					{
				 						date: new Date(),
				 						[obj.quantity]: obj.currentReading,
				 					}
				 				}
				 			/>
				 		</CardMedia>
				 		{ obj.load ?
				 		(<CardActions expandable={true}>
				 			{/*<Toggle 
				 				label={`Toggle ${obj.load}`}
				 				defaultToggled={obj.loadStatus ? true : false}
				 				onToggle={ this.handleToggle }
				 			/>*/}
				 			<Slider 
				 				min={0}
				 				max={255}
				 				step={1}
				 				value={obj.loadValue}
				 				onChange={this.handleSliderChange}
				 			/>
				 		</CardActions>)
				 		: null }
					</Card>
				))}
			</div>

		);
	}
}

export default AppBody;



