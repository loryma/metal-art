import { h } from "preact";

import ru from "../translation/ru.json";
import en from "../translation/en.json";

const definitions = { ru, en };

function setLang() {
  let storedLang;
  let initialDefinition;
  let initialLang;

  if (window.localStorage) {
    try {
      storedLang = localStorage.getItem("furnitureLang");
    } catch (error) {
      console.log(error);
    }
  }
  if (storedLang) {
    const newLang = JSON.parse(storedLang);
    if (newLang) {
      initialDefinition = definitions[newLang];
      initialLang = newLang;
    }
  } else {
    const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

    const newLang = browserLang && browserLang.slice(0, 2);

    if (newLang == "ru" || newLang == "uk") {
      initialDefinition = definitions["ru"];
      initialLang = "ru";
    } else {
      initialDefinition = definitions["en"];
      initialLang = "en";
    }
  }
  return [initialLang, initialDefinition];
}

let [initialLang, initialDefinition] = setLang();

window.Language = {
  changeLanguage(lang) {
    this.definition = definitions[lang];
    this.lang = lang;
    const event = new Event("langChangeEvent");
    window.dispatchEvent(event);
    try {
      localStorage.setItem("furnitureLang", JSON.stringify(lang));
    } catch (error) {
      console.log(error);
    }
  },
  lang: initialLang || "",
  definition: initialDefinition || ""
};

// export default Language;
