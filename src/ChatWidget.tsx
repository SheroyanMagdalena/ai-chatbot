import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

const STARTER_PROMPTS = [
  "Առցանց եղանակով վաճառել կամ գնել ավտոմեքենա",
  "Ի՞նչ է «ԵսԵմ» նույնականացման հարթակը, և ինչո՞պես մո",
  "Եկամուտների հայտարարագրում. ի՞նչ է պետք անել",
];

const BOT_AVATAR = "https://hartak.am/_ipx/_/cms/6ec6cba0-6f09-427e-aade-28196cdc8c0d.svg";
const HEADER_AVATAR = "https://hartak.am/_ipx/_/cms/c61969de-ec42-41d6-92a5-5c080a2c67c0.svg";
const USER_AVATAR = "https://www.svgrepo.com/show/532363/user-alt-1.svg";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: "Ողջույն 👋  Ինչո՞վ կարող եմ օգնել",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).slice(2));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatInput: text.trim(),
          sessionId,
        }),
      });

      const data = await res.json();
      const botText =
        data?.output ||
        data?.text ||
        data?.message ||
        data?.response ||
        "Կներեք, սխալ տեղի ունեցավ։";

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + "_bot", role: "bot", content: botText },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_err",
          role: "bot",
          content: "Կներեք, կապի խնդիր կա։ Խնդրում ենք կրկին փորձել։",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div style={styles.window}>
          {/* Header */}
          <div style={styles.header}>
            <img src={HEADER_AVATAR} alt="logo" style={styles.headerAvatar} />
            <span style={styles.headerTitle}>Ծառայությունների միասնական հարթակ</span>
            <div style={styles.headerActions}>
              <button style={styles.iconBtn} title="Refresh" onClick={() => setMessages([{ id: "welcome", role: "bot", content: "Ողջույն 👋  Ինչո՞վ կարող եմ օգնել" }])}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
              </button>
              <button style={styles.iconBtn} onClick={() => setIsOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={styles.messages}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: "flex", alignItems: "flex-end", gap: 8, flexDirection: msg.role === "user" ? "row-reverse" : "row", marginBottom: 12 }}>
                <img
                  src={msg.role === "bot" ? BOT_AVATAR : USER_AVATAR}
                  alt="avatar"
                  style={msg.role === "bot" ? styles.botAvatarImg : styles.userAvatarImg}
                />
                <div style={msg.role === "bot" ? styles.botBubble : styles.userBubble}>
                  <span style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{msg.content}</span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 12 }}>
                <img src={BOT_AVATAR} alt="avatar" style={styles.botAvatarImg} />
                <div style={styles.botBubble}>
                  <TypingIndicator />
                </div>
              </div>
            )}

            {/* Starter prompts — show only at start */}
            {messages.length === 1 && !isLoading && (
              <div style={styles.starters}>
                {STARTER_PROMPTS.map((p, i) => (
                  <button key={i} style={styles.starterBtn} onClick={() => sendMessage(p)}>
                    {p}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={styles.inputArea}>
            <div style={styles.inputBox}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 200))}
                onKeyDown={handleKeyDown}
                placeholder="Type your query"
                style={styles.textarea}
                rows={1}
              />
              <button style={styles.attachBtn} onClick={() => fileInputRef.current?.click()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                </svg>
              </button>
              <button
                style={{ ...styles.sendBtn, opacity: input.trim() ? 1 : 0.5 }}
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            <p style={styles.footer}>
              Free customizable chat widget for n8n |{" "}
              <a href="https://n8nchatui.com" target="_blank" rel="noreferrer" style={{ color: "#2A4A70", textDecoration: "none" }}>
                n8nchatui.com
              </a>
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            multiple
            style={{ display: "none" }}
          />
        </div>
      )}

      {/* Toggle Button */}
      <button style={styles.fab} onClick={() => setIsOpen((o) => !o)}>
        {isOpen ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 21 6 15"/>
          </svg>
        ) : (
          <img
            src="https://hartak.am/_ipx/_/cms/c61969de-ec42-41d6-92a5-5c080a2c67c0.svg"
            alt="chat"
            style={{ width: 44, height: 44, borderRadius: 12 }}
          />
        )}
      </button>

      <style>{`
        @keyframes blink {
          0%, 80%, 100% { opacity: 0; transform: scale(0.7); }
          40% { opacity: 1; transform: scale(1); }
        }
        .typing-dot { display: inline-block; width: 7px; height: 7px; background: #999; border-radius: 50%; margin: 0 2px; animation: blink 1.4s infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  window: {
    position: "fixed",
    bottom: 110,
    right: 20,
    width: 370,
    maxHeight: 600,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 9999,
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  header: {
    background: "#fff",
    borderBottom: "1px solid #eee",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  headerAvatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    objectFit: "cover",
  },
  headerTitle: {
    flex: 1,
    fontWeight: 600,
    fontSize: 14,
    color: "#1a1a1a",
  },
  headerActions: {
    display: "flex",
    gap: 6,
  },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#555",
    padding: 4,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "16px 14px",
    display: "flex",
    flexDirection: "column",
  },
  botAvatarImg: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
    background: "#2A4A70",
    padding: 2,
  },
  userAvatarImg: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
    background: "#B8C6D8",
    padding: 4,
  },
  botBubble: {
    background: "#DCDCDC",
    color: "#000",
    borderRadius: "18px 18px 18px 4px",
    padding: "10px 14px",
    fontSize: 14,
    maxWidth: "78%",
  },
  userBubble: {
    background: "#B8C6D8",
    color: "#050505",
    borderRadius: "18px 18px 4px 18px",
    padding: "10px 14px",
    fontSize: 14,
    maxWidth: "78%",
  },
  typing: {
    display: "flex",
    alignItems: "center",
    height: 20,
  },
  starters: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 8,
  },
  starterBtn: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 12,
    padding: "9px 14px",
    fontSize: 13,
    color: "#2A4A70",
    cursor: "pointer",
    textAlign: "left",
    transition: "background 0.15s",
  },
  inputArea: {
    borderTop: "1px solid #eee",
    padding: "10px 12px 8px",
    background: "#fff",
  },
  inputBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: "6px 8px",
    gap: 6,
    background: "#fff",
  },
  textarea: {
    flex: 1,
    border: "none",
    outline: "none",
    resize: "none",
    fontSize: 14,
    color: "#1e1e1f",
    background: "transparent",
    fontFamily: "inherit",
    lineHeight: 1.5,
    maxHeight: 80,
    overflowY: "auto",
  },
  attachBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
    display: "flex",
    alignItems: "center",
  },
  sendBtn: {
    background: "#2A4A70",
    border: "none",
    borderRadius: "50%",
    width: 36,
    height: 36,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "opacity 0.2s",
  },
  footer: {
    textAlign: "center",
    fontSize: 11,
    color: "#aaa",
    margin: "6px 0 0",
  },
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "#2A4A70",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 20px rgba(42,74,112,0.4)",
    zIndex: 10000,
    transition: "transform 0.2s",
  },
};

// Typing dots rendered via className
const TypingIndicator = () => (
  <span style={{ display: "flex", alignItems: "center" }}>
    <span className="typing-dot" />
    <span className="typing-dot" />
    <span className="typing-dot" />
  </span>
);

export default ChatWidget;
