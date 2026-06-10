
require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const Ledger = require('./models/Ledger');
const app = express();
// server.js mein ye line honi chahiye:
// server.js mein ye change karein
app.use('/api/ledger', require('./routes/transictionroutes'));
// Middlewares (Sirf ek ek baar)

// server.js mein
const cors = require('cors');

// Ye line use karein taake kisi bhi port se request aaye to allow ho
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use((req, res, next) => {
    console.log("🔥 REQUEST AAYI:", req.method, req.url);
    if(req.method === 'POST') console.log("DATA:", req.body);
    next();
});
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/library_db')
  .then(() => console.log('✅ MongoDB connected successfully.'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes Configuration
// (Yahan aapki purani routes files import hongi jo pehle se likhi thi, jaise niche hai)
const bookRoutes = require('./routes/bookRoutes'); // Apne route file ka sahi naam check kar lein
app.use('/api/books', bookRoutes);
// --- Ledger API Routes ---

app.post('/api/borrow', async (req, res) => {
    try {
        const newEntry = new Borrow(req.body); // Schema ka naam check karlo
        await newEntry.save();
        console.log("Borrow entry saved!");
        res.status(201).json({ success: true });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/ledger', async (req, res) => {
    try {
        const data = await Ledger.find().sort({ _id: -1 });
        res.json(data);
    } catch (err) {
        console.error("Ledger fetch error:", err);
        res.status(500).json({ error: 'Failed to fetch ledger' });
    }
});


// Apni Model file import karein (jo bhi aapka book model ka naam hai)
const Book = require('./models/Book'); 

async function checkData() {
    try {
        const count = await Book.countDocuments();
        console.log("--------------------------------------");
        console.log("Database mein mojood books ki tadaad:", count);
        console.log("--------------------------------------");
    } catch (err) {
        console.error("Check karne mein error aaya:", err);
    }
}

// Isay call karein
checkData();
app.use((req, res, next) => {
    console.log(`🚨 Incoming Request: ${req.method} ${req.url}`);
    next();
});
// -------------------------
// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is moving on port ${PORT}`);
});