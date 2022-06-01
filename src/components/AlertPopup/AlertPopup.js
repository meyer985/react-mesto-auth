import cross from "../../images/Close_Icon.png";

function AlertPopup(props) {
  function handleCloseOverlay(e) {
    if (e.target.classList.contains("popup")) {
      props.onClose();
    }
  }
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={handleCloseOverlay}
    >
      <div className="popup__container popup__container_type_alert">
        <img src={props.picture} alt={props.alt} className="popup__alert" />
        <h2 className="popup_message">{props.message}</h2>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close popup__close_type_add"
        >
          <img src={cross} alt="закрыть" className="popup__cross" />
        </button>
      </div>
    </div>
  );
}

export default AlertPopup;
