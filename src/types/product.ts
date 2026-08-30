export type ArticleType =
  | 'Acrylic'
  | 'Wool 50-50 single'
  | 'Wool 60-40 single'
  | 'Wool 70-30 single'
  | 'Wool 80-20 single'
  | 'Wool Pure Single'
  | 'Wool 50-50 double'
  | 'Wool 60-40 double'
  | 'Wool 70-30 double'
  | 'Wool 80-20 double'
  | 'Wool Pure double'
  | 'Wool 96 Pure Single'
  | 'Wool 96 Pure double'
  | 'Wool 72Pure Single'
  | 'Wool 72Pure double';

export type TierGrade = 'Platinum' | 'Gold' | 'Diamond' | 'Imperial';

export type FabricType = string;

export interface ColorOption {
  name: string;
  hex: string;
  image?: string;
}

export interface ShawlSOPs {
  washing: string[];
  storage: string[];
  steaming: string[];
  authenticity: string[];
}

export interface ShawlProduct {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  tierGrade: TierGrade;
  articleType: ArticleType;
  subCategory: 'Pashmina' | 'Kani' | 'Cashmere' | 'Silk Fusion' | 'Heirloom';
  fabric: FabricType;
  dimensions: string;
  weight: string;
  micronCount: string;
  origin: string;
  images: string[];
  colors: ColorOption[];
  tags: string[];
  sops: ShawlSOPs;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isOutOfStock?: boolean;
  releaseDate?: string; // e.g. "2026-08-20"
}

export interface CartItem {
  id: string;
  product: ShawlProduct;
  selectedColor: ColorOption;
  quantity: number;
}
