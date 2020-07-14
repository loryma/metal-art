// require("preact/debug");

import { h, render, Fragment } from "preact";
import { useState, useContext, useRef } from "preact/hooks";
import { Text } from "preact-i18n";
import { IntlProvider } from "preact-i18n";
import useLanguage from "./useLanguage";
import Input from "./Input";
import Message from "./Message";

const initialState = {
  name: { value: "", validation: { requered: true }, error: "", touched: false, tag: "input", type: "text" },
  email: {
    value: "",
    validation: { requered: true, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ },
    touched: false,
    error: "",
    tag: "input",
    type: "email"
  },
  subject: { value: "", validation: { requered: true }, error: "", touched: false, tag: "input", type: "text" },
  message: { value: "", validation: { requered: true }, error: "", touched: false, tag: "textarea", type: "text" }
};

const ContactsForm = () => {
  const [state, setState] = useState({ ...initialState });

  const [lang, definition] = useLanguage();

  const formRef = useRef(null);

  const [submitMessageVisible, setSubmitMessageVisible] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onInput = (name, e) => {
    const value = e.target.value;
    const error = checkValidity(name, value);
    setState(state => ({ ...state, [name]: { ...state[name], value, error } }));
  };

  const onBlur = name => {
    setState(state => ({ ...state, [name]: { ...state[name], touched: true } }));
  };

  const checkValidity = (name, value) => {
    const validation = state[name].validation;
    let error = "";
    if (validation.requered) {
      if (!value.trim()) {
        error = "requered";
      }
    }
    if (validation.pattern) {
      if (!validation.pattern.test(value)) {
        error = error || "pattern";
      }
    }
    return error;
  };

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const onSubmit = e => {
    e.preventDefault();
    let valid = true;

    for (let name in state) {
      const error = checkValidity(name, state[name].value);
      valid = valid && !error;
      setState(state => ({ ...state, [name]: { ...state[name], error, touched: true } }));
    }

    for (let name in state) {
      valid = valid && !state[name].error;
    }

    if (valid) {
      const data = {};
      Object.entries(state).forEach(([key, { value }]) => {
        data[key] = value;
      });

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contacts", ...data })
      })
        .then(() => {
          setSubmitMessageVisible(true);
          setSubmitStatus("success");
          // clear state on successfull submit
          setState({ ...initialState });
        })
        .catch(error => {
          setSubmitMessageVisible(true);
          setSubmitStatus("failure");
          console.log(error);
        });
    }
  };

  const onMessageClose = () => {
    setSubmitMessageVisible(false);
    setSubmitStatus(null);
  };

  const content = Object.entries(state).map(([name, config]) => {
    return <Input id={`${name}Field`} name={name} {...config} onBlur={onBlur.bind(this, name)} onInput={onInput.bind(this, name)} lang={lang} />;
  });

  return (
    <IntlProvider definition={definition}>
      <h2 class="contacts__header">
        <Text id="contacts.form">Contact form</Text>
      </h2>
      {(submitMessageVisible && submitStatus === "success" && (
        <p class="contacts__success-text">
          <Text id="contacts.message_text.success">"Your message have been succefully delivered. Thank you for contacting us. We will respond to your request as soon as possible"</Text>
        </p>
      )) || (
        <>
          <p class="contacts__text">
            <Text id="contacts.intro_text">Please, send your requests via the form. We will respond as soon as possible.</Text>
          </p>

          <form name="contacts" method="post" ref={formRef} action="/contacts.html" class="contacts__form" onSubmit={onSubmit} autocomplete="off" novalidate>
            {content}
            {submitMessageVisible && submitStatus === "failure" && (
              <Message closeMessage={onMessageClose} status={submitStatus}>
                <Text id="contacts.message_text.failure">There was an error. Please try again</Text>
              </Message>
            )}
            <button class="contacts__submit" type="submit">
              <Text id="contacts.send">Send message</Text>
            </button>
          </form>
        </>
      )}
    </IntlProvider>
  );
};

export default ContactsForm;
