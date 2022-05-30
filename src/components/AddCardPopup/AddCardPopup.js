import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React, { useState } from "react";

function AddCardPopup({ isOpen, onClose, onAddCard, isLoading }) {
  const [name, setName] = useState();
  const [link, setLink] = useState();
  const [nameValidation, setNameValidation] = useState();
  const [linkValidation, setLinkValidation] = useState();
  const [isNameValid, setIsNameValid] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);

  function nameInputHandler(evt) {
    setName(evt.target.value);
    setNameValidation(evt.target.validationMessage);
    setIsNameValid(evt.target.validity.valid);
  }

  function linkInputHandler(evt) {
    setLink(evt.target.value);
    setLinkValidation(evt.target.validationMessage);
    setIsLinkValid(evt.target.validity.valid);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddCard({
      name: name,
      link: link,
    });
    setName("");
    setLink("");

    onClose();

    setIsNameValid(false);
    setIsLinkValid(false);
  }

  return (
    <PopupWithForm
      name="add-item"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitValue={isLoading ? "Отправляем..." : "Создать"}
      isValid={isNameValid && isLinkValid}
    >
      <input
        type="text"
        name="name"
        className="form__input form__input_add-item"
        id="input-new-item"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name || ""}
        onChange={nameInputHandler}
      />
      <span className="form__error-message form__error-message_input-new-item">
        {nameValidation}
      </span>
      <input
        type="url"
        name="link"
        className="form__input form__input_type_profession form__input_type_url"
        id="input-url"
        placeholder="Ссылка на картинку"
        required
        value={link || ""}
        onChange={linkInputHandler}
      />
      <span className="form__error-message form__error-message_input-url">
        {linkValidation}
      </span>
    </PopupWithForm>
  );
}

export default AddCardPopup;
