import React from "react";
import penBig from "../../images/pen_big.svg";
import edit from "../../images/edit.png";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom";

function Main({
  handlerAvatar,
  handlerEdit,
  handlerAdd,
  onCardClick,
  onCardLike,
  onCardDelete,
  cardsArray,
}) {
  const user = React.useContext(CurrentUserContext);

  const cardList = cardsArray.map((card) => (
    <Card
      data={card}
      key={card._id}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ));

  return (
    <main className="main">
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${user.avatar})` }}
        >
          <button className="profile__overlay" onClick={handlerAvatar}>
            <img className="profile__pen" src={penBig} alt="редактировать" />
          </button>
        </div>
        <div className="profile__info info">
          <h1 className="info__name">{user.name}</h1>
          <button type="button" className="info__edit" onClick={handlerEdit}>
            <img className="info__pen" src={edit} alt="редактировать" />
          </button>
          <p className="info__profession">{user.about}</p>
        </div>
        <button
          type="button"
          className="profile__addbutton"
          onClick={handlerAdd}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">{cardList}</ul>
      </section>
    </main>
  );
}

export default Main;
