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
import { register, auth, checkToken } from "../utils/auth";
import RejectPopup from "./RejectPopup/RejectPopup";
import SuccessPopup from "./SuccessPopup/SuccessPopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddItemPopupOpen, setAddItemPopupOpen] = useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isRejectPopupOpen, setRejectPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const history = useHistory();

  function handleLoggedIn(data) {
    setIsLoggedIn(true);
    setEmail(data);
  }

  function handleLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/login");
    setEmail("");
  }

  const token = localStorage.getItem("token");

  useEffect(() => {
    checkToken(token)
      .then((data) => {
        handleLoggedIn(data.data.email);
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
    if (isLoggedIn) {
      history.push("/");

      api
        .getCards()
        .then((res) => {
          setCards(res);
        })
        .catch((res) => console.log(res.status));

      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((res) => console.log(res.status));
    }
  }, [isLoggedIn]);

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
    setRejectPopupOpen(false);
    setSuccessPopupOpen(false);
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

  /*Регистрация и авторизация*/

  function handleSubmitLogin(email, password) {
    auth(email, password)
      .then((data) => {
        if (data) {
          handleLoggedIn(email);
          history.push("/");
        } else {
          setRejectPopupOpen(true);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleSubmitRegister(email, password) {
    register(email, password)
      .then((res) => {
        if (res.ok) {
          history.push("/login");
          setSuccessPopupOpen(true);
          setIsRegistered(true);
        } else {
          setRejectPopupOpen(true);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} logOut={handleLogOut} />
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
            <Login
              handleLogin={handleLoggedIn}
              handleSubmitLogin={handleSubmitLogin}
              isLoggedIn={isLoggedIn}
            />
          </Route>

          <Route path="/register">
            <Register
              handleSubmitRegister={handleSubmitRegister}
              isRegistered={isRegistered}
            />
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

        <RejectPopup isOpen={isRejectPopupOpen} onClose={closeAllPopups} />

        <SuccessPopup isOpen={isSuccessPopupOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
