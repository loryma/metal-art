import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import "../components/Language";

function useLanguage() {
  const [definition, setDefinition] = useState(window.Language.definition);
  const [lang, setLang] = useState(window.Language.lang);

  useEffect(() => {
    function langChangeListener() {
      setDefinition(window.Language.definition);
      setLang(window.Language.lang);
    }
    window.addEventListener("langChangeEvent", langChangeListener);
    return window.removeEventListener("languagechange", langChangeListener);
  }, []);

  return [lang, definition];
}

export default useLanguage;
