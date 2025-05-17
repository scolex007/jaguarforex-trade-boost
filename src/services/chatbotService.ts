/**
 * Chatbot service for JaguarForex using OpenRouter API via backend proxy
 * This service handles communication with the PHP backend
 * SECURITY ENHANCED VERSION - No system prompt in frontend
 */

import axios from 'axios';

// Interface for message structure
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Interface for chat response
export interface ChatResponse {
  message: ChatMessage;
  error?: string;
}

// API configuration
const API_BASE_URL = 'https://my.jaguarforex.com/api';
const CHATBOT_API_URL = `${API_BASE_URL}/chatbot/send`;
const TEST_API_URL = `${API_BASE_URL}/chatbot/test`;

/**
 * Initialize conversation without system prompt
 * Backend will add its own system prompt for security
 */
export const initializeConversation = (): ChatMessage[] => {
  return []; // Empty array - backend will add system prompt
};

/**
 * Test the API connection
 */
export const testApiConnection = async (): Promise<boolean> => {
  try {
    console.log('Testing chatbot API connection...');
    const response = await axios.get(TEST_API_URL, {
      withCredentials: true
    });
    console.log('API test response:', response.data);
    return response.data.status === 'success';
  } catch (error) {
    console.error('API test failed:', error);
    return false;
  }
};

/**
 * Send message to backend chatbot API
 * This version doesn't include any system prompt - all instruction control is on the backend
 */
export const sendMessage = async (messages: ChatMessage[]): Promise<ChatResponse> => {
  try {
    // Log messages being sent (without system prompt)
    console.log('Sending messages to chatbot API:', messages);

    // Filter system messages if any were somehow added
    const cleanMessages = messages.filter(msg => msg.role !== 'system');

    const response = await axios.post(
      CHATBOT_API_URL,
      {
        model: 'gryphe/mythomax-l2-13b',
        messages: cleanMessages, // Send only user and assistant messages
        temperature: 0.7,
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // Add auth token if available
          ...(localStorage.getItem('jaguarforex_token') && {
            'Authorization': `Bearer ${localStorage.getItem('jaguarforex_token')}`
          })
        },
        withCredentials: true
      }
    );

    console.log('Chatbot API response:', response.data);
    const assistantMessage = response.data.choices[0].message;
    return { 
      message: assistantMessage 
    };
  } catch (error) {
    console.error('Error calling chatbot API:', error);
    
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