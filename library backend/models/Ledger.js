// File: models/Ledger.js
const mongoose = require('mongoose');

const LedgerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true },
  bookTitle: { type: String, required: true },
  type: { type: String, required: true },
  age: String,
  date: String,
  dueDate: String,
  amount: Number,
  paymentMethod: String,
  paymentProvider: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', LedgerSchema);