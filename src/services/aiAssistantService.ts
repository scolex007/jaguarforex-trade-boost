
/**
 * AI Assistant service for JaguarForex
 * Service for interacting with AI models via backend API
 */

import axios from 'axios';

// Interface for message structure - matches ChatMessage in chatbotService
export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Interface for model options
export interface ModelOption {
  id: string;
  name: string;
  provider: string;
  description: string;
  contextWindow: number;
}

// Available models for selection
export const availableModels: ModelOption[] = [
  {
    id: "meta-llama/llama-3.3-8b-instruct:free",
    name: "Llama 3.3 8B Instruct",
    provider: "Meta",
    description: "Compact but powerful instruction-following model from Meta",
    contextWindow: 8000
  },
  {
    id: "openai/gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    description: "Optimized smaller version of GPT-4o with great capabilities",
    contextWindow: 16000
  },
  {
    id: "google/gemini-2.0-flash-001",
    name: "Gemini 2.0 Flash",
    provider: "Google",
    description: "Fast streaming model from Google's Gemini lineup",
    contextWindow: 8000
  },
  {
    id: "deepseek/deepseek-chat-v3-0324",
    name: "DeepSeek V3 0324",
    provider: "DeepSeek",
    description: "Advanced model from DeepSeek that excels at code and reasoning",
    contextWindow: 10000
  },
  {
    id: "mistralai/mistral-nemo",
    name: "Mistral Nemo",
    provider: "Mistral AI",
    description: "Mistral AI's powerful successor to Mixtral",
    contextWindow: 12000
  }
];

// API configuration
const API_BASE_URL = 'https://my.jaguarforex.com/api';
const AI_ASSISTANT_URL = `${API_BASE_URL}/assistant`;

// Send message to AI
export const sendMessage = async (
  messages: Message[],
  modelId: string = 'mistralai/mistral-nemo'
): Promise<{message: Message}> => {
  try {
    // In a real implementation, we would call the actual API
    // For now, simulate a response with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get the last user message
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    
    // Generate a simple response based on the last message
    let responseText = "I'm sorry, I don't have enough information to provide a helpful response.";
    
    if (lastUserMessage) {
      const query = lastUserMessage.content.toLowerCase();
      
      if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
        responseText = "Hello! How can I help you with your forex trading questions today?";
      } else if (query.includes('forex') || query.includes('trading')) {
        responseText = "Forex trading involves buying one currency while simultaneously selling another. The foreign exchange market is the largest and most liquid financial market in the world. Would you like to know more about specific trading strategies or risk management?";
      } else if (query.includes('cashback')) {
        responseText = "JaguarForex offers a competitive cashback program that returns a portion of your trading spread to you. You can register for the program on our website and start earning cashback on all your trades.";
      } else if (query.includes('tools') || query.includes('indicators')) {
        responseText = "We offer a variety of trading tools including Expert Advisors, custom indicators, and trading scripts. All our tools are designed to help you make more informed trading decisions.";
      } else {
        responseText = `Thank you for your question about "${lastUserMessage.content}". I'll do my best to provide a helpful answer based on my knowledge of forex trading and market analysis.`;
      }
    }
    
    const assistantMessage: Message = {
      role: 'assistant',
      content: responseText
    };
    
    return { message: assistantMessage };
  } catch (error) {
    console.error('Error in AI assistant service:', error);
    throw error;
  }
};
