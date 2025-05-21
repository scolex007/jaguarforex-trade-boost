
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
      
      <main className="min-h-screen bg-jaguarblue-950 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header - Simplified */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="gradient-text">AI</span> Assistant
            </h1>
          </div>
          
          {/* Chat interface */}
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
      </main>
      
      <Footer />
    </>
  );
};

export default AI;
