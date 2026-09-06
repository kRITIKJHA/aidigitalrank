const mongoose = require('mongoose');

// This is the SCHEMA — the blueprint. It describes exactly what a
// "contact form submission" looks like in our database: which fields
// exist, what type each one is, and which are required.
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now, // Automatically records when this entry was created
  },
});

// This is the MODEL — the tool built from the schema that we'll actually
// use in our code to create, find, and manage contact entries.
// mongoose.model(name, schema) — the name "Contact" also tells MongoDB
// to store these in a collection called "contacts" (it lowercases and
// pluralizes automatically).
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;