const express = require('express');
const bodyParser = require('body-parser');
const EHRNode = require('./ehrNode'); 

const port = 18070+Math.floor(Math.random()*30);
console.log('starting node on ', port)
let ehrNode = new EHRNode(port);

ehrNode.init();

const http_port = 3000+Math.floor(Math.random()*10);

let EHRHTTP = function (){
	const app = new express();

	app.use(bodyParser.json());

	app.get('/add-peer/:host/:port', (req, res)=>{
		console.log('add host: <'+req.params.host + ':' + req.params.port + '>');
		ehrNode.addPeer(req.params.host, req.params.port)
		res.send();
	})

	app.post('/add-ehr-block', (req, res)=>{
		let newBlock = ehrNode.createBlock(req.body.data);
		console.log('block created');
		res.send(newBlock);
	})

	app.get('/get-ehr-chain', (req, res)=>{
		res.send(ehrNode.getChain());
	})

	app.listen(http_port, () => {
		console.log(`http server up.. ${http_port}`);
	})
}

let httpserver = new EHRHTTP();

