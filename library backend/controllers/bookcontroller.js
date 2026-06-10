// controllers/bookController.js
const Book = require('../models/Book');

// @desc    GET all books
// @route   GET /api/books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later"
        });
    }
};

// @desc    POST a new book
// @route   POST /api/books
const createBook = async (req, res) => {
    try {
        const { title, author, isbn, publishedYear, genre, availableCopies } = req.body;

        // Check if book with same ISBN exists
        const bookExists = await Book.findOne({ isbn });
        if (bookExists) {
            return res.status(400).json({ success: false, message: "Book with this ISBN already exists" });
        }

        const newBook = await Book.create({
            title, author, isbn, publishedYear, genre, availableCopies
        });

        return res.status(201).json({
            success: true,
            message: "Record created successfully",
            data: newBook
        });
    } catch (error) {
        // This line will print the exact database error directly into your VS Code terminal
        console.error("DATABASE SAVE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later"
        });
    }
};

// @desc    PUT update complete record
// @route   PUT /api/books/:id
const updateBookComplete = async (req, res) => {
    try {
        const { title, author, isbn, publishedYear, genre, availableCopies } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, isbn, publishedYear, genre, availableCopies },
            { new: true, runValidators: true } // returns the modified document & applies schema rules
        );

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Record not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Record updated successfully",
            data: updatedBook
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later"
        });
    }
};

// @desc    PATCH update partial record
// @route   PATCH /api/books/:id
const updateBookPartial = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Using $set to selectively update only passed keys
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Record not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Record updated partially",
            data: updatedBook
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later"
        });
    }
};

// @desc    DELETE a book
// @route   DELETE /api/books/:id
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Record not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Record deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later"
        });
    }
};

module.exports = {
    getBooks,
    createBook,
    updateBookComplete,
    updateBookPartial,
    deleteBook
};