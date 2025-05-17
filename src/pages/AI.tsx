
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { sendMessage } from "@/services/chatbotService";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ModelOption {
  name: string;
  id: string;
}

const modelOptions: ModelOption[] = [
  { name: "Meta: Llama 3.3 8B Instruct", id: "meta-llama/llama-3.3-8b-instruct:free" },
  { name: "OpenAI: GPT-4o Mini", id: "openai/gpt-4o-mini" },
  { name: "Google: Gemini 2.0 Flash", id: "google/gemini-2.0-flash-001" },
  { name: "DeepSeek: DeepSeek V3 0324", id: "deepseek/deepseek-chat-v3-0324" }
];

const AI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(modelOptions[0].id);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input field on page load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const newUserMessage: Message = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare messages for API
      const apiMessages = [
        { role: 'system', content: 'You are a helpful AI assistant for JaguarForex.' },
        ...messages.map(msg => ({ role: msg.role, content: msg.content })),
        { role: newUserMessage.role, content: newUserMessage.content }
      ];
      
      // Send to backend with selected model
      const response = await sendMessage(apiMessages);
      
      if (response.message) {
        setMessages(prevMessages => [
          ...prevMessages, 
          { role: 'assistant', content: response.message.content }
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-jaguarblue-800">
      <Navbar />
      <main className="flex-grow flex flex-col px-4 py-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            JaguarForex AI Assistant
          </h1>
          <p className="text-gray-300 text-lg">
            Ask anything about forex trading, our tools, or cashback program
          </p>
        </div>

        <div className="flex-grow overflow-y-auto mb-6 space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Search className="h-12 w-12 mb-4 opacity-50" />
              <p>Start a conversation with the AI assistant</p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg max-w-3xl ${
                    message.role === 'user' 
                      ? 'bg-jaguarblue-700 ml-auto' 
                      : 'bg-jaguarblue-600 mr-auto'
                  }`}
                >
                  <p className="text-sm font-semibold mb-1 text-jaguargold">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </p>
                  <p className="text-white whitespace-pre-wrap">{message.content}</p>
                </div>
              ))}
              {isLoading && (
                <div className="bg-jaguarblue-600 p-4 rounded-lg max-w-3xl mr-auto">
                  <p className="text-sm font-semibold mb-1 text-jaguargold">AI Assistant</p>
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-jaguargold rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-jaguargold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-2 w-2 bg-jaguargold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-4">
          <Select
            value={selectedModel}
            onValueChange={setSelectedModel}
          >
            <SelectTrigger className="w-full md:w-80 bg-jaguarblue-700 border-jaguarblue-600">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent className="bg-jaguarblue-700 border-jaguarblue-600">
              {modelOptions.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <form onSubmit={handleSubmit} className="flex w-full">
            <Input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything..."
              className="flex-grow bg-jaguarblue-700 border-jaguarblue-600 text-white"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="ml-2 bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900"
              disabled={isLoading || !input.trim()}
            >
              Send
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AI;
