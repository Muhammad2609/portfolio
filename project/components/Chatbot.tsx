"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { MessageCircle, Send, X, Bot, User, ThumbsUp, ThumbsDown, AlertTriangle, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { aiPrompt } from "@/lib/utils/ai";

interface Message {
  role: "user" | "assistant";
  content: string | React.ReactNode;
  timestamp: Date;
  feedback?: "positive" | "negative";
  error?: boolean;
}

export function Chatbot() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Muhammad's AI assistant. How can I help you learn about his skills and experience? Ask me anything about his projects, technical expertise, or work history.\n\n[What technologies does Muhammad specialise in?]\n[Can you tell me about Muhammad's work experience?]\n[What projects has Muhammad completed?]",
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const MAX_RETRIES = 3;

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI("AIzaSyCmaFrFzx1ZbJWhFS7-nl7RhRfp3NZ31FI");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFeedback = (messageIndex: number, feedback: "positive" | "negative") => {
    setMessages(prev => prev.map((msg, i) => 
      i === messageIndex ? { ...msg, feedback } : msg
    ));

    toast({
      title: feedback === "positive" ? "Thanks for the positive feedback!" : "Thanks for the feedback",
      description: feedback === "positive" 
        ? "I'm glad I could help!" 
        : "I'll try to improve my responses.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    let currentAttempt = 1;
    while (currentAttempt <= MAX_RETRIES) {
      try {
        const prompt = aiPrompt(input);
        
        const result = await model.generateContent({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7,
            topP: 0.8,
            topK: 40,
          }
        });
        
        const response = await result.response;
        const apiResponseText = response.text();
        
        if (!apiResponseText) {
          throw new Error('Empty response from Gemini');
        }

        // Convert US English to UK English in common words
        const ukEnglishText = apiResponseText
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

        setMessages(prev => [...prev, {
          role: "assistant",
          content: ukEnglishText,
          timestamp: new Date()
        }]);
        setIsTyping(false);
        return;

      } catch (error: any) {
        console.error(`AI Response Error (Attempt ${currentAttempt}/${MAX_RETRIES}):`, error);

        if (currentAttempt === MAX_RETRIES) {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "Sorry, I couldn't process that request. Please try asking something else about Muhammad's skills or experience.\n\n[What are Muhammad's technical skills?]\n[Tell me about Muhammad's education]\n[What projects has Muhammad worked on?]",
            timestamp: new Date(),
            error: true
          }]);
          setIsTyping(false);
          return;
        }

        currentAttempt++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  // Function to process and render message content
  const renderMessageContent = (content: string | React.ReactNode) => {
    if (typeof content !== 'string') return content;
    
    // Regular expression to find questions in square brackets
    const questionRegex = /\[(.*?)\]/g;
    let match;
    const questions: string[] = [];
    
    // Find all questions in square brackets
    while ((match = questionRegex.exec(content)) !== null) {
      questions.push(match[1]);
    }
    
    // Remove the questions from the main content
    const mainContent = content.replace(questionRegex, '');
    
    return (
      <>
        <div className="whitespace-pre-wrap">{mainContent}</div>
        {questions.length > 0 && (
          <div className="mt-4 pt-2 border-t border-primary/10 space-y-2">
            <div className="flex flex-col gap-2 w-full">
              {questions.map((q, i) => (
                <Button 
                  key={i} 
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left py-2 px-3 h-auto text-sm mb-1 bg-primary/5 hover:bg-primary/10 border-primary/10 break-words whitespace-normal"
                  onClick={() => {
                    // Set the input value
                    setInput(q);
                    
                    // Immediately submit the form without delay
                    const form = document.getElementById('chatbotForm') as HTMLFormElement;
                    if (form) {
                      // Create and dispatch a submit event
                      const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
                      form.dispatchEvent(submitEvent);
                    }
                  }}
                >
                  {q}
                </Button>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-8 right-8 rounded-full shadow-lg z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-8 w-full max-w-md z-50"
          >
            <Card className="overflow-hidden border-2 shadow-xl bg-background/95 backdrop-blur-sm">
              <div className="p-4 border-b bg-card/95 backdrop-blur-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  <h3 className="font-semibold">Chat with Muhammad's Assistant</h3>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="h-[450px] p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      } items-start gap-2 mb-4`}
                    >
                      {message.role === "assistant" && (
                        <div className={`h-8 w-8 rounded-full ${
                          message.error ? "bg-destructive/10" : "bg-primary/10"
                        } flex items-center justify-center`}>
                          <Bot className={`h-4 w-4 ${
                            message.error ? "text-destructive" : "text-primary"
                          }`} />
                        </div>
                      )}
                      <div className={`max-w-[80%] ${message.role === "assistant" ? "min-w-0" : ""}`}>
                        <div
                          className={`rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : message.error
                              ? "bg-destructive/10"
                              : "bg-muted"
                          } ${message.role === "assistant" ? "w-full" : ""}`}
                        >
                          {typeof message.content === 'string' ? 
                            renderMessageContent(message.content) : 
                            message.content
                          }
                        </div>
                        {message.role === "assistant" && !message.error && (
                          <div className="flex items-center gap-2 mt-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleFeedback(index, "positive")}
                              disabled={message.feedback !== undefined}
                            >
                              <ThumbsUp 
                                className={`h-4 w-4 ${
                                  message.feedback === "positive" ? "text-green-500" : ""
                                }`} 
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleFeedback(index, "negative")}
                              disabled={message.feedback !== undefined}
                            >
                              <ThumbsDown 
                                className={`h-4 w-4 ${
                                  message.feedback === "negative" ? "text-red-500" : ""
                                }`} 
                              />
                            </Button>
                          </div>
                        )}
                      </div>
                      {message.role === "user" && (
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start items-start gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="max-w-[75%] rounded-lg p-3 bg-muted">
                        <div className="flex gap-1">
                          <span className="animate-bounce">.</span>
                          <span className="animate-bounce delay-100">.</span>
                          <span className="animate-bounce delay-200">.</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <form id="chatbotForm" onSubmit={handleSubmit} className="p-4 border-t bg-card/95 backdrop-blur-sm">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about Muhammad..."
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!input.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600"
                  >
                    {isTyping ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}