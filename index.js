const express = require('express');
const http = require('http')
const app = express()
const request = require("request");
const apiKey = "8ab24b02cb94b39ff36c41b8be1dc1f7";
const apiRoute = "http://api.openweathermap.org/data/2.5";
const captureIp = require('./captureIp')

async function location() {
	try {
		const data = await captureIp();
		return data;
	} catch (error) {
		console.log(error);
	}
}
app.get('/current', function(req, res) {
	if(req.query.city){
		request({
			url: `${apiRoute}/weather?q=${req.query.city}&APPID=${apiKey}`,
			json: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				res.send(body)
			}
		})
	}else{
		location().then((data) =>
			request({
				url: `${apiRoute}/weather?q=${data.city}&APPID=${apiKey}`,
				json: false
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					res.send(body)
				}
			}));

	}
});

app.get('/forecast', function(req, res) {
	if(req.query.city){
		request({
			url: `${apiRoute}/forecast?q=${req.query.city}&APPID=${apiKey}`,
			json: false
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				res.send(body)
			}
		})
	}else{
		location().then((data) =>
			request({
				url: `${apiRoute}/forecast?q=${data.city}&APPID=${apiKey}`,
				json: false
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					res.send(body)
				}
			}));
	}
});

app.get('/location', function(req, res) {
	location().then((data) => res.send(data));
});

app.get('/', function(req, res) {
	res.send("API Weather");
});


http.createServer(app).listen(3000, () => {
	console.log('Server started at http://localhost:3000');
});