// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE: backend/routes/transactionRoutes.js  (new file)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// transictionroutes.js (UPDATE THIS)
const express = require('express');
const router = express.Router();
// IMPORTANT: Yahan Transaction model use karein
const Transaction = require('../models/Ledger'); // Agar file ka naam Ledger.js hai to ye theek hai

router.post('/', async (req, res) => {
    try {
        console.log("Saving request body:", req.body);
        
        // Yahan new Transaction() use karein, Ledger nahi (ya model ka naam check karein)
        const newEntry = new Transaction({
            bookTitle: req.body.title || req.body.bookTitle,
            name: req.body.user || req.body.name,
            studentId: req.body.studentId,
            age: req.body.age,
            type: req.body.type,
            date: req.body.date,
            dueDate: req.body.dueDate,
            amount: req.body.amount,
            paymentMethod: req.body.paymentMethod,
            paymentProvider: req.body.paymentProvider
        });

        await newEntry.save();
        res.status(201).json({ success: true });
    } catch (err) {
        console.error("Save Error Details:", err);
        res.status(400).json({ error: err.message });
    }
});
// ... baki GET route waise hi rehne dein
// ── GET /api/transactions — Fetch all transactions ───────
router.get('/', async (req, res) => {
  try {
    const all = await Transaction.find().sort({ createdAt: -1 });
    res.json({ success: true, data: all });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// IN server.js — Add this ONE line after your bookRoutes line:
//
//   const transactionRoutes = require('./routes/transactionRoutes');
//   app.use('/api/transactions', transactionRoutes);
//
// That's it. Your server.js should look like:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/*
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/library_db')
  .then(() => console.log('✅ MongoDB connected successfully.'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

// ← ADD THESE TWO LINES:
const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
*/
