import React from "react";
import "./App.css";
import ChatWidget from "./ChatWidget";

const App: React.FC = () => {
  return (
    <div className="app-root">
      {/* Brand bar */}
      <header className="brand-bar">
        <div className="container brand-inner">
          <img src="/vite.svg" alt="Brand logo" className="logo-mark" />
          <div className="brand-title">Ծառայությունների միասնական հարթակ</div>
        </div>
      </header>

      {/* Holiday strip */}
      <div className="holiday-strip">
        <div className="container holiday-inner">
          <span className="holiday-label">Հաջորդ ոչ աշխատանքային օրը</span>
          <span>│</span>
          <a href="#holiday" className="holiday-link">
            08.03 - Կանանց միջազգային օր
          </a>
        </div>
      </div>

      {/* Beta strip */}
      <div className="beta-strip">
        <div className="container beta-inner">
          <span className="beta-pill">ԲԵՏԱ</span>
          <span>
            Հարթակը մշակման փուլում է։ Ձեր կարծիքը կոգնել մեզ մեզ հարցնել։
          </span>
        </div>
      </div>

      {/* Hero */}
      <main className="hero">
        <div className="container hero-inner">
          <section className="hero-left" aria-labelledby="hero-title">
            <div className="eyebrow">Այստեղ կգտնես</div>

            <h1 id="hero-title" className="hero-title">
              <span>Ծaրայություններ</span>
              <span>և տեղեկատվություն</span>
              <span>մեկ հարթակում</span>
            </h1>

            <div className="search-wrapper">
              <div className="search-box">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Որоnum"
                />
                <button className="search-button" type="button" aria-label="Որоnел">
                  <span>🔍</span>
                </button>
              </div>
            </div>
          </section>

          <aside className="hero-illustration" aria-hidden="true">
            <img
              src="/main.png"
              alt="Illustration showing family and social support"
              className="hero-illustration-img"
            />
          </aside>
        </div>

        <div className="container hero-bottom">
          <h2 className="section-title">Անցյալում դիտված էջեր</h2>

          <div className="feedback-banner">
            <span>Այս էջը օգտակա՞ր էր
</span>
            <span className="feedback-actions">
              <button type="button" aria-label="Լավ է">👍</button>
              <button type="button" aria-label="Վատ է">👎</button>
            </span>
            <span className="feedback-close">×</span>
          </div>
        </div>
      </main>

      {/* Custom Chat Widget — replaces n8n embed script */}
      <ChatWidget />
    </div>
  );
};

export default App;
