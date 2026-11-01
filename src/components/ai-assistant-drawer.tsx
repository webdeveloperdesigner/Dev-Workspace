"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "./language-provider";
import { dictionary } from "@/lib/dictionary";
import { Bot, X, Send, RotateCcw, Check, Copy, Mail, ExternalLink, Info, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  source?: "gemini" | "groq" | "offline";
}

const STORAGE_KEY = "vk_ai_chat_session_v1";
const SESSION_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes inactivity expiry
const MAX_STORED_MESSAGES = 60; // Tab-session bounds
const MAX_MESSAGE_LENGTH = 10000;

interface StoredSessionData {
  timestamp: number;
  messages: Message[];
  suggestions?: string[];
}

/**
 * Safely parses and validates stored session messages to prevent injection,
 * corruption, or invalid schema tampering.
 */
function loadSecureSessionMessages(): {
  messages: Message[];
  suggestions?: string[];
} | null {
  if (typeof window === "undefined") return null;

  try {
    const rawData = sessionStorage.getItem(STORAGE_KEY);
    if (!rawData) return null;

    const parsed: unknown = JSON.parse(rawData);
    if (!parsed || typeof parsed !== "object") return null;

    const data = parsed as Partial<StoredSessionData>;
    const now = Date.now();

    // Inactivity expiration check (30 minutes)
    if (!data.timestamp || typeof data.timestamp !== "number" || now - data.timestamp > SESSION_EXPIRY_MS) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }

    if (!Array.isArray(data.messages) || data.messages.length === 0) {
      return null;
    }

    // Strict validation of each message
    const validatedMessages: Message[] = [];
    for (const msg of data.messages) {
      if (
        msg &&
        typeof msg === "object" &&
        (msg.sender === "user" || msg.sender === "ai") &&
        typeof msg.text === "string" &&
        typeof msg.id === "string"
      ) {
        // Enforce safe message length and truncate if excessive
        const safeText = msg.text.slice(0, MAX_MESSAGE_LENGTH);
        const validSource =
          msg.source === "groq" || msg.source === "gemini" || msg.source === "offline"
            ? msg.source
            : undefined;

        validatedMessages.push({
          id: msg.id,
          sender: msg.sender,
          text: safeText,
          source: validSource,
        });
      }
    }

    if (validatedMessages.length === 0) return null;

    // Validate suggestions array if present
    const validSuggestions =
      Array.isArray(data.suggestions) && data.suggestions.every((s) => typeof s === "string" && s.length < 100)
        ? data.suggestions.slice(0, 15)
        : undefined;

    return {
      messages: validatedMessages.slice(-MAX_STORED_MESSAGES),
      suggestions: validSuggestions,
    };
  } catch {
    // Corrupted JSON or storage failure handled safely
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore sessionStorage access errors (e.g. private mode blocked)
    }
    return null;
  }
}

/**
 * Safely saves session messages without sensitive information or quota errors
 */
function saveSecureSession(messages: Message[], suggestions?: string[]) {
  if (typeof window === "undefined") return;

  try {
    const payload: StoredSessionData = {
      timestamp: Date.now(),
      messages: messages.slice(-MAX_STORED_MESSAGES),
      suggestions,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Gracefully handle storage quota or security policy limits
  }
}

function clearSecureSession() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore error
  }
}

/**
 * Rich message renderer for Bot responses
 * Parses markdown headings (###, ##), bullet points (*, -), bold text (**text**), and inline code (`code`)
 */
function FormattedAiResponse({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lines = content.split("\n");

  const renderContactLine = (text: string) => {
    // Only turn into dedicated card if the line is strictly a dedicated contact link line
    // (e.g. "- Email: ...", "* LinkedIn: ...", "GitHub: ..."), NOT a full sentence containing multiple links!
    const isContactLineOnly =
      text.length < 120 &&
      (text.startsWith("- ") || text.startsWith("* ") || /^(?:Email|LinkedIn|GitHub):/i.test(text.trim()));

    if (!isContactLineOnly) {
      return null;
    }

    // Detect Email
    const emailMatch = text.match(/(?:Email:?\s*)?\[(.*?)\]\((mailto:.*?)\)/i);
    if (emailMatch || (text.includes("mailto:") && !text.includes("linkedin.com") && !text.includes("github.com"))) {
      const label = emailMatch ? emailMatch[1] : text.replace(/.*?(vivek[^\s]+@[^\s]+).*/, "$1");
      const href = emailMatch ? emailMatch[2] : `mailto:${label}`;
      return (
        <div className="flex items-center gap-2 py-1 px-2.5 rounded-lg bg-muted/40 border border-border/40 hover:bg-muted/70 transition-colors my-1">
          <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-foreground text-[11px] shrink-0">Email:</span>
          <a
            href={href}
            className="text-emerald-500 hover:text-emerald-400 font-medium underline truncate text-[11px]"
          >
            {label}
          </a>
        </div>
      );
    }

    // Detect LinkedIn (only if not also containing github on same line)
    const linkedInMatch = text.match(/(?:LinkedIn:?\s*)?\[(.*?)\]\((https?:\/\/.*?linkedin\.com.*?)\)/i);
    if (linkedInMatch && !text.toLowerCase().includes("github.com")) {
      const label = linkedInMatch[1] || "linkedin.com/in/vivek-vns";
      const href = linkedInMatch[2];
      return (
        <div className="flex items-center gap-2 py-1 px-2.5 rounded-lg bg-muted/40 border border-border/40 hover:bg-muted/70 transition-colors my-1">
          <div className="w-6 h-6 rounded-md bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center shrink-0">
            <FaLinkedin className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-foreground text-[11px] shrink-0">LinkedIn:</span>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-400 font-medium underline flex items-center gap-1 truncate text-[11px]"
          >
            <span className="truncate">{label}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60 shrink-0" />
          </a>
        </div>
      );
    }

    // Detect GitHub (only if not also containing linkedin on same line)
    const githubMatch = text.match(/(?:GitHub:?\s*)?\[(.*?)\]\((https?:\/\/.*?github\.com.*?)\)/i);
    if (githubMatch && !text.toLowerCase().includes("linkedin.com")) {
      const label = githubMatch[1] || "github.com/webdeveloperdesigner";
      const href = githubMatch[2];
      return (
        <div className="flex items-center gap-2 py-1 px-2.5 rounded-lg bg-muted/40 border border-border/40 hover:bg-muted/70 transition-colors my-1">
          <div className="w-6 h-6 rounded-md bg-foreground/10 text-foreground flex items-center justify-center shrink-0">
            <FaGithub className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-foreground text-[11px] shrink-0">GitHub:</span>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-400 font-medium underline flex items-center gap-1 truncate text-[11px]"
          >
            <span className="truncate">{label}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60 shrink-0" />
          </a>
        </div>
      );
    }

    return null;
  };

  const renderInlineFormatted = (text: string) => {
    // Matches markdown links [label](url), bold **bold**, or `code`
    const tokenRegex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g;
    const parts = text.split(tokenRegex);

    return parts.map((part, i) => {
      // Check for Markdown Link: [label](url)
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const [, label, url] = linkMatch;
        const isEmail = url.startsWith("mailto:") || label.includes("@");

        return (
          <a
            key={i}
            href={url}
            target={isEmail ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-400 underline font-medium inline-flex items-center gap-1 break-all mx-0.5"
          >
            <span>{label}</span>
            {!isEmail && <ExternalLink className="w-2.5 h-2.5 opacity-60 inline shrink-0" />}
          </a>
        );
      }

      // Check for Bold: **text**
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Check for Inline Code: `code`
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-muted text-emerald-500 border border-border/50"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      return part;
    });
  };

  return (
    <div className="relative group">
      <div className="space-y-1.5 text-xs leading-relaxed text-foreground/90">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }

          // Check if this line is a contact line (Email / LinkedIn / GitHub)
          const contactElement = renderContactLine(trimmed);
          if (contactElement) {
            return <React.Fragment key={idx}>{contactElement}</React.Fragment>;
          }

          // Heading 3 or 2 (### Heading or ## Heading)
          if (trimmed.startsWith("### ") || trimmed.startsWith("## ")) {
            const headingText = trimmed.replace(/^#{2,3}\s+/, "");
            return (
              <div
                key={idx}
                className="pt-2 pb-1 border-b border-border/40 text-xs font-bold tracking-tight text-foreground flex items-center gap-1.5"
              >
                <span>{renderInlineFormatted(headingText)}</span>
              </div>
            );
          }

          // Bullet points (* or -)
          if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
            const bulletText = trimmed.slice(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 mt-1.5 shrink-0" />
                <span className="flex-1">{renderInlineFormatted(bulletText)}</span>
              </div>
            );
          }

          // Regular paragraph line
          return (
            <p key={idx} className="leading-relaxed">
              {renderInlineFormatted(trimmed)}
            </p>
          );
        })}
      </div>

      {/* Quick Action copy button */}
      <button
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-1 right-1 p-1 rounded-md bg-background/80 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/40 text-[10px] flex items-center gap-1"
        title="Copy response"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-emerald-500" />
            <span className="text-emerald-500">Copied</span>
          </>
        ) : (
          <Copy className="w-3 h-3" />
        )}
      </button>
    </div>
  );
}

export function AiAssistantDrawer({ isOpen, onClose }: AiAssistantDrawerProps) {
  const { language } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting =
    language === "hi"
      ? "नमस्ते! मैं विवेक का AI असिस्टेंट हूँ। उनके प्रोजेक्ट्स, स्किल्स या अनुभव के बारे में मुझसे कुछ भी पूछें!"
      : "Hi there! I'm Vivek's AI assistant. Ask me anything about his projects, skills, or experience!";

  const defaultSuggestions = [
    "Tell me about Vivek",
    "Skills & Tech Stack",
    "Certifications & Achievements",
    "Explore All Projects",
    "Work Experience",
    "Education Details",
    "Contact",
    "Latest Announcements",
    "Open Desktop Portfolio"
  ];

  const [showNotice, setShowNotice] = useState(true);
  const [isLiveOnline, setIsLiveOnline] = useState(true);
  const [messages, setMessages] = useState<Message[]>(() => {
    const session = loadSecureSessionMessages();
    if (session && session.messages.length > 0) {
      return session.messages;
    }
    return [
      {
        id: "1",
        sender: "ai",
        text: initialGreeting,
      },
    ];
  });
  const [suggestions, setSuggestions] = useState<string[]>(() => {
    const session = loadSecureSessionMessages();
    return session?.suggestions || defaultSuggestions;
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Persist messages to secure sessionStorage on update
  useEffect(() => {
    // Only persist if we have more than just the initial default greeting, or if restored
    if (messages.length > 1 || (messages.length === 1 && messages[0].sender === "user")) {
      saveSecureSession(messages, suggestions);
    }
  }, [messages, suggestions]);

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
    // 1. Remove stored conversation from sessionStorage
    clearSecureSession();

    // 2. Clear state & restore default greeting
    setMessages([
      {
        id: crypto.randomUUID(),
        sender: "ai",
        text: initialGreeting,
      },
    ]);
    setSuggestions(defaultSuggestions);
    setInput("");
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
      const isOnlineSource = data.source === "groq" || data.source === "gemini";
      setIsLiveOnline(isOnlineSource);

      const aiMsg: Message = {
        id: crypto.randomUUID(),
        sender: "ai",
        text: data.reply || "Thank you for reaching out!",
        source: data.source,
      };
      setMessages((prev) => [...prev, aiMsg]);

      if (data.suggestions && Array.isArray(data.suggestions)) {
        setSuggestions(data.suggestions);
      }
    } catch {
      setIsLiveOnline(false);
      const aiError: Message = {
        id: crypto.randomUUID(),
        sender: "ai",
        text: "Sorry, I am currently unable to process your request. Please try contacting Vivek directly via email!",
        source: "offline",
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
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-foreground tracking-tight">
                Ask AI Assistant
              </h3>
              {isLiveOnline ? (
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold animate-in fade-in duration-300">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              ) : (
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-muted text-muted-foreground border border-border/40 font-medium">
                  Knowledge Base
                </span>
              )}
            </div>
            <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
              {isLiveOnline ? "Powered by Groq & Gemini" : "Offline Knowledge Base"}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowNotice((prev) => !prev)}
              title={showNotice ? "Hide Notice" : "Show Notice"}
              className={`p-1.5 rounded-lg transition-colors ${
                showNotice
                  ? "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Info className="w-4 h-4" />
            </button>
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

        {/* Notice Mode Banner */}
        {showNotice && (
          <div className="px-3.5 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20 text-xs flex items-center justify-between gap-2.5 transition-all animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center gap-2 min-w-0">
              <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400 shrink-0">
                <Sparkles className="size-3.5" />
              </span>
              <p className="text-[11px] leading-tight text-emerald-300">
                <span className="font-bold text-foreground">Notice:</span> AI Assistant updates are in progress. We&apos;re working to make your experience smarter, faster, and more accurate.
              </p>
            </div>
            <button
              onClick={() => setShowNotice(false)}
              className="text-muted-foreground hover:text-foreground p-0.5 rounded transition-colors shrink-0"
              title="Dismiss Notice"
            >
              <X className="size-3.5" />
            </button>
          </div>
        )}

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

              {/* Message Bubble */}
              <div className="flex flex-col gap-1 max-w-[85%]">
                {msg.sender === "user" ? (
                  <div className="px-4 py-2.5 text-xs leading-relaxed bg-foreground text-background font-semibold rounded-2xl rounded-tr-xs shadow-xs">
                    {msg.text}
                  </div>
                ) : (
                  <div className="px-4 py-3 bg-card border border-border/70 rounded-2xl rounded-tl-xs shadow-xs hover:border-border transition-colors">
                    <FormattedAiResponse content={msg.text} />
                  </div>
                )}
                {msg.sender === "ai" && msg.source && (
                  <span className="text-[10px] font-mono text-muted-foreground/80 px-1 self-start flex items-center gap-1.5">
                    {msg.source === "offline" ? (
                      <span className="text-muted-foreground/60">Portfolio Knowledge Base</span>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        ⚡ Live via {msg.source === "groq" ? "Groq Qwen" : "Gemini"}
                      </>
                    )}
                  </span>
                )}
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
