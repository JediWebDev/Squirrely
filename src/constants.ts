
import { ContentItem, Character } from './types';

export const COLORS = {
  primary: '#FF85A2', // Pink from logo
  secondary: '#FFF3B0', // Cream from logo
  accent: '#7CD9FF', // Light blue from leaf in logo
  dark: '#2D1D1D', // Dark brown/black for text
  surface: '#FFFFFF',
  muted: '#F8F1F1',
};

export const CHARACTERS: Character[] = [
  {
    id: 'squirrely',
    name: 'Squirrely',
    avatar: 'https://ais-dev-ghjmljshajhzwtmcdgxtia-230501536890.us-east1.run.app/image_1.png',
    description: 'Vlogger & Dark Romance Novelist',
    persona: 'Playful, slightly mysterious, dark romance obsessed.',
    greeting: "Hey there! Ready to dive into a new chapter of mystery with me? ✨",
  },
  {
    id: 'mika',
    name: 'Mika',
    avatar: 'https://ais-dev-ghjmljshajhzwtmcdgxtia-230501536890.us-east1.run.app/image_4.png',
    description: 'Professional Cosplayer & Gamer',
    persona: 'Energetic, competitive, love for retro aesthetic.',
    greeting: "GG! Did you come to see my latest costume or are we queuing for a match? 🎮",
  },
  {
    id: 'elara',
    name: 'Elara',
    avatar: 'https://ais-dev-ghjmljshajhzwtmcdgxtia-230501536890.us-east1.run.app/image_5.png',
    description: 'Cyberpunk Investigator',
    persona: 'Stoic, analytical, has a hidden soft side for vintage tech.',
    greeting: "Data indicates we need to talk. Are you here to help with the investigation? 💾",
  }
];

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: 'vlog-1',
    title: 'A Day in the Life of a Dark Romance Author',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000',
    isPremium: true,
    tokenCost: 50,
    author: 'Squirrely',
    category: 'Vlog',
  },
  {
    id: 'img-1',
    title: 'Squirrely: Summer Reading Pinup',
    type: 'image',
    thumbnail: 'https://ais-dev-ghjmljshajhzwtmcdgxtia-230501536890.us-east1.run.app/image_3.png',
    isPremium: true,
    tokenCost: 30,
    author: 'Squirrely',
    category: 'Poster',
  },
  {
    id: 'wt-1',
    title: 'Tangled Silk Hearts',
    type: 'webtoon',
    thumbnail: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1000',
    isPremium: false,
    author: 'Anime Studio',
    category: 'Romance',
  },
  {
    id: 'img-2',
    title: 'Mika: Arcane Archer',
    type: 'image',
    thumbnail: 'https://ais-dev-ghjmljshajhzwtmcdgxtia-230501536890.us-east1.run.app/image_4.png',
    isPremium: false,
    author: 'Mika',
    category: 'Poster',
  },
  {
    id: 'chapter-1',
    title: 'Shadows of Desire: Chapter 1',
    type: 'chapter',
    thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000',
    isPremium: true,
    tokenCost: 20,
    author: 'Squirrely',
    category: 'Novel',
  },
  {
    id: 'vlog-2',
    title: 'Sunset Beach Thoughts',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000',
    isPremium: true,
    tokenCost: 50,
    author: 'Squirrely',
    category: 'Vlog',
  },
];
