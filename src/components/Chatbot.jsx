import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { greeting, getReply } from "../data/chatbot.js";

/* Built-in assistant. Replies come from getReply() (keyword-matched over the
   site knowledge base) — swap that one call for a fetch() to your own
   /api/chat endpoint to power it with a real LLM, the UI stays the same. */
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: greeting.text, chips: greeting.chips },
  ]);

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Auto-scroll to the latest message / typing indicator.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  // Focus the input when the panel opens; close on Escape.
  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const send = (raw) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    const reply = getReply(text);
    timerRef.current = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { from: "bot", text: reply.text || reply.answer, link: reply.link, chips: reply.chips },
      ]);
    }, 550 + Math.random() * 500);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send();
  };

  return (
    <>
      <button
        type="button"
        className={`chatbot-fab ${open ? "is-open" : ""}`}
        aria-label={open ? "Close assistant" : "Open assistant"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <svg className="chatbot-fab__chat" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20l1.1-4.3A8.5 8.5 0 1 1 21 11.5z" />
          <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
        </svg>
        <svg className="chatbot-fab__close" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {open && (
        <div className="chatbot" role="dialog" aria-label="Beta Tech Hub assistant">
          <header className="chatbot__head">
            <span className="chatbot__avatar" aria-hidden="true">🛡️</span>
            <div className="chatbot__id">
              <strong>Beta Assistant</strong>
              <span className="chatbot__status">Online · typically replies instantly</span>
            </div>
            <button type="button" className="chatbot__x" aria-label="Close" onClick={() => setOpen(false)}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </header>

          <div className="chatbot__msgs" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chatbot__row chatbot__row--${m.from}`}>
                <div className={`chatbot__bubble chatbot__bubble--${m.from}`}>
                  {m.text}
                  {m.link && (
                    <Link to={m.link.to} className="chatbot__link" onClick={() => setOpen(false)}>
                      {m.link.label} →
                    </Link>
                  )}
                </div>
                {m.from === "bot" && m.chips && (
                  <div className="chatbot__chips">
                    {m.chips.map((c) => (
                      <button type="button" className="chatbot__chip" key={c} onClick={() => send(c)}>
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="chatbot__row chatbot__row--bot">
                <div className="chatbot__bubble chatbot__bubble--bot chatbot__typing" aria-label="Assistant is typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          <form className="chatbot__input" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, pricing, GRC…"
              aria-label="Type your message"
            />
            <button type="submit" className="chatbot__send" aria-label="Send" disabled={!input.trim() || typing}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
