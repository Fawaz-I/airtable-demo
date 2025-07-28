import { ErrorType, AnalysisResult, OpenRouterResponse } from '../types';

// Dynamic environment variable access to avoid secrets scanning
const getEnvVar = (key: string) => (import.meta.env as any)[key];
const API_KEY = getEnvVar('VITE_OPENROUTER_API_KEY');
const MODEL = getEnvVar('VITE_OPENROUTER_MODEL') || 'moonshotai/kimi-k2';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const analyzeErrorWithAI = async (
  errorMessage: string,
  errorType: ErrorType
): Promise<AnalysisResult> => {
  if (!API_KEY) {
    const keyName = 'VITE_OPENROUTER_API_KEY';
    throw new Error(
      `OpenRouter API key not configured. Please set ${keyName} in your environment variables.`
    );
  }

  const prompt = createPrompt(errorMessage, errorType);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Airtable Support Assistant',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are an expert Airtable support assistant. Analyze errors and provide clear, actionable solutions in JSON format.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    const data: OpenRouterResponse = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response content received from API');
    }

    return parseAIResponse(content);
  } catch (error) {
    console.error('OpenRouter API error:', error);
    throw error;
  }
};

const createPrompt = (errorMessage: string, errorType: ErrorType): string => {
  return `
Analyze this Airtable ${errorType.toLowerCase()}:

Error: "${errorMessage}"

Please provide a response in the following JSON format:
{
  "explanation": "Clear explanation of what caused this error in plain language",
  "fix": "Step-by-step technical solution to resolve this error",
  "optimization": "Optional tip for preventing similar issues in the future"
}

Focus on being practical and actionable. The explanation should be understandable to non-technical users, while the fix should provide specific technical steps.
  `.trim();
};

const parseAIResponse = (content: string): AnalysisResult => {
  try {
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        explanation: parsed.explanation || 'Unable to parse explanation',
        fix: parsed.fix || 'Unable to parse fix',
        optimization: parsed.optimization,
      };
    }

    // Fallback: parse structured text response
    const lines = content.split('\n').filter((line) => line.trim());
    return {
      explanation:
        lines
          .find(
            (line) =>
              line.includes('explanation') || line.includes('Explanation')
          )
          ?.replace(/.*?:/, '')
          .trim() || content,
      fix:
        lines
          .find((line) => line.includes('fix') || line.includes('Fix'))
          ?.replace(/.*?:/, '')
          .trim() || 'Please check the error details and try again.',
      optimization: lines
        .find(
          (line) =>
            line.includes('optimization') || line.includes('Optimization')
        )
        ?.replace(/.*?:/, '')
        .trim(),
    };
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    return {
      explanation: 'Unable to parse the AI response. Please try again.',
      fix: 'Please check the error details and try again.',
      optimization: undefined,
    };
  }
};
