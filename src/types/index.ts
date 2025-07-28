export interface ErrorTicket {
  id: number;
  type: ErrorType;
  error: string;
  explanation: string;
  fix: string;
  optimization?: string;
}

export type ErrorType = 'Formula Error' | 'API Error' | 'Workflow Issue';

export interface AnalysisResult {
  explanation: string;
  fix: string;
  optimization?: string;
}

export interface AppState {
  isDemoMode: boolean;
  isLoading: boolean;
  currentResult: AnalysisResult | null;
  error: string | null;
}

export interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}
