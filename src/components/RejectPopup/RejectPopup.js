import cross from "../../images/Close_Icon.png";
import reject from "../../images/rejectPopup.png";
import AlertPopup from "../AlertPopup/AlertPopup";

function RejectPopup(props) {
  return (
    <AlertPopup
      picture={reject}
      message="Что-то пошло не так! Попробуйте ещё раз."
      alt="Что-то пошло не так! Попробуйте ещё раз."
      {...props}
    />
  );
}

export default RejectPopup;
