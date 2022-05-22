import PopupWithForm from "../PopupWithForm/PopupWithForm";

function DeleteConfirmationPopup({ isOpen, onClose, onSubmit, isLoading }) {
  return (
    <PopupWithForm
      name="remove"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      submitValue={isLoading ? "Удаление..." : "Да"}
      isValid={true}
    />
  );
}

export default DeleteConfirmationPopup;
