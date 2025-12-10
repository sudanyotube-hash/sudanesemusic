export interface SeoResult {
  titles: string[];
  description: string;
  tags: string[];
  hashtags: string[];
  thumbnailIdeas: string[];
  strategy: string;
  schemaMarkup: string;
}

export interface GenerationParams {
  topic: string;
  details: string;
  targetAudience: string;
}