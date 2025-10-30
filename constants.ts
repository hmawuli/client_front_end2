
import { Theme, PageContent, AnalyticsData } from './types';

export const THEMES: Theme[] = [
  { 
    name: 'Default', 
    className: 'theme-default',
    colors: { primary: '#4f46e5', secondary: '#0ea5e9', accent: '#10b981', 'base-100': '#ffffff', 'text-primary': '#111827' }
  },
  { 
    name: 'Dark', 
    className: 'theme-dark',
    colors: { primary: '#6366f1', secondary: '#38bdf8', accent: '#34d399', 'base-100': '#1f2937', 'text-primary': '#f9fafb' }
  },
  { 
    name: 'Corporate', 
    className: 'theme-corporate',
    colors: { primary: '#00529b', secondary: '#007bff', accent: '#28a745', 'base-100': '#ffffff', 'text-primary': '#212529' }
  },
  { 
    name: 'Retro', 
    className: 'theme-retro',
    colors: { primary: '#d97706', secondary: '#ef4444', accent: '#059669', 'base-100': '#fef3c7', 'text-primary': '#422006' }
  },
  { 
    name: 'Nature', 
    className: 'theme-nature',
    colors: { primary: '#047857', secondary: '#22c55e', accent: '#f59e0b', 'base-100': '#f0fdf4', 'text-primary': '#14532d' }
  },
];

export const INITIAL_PAGE_CONTENT: PageContent = {
  logo: 'WOW LOGBOOK',
  hero: {
    title: 'Unlock Your Potential',
    subtitle: 'A revolutionary platform to track progress and achieve your goals. Customizable, intuitive, and powerful.',
    cta: 'Get Started Now',
    imageUrl: 'https://picsum.photos/1200/800?random=1',
  },
  about: {
    title: 'About Our Mission',
    text: "We believe that tracking your journey is the first step towards mastery. Our platform provides the tools you need to visualize your progress, stay motivated, and connect with a community of like-minded individuals. Whether you're a professional, a student, or a hobbyist, we're here to support your growth.",
  },
  services: {
    title: 'Features We Offer',
    items: [
      {
        icon: 'ChartBar',
        title: 'Advanced Analytics',
        description: 'Gain deep insights into your performance with our comprehensive analytics dashboard.'
      },
      {
        icon: 'Pencil',
        title: 'Easy Customization',
        description: 'Tailor your pages to reflect your brand and style with our simple-to-use editor.'
      },
      {
        icon: 'Cloud',
        title: 'Cloud-Based',
        description: 'Access your data from anywhere, at any time. Secure, reliable, and always available.'
      }
    ]
  },
  contact: {
    title: 'Get In Touch',
    text: 'Have questions? We\'d love to hear from you. Reach out to our team for support or inquiries.',
    address: '123 Innovation Drive, Tech City, 12345',
    email: 'contact@wowlogbook.com',
    phone: '(123) 456-7890'
  }
};

const generateAnalytics = () => {
  const data: AnalyticsData = { daily: [], weekly: [], monthly: [] };
  let currentDate = new Date();
  for (let i = 0; i < 30; i++) {
    const unique = Math.floor(Math.random() * 200) + 50;
    const returning = Math.floor(Math.random() * unique * 0.5) + 20;
    data.daily.unshift({
      date: currentDate.toISOString().split('T')[0],
      views: unique + returning,
      unique,
      returning,
    });
    currentDate.setDate(currentDate.getDate() - 1);
  }
  // Aggregate weekly and monthly (simplified for demo)
  for (let i = 0; i < 4; i++) {
    const weekData = data.daily.slice(i * 7, (i + 1) * 7);
    const weeklyTotal = weekData.reduce((acc, day) => ({
      views: acc.views + day.views,
      unique: acc.unique + day.unique,
      returning: acc.returning + day.returning,
    }), { views: 0, unique: 0, returning: 0 });
    data.weekly.unshift({
      date: `Week ${4 - i}`,
      ...weeklyTotal
    });
  }
   const monthlyTotal = data.weekly.reduce((acc, week) => ({
      views: acc.views + week.views,
      unique: acc.unique + week.unique,
      returning: acc.returning + week.returning,
    }), { views: 0, unique: 0, returning: 0 });
  data.monthly.push({ date: 'Last Month', ...monthlyTotal });
  
  return data;
};

export const MOCK_ANALYTICS_DATA: AnalyticsData = generateAnalytics();