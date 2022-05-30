import cross from "../../images/Close_Icon.png";

function ImagePopup({ card, onClose }) {
  function handleCloseOverlay(e) {
    if (e.target.classList.contains("popup")) {
      onClose();
    }
  }
  return (
    <div
      className={`popup popup_type_picture ${card.name ? "popup_opened" : ""}`}
      onClick={handleCloseOverlay}
    >
      <div className="popup__image-container">
        <img src={card.link} alt={card.name} className="popup__picture" />
        <button onClick={onClose} type="button" className="popup__close">
          <img src={cross} alt="закрыть" className="popup__cross" />
        </button>
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
