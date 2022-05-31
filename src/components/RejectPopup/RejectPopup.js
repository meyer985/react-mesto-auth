import cross from "../../images/Close_Icon.png";
import reject from "../../images/rejectPopup.png";

function RejectPopup(props) {
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
        <img src={reject} alt="что-то не так" className="popup__reject" />
        <h2 className="reject_message">
          Что-то пошло не так! Попробуйте ещё раз.
        </h2>
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

export default RejectPopup;
