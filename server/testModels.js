import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("No API key");
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
      const models = data.models ? data.models.map(m => m.name) : data;
      console.log("AVAILABLE MODELS:", JSON.stringify(models, null, 2));
  })
  .catch(console.error);
