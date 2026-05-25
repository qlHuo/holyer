export interface WebsiteItem {
  name: string;
  url: string;
  description: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface WeatherData {
  temp: number;
  weather: string;
  location: string;
  icon: string;
}

export interface QuoteData {
  hitokoto?: string;
  content?: string;
  from?: string;
  author?: string;
}