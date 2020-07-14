import { h, Fragment } from "preact";
import { Text } from "preact-i18n";

const message = ({ closeMessage, status, children }) => {
  return (
    <Fragment>
      <div class="message__body">
        <div class="message__text">{children}</div>
        <button class="message__button" onClick={closeMessage}></button>
      </div>
    </Fragment>
  );
};

export default message;
