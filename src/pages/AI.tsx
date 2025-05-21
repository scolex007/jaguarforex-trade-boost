
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ai/ChatInterface';
import { availableModels } from '@/services/aiAssistantService';

const AI = () => {
  // Set OpenAI: GPT-4o mini as the default model
  const defaultModel = availableModels.find(model => model.id === 'openai/gpt-4o-mini-2024-07-18') || availableModels[0];
  const [selectedModel, setSelectedModel] = useState<string>(defaultModel.id);

  return (
    <>
      <Helmet>
        <title>AI Assistant | JaguarForex</title>
        <meta name="description" content="Advanced AI assistant for forex trading insights" />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-jaguarblue-950 pt-20 pb-16 flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 max-w-5xl flex-1 flex flex-col">
          {/* Header - Simplified title */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="gradient-text">Advanced Forex AI</span> Assistant
            </h1>
            <p className="text-gray-400 mt-2">
              I can help with forex trading questions, market analysis, and trading strategies
            </p>
          </div>
          
          {/* Chat interface */}
          <div className="flex-1 flex flex-col">
            <ChatInterface 
              availableModels={availableModels}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
            
            {/* Minimalist disclaimer */}
            <div className="mt-4 text-center text-xs text-gray-500">
              <p>AI responses should not be considered as financial advice.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AI;
