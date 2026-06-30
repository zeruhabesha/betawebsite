import { useEffect, useState } from "react";

const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "am", label: "??", name: "????" },
];

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function setTranslateCookie(code) {
  const value = code === "en" ? "/en/en" : `/en/${code}`;
  const cookie = `googtrans=${value};path=/;max-age=${COOKIE_MAX_AGE}`;
  document.cookie = cookie;
  document.cookie = `${cookie};domain=${window.location.hostname}`;
}

function applyGoogleTranslateLanguage(code) {
  const select = document.querySelector(".goog-te-combo");
  if (!select) return false;

  select.value = code;
  select.dispatchEvent(new Event("change"));
  return true;
}

export default function LanguageSelector() {
  const [language, setLanguage] = useState(() => localStorage.getItem("site-language") || "en");

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,am",
          autoDisplay: false,
        },
        "google_translate_element",
      );

      requestAnimationFrame(() => applyGoogleTranslateLanguage(language));
    };

    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.googleTranslateElementInit();
    }
  }, [language]);

  const selectLanguage = (code) => {
    setLanguage(code);
    localStorage.setItem("site-language", code);
    document.documentElement.lang = code;
    setTranslateCookie(code);

    if (!applyGoogleTranslateLanguage(code)) {
      window.location.reload();
    }
  };

  return (
    <div className="language-switch" aria-label="Language selector">
      <div id="google_translate_element" aria-hidden="true" />
      {LANGUAGES.map((item) => (
        <button
          key={item.code}
          type="button"
          className={language === item.code ? "is-active" : ""}
          aria-pressed={language === item.code}
          title={item.name}
          onClick={() => selectLanguage(item.code)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
