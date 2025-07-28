import { ErrorType, AnalysisResult } from '../types';
import demoData from '../data/demo-data.json';

export const mockAnalyzeError = async (
  errorMessage: string,
  errorType: ErrorType
): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Find matching demo data based on error message similarity
  const matchingTicket = demoData.find(
    (ticket) =>
      ticket.type === errorType &&
      errorMessage
        .toLowerCase()
        .includes(ticket.error.toLowerCase().split(' ')[0])
  );

  if (matchingTicket) {
    return {
      explanation: matchingTicket.explanation,
      fix: matchingTicket.fix,
      optimization: generateOptimizationTip(errorType),
    };
  }

  // Fallback generic responses
  return generateGenericResponse(errorType);
};

const generateOptimizationTip = (errorType: ErrorType): string => {
  const tips = {
    'Formula Error':
      'Consider using field validation rules to prevent invalid data entry that could cause formula errors.',
    'API Error':
      'Implement proper error handling and retry logic in your API integrations for better reliability.',
    'Workflow Issue':
      'Set up monitoring and alerts for your automations to catch issues before they impact users.',
  };

  return tips[errorType];
};

const generateGenericResponse = (errorType: ErrorType): AnalysisResult => {
  const responses = {
    'Formula Error': {
      explanation:
        'This appears to be a formula syntax or data type error in Airtable.',
      fix: 'Check your formula syntax, ensure field references are correct, and verify data types match expected inputs.',
      optimization:
        'Consider using field validation rules to prevent invalid data entry that could cause formula errors.',
    },
    'API Error': {
      explanation:
        'This is an API-related error that may involve authentication, permissions, or request formatting.',
      fix: 'Verify your API key, check endpoint URLs, and ensure your request payload matches the expected format.',
      optimization:
        'Implement proper error handling and retry logic in your API integrations for better reliability.',
    },
    'Workflow Issue': {
      explanation:
        'This appears to be an automation or workflow-related problem in Airtable.',
      fix: 'Check your automation triggers, verify field mappings, and ensure all required data is available.',
      optimization:
        'Set up monitoring and alerts for your automations to catch issues before they impact users.',
    },
  };

  return responses[errorType];
};
