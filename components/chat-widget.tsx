"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X, Send, Loader2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatWidgetProps {
  context: "homepage" | "blog";
  slug?: string;
}

interface SelectionPopup {
  text: string;
  top: number;
  left: number;
}

const starterQuestions: Record<string, string[]> = {
  homepage: [
    "What are Nil's latest projects?",
    "Tell me about his book",
    "What did Nil do at Google?",
    "What was Nil's PhD research about?",
  ],
  blog: [
    "Summarize this post",
    "What's the key takeaway?",
    "Explain the main concept",
  ],
};

function getMessageText(message: { parts: Array<{ type: string; text?: string }> }): string {
  return message.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("");
}

// Matches **bold**, *italic*, [link](url), bare URLs (https://... or domain.tld/...)
const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s)]*)?)/g;

function renderFormattedText(text: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regex = new RegExp(tokenRegex.source, "g");

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      result.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*") && token.endsWith("*")) {
      result.push(<em key={match.index}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith("[")) {
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const href = linkMatch[2].startsWith("http") ? linkMatch[2] : `https://${linkMatch[2]}`;
        result.push(
          <a key={match.index} href={href} target="_blank" rel="noopener noreferrer" className="underline">{linkMatch[1]}</a>
        );
      }
    } else {
      const href = token.startsWith("http") ? token : `https://${token}`;
      result.push(
        <a key={match.index} href={href} target="_blank" rel="noopener noreferrer" className="underline">{token}</a>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }
  return result;
}

export default function ChatWidget({ context, slug }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [popup, setPopup] = useState<SelectionPopup | null>(null);
  const [quoted, setQuoted] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLButtonElement>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ body: { context, slug } }),
    [context, slug]
  );

  const { messages, sendMessage, status, error } = useChat({
    transport,
    onError: () => {},
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // "Ask about this": show a floating button when the user selects text on the page
  useEffect(() => {
    function handleMouseUp(e: MouseEvent) {
      // Ignore mouseups on the popup button itself
      if (popupRef.current && popupRef.current.contains(e.target as Node)) return;

      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setPopup(null);
        return;
      }
      const text = sel.toString().trim();
      if (text.length < 2) {
        setPopup(null);
        return;
      }
      // Ignore selections made inside the chat panel (e.g. copying a reply)
      if (panelRef.current && panelRef.current.contains(sel.anchorNode)) {
        setPopup(null);
        return;
      }
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      if (!rect || (rect.width === 0 && rect.height === 0)) {
        setPopup(null);
        return;
      }
      setPopup({ text, top: rect.top, left: rect.left + rect.width / 2 });
    }

    function handleMouseDown(e: MouseEvent) {
      if (popupRef.current && popupRef.current.contains(e.target as Node)) return;
      setPopup(null);
    }

    function clearPopup() {
      setPopup(null);
    }

    // Whenever the selection itself goes away — keyboard caret moves, another
    // selection elsewhere, or a programmatic removeAllRanges() — drop the popup
    // too, so it never outlives the selection it points at.
    function handleSelectionChange() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.toString().trim().length < 2) {
        setPopup(null);
      }
    }

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("selectionchange", handleSelectionChange);
    window.addEventListener("scroll", clearPopup, true);
    window.addEventListener("resize", clearPopup);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("selectionchange", handleSelectionChange);
      window.removeEventListener("scroll", clearPopup, true);
      window.removeEventListener("resize", clearPopup);
    };
  }, []);

  const handleAskAboutThis = () => {
    if (!popup) return;
    setQuoted(popup.text);
    setIsOpen(true);
    setPopup(null);
    window.getSelection()?.removeAllRanges();
    setTimeout(() => inputRef.current?.focus(), 120);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if ((!q && !quoted) || isLoading) return;
    const text = quoted
      ? `Regarding this excerpt:\n\n"${quoted}"\n\n${q || "Can you explain this?"}`
      : q;
    sendMessage({ text });
    setInput("");
    setQuoted(null);
  };

  const handleStarterClick = (q: string) => {
    sendMessage({ text: q });
  };

  return (
    <>
      {/* "Ask about this" floating button on text selection */}
      {popup && (
        <button
          ref={popupRef}
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleAskAboutThis}
          style={{
            position: "fixed",
            top: popup.top,
            left: popup.left,
            transform: "translate(-50%, calc(-100% - 8px))",
          }}
          className="z-[60] flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Ask about this
        </button>
      )}

      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed bottom-6 right-6 z-50 flex w-[min(400px,calc(100vw-3rem))] flex-col rounded-xl border bg-background shadow-2xl sm:h-[500px] h-[min(500px,calc(100vh-6rem))]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="font-semibold">
                {context === "homepage" ? "Ask about Nil" : "Ask about this post"}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 hover:bg-muted"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-4 py-3" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground mb-2">
                  {context === "homepage"
                    ? "Ask me anything about Nil!"
                    : "Ask me about this blog post!"}
                </p>
                {starterQuestions[context].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleStarterClick(q)}
                    className="rounded-lg border px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                  >
                    {q}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{renderFormattedText(getMessageText(m))}</p>
                    </div>
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="rounded-lg bg-muted px-3 py-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            )}
            {error && (
              <p className="mt-2 text-sm text-destructive">
                {error.message?.includes("credit") || error.message?.includes("balance")
                  ? "The chatbot has run out of credits for this month. Please try again next month!"
                  : "Something went wrong. Please try again."}
              </p>
            )}
          </ScrollArea>

          {/* Footer */}
          <div className="border-t px-4 py-2">
            {quoted && (
              <div className="mb-2 flex items-start gap-2 rounded-md border bg-muted/50 px-2 py-1.5 text-xs text-muted-foreground">
                <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-2 flex-1 italic">{quoted}</span>
                <button
                  onClick={() => setQuoted(null)}
                  aria-label="Remove quoted text"
                  className="shrink-0 rounded p-0.5 hover:bg-muted"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={quoted ? "Ask about the selected text..." : "Type a message..."}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading || (!input.trim() && !quoted)}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
              Powered by Claude
            </p>
          </div>
        </div>
      )}
    </>
  );
}
