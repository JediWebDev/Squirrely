
export interface ContentItem {
  id: string;
  title: string;
  type: 'webtoon' | 'video' | 'chapter' | 'image';
  thumbnail: string;
  isPremium: boolean;
  tokenCost?: number;
  author: string;
  category: string;
}

export interface Character {
  id: string;
  name: string;
  avatar: string;
  description: string;
  persona: string;
  greeting: string;
}

export interface UserProfile {
  username: string;
  tokens: number;
  isPremium: boolean;
  avatar: string;
  address?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
