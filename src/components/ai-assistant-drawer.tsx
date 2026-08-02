"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "./language-provider";
import { dictionary } from "@/lib/dictionary";
import { Bot, X, Send, RotateCcw } from "lucide-react";

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

export function AiAssistantDrawer({ isOpen, onClose }: AiAssistantDrawerProps) {
  const { language } = useLanguage();
  const t = dictionary[language].aiAssistant;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting =
    language === "hi"
      ? "नमस्ते! मैं विवेक का AI असिस्टेंट हूँ। उनके प्रोजेक्ट्स, स्किल्स या अनुभव के बारे में मुझसे कुछ भी पूछें!"
      : "Hi there! I'm Vivek's AI assistant. Ask me anything about his projects, skills, or experience!";

  const defaultSuggestions = [
    "Tell me about BodhAI",
    "Show projects",
    "Skills",
    "Experience",
    "Contact",
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: initialGreeting,
    },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>(defaultSuggestions);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  if (!isOpen) return null;

  const handleResetChat = () => {
    setMessages([
      {
        id: crypto.randomUUID(),
        sender: "ai",
        text: initialGreeting,
      },
    ]);
    setSuggestions(defaultSuggestions);
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isTyping) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      sender: "user",
      text: textToSend,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!queryText) setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          language,
          history: updatedMessages.slice(-8), // Memory of last 8 messages
        }),
      });
      const data = await res.json();

      const aiMsg: Message = {
        id: crypto.randomUUID(),
        sender: "ai",
        text: data.reply || "Thank you for reaching out!",
      };
      setMessages((prev) => [...prev, aiMsg]);

      if (data.suggestions && Array.isArray(data.suggestions)) {
        setSuggestions(data.suggestions);
      }
    } catch {
      const aiError: Message = {
        id: crypto.randomUUID(),
        sender: "ai",
        text: "Sorry, I am currently unable to process your request. Please try contacting Vivek directly via email!",
      };
      setMessages((prev) => [...prev, aiError]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 pb-24 sm:pb-28 bg-background/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md h-[480px] sm:h-[560px] flex flex-col bg-card border border-border rounded-2xl shadow-2xl overflow-hidden glass">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
          <div>
            <h3 className="text-base font-extrabold text-foreground tracking-tight">
              Ask AI Assistant
            </h3>
            <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
              Powered by Groq &amp; Gemini
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleResetChat}
              title="Reset Conversation"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              title="Close"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* AI Avatar */}
              {msg.sender === "ai" && (
                <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Message Bubble - Matching Image 2 */}
              <div
                className={`max-w-[82%] px-4 py-3 text-xs leading-relaxed whitespace-pre-line shadow-xs ${
                  msg.sender === "user"
                    ? "bg-foreground text-background font-semibold rounded-2xl rounded-tr-xs"
                    : "bg-muted/80 text-foreground border border-border/60 rounded-2xl rounded-tl-xs"
                }`}
              >
                {msg.text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                      <strong key={index} className="font-extrabold underline decoration-primary/40">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return part;
                })}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground italic pl-1">
              <Bot className="w-3.5 h-3.5 animate-bounce text-emerald-500" />
              <span>AI is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2 border-t border-border/40 bg-muted/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-muted-foreground shrink-0 pl-1">
            💡 Try asking:
          </span>
          {suggestions.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar - Matching Image 2 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 border-t border-border flex items-center gap-2 bg-card"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask about my projects..."
            className="flex-1 text-xs bg-muted/50 border border-border rounded-full px-4 py-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 rounded-full bg-foreground text-background hover:opacity-90 disabled:opacity-50 transition-opacity shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
