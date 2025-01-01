import Anthropic from '@anthropic-ai/sdk';
import config from '../../config.json';

const anthropic = new Anthropic({
  apiKey: config.ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
});

const WELCOME_MESSAGE = `Bienvenue sur le GZW Tactical Map ! Je suis votre assistant IA spécialisé dans Gray Zone Warfare.
Je suis là pour vous aider avec toutes vos questions concernant le jeu, les tactiques, les mécaniques et les stratégies.
N'hésitez pas à me poser des questions sur :
- Les mécaniques de jeu
- Les meilleures tactiques
- Les points d'extraction
- Les zones de la carte
- L'équipement et le loot
- Les stratégies de survie

Comment puis-je vous aider aujourd'hui ?`;

const SYSTEM_CONTEXT = `Tu es un expert du jeu Gray Zone Warfare, un jeu de tir tactique hardcore et réaliste. 
Tu dois uniquement répondre aux questions concernant ce jeu. Si une question ne concerne pas Gray Zone Warfare, 
rappelle poliment que tu es uniquement là pour parler de GZW.

Informations importantes sur le jeu :
- C'est un jeu de tir tactique hardcore et réaliste
- Développé par MADFINGER Games
- Le jeu se déroule dans la région fictive de Lamang
- Propose des combats PvPvE intenses
- Met l'accent sur le réalisme et la survie
- Inclut des mécaniques de progression et de loot
- Propose différentes cartes avec des points d'extraction

Réponds toujours de manière concise et précise, en te concentrant sur les aspects tactiques et pratiques du jeu.`;

export async function sendMessageToClaude(message: string): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: SYSTEM_CONTEXT + "\n\nUtilisateur: " + message,
        }
      ],
    });

    if (response.content[0].type === 'text') {
      return response.content[0].text;
    }
    
    return "Désolé, je n'ai pas pu générer une réponse textuelle.";
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

export function getWelcomeMessage(): string {
  return WELCOME_MESSAGE;
}
