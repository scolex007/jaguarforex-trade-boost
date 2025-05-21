
import { useState, useRef, useEffect } from 'react';
import { Message, sendMessage, ModelOption } from '@/services/aiAssistantService';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import MessageDisplay from './MessageDisplay';
import InputArea from './InputArea';

interface ChatInterfaceProps {
  availableModels: ModelOption[];
  selectedModel: string;
  setSelectedModel: (modelId: string) => void;
}

const ChatInterface = ({ availableModels, selectedModel, setSelectedModel }: ChatInterfaceProps) => {
  // State for messages, input, and loading status
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFirstMessage, setIsFirstMessage] = useState<boolean>(true);

  // Refs for the container
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea on load
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    if (isFirstMessage) {
      setIsFirstMessage(false);
    }

    try {
      // If this is the first message, add a welcome message
      const updatedMessages: Message[] = messages.length === 0 
        ? [
            { role: 'assistant', content: 'Welcome to JaguarForex AI Assistant\n\nI can help with forex trading questions, market analysis, and trading strategies. How can I assist you today?' } as Message,
            userMessage
          ]
        : [...messages, userMessage];

      console.log('Selected model for API call:', selectedModel);
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

  return (
    <div className="flex flex-col flex-1">
      {messages.length > 0 ? (
        // Chat with messages
        <Card className="bg-jaguarblue-900/50 border-jaguarblue-700/30 flex flex-col shadow-lg rounded-xl overflow-hidden flex-1">
          <CardContent className="p-0 flex-1" ref={chatContainerRef}>
            <MessageDisplay 
              messages={messages}
              isLoading={isLoading}
            />
          </CardContent>
          
          <CardFooter className="border-t border-jaguarblue-700/30 p-4">
            <div className="w-full">
              <InputArea 
                input={input}
                setInput={setInput}
                handleSendMessage={handleSendMessage}
                isLoading={isLoading}
                textareaRef={textareaRef}
              />
            </div>
          </CardFooter>
        </Card>
      ) : (
        // Empty state with centered input
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="max-w-2xl w-full">
            <InputArea 
              input={input}
              setInput={setInput}
              handleSendMessage={handleSendMessage}
              isLoading={isLoading}
              textareaRef={textareaRef}
              centered={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
