import { h, Fragment } from "preact";
import { useEffect } from "preact/hooks";
import Lang from "../components/Lang";
import useLanguage from "../components/useLanguage";
import { IntlProvider } from "preact-i18n";
import { Text } from "preact-i18n";

const Header = () => {
  const [lang, definition] = useLanguage();
  useEffect(() => {
    //HAMBURGER DROPDOWN
    let hamburger = document.querySelector(".hamburger");
    let menuDropdown = document.querySelector(".menu__dropdown");

    if (hamburger) {
      hamburger.addEventListener("click", function(e) {
        let state = menuDropdown.dataset.state;

        if (state == "opened") {
          menuDropdown.dataset.state = "closed";
        } else {
          menuDropdown.dataset.state = "opened";
        }
      });
    }
  }, []);

  const active = link => {
    const path = document.location.pathname;
    const pathStr = path.replace("/", "").replace(/\.html*/, "");

    return pathStr == link;
  };

  return (
    <>
      <IntlProvider definition={definition}>
        <a href="fences.html" class={`menu__link ${active("fences") ? "menu__link--active" : ""}`}>
          <Text id="navigation.fences">Fences</Text>
        </a>
        <a href="gates.html" class={`menu__link ${active("gates") ? "menu__link--active" : ""}`}>
          <Text id="navigation.gates">Gates</Text>
        </a>
        <a href="stairs.html" class={`menu__link ${active("stairs") ? "menu__link--active" : ""}`}>
          <Text id="navigation.stairs">Stairs</Text>
        </a>
        <a href="railings.html" class={`menu__link ${active("railings") ? "menu__link--active" : ""}`}>
          <Text id="navigation.railings">Railings</Text>
        </a>
        <a href="canopies.html" class={`menu__link ${active("canopies") ? "menu__link--active" : ""}`}>
          <Text id="navigation.canopies">Canopies</Text>
        </a>
        <a href="other.html" class={`menu__link ${active("other") ? "menu__link--active" : ""}`}>
          <Text id="navigation.other">Other</Text>
        </a>
        <a href="/about_us.html" class={`menu__link ${active("about_us") ? "menu__link--active" : ""} menu__link--about-us`}>
          <Text id="navigation.about_us">About us</Text>
        </a>
        <a href="/contacts.html" class={`menu__link ${active("contacts") ? "menu__link--active" : ""}`}>
          <Text id="navigation.contacts">Contacts</Text>
        </a>

        <div class="menu__link menu__link--phone">
          <a class="menu__phone--mobile menu__phone translatable" data-id="contacts.whatsapp_text" href="https://wa.me/380665902317">
            WhatsApp
            <img src="../images/whatsapp.svg" class="whatsapp__icon" alt="whatsapp start chat icon" />
          </a>
          <a dir="auto" class="menu__phone menu__phone--desktop">
            +38 066 590 2317 
          </a>
          <div class="menu__lang">
            <Lang />
          </div>
        </div>
      </IntlProvider>
    </>
  );
};

export default Header;
