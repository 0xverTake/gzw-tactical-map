# Gray Zone Warfare Website

Site web communautaire pour Gray Zone Warfare avec carte interactive, assistant IA et forum.

## Installation

```bash
npm install --legacy-peer-deps
```

## Configuration

1. Copiez le fichier `.env.example` en `.env` et ajoutez votre clé API OpenAI :
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## Structure des assets

Le site nécessite les fichiers suivants dans le dossier `public` :

### Images (/public/images/)
- `logo.png` - Logo GZW
- `background-poster.jpg` - Image de fond (fallback pour la vidéo)

### Vidéos (/public/videos/)
- `tactical-background.mp4` - Vidéo de fond du site

### Marqueurs de carte (/public/markers/)
- `loot.png` - Icône pour les points de butin
- `spawn.png` - Icône pour les points d'apparition
- `extract.png` - Icône pour les points d'extraction
- `danger.png` - Icône pour les zones dangereuses

## Développement

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Technologies utilisées

- React 18
- TypeScript
- Vite
- Framer Motion
- Leaflet
- Zustand
- TailwindCSS
