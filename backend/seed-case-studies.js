// One-time script to populate sample case studies.
// Run with: node seed-case-studies.js
//
// ⚠️ These are PLACEHOLDER case studies with made-up numbers — clearly
// marked so you remember to replace them with real client results once
// you have them. Never publish fabricated results as if they were real.

require('dotenv').config();
const mongoose = require('mongoose');
const CaseStudy = require('./models/CaseStudy');

const sampleCaseStudies = [
  {
    title: 'Cutting CPA while scaling ad spend 3x',
    industry: 'D2C Skincare Brand',
    challenge: 'Ad spend was increasing month over month, but CPA was climbing right along with it — growth was happening, but margins were shrinking.',
    solution: 'Rebuilt the campaign structure around Advantage+ testing, killed underperforming creative fast, and moved budget toward the audiences actually converting.',
    result: 'CPA reduced by ~30% within 60 days, while spend was scaled 3x. (Placeholder numbers — replace with real results.)',
  },
  {
    title: 'Fixing a tracking setup that was hiding real performance',
    industry: 'Health Supplement Brand',
    challenge: "Meta's reported ROAS looked strong, but Shopify revenue didn't match up — the brand couldn't tell what was actually working.",
    solution: 'Audited the pixel and Conversions API setup, fixed duplicate and missing events, and reconciled Meta numbers against Shopify data weekly.',
    result: 'Uncovered that true ROAS was meaningfully lower than reported, allowing budget to be reallocated toward what was actually profitable. (Placeholder — replace with real results.)',
  },
  {
    title: 'A landing page rebuild that lifted conversion rate',
    industry: 'Fashion Retailer',
    challenge: 'Paid traffic was healthy, but the existing landing page was slow and unclear, and a lot of that traffic was leaving without converting.',
    solution: 'Rebuilt the landing page around a single clear offer, improved load speed, and simplified the checkout path.',
    result: 'Conversion rate improved noticeably within the first month, with no increase in ad spend. (Placeholder — replace with real results.)',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB ✅');

    await CaseStudy.deleteMany({});
    console.log('Cleared existing case studies.');

    await CaseStudy.insertMany(sampleCaseStudies);
    console.log(`Inserted ${sampleCaseStudies.length} sample case studies.`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();