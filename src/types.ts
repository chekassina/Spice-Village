/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'fr' | 'de';

export type Currency = 'USD' | 'EUR' | 'TZS';

export interface TourPackage {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  longDescription: Record<Language, string>;
  duration: Record<Language, string>;
  priceUSD: number;
  image: string;
  included: Record<Language, string[]>;
  highlights: Record<Language, string[]>;
}

export interface Booking {
  id: string;
  tourId: string;
  tourName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  date: string;
  guestsCount: number;
  totalCostUSD: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: Record<Language, string>;
  platform: 'Google' | 'TripAdvisor';
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  content: Record<Language, string>;
  date: string;
  image: string;
  author: string;
  category: string;
}
