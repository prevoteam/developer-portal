export interface StrategyResponse {
  title: string;
  steps: Array<{
    phase: string;
    action: string;
    impact: string;
  }>;
  summary: string;
}

export enum NavSection {
  HOME = 'home',
  FEATURES = 'features',
  AI_ENGINE = 'ai-engine',
  CONTACT = 'contact'
}