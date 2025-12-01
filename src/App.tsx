import React from "react";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-root">
      {/* Brand bar */}
          <header className="brand-bar">
        <div className="container brand-inner">
          {/* Logo: replaced text mark with public/vite.svg */}
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
            31․12 - Ամանոր →
          </a>
        </div>
      </div>

      {/* Beta strip */}
      <div className="beta-strip">
        <div className="container beta-inner">
          <span className="beta-pill">ԲԵՏԱ</span>
          <span>
            Հարթակը մշակման փուլում է։ Ձեր կարծիքը կօգնի մեզ բարելավել այն։
          </span>
        </div>
      </div>

      {/* Hero */}
      <main className="hero">
        <div className="container hero-inner">
          <section className="hero-left" aria-labelledby="hero-title">
            <div className="eyebrow">Ասենք գործի</div>

            <h1 id="hero-title" className="hero-title">
              <span>Ծառայություններ</span>
              <span>և թվեակատուությունը</span>
              <span>մեկ հարթակում</span>
            </h1>

            <div className="search-wrapper">
              <div className="search-box">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Որոնում"
                />
                <button
                  className="search-button"
                  type="button"
                  aria-label="Որոնել"
                >
                  <span>🔍</span>
                </button>
              </div>
            </div>
          </section>

          <aside className="hero-illustration" aria-hidden="true">
            {/* Illustration - replaced placeholder with public/main.png */}
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
            <span>Այս էջը օգտակա՞ր էր</span>
            <span className="feedback-actions">
              <button type="button" aria-label="Լավ էր">
                👍
              </button>
              <button type="button" aria-label="Վատ էր">
                👎
              </button>
            </span>
            <span className="feedback-close">×</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
