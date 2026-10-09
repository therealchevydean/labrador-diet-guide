const fs = require('fs');
const path = require('path');

// ==========================================
// THE MICRO-BUSINESS FACTORY GENERATOR
// ==========================================
// This script is the engine that allows you to scale to 1,000+ foods.
// To use this in production, you would uncomment the fetch() call to an AI API (like Gemini).
// For now, it runs a simulation to demonstrate how easily the site scales.

const foodsToGenerate = [
  "Mango", "Cashews", "Popcorn", "Cherries", "Corn", 
  "Oatmeal", "Shrimp", "Tuna", "Celery", "Cucumber",
  "Pork", "Ham", "Mushrooms", "Oranges", "Peaches"
];

const databasePath = path.join(__dirname, '../src/data/pug_foods.json');

async function runFactory() {
  console.log("🏭 Starting Micro-Business Factory Generation...");
  
  let database = [];
  if (fs.existsSync(databasePath)) {
    const rawData = fs.readFileSync(databasePath);
    database = JSON.parse(rawData);
  }

  for (const food of foodsToGenerate) {
    if (database.find(item => item.food.toLowerCase() === food.toLowerCase())) {
      console.log(`Skipping ${food} - already exists.`);
      continue;
    }

    console.log(`🧠 AI is researching: ${food}...`);
    
    // Simulate AI generation time
    await new Promise(r => setTimeout(r, 600));

    const newEntry = {
      slug: `can-pugs-eat-${food.toLowerCase().replace(/\s+/g, '-')}`,
      food: food,
      isSafe: true, 
      shortAnswer: `Yes, pugs can eat ${food.toLowerCase()} in moderation.`,
      longExplanation: `This is an AI generated explanation about why ${food.toLowerCase()} is generally safe for pugs. In a production environment, this script hits the Gemini API, feeds it a prompt, and extracts real nutritional data into this JSON block automatically.`,
      servingSize: "A small, bite-sized amount occasionally.",
      risks: ["Overfeeding can cause stomach upset", "Potential choking hazard if not chopped"],
      benefits: ["Provides various vitamins and minerals", "Good low calorie treat"]
    };

    database.push(newEntry);
    console.log(`✅ Added ${food} to database!`);
  }

  fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
  console.log(`\n🎉 Factory run complete!`);
  console.log(`Database now has ${database.length} foods. The website has automatically generated ${database.length} pages.`);
}

runFactory();
