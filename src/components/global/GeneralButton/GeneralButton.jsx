const GeneralButton = ({ type, text, id, clickHandler, className }) => (
  <button id={id} className={className} onClick={clickHandler} type={type}>
    {text}
  </button>
);

export default GeneralButton;
