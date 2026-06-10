// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book'); // Double-check your model file path

// Synchronized with your exact frontend department tabs
const titles = ["Advanced Concepts in", "Fundamentals of", "Introduction to", "Principles of", "The World of", "Understanding", "Essays on", "Handbook of"];
const nouns = ["Quantum Mechanics", "Calculus & Algebra", "Organic Chemistry", "World History", "Data Structures", "Differential Equations", "Thermodynamics", "Linear Algebra"];
const authors = ["Dr. A. Khan", "Prof. J. Smith", "M. Ahmed", "Dr. R. Johnson", "S. Ali", "Prof. E. Garcia", "K. Patel", "L. Wilson"];

// Explicitly matching your frontend department filtering keys
const genres = ["Science", "Maths", "History", "Fiction", "Science", "Maths", "History", "Fiction"];

const sampleBooks = [];
for (let i = 1; i <= 510; i++) {
    const randomTitle = `${titles[i % titles.length]} ${nouns[(i * 2) % nouns.length]} (Ed. ${i % 5 + 1})`;
    const randomAuthor = authors[(i * 3) % authors.length];
    const randomGenre = genres[i % genres.length]; // This assigns exactly Science, Maths, History, or Fiction
    const randomYear = 2000 + (i % 27); 
    const randomCopies = (i % 10) + 1;
    
    sampleBooks.push({
        title: randomTitle,
        author: randomAuthor,
        isbn: `978${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        publishedYear: randomYear,
        genre: randomGenre,
        availableCopies: randomCopies,
        status: i % 3 === 0 ? 'Available' : i % 3 === 1 ? 'Borrowed' : 'Reserved'
    });
}

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/library_db')
  .then(async () => {
      console.log('🔄 Connected to MongoDB for re-seeding...');
      await Book.deleteMany({}); 
      console.log('🗑️ Old structural mismatch records cleared.');

      console.log('⏳ Inserting 500+ properly categorized books...');
      await Book.insertMany(sampleBooks);
      
      console.log(`✅ Success! Loaded ${sampleBooks.length} books with exact frontend department keys.`);
      mongoose.connection.close();
  })
  .catch(err => {
      console.error('❌ Reseeding failed:', err);
  });