import cross from "../../images/Close_Icon.png";
import success from "../../images/successPopup.png";

function SuccessPopup(props) {
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
      <div className={`popup__container popup__container_type_reject`}>
        <img
          src={success}
          alt="успешно зарегистрировались"
          className="popup__reject"
        />
        <h2 className="reject_message">Вы успешно зарегистрировались!</h2>
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

export default SuccessPopup;
