const fs = require('fs');
const path = require('path');

// Your Google Gemini API Key
const API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${API_KEY}`;

const databasePath = path.join(__dirname, '../src/data/cat_foods.json');

const foodsToGenerate = [
  "Almonds", "Asparagus", "Bacon", "Bell Peppers", "Blackberries", "Broccoli", "Cabbage",
  "Cantaloupe", "Celery", "Cherries", "Cinnamon", "Coconut", "Corn", "Cranberries", "Cucumber",
  "Eggs", "Green Beans", "Honey", "Ice Cream", "Kiwi", "Lemon", "Mango", "Milk",
  "Mushrooms", "Oatmeal", "Oranges", "Peaches", "Pears", "Peas", "Pecans", "Pineapple",
  "Popcorn", "Pork", "Potatoes", "Raspberries", "Rice", "Shrimp", "Spinach", "Sweet Potatoes",
  "Turkey", "Walnuts", "Yogurt", "Zucchini", "Beef", "Cilantro", "Mint", "Parsley",
  "Basil", "Thyme", "Rosemary", "Oregano", "Ginger", "Nutmeg", "Paprika", "Turmeric",
  "Tuna", "Sardines", "Anchovies", "Cod", "Crab", "Lobster", "Mussels", "Oysters",
  "Tofu", "Lentils", "Chickpeas", "Black Beans", "Kidney Beans", "Pinto Beans", "Lima Beans",
  "Quinoa", "Barley", "Millet", "Couscous", "Pasta", "Noodles", "Spaghetti", "Macaroni",
  "Pretzels", "Crackers", "Graham Crackers", "Saltines", "Pita Bread", "Bagels", "Muffins",
  "Pancakes", "Waffles", "Cereal", "Granola", "PopTarts", "Marshmallows", "Jelly", "Jam"
];

async function generateFoodData(food, retries = 3) {
  const prompt = `You are an expert veterinary nutritionist. Analyze the human food: "${food}". Is it safe for a Cat to eat?
  Provide the response strictly as a raw JSON object (no markdown formatting, no backticks) with the following structure:
  {
    "slug": "can-cats-eat-${food.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
    "food": "${food}",
    "isSafe": true or false,
    "shortAnswer": "A 1-2 sentence quick answer.",
    "longExplanation": "A detailed 3-4 sentence explanation on why it is safe/unsafe and any specific considerations for Cats.",
    "servingSize": "Exact serving size for a Cat, or 'None' if toxic.",
    "risks": ["Risk 1", "Risk 2"],
    "benefits": ["Benefit 1", "Benefit 2"]
  }`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.1 }
        })
      });

      const data = await response.json();
      
      if (data.error) {
        console.error(`Attempt ${attempt}: API Error for ${food}: ${data.error.message}`);
        // If it's a 503 (High Demand) or 429 (Rate Limit), wait 10 seconds and retry
        if (data.error.code === 503 || data.error.code === 429) {
          console.log(`Waiting 10 seconds before retrying...`);
          await new Promise(r => setTimeout(r, 10000));
          continue; // Retry loop
        }
        return null; // Other fatal error
      }
      
      const rawText = data.candidates[0].content.parts[0].text;
      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
      
    } catch (error) {
      console.error(`Attempt ${attempt}: Parsing Error for ${food}:`, error.message || error);
      await new Promise(r => setTimeout(r, 5000));
    }
  }
  
  console.log(`❌ Failed to generate data for ${food} after ${retries} attempts. Skipping.`);
  return null;
}

async function runFactory() {
  console.log("🏭 Waking up the AI Factory with Auto-Retry Enabled...");
  
  let database = [];
  if (fs.existsSync(databasePath)) {
    database = JSON.parse(fs.readFileSync(databasePath));
  }

  for (const food of foodsToGenerate) {
    if (database.find(item => item.food.toLowerCase() === food.toLowerCase())) {
      console.log(`⏩ Skipping ${food} (Already exists in database)`);
      continue;
    }

    console.log(`🧠 AI is researching: ${food}...`);
    
    const foodData = await generateFoodData(food);
    
    if (foodData) {
      database.push(foodData);
      fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
      console.log(`✅ Added ${food} to the database! (Total Pages: ${database.length})`);
    }

    // Wait 4.5 seconds between successful calls to stay under limits
    await new Promise(r => setTimeout(r, 4500)); 
  }

  console.log(`\n🎉 Factory run complete! Database has ${database.length} foods.`);
}

runFactory();
