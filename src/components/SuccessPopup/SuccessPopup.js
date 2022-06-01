import AlertPopup from "../AlertPopup/AlertPopup";
import success from "../../images/successPopup.png";

function SuccessPopup(props) {
  return (
    <AlertPopup
      picture={success}
      message="Вы успешно зарегистрировались!"
      alt="Вы успешно зарегистрировались!"
      {...props}
    />
  );
}

export default SuccessPopup;
