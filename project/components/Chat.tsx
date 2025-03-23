"use client";

import { useEffect, useRef, useState } from "react";
import { ChatForm } from "./ChatForm";
import { ChatMessage } from "./ChatMessage";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export function Chat() {
  const [chatHistory, setChatHistory] = useState([
    {
      role: "model",
      text: "Hi! I'm Muhammad's AI assistant. How can I help you learn about his skills and experience? Ask me anything about his projects, technical expertise, or work history.\n\n[What technologies does Muhammad specialise in?]\n[Can you tell me about Muhammad's work experience?]\n[What projects has Muhammad completed?]",
    }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setIsLoading] = useState(false);

  function updateHistory(text: string, isError = false) {
    // Convert US English to UK English in common words
    const ukEnglishText = text
      .replace(/\boptimize\b/g, "optimise")
      .replace(/\boptimized\b/g, "optimised")
      .replace(/\boptimizing\b/g, "optimising")
      .replace(/\bfavorite\b/g, "favourite")
      .replace(/\bcolor\b/g, "colour")
      .replace(/\bcenter\b/g, "centre")
      .replace(/\bpractice\b/g, "practise")
      .replace(/\borganization\b/g, "organisation")
      .replace(/\bspecialized\b/g, "specialised")
      .replace(/\bspecializing\b/g, "specialising")
      .replace(/\bspecialize\b/g, "specialise")
      .replace(/\brealize\b/g, "realise")
      .replace(/\brealized\b/g, "realised")
      .replace(/\brealizing\b/g, "realising");
      
    setChatHistory((prev) => [...prev, { role: "model", text: ukEnglishText, isError }]);
  }

  async function generateBotResponse(history: Array<{ role: string; text: string }>) {
    setIsLoading(true);
    const question = history[history.length - 1].text;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error.message || "Something went wrong!");
      }
      
      const apiResponseText = data.candidates[0].content.parts[0].text;
      updateHistory(apiResponseText);
    } catch (error: any) {
      updateHistory("Sorry, I couldn't process that request. Please try asking something else about Muhammad's skills or experience.\n\n[What are Muhammad's technical skills?]\n[Tell me about Muhammad's education]\n[What projects has Muhammad worked on?]", true);
    }
    
    setIsLoading(false);
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Function to clear chat history
  const handleClearChat = () => {
    setChatHistory([
      {
        role: "model",
        text: "Chat cleared! What would you like to know about Muhammad? I'm here to help with any questions about his skills, experience, or projects.\n\n[What technologies does Muhammad specialise in?]\n[Can you tell me about Muhammad's work experience?]\n[What projects has Muhammad completed?]",
      }
    ]);
  };

  return (
    <Card className="flex flex-col h-[600px] max-w-3xl mx-auto border-2 shadow-lg">
      <div className="p-4 border-b flex items-center gap-2 bg-card/95">
        <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        <h3 className="font-semibold">Chat with Muhammad's Assistant</h3>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chatHistory.map((chat, index) => (
            <div key={index}>
              <ChatMessage chat={chat} />
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      
      {loading && (
        <div className="flex justify-center p-4 border-t">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
      
      <div className="border-t p-4">
        <ChatForm
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          generateBotResponse={generateBotResponse}
          loading={loading}
          onClearChat={handleClearChat}
        />
      </div>
    </Card>
  );
}