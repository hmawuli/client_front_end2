import type { Dispatch, SetStateAction } from 'react';

export interface Theme {
  name: string;
  className: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    'base-100': string;
    'text-primary': string;
  };
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface PageContent {
  logo: string;
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    imageUrl: string;
  };
  about: {
    title: string;
    text: string;
  };
  services: {
    title: string;
    items: ServiceItem[];
  };
  contact: {
    title: string;
    text: string;
    address: string;
    email: string;
    phone: string;
  };
}

export interface DailyAnalytics {
  date: string;
  views: number;
  unique: number;
  returning: number;
}

export type AnalyticsPeriod = 'daily' | 'weekly' | 'monthly';

export interface AnalyticsData {
  daily: DailyAnalytics[];
  weekly: DailyAnalytics[];
  monthly: DailyAnalytics[];
}

export interface PageContextType {
  content: PageContent;
  setContent: Dispatch<SetStateAction<PageContent>>;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isEditing: boolean;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}