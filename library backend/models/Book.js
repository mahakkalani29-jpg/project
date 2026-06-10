// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true
    },
    isbn: {
        type: String,
        required: [true, 'ISBN number is required'],
        unique: true,
        trim: true
    },
    publishedYear: {
        type: Number,
        required: [true, 'Published year is required']
    },
    genre: {
        type: String,
        trim: true
    },
    availableCopies: {
        type: Number,
        required: [true, 'Available copies quantity is required'],
        min: [0, 'Available copies cannot be negative'],
        default: 1
    }
}, {
    timestamps: true // Automatically creates createdAt and updatedAt fields
});

module.exports = mongoose.model('Book', bookSchema);