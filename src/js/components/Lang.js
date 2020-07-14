import { h } from "preact";
import useLanguage from "../components/useLanguage";

const Lang = () => {
  const [lang] = useLanguage();

  const onLangChange = e => {
    e.preventDefault();
    const l = e.target.dataset.lang;
    window.Language.changeLanguage(l);
  };

  return (
    <div class="lang">
      <a href="" onClick={onLangChange} class="menu__link lang__item menu__ru" data-active={lang === "ru" ? "active" : ""} data-lang="ru">
        Ru
      </a>
      <a href="" onClick={onLangChange} class="menu__link lang__item menu__en" data-active={lang === "en" ? "active" : ""} data-lang="en">
        En
      </a>
    </div>
  );
};

export default Lang;
