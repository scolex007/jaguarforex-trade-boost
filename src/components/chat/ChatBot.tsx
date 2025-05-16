
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ChatMessage, ChatResponse, initializeConversation, sendMessage } from '@/services/chatbotService';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initializeConversation());
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];

    // Clear input and add user message to chat
    setInput('');
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Send message to API
      const response: ChatResponse = await sendMessage(newMessages);
      
      // Add assistant response
      setMessages((prevMessages) => [...prevMessages, response.message]);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Add error message
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again later.'
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  // Display only non-system messages
  const displayMessages = messages.filter(msg => msg.role !== 'system');

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat bubble button */}
      <Button
        onClick={toggleChat}
        className={`rounded-full w-14 h-14 flex items-center justify-center shadow-lg ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-jaguargold hover:bg-jaguargold/90'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-96 bg-background shadow-xl rounded-lg border border-border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-3 bg-jaguargold text-jaguarblue-900 font-semibold flex items-center border-b">
            <Bot size={20} className="mr-2" />
            <span>JaguarForex Assistant</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 scrollbar-thin">
            {displayMessages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Ask me anything about JaguarForex!</p>
              </div>
            ) : (
              displayMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 ${
                    msg.role === 'user' ? 'ml-8 text-right' : 'mr-8'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-jaguargold text-jaguarblue-900'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    {msg.role === 'user' ? (
                      <div className="ml-auto flex items-center">
                        <span className="text-xs text-muted-foreground mr-1">You</span>
                        <User size={16} className="text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Bot size={16} className="text-muted-foreground mr-1" />
                        <span className="text-xs text-muted-foreground">JaguarForex</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-center space-x-2 mb-3 mr-8">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex items-center">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              disabled={isLoading}
              className="flex-1 mr-2"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  size="sm"
                  className="bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90"
                >
                  <Send size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send Message</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
