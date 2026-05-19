import { useState, useEffect, useRef } from "react";
import { hc } from "hono/client";
import type { AppType } from "../../api/index";

const client = hc<AppType>(window.location.origin);

// Social links data
const socialLinks = [
  {
    name: "Telegram",
    handle: "@tapokoktok",
    url: "https://t.me/tapokoktiktok",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    bg: "linear-gradient(135deg, #229ED9, #1a7fbf)",
    color: "#229ED9",
    noLink: false,
  },
  {
    name: "TikTok",
    handle: "@entoshe0",
    url: "https://www.tiktok.com/@entoshe0",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.15 8.15 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
      </svg>
    ),
    bg: "linear-gradient(135deg, #010101, #69C9D0)",
    color: "#69C9D0",
    noLink: false,
  },
  {
    name: "YouTube",
    handle: "@tapokok_ok",
    url: "https://youtube.com/@tapokok_ok?si=We5MpRnCOL_FbpIV",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    bg: "linear-gradient(135deg, #FF0000, #cc0000)",
    color: "#FF4444",
    noLink: false,
  },
  {
    name: "Discord",
    handle: "@tapokok",
    url: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.111 18.1.12 18.12a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
    bg: "linear-gradient(135deg, #5865F2, #4752c4)",
    color: "#5865F2",
    noLink: true,
  },
  {
    name: "Steam",
    handle: "tapok profile",
    url: "https://steamcommunity.com/profiles/76561199667684645/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.029 4.524 4.524s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.298-.249-1.878-.03l1.523.63c.956.4 1.409 1.497 1.009 2.453-.4.957-1.497 1.41-2.454 1.011zM17.219 8.907c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
      </svg>
    ),
    bg: "linear-gradient(135deg, #1b2838, #2a475e)",
    color: "#66c0f4",
    noLink: false,
  },
  {
    name: "итд.com",
    handle: "@tapok_itd",
    url: "https://xn--d1ah4a.com/@tapok_itd",
    icon: (
      <img src="/itd-logo.png" alt="итд" width="28" height="28" style={{ objectFit: "contain", borderRadius: "6px", background: "white", padding: "2px" }} />
    ),
    bg: "linear-gradient(135deg, #2c2c2c, #1a1a1a)",
    color: "#cccccc",
    noLink: false,
  },
];

// Format time ago
function timeAgo(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "только что";
  if (diff < 3600) return `${Math.floor(diff / 60)} мин назад`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ч назад`;
  return `${Math.floor(diff / 86400)} дн назад`;
}

type Tab = "home" | "links" | "wall";

interface WallMessage {
  id: number;
  author: string;
  message: string;
  createdAt: string | number;
}

export default function Index() {
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState<Tab>("home");
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [wallMessages, setWallMessages] = useState<WallMessage[]>([]);
  const [wallLoading, setWallLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const incrementedRef = useRef(false);

  // Loader
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Visitor counter
  useEffect(() => {
    if (!incrementedRef.current) {
      incrementedRef.current = true;
      fetch("/api/visitors/increment", { method: "POST" })
        .then((r) => r.json())
        .then((d: { count: number }) => setVisitorCount(d.count))
        .catch(() => {});
    }
  }, []);

  // Load wall messages
  useEffect(() => {
    if (tab === "wall") loadWall();
  }, [tab]);

  async function loadWall() {
    setWallLoading(true);
    try {
      const res = await fetch("/api/wall");
      const data = await res.json() as { messages: WallMessage[] };
      setWallMessages(data.messages || []);
    } catch {
      // ignore
    } finally {
      setWallLoading(false);
    }
  }

  async function submitMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/wall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, message }),
      });
      if (!res.ok) {
        const err = await res.json() as { error: string };
        setSubmitError(err.error || "Ошибка");
        return;
      }
      setAuthor("");
      setMessage("");
      await loadWall();
    } catch {
      setSubmitError("Ошибка отправки");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Loader */}
      <div className={`loader-overlay${loaded ? " hidden" : ""}`}>
        <div className="loader-ring" />
        <div className="loader-text">TAPOK</div>
      </div>

      {/* BG blobs */}
      <div className="bg-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>

      {/* Main */}
      <div className="main-content">
        {/* HOME TAB */}
        {tab === "home" && (
          <div className="hero-section fade-in">
            <div className="tapok-card">
              <div className="tapok-title">TAPOK</div>
              <div className="tapok-subtitle">личная страница</div>
            </div>
            <div className="scroll-hint" onClick={() => setTab("links")} style={{ cursor: "pointer" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
              <span>ССЫЛКИ</span>
            </div>
          </div>
        )}

        {/* LINKS TAB */}
        {tab === "links" && (
          <div className="section fade-in">
            <div className="section-title">Мои соц сети</div>
            {socialLinks.map((link) =>
              link.noLink ? (
                <div key={link.name} className="social-link no-link">
                  <div
                    className="social-icon"
                    style={{ background: link.bg, color: "white", boxShadow: `0 4px 12px ${link.color}55` }}
                  >
                    {link.icon}
                  </div>
                  <div className="social-info">
                    <div className="social-name">{link.name}</div>
                    <div className="social-handle">{link.handle}</div>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(168,237,255,0.35)", fontWeight: 700 }}>копируй ник</span>
                </div>
              ) : (
                <a key={link.name} href={link.url!} target="_blank" rel="noopener noreferrer" className="social-link">
                  <div
                    className="social-icon"
                    style={{ background: link.bg, color: "white", boxShadow: `0 4px 12px ${link.color}55` }}
                  >
                    {link.icon}
                  </div>
                  <div className="social-info">
                    <div className="social-name">{link.name}</div>
                    <div className="social-handle">{link.handle}</div>
                  </div>
                  <div className="social-arrow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </a>
              )
            )}
          </div>
        )}

        {/* WALL TAB */}
        {tab === "wall" && (
          <div className="section fade-in">
            <div className="section-title">Стена</div>
            <form className="wall-form" onSubmit={submitMessage}>
              <input
                className="wall-input"
                placeholder="Твоё имя..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                maxLength={50}
                style={{ display: "block" }}
              />
              <textarea
                className="wall-input"
                placeholder="Оставь сообщение..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={300}
                rows={3}
                style={{ display: "block" }}
              />
              {submitError && (
                <div style={{ color: "#ff6b6b", fontSize: "0.85rem", fontWeight: 700, marginBottom: 8 }}>
                  {submitError}
                </div>
              )}
              <button className="wall-btn" type="submit" disabled={submitting || !author.trim() || !message.trim()}>
                {submitting ? "Отправляю..." : "Оставить сообщение"}
              </button>
            </form>

            {wallLoading ? (
              <div className="empty-state">Загружаю...</div>
            ) : wallMessages.length === 0 ? (
              <div className="empty-state">Будь первым! Оставь сообщение 👇</div>
            ) : (
              wallMessages.map((m) => (
                <div key={m.id} className="wall-message">
                  <div className="wall-msg-author">{m.author}</div>
                  <div className="wall-msg-text">{m.message}</div>
                  <div className="wall-msg-time">
                    {timeAgo(new Date(typeof m.createdAt === "number" ? m.createdAt * 1000 : m.createdAt))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Visitor counter */}
      <div className="visitor-counter">
        <div className="visitor-dot" />
        {visitorCount !== null ? `${visitorCount} посетителей` : "..."}
      </div>

      {/* Bottom nav */}
      <div className="bottom-nav">
        <div className="bottom-nav-inner">
          <button className={`nav-btn${tab === "home" ? " active" : ""}`} onClick={() => setTab("home")}>
            Главная
          </button>
          <button className={`nav-btn${tab === "links" ? " active" : ""}`} onClick={() => setTab("links")}>
            Ссылки
          </button>
          <button className={`nav-btn${tab === "wall" ? " active" : ""}`} onClick={() => setTab("wall")}>
            Стена
          </button>
        </div>
      </div>
    </>
  );
}
