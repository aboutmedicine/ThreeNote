const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Note =require('./models/note');

// Connect to Mongoose
mongoose.connect('mongodb://localhost');
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/notes');
});

app.get('/api/notes', (req, res) => {
	Note.getNotes((err, notes) => {
		if(err){
			throw err;
		}
		res.json(notes);
	});
});

app.get('/api/notes/:_id', (req, res) => {
	Note.getNoteById(req.params._id, (err, note) => {
		if(err){
			throw err;
		}
		res.json(note);
	});
});

app.post('/api/notes', (req, res) => {
	var note = req.body;
	Note.addNote(note, (err, note) => {
		if(err){
			throw err;
		}
		res.json(note);
	});
});

app.put('/api/notes/:_id', (req, res) => {
	var id = req.params._id;
	var note = req.body;
	Note.updateNote(id, note, {}, (err, note) => {
		if(err){
			throw err;
		}
		res.json(note);
	});
});

app.delete('/api/notes/:_id', (req, res) => {
	var id = req.params._id;
	Note.removeNote(id, (err, note) => {
		if(err){
			throw err;
		}
		res.json(note);
	});
});

// Heroku PORT

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

app.listen(3000);
console.log('Running on port 3000...');
