export interface RelevantLink {
  title: string;
  url: string;
}

export interface KeyTimestamp {
  time: string;
  topic: string;
  url: string;
}

export interface CommentItem {
  author: string;
  comment: string;
  likes?: number;
  timeAgo?: string;
}

export interface BulletStep {
  stepNumber: number;
  title: string;
  detail: string;
  prompt?: string;
  cmd?: string;
  link?: string;
}

export interface DeepData {
  transcriptSummary: string;
  keyTimestamps: KeyTimestamp[];
  rawDescription: string;
  fullAuthorDescription?: string;
  authorLinks?: RelevantLink[];
  topComments?: CommentItem[];
  bulletPointPlan?: BulletStep[];
  totalDataSummary?: string;
  completeToolMatrix: string[];
  prerequisites: string[];
  architectureOverview?: string;
  apiEndpoints?: string[];
}

export interface VideoTutorial {
  id: string;
  title: string;
  url: string;
  youtubeId: string;
  category: string;
  channelName?: string;
  duration?: string;
  publishedAt?: string;
  overview: string;
  instructions: string[];
  warnings: string[];
  takeaways: string[];
  executionCommands?: string[];
  envVariables?: string[];
  codeSnippets?: string[];
  relevantLinks?: RelevantLink[];
  deepData?: DeepData;
  createdAt: string;
  isCustom?: boolean;
  bookmarked?: boolean;
  notes?: string;
}

export type CategoryType = 
  | 'All'
  | 'AI Coding Tools'
  | 'Model Context Protocol (MCP)'
  | 'Local Models & Ollama'
  | 'Autonomous Agents'
  | 'Workflows & Orchestration'
  | 'AI & Engineering';

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  bookmarkedOnly: boolean;
  sortBy: 'newest' | 'title' | 'instructionsCount';
}

export interface AnalyzeVideoRequest {
  urlOrTitle: string;
  customTopic?: string;
}

export interface AnalyzeVideoResponse {
  success: boolean;
  video?: VideoTutorial;
  error?: string;
}
