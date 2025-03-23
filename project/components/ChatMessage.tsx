"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface ChatMessageProps {
  chat: {
    role: string;
    text: string;
    isError?: boolean;
  };
}

export function ChatMessage({ chat }: ChatMessageProps) {
  const isBot = chat.role === "model" || chat.role === "assistant";

  // Function to process the message content, extracting follow-up questions
  const processContent = (content: string) => {
    // Regular expression to find questions in square brackets
    const questionRegex = /\[(.*?)\]/g;
    let match;
    const questions = [];
    
    // Find all questions in square brackets
    while ((match = questionRegex.exec(content)) !== null) {
      questions.push(match[1]);
    }
    
    // Remove the questions from the main content
    const mainContent = content.replace(questionRegex, '');
    
    return {
      mainContent,
      questions
    };
  };

  // For bot messages, process the content to extract questions
  const processedContent = isBot ? processContent(chat.text) : { mainContent: chat.text, questions: [] };

  return (
    <div className={`flex ${isBot ? "items-start" : "justify-end"} w-full mb-4`}>
      <div
        className={cn(
          "rounded-lg p-3 max-w-[85%] whitespace-pre-wrap break-words",
          isBot
            ? "bg-secondary text-secondary-foreground"
            : "bg-primary text-primary-foreground",
          chat.isError && "text-destructive"
        )}
      >
        <div className="whitespace-pre-wrap">
          {processedContent.mainContent}
        </div>
        
        {/* Render follow-up questions if they exist */}
        {isBot && processedContent.questions.length > 0 && (
          <div className="mt-4 pt-2 border-t border-primary/10 space-y-2">
            <div className="flex flex-col gap-2 w-full">
              {processedContent.questions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left py-2 px-3 h-auto text-sm mb-1 bg-primary/5 hover:bg-primary/10 border-primary/10 break-words whitespace-normal"
                  onClick={() => {
                    // Find the chat form input and set its value
                    const inputElement = document.getElementById('question') as HTMLInputElement;
                    if (inputElement) {
                      // Set the input value to the question
                      inputElement.value = question;
                      
                      // Find the form and submit it immediately
                      const form = inputElement.closest('form');
                      if (form) {
                        // Create and dispatch a submit event
                        const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
                        form.dispatchEvent(submitEvent);
                      }
                    }
                  }}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}