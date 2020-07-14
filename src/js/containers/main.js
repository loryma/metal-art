import "../../css/main.css";

import { h, render } from "preact";

import "lazysizes";
import "lightgallery.js";
import "lightgallery.js/dist/css/lightgallery.css";

import Translatable from "../components/Translatable";
import Header from "../components/Header";

import setMasonry from "../setMasonry";
import "../components/setScrollButton";
import "../components/setCopyright";
import ContactsForm from "../components/contacts";

const headerMenu = document.querySelector(".menu__dropdown");

window.addEventListener("load", function() {
  render(<Header />, headerMenu);
});

const translatables = document.querySelectorAll(".translatable");

translatables.forEach(domContainer => {
  const id = domContainer.dataset.id;
  render(<Translatable id={id} />, domContainer);
});

const lightboxes = document.querySelectorAll(".lightbox");

lightboxes.forEach(box => {
  window.lightGallery(box);
});

setMasonry();

const contacts = document.querySelector(".contacts__right");
if (contacts) {
  render(<ContactsForm />, contacts);
}
