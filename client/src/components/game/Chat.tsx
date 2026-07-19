"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";

import { ChatMessage } from "@/types/chat";

interface ChatProps {
  messages: ChatMessage[];
  onSend: (message: ChatMessage) => void;
}

const Chat = ({ messages, onSend }: ChatProps) => {
  const [value, setValue] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const submit = () => {
    const text = value.trim();

    if (!text) return;

    onSend({
      id: crypto.randomUUID(),
      sender: "You",
      message: text,
      createdAt: Date.now(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    setValue("");
  };

  return (
    <aside className="flex h-[78vh] min-h-0 w-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h2 className="text-lg font-bold text-text">Chat</h2>
          <p className="text-xs text-text-muted">{messages.length} Messages</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2">
          <MessageCircle size={20} className="text-primary-light" />
        </div>
      </div>

      {/* Messages */}
      <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto p-3">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-text-muted">No messages yet...</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`truncate text-xs font-semibold ${
                    msg.isSystem
                      ? "text-warning"
                      : msg.isCorrect
                        ? "text-success"
                        : "text-primary-light"
                  }`}
                >
                  {msg.sender}
                </span>

                <span className="shrink-0 text-[10px] text-text-muted">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div
                className={`inline-block max-w-full break-words rounded-xl px-3 py-2 text-sm ${
                  msg.isSystem
                    ? "bg-warning/15 text-warning"
                    : msg.isCorrect
                      ? "bg-success/15 text-success"
                      : "bg-surface-2 text-text"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Type your guess..."
            className="h-11 flex-1 rounded-xl border border-border bg-surface-2 px-4 text-sm text-text placeholder:text-text-muted outline-none transition focus:border-primary"
          />

          <button
            onClick={submit}
            disabled={!value.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Chat;
