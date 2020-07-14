import { h } from "preact";
import { Text, Localizer } from "preact-i18n";

const ERRORS = {
  en: { requered: "field is required", pattern: "is invalid" },
  ru: { requered: "поле обязательное для заполнения", pattern: "невалидна" }
};

const Input = ({ tag, type, name, value, onBlur, onInput, id, placeholder = "", error, lang, touched }) => {
  let field;

  if (tag === "input") {
    field = (
      <input
        type={type}
        name={name}
        value={value}
        onInput={onInput}
        onBlur={onBlur}
        id={id}
        class="contacts__input"
        placeholder={placeholder}
        required
      />
    );
  } else {
    field = (
      <Localizer>
        <textarea
          class="contacts__textarea"
          id={id}
          value={value}
          onInput={onInput}
          onBlur={onBlur}
          placeholder={<Text id="contacts.message_placeholder" />}
        ></textarea>
      </Localizer>
    );
  }

  const errorText = ERRORS[lang][error];

  return (
    <div class="contacts__field">
      {field}
      <label for={id} class={`contacts__label ${error && touched ? "contacts__label--invalid" : ""}`}>
        <Text id={`contacts.${name}`}>{name}</Text>
        <p class="error">{errorText}</p>
      </label>
    </div>
  );
};

export default Input;
