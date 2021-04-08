require('dotenv').config();
const path = require('path');
const express = require('express');

const server = express();

server.use(express.json());
server.use(express.static(path.join(__dirname, 'client/build'))); //building absolute path regardless of machine

if (process.env.NODE_ENV === 'development') {
	//on Heroku, an env variable is called "NODE_ENV" -> 'production'
	const cors = require('cors');
	server.use(cors());
}

server.get('/api/hello', (req, res) => {
	res.json({ message: 'hello boyyyy' });
});

//CATCH ALL ENDPOINT THAT SENDS BACK index.html
server.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`);
});
