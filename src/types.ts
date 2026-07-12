export interface ReadingResult {
  name: string;
  mulank: number;
  bhagyank: number;
  personalityTraits: string[];
  strengths: string[];
  challenges: string[];
  careerGuidance: string;
  relationshipInsights: string;
  luckyNumbers: number[];
  luckyColors: string[];
  recommendedPractices: string[];
  aiSummary: string;
}

export interface MulankInfo {
  number: number;
  planet: string;
  deityOrSymbol: string;
  title: string;
  description: string;
  personality: string[];
  strengths: string[];
  challenges: string[];
  careers: string[];
  relationships: string;
}

export interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  birthPlace: string;
  preferredDate: string;
  message: string;
  paymentScreenshot?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  amount: number;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  image: string;
  mulank: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}
