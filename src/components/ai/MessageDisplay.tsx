
import { useRef, useEffect } from 'react';
import { Bot, User } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from '@/services/aiAssistantService';

interface MessageDisplayProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageDisplay = ({ messages, isLoading }: MessageDisplayProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ScrollArea className="h-[500px] p-4">
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
  );
};

export default MessageDisplay;
