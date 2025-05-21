
import { useRef, RefObject } from 'react';
import { Loader2, SendHorizontal } from 'lucide-react';
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
    <div className="flex w-full items-end gap-2">
      <Textarea
        ref={activeRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask a question about forex trading..."
        className="flex-1 bg-jaguarblue-800/50 border-jaguarblue-700/30 min-h-[52px] w-full rounded-lg resize-none"
        disabled={isLoading}
      />
      <Button
        onClick={handleSendMessage}
        disabled={isLoading || input.trim() === ''}
        size="icon"
        className="bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900 h-[52px] w-[52px] rounded-lg"
      >
        {isLoading ? 
          <Loader2 className="h-5 w-5 animate-spin" /> : 
          <SendHorizontal className="h-5 w-5" />
        }
      </Button>
    </div>
  );
};

export default InputArea;
