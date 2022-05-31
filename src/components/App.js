import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ImagePopup from "./ImagePopup/ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddCardPopup from "./AddCardPopup/AddCardPopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup/DeleteConfirmationPopup";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { checkToken } from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddItemPopupOpen, setAddItemPopupOpen] = useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLoggedIn() {
    setIsLoggedIn(true);
  }

  const history = useHistory();

  const token = localStorage.getItem("token");

  useEffect(() => {
    checkToken(token)
      .then((data) => {
        console.log(data);
        handleLoggedIn();
        history.push("/");
      })
      .catch((res) => console.log(res.status));
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleClosebyEsc);
    return () => {
      document.removeEventListener("keydown", handleClosebyEsc);
    };
  });

  function handleClosebyEsc(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }

  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((res) => console.log(res.status));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    const fetchLike = isLiked
      ? api.setLike(card._id, "DELETE")
      : api.setLike(card._id, "PUT");

    fetchLike
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((res) => console.log(res.status));
  }

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((res) => console.log(res.status));
  }, []);

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddItemPopupOpen(true);
  }

  function closeAllPopups() {
    setAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddItemPopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api
      .updateProfileInfo(userData)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((res) => console.log(res.status))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .updateAvatar(data.avatar)
      .then((res) => setCurrentUser(res))
      .catch((res) => console.log(res.status))
      .finally(() => setIsLoading(false));
  }

  function handleAddCard(data) {
    setIsLoading(true);
    api
      .postNewCard(data)
      .then((res) => setCards([res, ...cards]))
      .catch((res) => console.log(res.status))
      .finally(() => setIsLoading(false));
  }

  /* УДАЛЕНИЕ КАРТОЧКИ */

  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const [cardToDelete, setCardToDelete] = useState({});

  function handleConfirmationDelete(card) {
    setDeletePopupOpen(true);
    setCardToDelete(card);
  }

  function handleCardDelete(evt) {
    setIsLoading(true);
    evt.preventDefault();

    api
      .deleteCard(cardToDelete)
      .then(setCards(cards.filter((item) => item._id !== cardToDelete._id)))
      .catch((res) => console.log(res.status))
      .finally(() => setIsLoading(false));
    closeAllPopups();
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            handlerAvatar={handleEditAvatarClick}
            handlerEdit={handleEditProfileClick}
            handlerAdd={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmationDelete}
            cardsArray={cards}
            isLoggedIn={isLoggedIn}
          />

          <Route path="/login">
            <Login handleLogin={handleLoggedIn} />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddCardPopup
          isOpen={isAddItemPopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <DeleteConfirmationPopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          isLoading={isLoading}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
