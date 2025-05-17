
import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Loader2, Send, Bot, User, Check, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Message, sendMessage, ModelOption, availableModels, AssistantResponse } from '@/services/aiAssistantService';

const AI = () => {
  // State for messages, input, and loading status
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>('mistralai/mistral-nemo');

  // Refs for scrolling and input focus
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus textarea on load
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // If this is the first message, add a welcome message
      const updatedMessages: Message[] = messages.length === 0 
        ? [
            { role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you today?' } as Message,
            userMessage
          ]
        : [...messages, userMessage];

      const response = await sendMessage(updatedMessages, selectedModel);
      setMessages(prev => [...prev, response.message]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, there was an error processing your request. Please try again later.'
        }
      ]);
    } finally {
      setIsLoading(false);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  // Handle textarea input
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  };

  // Handle key press (Enter to send)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Find model details
  const getModelDetails = (modelId: string): ModelOption => {
    return availableModels.find(model => model.id === modelId) || {
      id: modelId,
      name: modelId.split('/').pop() || modelId,
      provider: 'Unknown',
      description: 'Custom model',
      contextWindow: 4000
    };
  };

  const currentModel = getModelDetails(selectedModel);

  return (
    <>
      <Helmet>
        <title>AI Assistant | JaguarForex</title>
        <meta name="description" content="Advanced AI assistant for forex trading insights" />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-jaguarblue-950 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Advanced</span> AI Assistant
            </h1>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Get personalized insights and analysis for your forex trading questions using state-of-the-art AI models.
            </p>
          </div>
          
          {/* Chat interface */}
          <Card className="bg-jaguarblue-900 border-jaguarblue-700 flex flex-col">
            {/* Model selector in header */}
            <CardHeader className="border-b border-jaguarblue-700 py-3 flex flex-row items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-5 w-5 text-jaguargold mr-2" />
                <CardTitle className="text-lg">Advanced Trading Assistant</CardTitle>
              </div>
              <div className="flex items-center">
                <Select
                  value={selectedModel}
                  onValueChange={setSelectedModel}
                >
                  <SelectTrigger className="w-[180px] bg-jaguarblue-800 border-jaguarblue-700">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent className="bg-jaguarblue-800 border-jaguarblue-700">
                    {availableModels.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.provider}: {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            {/* Chat messages with scroll area */}
            <CardContent className="p-0 flex-1">
              <ScrollArea className="h-[700px] p-4">
                <div className="space-y-4 px-4">
                  {/* Welcome message if no messages */}
                  {messages.length === 0 && (
                    <div className="bg-jaguarblue-800/50 rounded-lg p-4 text-center">
                      <h3 className="text-lg font-medium mb-2 text-jaguargold">Welcome to JaguarForex AI Assistant</h3>
                      <p className="text-gray-300">
                        I can help with forex trading questions, market analysis, and trading strategies. How can I assist you today?
                      </p>
                    </div>
                  )}
                  
                  {/* Display messages */}
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-4 ${
                          msg.role === 'user'
                            ? 'bg-jaguargold/20 text-white'
                            : 'bg-jaguarblue-800 text-gray-200'
                        }`}
                      >
                        {msg.role === 'assistant' && (
                          <div className="flex items-center mb-2">
                            <Bot className="h-4 w-4 text-jaguargold mr-1" />
                            <span className="text-xs font-medium text-jaguargold">AI Assistant</span>
                          </div>
                        )}
                        
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                        
                        {msg.role === 'user' && (
                          <div className="flex items-center justify-end mt-1">
                            <span className="text-xs text-gray-400">You</span>
                            <User className="h-3 w-3 text-gray-400 ml-1" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-jaguarblue-800 rounded-lg p-4 max-w-[85%]">
                        <div className="flex items-center mb-2">
                          <Bot className="h-4 w-4 text-jaguargold mr-1" />
                          <span className="text-xs font-medium text-jaguargold">AI Assistant</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-jaguargold/60 animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-jaguargold/60 animate-pulse delay-150"></div>
                          <div className="w-2 h-2 rounded-full bg-jaguargold/60 animate-pulse delay-300"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Invisible element to scroll to */}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
            
            {/* Input area */}
            <CardFooter className="border-t border-jaguarblue-700 p-4">
              <div className="flex items-end w-full">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about forex trading, market analysis, or trading strategies..."
                  className="flex-1 bg-jaguarblue-800 border-jaguarblue-700 min-h-[52px]"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || input.trim() === ''}
                  className="ml-2 bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              <div className="w-full text-xs text-gray-500 mt-2">
                Press Enter to send, Shift+Enter for new line
              </div>
            </CardFooter>
          </Card>
          
          {/* Model info and disclaimer */}
          <div className="mt-6 flex flex-wrap gap-4">
            <Card className="bg-jaguarblue-900 border-jaguarblue-700 flex-1">
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Current Model: {currentModel.name}</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-xs text-gray-400">{currentModel.description}</p>
                <div className="text-xs text-gray-400 flex items-center mt-1">
                  <span>Provider: {currentModel.provider}</span>
                  <span className="mx-2">•</span>
                  <span>Context: {(currentModel.contextWindow / 1000).toFixed(0)}K tokens</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-jaguarblue-900 border-jaguarblue-700 flex-1">
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Usage Tips</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <ul className="text-xs text-gray-400 space-y-1">
                  <li className="flex items-start">
                    <Check className="h-3 w-3 mr-1 mt-0.5 text-green-500" />
                    <span>Ask specific, detailed questions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-3 w-3 mr-1 mt-0.5 text-green-500" />
                    <span>Include all relevant context</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-3 w-3 mr-1 mt-0.5 text-green-500" />
                    <span>Try different models for different tasks</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              AI responses are generated by third-party models and should not be considered as financial advice.
              Always verify information and consult with professional financial advisors before making trading decisions.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AI;
