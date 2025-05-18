
import { useRef, RefObject } from 'react';
import { Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface InputAreaProps {
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
  textareaRef?: RefObject<HTMLTextAreaElement>;
}

const InputArea = ({ input, setInput, handleSendMessage, isLoading, textareaRef }: InputAreaProps) => {
  const localTextareaRef = useRef<HTMLTextAreaElement>(null);
  const activeRef = textareaRef || localTextareaRef;

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

  return (
    <div className="flex w-full">
      <Textarea
        ref={activeRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask about forex trading, market analysis, or trading strategies..."
        className="flex-1 bg-jaguarblue-800 border-jaguarblue-700 min-h-[52px] w-full"
        disabled={isLoading}
      />
      <Button
        onClick={handleSendMessage}
        disabled={isLoading || input.trim() === ''}
        className="ml-2 bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900 h-auto"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default InputArea;
