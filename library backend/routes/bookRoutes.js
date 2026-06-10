// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const validateBook = require('../middleware/validateBook');
const {
    getBooks,
    createBook,
    updateBookComplete,
    updateBookPartial,
    deleteBook
} = require('../controllers/bookController');

// Clean REST API mapping
router.route('/')
    .get(getBooks)
    .post(validateBook, createBook);

router.route('/:id')
    .put(validateBook, updateBookComplete)
    .patch(updateBookPartial)
    .delete(deleteBook);

module.exports = router;