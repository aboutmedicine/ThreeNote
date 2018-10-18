const mongoose = require('mongoose');

// Note Schema
const noteSchema = mongoose.Schema({
    title: {
        type: String,
    },
    contents: {
        type: String,
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

const Note = module.exports = mongoose.model('Note', noteSchema);

// Get Notes
module.exports.getNotes = (callback, limit) => {
    Note.find(callback).limit(limit);
}

// Get Note
module.exports.getNoteById = (id, callback) => {
    Note.findById(id, callback);
}

// Add Note
module.exports.addNote = (note, callback) => {
    Note.create(note, callback);
}

// Update Note
module.exports.updateNote = (id, note, options, callback) => {
    var query = {
        _id: id
    };
    var update = {
        title: note.title,
        contents: note.contents,
    }
    Note.findOneAndUpdate(query, update, options, callback);
}

// Delete Note
module.exports.removeNote = (id, callback) => {
    var query = {
        _id: id
    };
    Note.remove(query, callback);
}
