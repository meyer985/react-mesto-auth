import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const user = useContext(CurrentUserContext);

  useEffect(() => {
    setName(user.name);
    setAbout(user.about);
  }, [user, isOpen]);

  const [name, setName] = useState(user.name);
  const [about, setAbout] = useState(user.about);
  const [nameValidation, setNameValidation] = useState("");
  const [aboutValidation, setAboutValidation] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isAboutValid, setIsAboutValid] = useState(true);

  function handleInputName(evt) {
    setName(evt.target.value);
    setNameValidation(evt.target.validationMessage);
    setIsNameValid(evt.target.validity.valid);
  }

  function handleInputAbout(evt) {
    setAbout(evt.target.value);
    setAboutValidation(evt.target.validationMessage);
    setIsAboutValid(evt.target.validity.valid);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: about,
    });
    onClose();
  }

  function handleClose() {
    setNameValidation("");
    setAboutValidation("");
    setIsNameValid(true);
    setIsAboutValid(true);
    onClose();
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isValid={isNameValid && isAboutValid}
      submitValue={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        type="text"
        name="name"
        className="form__input"
        id="input-name"
        placeholder="Имя"
        value={name || ""}
        minLength="2"
        maxLength="40"
        required
        onChange={handleInputName}
      />
      <span className="form__error-message form__error-message_input-name">
        {nameValidation}
      </span>
      <input
        type="text"
        className="form__input form__input_type_profession"
        name="about"
        id="input-about"
        placeholder="О себе"
        defaultValue={user.about}
        value={about || ""}
        minLength="2"
        maxLength="200"
        required
        onChange={handleInputAbout}
      />
      <span className="form__error-message form__error-message_input-about">
        {aboutValidation}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
