import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Anthropic } from '@anthropic-ai/sdk';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body as { messages: Message[] };

    const response = await anthropic.beta.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      system: 'You are a helpful assistant that only answers questions about Gray Zone Warfare game. If the question is not related to the game, politely decline to answer and explain that you only discuss Gray Zone Warfare topics.',
      messages: messages.map((msg: Message) => ({
        role: msg.role,
        content: msg.content
      })),
    });

    res.json({ message: response.content[0].text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
