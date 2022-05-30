import cross from "../../images/Close_Icon.png";

function PopupWithForm(props) {
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
      <div className={`popup__container popup__container_type_${props.name}`}>
        <form
          className={`form form_type_${props.name}`}
          name="add-form"
          action="none"
          noValidate
          onSubmit={props.onSubmit}
        >
          <h2 className="form__heading">{props.title}</h2>
          {props.children}
          <button
            onClick={props.onClose}
            type="button"
            className="popup__close popup__close_type_add"
          >
            <img src={cross} alt="закрыть" className="popup__cross" />
          </button>
          <input
            type="submit"
            disabled={!props.isValid}
            className={`form__submit ${
              props.isValid ? "" : "form__submit_inactive"
            }`}
            value={props.submitValue}
          />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
