
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
- Our cashback rates are: 0.8 pips for major pairs, 1.2 pips for exotic pairs
- The profit generated from the broker are divided to the user. 
- Trading tools include EAs like "ForexMaster Pro" and "TrendHunter v2"
- Profit from the cashback are given to the user with account balance greater than 10 USD
- Jaguarforex will deposit the money to the account every 15th of the month
- User do not need to request for withdrawal
- All trading tools are free
- Users must verify their trading accounts before receiving cashback

IMPORTANT: If you don't know the answer, acknowledge that and suggest the user contact support at support@jaguarforex.com.`;

// OpenRouter API configuration
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || 'sk-or-v1-your_key_here';

// Initialize conversation with system prompt
export const initializeConversation = (): ChatMessage[] => {
  return [
    { role: 'system', content: SYSTEM_PROMPT },
  ];
};

// Send message to OpenRouter API
export const sendMessage = async (messages: ChatMessage[]): Promise<ChatResponse> => {
  try {
    // Filter out system messages for displaying in the UI
    const displayMessages = messages.filter(msg => msg.role !== 'system');
    console.log('Sending messages to OpenRouter:', displayMessages);

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'gpt-3.5-turbo', // You can change this to other supported models
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://jaguarforex.com', // Replace with your actual domain
          'X-Title': 'JaguarForex Assistant'
        }
      }
    );

    const assistantMessage = response.data.choices[0].message;
    return { 
      message: assistantMessage 
    };
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    return { 
      message: { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again later or contact support@jaguarforex.com.' 
      },
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
