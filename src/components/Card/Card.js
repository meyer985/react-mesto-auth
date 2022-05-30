import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ data, onCardClick, onCardLike, onCardDelete }) {
  const user = React.useContext(CurrentUserContext);

  const cardIsOwn = user._id === data.owner._id;
  const cardDeleteButtonClassName = `element__delite ${
    cardIsOwn ? "" : "element__delite_inactive"
  }`;

  const cardIsLiked = data.likes.some((i) => i._id === user._id);
  const cardLikeButtonClassName = `element__like ${
    cardIsLiked ? "element__like_active" : ""
  }`;

  function handleClick() {
    onCardClick(data);
  }

  function handleLikeClick() {
    onCardLike(data);
  }

  function handleDelete() {
    onCardDelete(data);
  }

  return (
    <li className="element">
      <img
        src={data.link}
        alt={data.name}
        className="element__image"
        onClick={handleClick}
      />
      <p className="element__text">{data.name}</p>
      <figure className="element__like-container">
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <figcaption className="element__like-counter">
          {data.likes.length}
        </figcaption>
      </figure>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDelete}
      ></button>
    </li>
  );
}

export default Card;
