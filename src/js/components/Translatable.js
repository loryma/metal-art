import { h } from "preact";
import { IntlProvider } from "preact-i18n";
import { Text } from "preact-i18n";

import useLanguage from "../components/useLanguage";

const Translatable = ({ id }) => {
  const [lang, definition] = useLanguage();

  return (
    <IntlProvider definition={definition}>
      <Text id={id}></Text>
    </IntlProvider>
  );
};

export default Translatable;
