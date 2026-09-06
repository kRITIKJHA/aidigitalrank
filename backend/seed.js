// This is a ONE-TIME SCRIPT — not part of the running server.
// Run it manually whenever you want to (re)populate the database with
// sample blog posts: `node seed.js`
//
// This is a common pattern in real projects: a small standalone script
// that sets up initial data, separate from the actual server code.

require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');

const samplePosts = [
  {
    title: "Why \"good ROAS\" doesn't always mean a profitable campaign",
    excerpt: 'A look at how COD, returns and discounts quietly eat into a ROAS number that looks great on the surface.',
  },
  {
    title: 'The real difference between Meta-reported and Shopify-reported sales',
    excerpt: 'What attribution windows actually measure, and why the two numbers rarely match exactly.',
  },
  {
    title: 'A simple framework for testing ad creative without wasting budget',
    excerpt: 'How to structure creative tests so you learn something from every rupee spent, win or lose.',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB ✅');

    // Remove any existing posts first, so re-running this script doesn't
    // create duplicates every time.
    await Post.deleteMany({});
    console.log('Cleared existing posts.');

    await Post.insertMany(samplePosts);
    console.log(`Inserted ${samplePosts.length} sample posts.`);

    process.exit(0); // Exit the script — this isn't a server, it shouldn't keep running
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();