import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!apiKey || apiKey === 'your_api_key_here') {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server. Please add your key to server/.env' });
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using gemini-flash-latest to ensure we always have the most current standard chat model available
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const result = await model.generateContent(message);
    const responseText = result.response.text();

    res.json({ reply: responseText });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ 
      error: 'API Error: ' + (error.message || 'Failed to generate a response from the AI model.') 
    });
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
