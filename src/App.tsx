import React, { useEffect } from "react";
import "./App.css";

const App: React.FC = () => {
  useEffect(() => {
    // Create script tag dynamically
    const script = document.createElement("script");
    script.type = "module";
    script.defer = true;

    script.innerHTML = `
      import Chatbot from "https://cdn.n8nchatui.com/v1/embed.js";

      Chatbot.init({
        "n8nChatUrl": "https://sampleee12.app.n8n.cloud/webhook/29a8fead-5a90-403d-b164-d9e2d33898d9/chat",
        "metadata": {},
        "theme": {
          "button": {
            "backgroundColor": "#2A4A70",
            "right": 20,
            "bottom": 20,
            "size": 80,
            "iconColor": "#fafafa",
            "customIconSrc": "https://hartak.am/_ipx/_/cms/c61969de-ec42-41d6-92a5-5c080a2c67c0.svg",
            "customIconSize": 61,
            "customIconBorderRadius": 20,
            "autoWindowOpen": {
              "autoOpen": true,
              "openDelay": 2
            },
            "borderRadius": "rounded"
          },
          "tooltip": {
            "showTooltip": true,
            "tooltipMessage": "Ողջույն 👋  Ինչո՞վ կարող եմ օգնել",
            "tooltipBackgroundColor": "#DCDCDC",
            "tooltipTextColor": "#1c1c1c",
            "tooltipFontSize": 15,
            "hideTooltipOnMobile": false
          },
          "chatWindow": {
            "borderRadiusStyle": "rounded",
            "avatarBorderRadius": 50,
            "messageBorderRadius": 30,
            "showTitle": true,
            "title": "Ծառայությունների միասնական հարթակ",
            "titleAvatarSrc": "https://hartak.am/_ipx/_/cms/c61969de-ec42-41d6-92a5-5c080a2c67c0.svg",
            "avatarSize": 37,
            "welcomeMessage": "Ողջույն 👋  Ինչո՞վ կարող եմ օգնել",
            "backgroundColor": "#ffffff",
            "height": 800,
            "width": 600,
            "fontSize": 20,
            "starterPrompts": [
              "Առցանց եղանակով վաճառել կամ գնել ավտոմեքենա",
              "Ի՞նչ է «ԵսԵմ» նույնականացման հարթակը, և ինչո՞պես մո",
              "Եկամուտների հայտարարագրում. ի՞նչ է պետք անել"
            ],
            "starterPromptFontSize": 2,
            "renderHTML": true,
            "clearChatOnReload": false,
            "showScrollbar": true,
            "botMessage": {
              "backgroundColor": "#DCDCDC",
              "textColor": "#000000",
              "showAvatar": true,
              "avatarSrc": "https://hartak.am/_ipx/_/cms/6ec6cba0-6f09-427e-aade-28196cdc8c0d.svg",
              "showCopyToClipboardIcon": false
            },
            "userMessage": {
              "backgroundColor": "#B8C6D8",
              "textColor": "#050505",
              "showAvatar": true,
              "avatarSrc": "https://www.svgrepo.com/show/532363/user-alt-1.svg"
            },
            "textInput": {
              "placeholder": "Type your query",
              "backgroundColor": "#ffffff",
              "textColor": "#1e1e1f",
              "sendButtonColor": "#2A4A70",
              "maxChars": 200,
              "maxCharsWarningMessage":
                "You exceeded the characters limit. Please input less than 50 characters.",
              "autoFocus": false,
              "borderRadius": 6,
              "sendButtonBorderRadius": 50
            },
            "uploadsConfig": {
              "enabled": true,
              "acceptFileTypes": [
                "jpeg",
                "jpg",
                "png",
                "pdf"
              ],
              "maxFiles": 5,
              "maxSizeInMB": 10
            }
          }
        }
      });
    `;

    document.body.appendChild(script);

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
                <button className="search-button" type="button" aria-label="Որոնել">
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
            <span>Այս էջը օգտակա՞ր էր</span>
            <span className="feedback-actions">
              <button type="button" aria-label="Լավ էր">👍</button>
              <button type="button" aria-label="Վատ էր">👎</button>
            </span>
            <span className="feedback-close">×</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
