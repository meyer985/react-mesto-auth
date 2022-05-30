import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useState, useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const inputRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });

    inputRef.current.value = "";
    onClose();

    setAvatarValid(false);
  }

  const [avatarValidation, setAvatarValidation] = useState();
  const [isAvatarValid, setAvatarValid] = useState(false);

  function handleAvatarValidation(evt) {
    setAvatarValidation(evt.target.validationMessage);
    setAvatarValid(evt.target.validity.valid);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitValue={isLoading ? "Сохранение..." : "Обновить"}
      isValid={isAvatarValid}
    >
      <input
        ref={inputRef}
        type="url"
        name="link"
        className="form__input form__input_type_avatar form__input_type_ava"
        id="input-ava"
        placeholder="Новый аватар"
        required
        onChange={handleAvatarValidation}
      />
      <span className="form__error-message form__error-message_input-ava">
        {avatarValidation}
      </span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
