// middleware/validateBook.js
const validateBook = (req, res, next) => {
    try {
        const { title, author, isbn, publishedYear, availableCopies } = req.body;

        if (req.method === 'POST' || req.method === 'PUT') {
            if (!title || !author || !isbn || !publishedYear || availableCopies === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid input data"
                });
            }
        }

        next(); // CRITICAL: This passes the request to the controller
    } catch (error) {
        console.error("MIDDLEWARE ERROR:", error);
        return res.status(400).json({ success: false, message: "Invalid input data" });
    }
};

module.exports = validateBook;