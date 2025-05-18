
/**
 * AI Assistant service for the custom AI page
 * This service connects to OpenRouter API via backend proxy
 * with a different system prompt than the chatbot
 */

import axios from 'axios';

// Interface for message structure
export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Interface for response
export interface AssistantResponse {
  message: Message;
  error?: string;
}

// Interface for model options
export interface ModelOption {
  id: string;
  name: string;
  provider: string;
  description: string;
  contextWindow: number;
}

// Available models with their exact model IDs required by OpenRouter
export const availableModels: ModelOption[] = [
  { 
    id: 'mistralai/mistral-nemo',
    name: 'Mistral Nemo',
    provider: 'Mistral',
    description: 'Advanced multimodal capabilities',
    contextWindow: 128000
  },
  {
    id: 'anthropic/claude-3.5-haiku-20241022',
    name: 'Claude 3.5 Haiku (2024-10-22)',
    provider: 'Anthropic',
    description: 'Fast and efficient for simpler tasks',
    contextWindow: 150000
  },
  {
    id: 'openai/gpt-4o-mini-2024-07-18',
    name: 'GPT-4o-mini',
    provider: 'OpenAI',
    description: 'Balanced performance and efficiency',
    contextWindow: 128000
  },
  {
    id: 'google/gemini-2.5-flash-preview',
    name: 'Gemini 2.5 Flash Preview',
    provider: 'Google',
    description: 'Fast responses with comprehensive knowledge',
    contextWindow: 100000
  },
  {
    id: 'qwen/qwen2.5-coder-7b-instruct',
    name: 'Qwen 2.5 Coder 7B',
    provider: 'Qwen',
    description: 'Specialized for coding and technical queries',
    contextWindow: 32000
  },
  {
    id: 'meta-llama/llama-4-maverick',
    name: 'Llama 4 Maverick',
    provider: 'Meta',
    description: 'Powerful open-source large language model',
    contextWindow: 128000
  }
];

// API configuration
const API_BASE_URL = 'https://my.jaguarforex.com/api';
const AI_ASSISTANT_URL = `${API_BASE_URL}/ai-assistant`;

/**
 * Send a message to the AI assistant via backend proxy
 * This implementation uses the custom AI endpoint which has a different system prompt
 */
export const sendMessage = async (
  messages: Message[],
  selectedModel: string
): Promise<AssistantResponse> => {
  try {
    console.log('Sending messages to AI assistant:', messages);
    console.log('Using model:', selectedModel);

    // Filter out any system messages from the frontend
    const userMessages = messages.filter(msg => msg.role !== 'system');

    const response = await axios.post(
      AI_ASSISTANT_URL,
      {
        model: selectedModel, // Use exactly what was selected
        messages: userMessages,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.getItem('jaguarforex_token') && {
            'Authorization': `Bearer ${localStorage.getItem('jaguarforex_token')}`
          })
        },
        withCredentials: true
      }
    );

    console.log('AI assistant response:', response.data);
    const assistantMessage = response.data.choices[0].message;
    return { 
      message: assistantMessage 
    };
  } catch (error) {
    console.error('Error calling AI assistant API:', error);
    
    // Handle rate limiting specifically
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'] || 60;
      return { 
        message: { 
          role: 'assistant', 
          content: `I'm receiving too many requests right now. Please try again in ${retryAfter} seconds.` 
        },
        error: 'Rate limit exceeded'
      };
    }
    
    // Detailed error logging for debugging
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        config: error.config
      });
    }
    
    return { 
      message: { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again later or contact support@jaguarforex.com.' 
      },
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
