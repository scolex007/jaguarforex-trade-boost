
/**
 * Chatbot service for JaguarForex using OpenRouter API via backend proxy
 * This service handles communication with the PHP backend
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

// System prompt with Jaguarforex information
const SYSTEM_PROMPT = `You are a helpful customer support agent for JaguarForex, a platform that offers trading tools for forex traders and runs a cashback program.

Detailed Information:
- You need to let them know that you are Jaguarforex AI assistant 
- You need to greet the user and ask them how you can help.
- JaguarForex partners with FBS, IC Markets, XM, Exness and RoboForex brokers
- Our cashback rates are based on the broker trading volume commission. 
- We would be no increase in spread if the client subscribe to our affiliate link.
- what ever commission the broker get, Jaguarforex will get 30% of that. from that 30% Jaguarforex will give 40% to the user as cashback.
- The profit generated from the broker are divided to the user. 
- Trading tools include EAs like "GM" , "Optimus EA" , "Maestro EA", "Bollingerband Reversal Pro", Maestro MA".
- Profit from the cashback are given to the user with account balance greater than 10 USD
- Jaguarforex will deposit the money to the account every 15th of the month
- User do not need to request for withdrawal
- All trading tools are free
- Users must verify their trading accounts before receiving cashback

IMPORTANT: If you don't know the answer, acknowledge that and suggest the user contact support at support@jaguarforex.com.`;

// API configuration - using Backend proxy instead of direct OpenRouter access
const API_BASE_URL = 'https://my.jaguarforex.com/api';
const CHATBOT_API_URL = `${API_BASE_URL}/chatbot/send`;
const TEST_API_URL = `${API_BASE_URL}/chatbot/test`;

// Initialize conversation with system prompt
export const initializeConversation = (): ChatMessage[] => {
  return [
    { role: 'system', content: SYSTEM_PROMPT },
  ];
};

/**
 * Test the API connection
 * Use this first to verify the backend is accessible
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

// Send message via backend proxy
export const sendMessage = async (messages: ChatMessage[]): Promise<ChatResponse> => {
  try {
    // Filter out system messages for displaying in the UI
    const displayMessages = messages.filter(msg => msg.role !== 'system');
    console.log('Sending messages to chatbot API:', displayMessages);

    const response = await axios.post(
      CHATBOT_API_URL,
      {
        model: 'mistralai/mistral-nemo', // Fixed the syntax error here
        messages: messages,
        temperature: 0.7,
        max_tokens: 750,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // Add auth token if available
          ...(localStorage.getItem('jaguarforex_token') && {
            'Authorization': `Bearer ${localStorage.getItem('jaguarforex_token')}`
          })
        },
        withCredentials: true // Important for CORS with credentials
      }
    );

    console.log('Chatbot API response:', response.data);
    const assistantMessage = response.data.choices[0].message;
    return { 
      message: assistantMessage 
    };
  } catch (error) {
    console.error('Error calling chatbot API:', error);
    
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
