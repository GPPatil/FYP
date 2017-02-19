const SerialPort = require('serialport');
const request = require('request');


const requestOptions = {
	method: 'post',
	json: true,
	url: 'http://localhost:3000/'
};


const port = new SerialPort('COM7', {baudRate: 9600, parser: SerialPort.parsers.readline('\r\n')}, (err) => {
	if (err)
		return console.log(`Error in opening port: ${err}`);
	console.log("Port Opened !!!");
});

port.on('data', (data) => {
	// console.log(`Data: ${data}`);

	let dataArr = data.split(',');
	dataArr = dataArr.map((item, index) => {
		let itemArr = item.split(':');
		return {
			[itemArr[0]]: parseFloat(itemArr[1])
		};
	});

	let dataObj = dataArr.reduce((result, currentObj) => {
		for (let key in currentObj) {
			if (currentObj.hasOwnProperty(key)) {
				result[key] = currentObj[key];
			}
		}
		return result;
	}, {});

	// console.log(dataObj);

	const payLoad ={
		'readings': dataObj
	};

	requestOptions.body = payLoad;
	request(requestOptions, (err, res, body) => {
		if (err)
			console.log(`Error: ${err}`);
	});
});

module.exports = port;