import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return (
    <p className={css.errorText}>
      {message || "Whoops, something went wrong! Try again later!"}
    </p>
  );
};

export default ErrorMessage;
