require('dotenv').config(); // Loads variables from .env into process.env

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Contact = require('./models/Contact'); // Our Contact model
const Post = require('./models/Post'); // Our Post model
const Newsletter = require('./models/Newsletter'); // Our Newsletter model

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middleware ----
app.use(cors());
app.use(express.json());

// ---- Connect to MongoDB ----
// process.env.MONGODB_URI reads the connection string from our .env file.
// We never write the actual string directly in this file — that's the
// whole point of keeping secrets in .env instead of in the code.
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB ✅');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

// ---- Routes ----

app.get('/', (req, res) => {
  res.send('Hello from the AIDigitalRank backend! 🚀');
});

// Note: this route is now `async` — saving to a database takes a little
// time, so we use `await` to pause until it's done before responding.
app.post('/api/contact', async (req, res) => {
  const { name, phone, email, service, message } = req.body;

  if (!name || !phone || !email || !service || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required.',
    });
  }

  try {
    // Contact.create() builds a new document from the Contact model
    // AND saves it to MongoDB in one step.
    const newContact = await Contact.create({ name, phone, email, service, message });

    console.log('Saved to database:', newContact);

    res.status(200).json({
      success: true,
      message: 'Thanks! We will get back to you shortly.',
    });
  } catch (err) {
    console.error('Error saving contact:', err.message);
    res.status(500).json({
      success: false,
      error: 'Something went wrong while saving your message. Please try again.',
    });
  }
});

// GET route — this one just reads and returns data, so no request body
// is needed, and it doesn't need to be async in a try/catch the same way
// a write operation does (though we still use async/await + try/catch
// here since talking to the database is always asynchronous).
app.get('/api/posts', async (req, res) => {
  try {
    // .sort({ createdAt: -1 }) means "newest first" (-1 = descending)
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error('Error fetching posts:', err.message);
    res.status(500).json({ success: false, error: 'Could not load posts.' });
  }
});

// CREATE a new post — used by the admin page.
// ⚠️ No authentication yet: anyone who knows this URL can call it.
// This is fine for local learning/testing, but must be locked down
// with real authentication before this site is ever made public.
app.post('/api/posts', async (req, res) => {
  const { title, excerpt } = req.body;

  if (!title || !excerpt) {
    return res.status(400).json({
      success: false,
      error: 'Title and excerpt are both required.',
    });
  }

  try {
    const newPost = await Post.create({ title, excerpt });
    res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    console.error('Error creating post:', err.message);
    res.status(500).json({ success: false, error: 'Could not create post.' });
  }
});

// DELETE a post by its ID — the ":id" part is a "route parameter":
// a placeholder that matches whatever appears in that position of the
// actual URL (e.g. /api/posts/68a1b2... becomes req.params.id).
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ success: false, error: 'Post not found.' });
    }

    res.status(200).json({ success: true, message: 'Post deleted.' });
  } catch (err) {
    console.error('Error deleting post:', err.message);
    res.status(500).json({ success: false, error: 'Could not delete post.' });
  }
});

// Newsletter signup — used by the footer form on every page.
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required.' });
  }

  try {
    await Newsletter.create({ email });
    res.status(201).json({ success: true, message: "Thanks! You're subscribed." });
  } catch (err) {
    // Error code 11000 = MongoDB's "duplicate key" error — meaning this
    // email already has a document with `unique: true`. We treat this
    // as a friendly success rather than an error, since from the user's
    // point of view, "you're already subscribed" isn't really a failure.
    if (err.code === 11000) {
      return res.status(200).json({ success: true, message: "You're already subscribed!" });
    }
    console.error('Error saving newsletter signup:', err.message);
    res.status(500).json({ success: false, error: 'Something went wrong. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});