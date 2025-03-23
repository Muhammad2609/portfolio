"use client";

import { Send, Trash2 } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ChatFormProps {
  chatHistory: Array<{ role: string; text: string }>;
  setChatHistory: (history: Array<{ role: string; text: string }>) => void;
  generateBotResponse: (history: Array<{ role: string; text: string }>) => void;
  loading: boolean;
  onClearChat: () => void;
}

export function ChatForm({
  chatHistory,
  setChatHistory,
  generateBotResponse,
  loading,
  onClearChat
}: ChatFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const userMessage = inputRef.current?.value.trim();

    if (!userMessage) {
      return;
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex w-full gap-2">
      <Input
        ref={inputRef}
        name="question"
        id="question"
        placeholder="Ask me anything about Muhammad..."
        className="flex-grow"
        disabled={loading}
      />
      <Button 
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600"
      >
        <Send className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onClearChat}
        disabled={chatHistory.length <= 1}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </form>
  );
}