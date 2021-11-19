import React, { useState } from "react";
import { Loader } from "../Loader";
import Link from "next/link";
import axios from "axios";
import { URL } from "../../constants/url";
import { observer } from "mobx-react-lite";
import theme from "../../store/theme";

export const ForgotPasswordComponent: React.FC = observer(() => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sendEmail = () => {
    setErrMessage("");
    setIsLoading(true);
    axios
      .post(`${URL}/auth/forgot-password`, { email })
      .then(() => {
        setShow(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrMessage(err.response.data.message);
        setIsLoading(false);
      });
  };
  return (
    <div className="container">
      <h3 className={`my-boards ${theme.theme}`}>Восстановить пароль</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="email"
                name="email"
                className={`validate ${theme.theme}`}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            {errMessage && <div className="alert-red">{errMessage}</div>}
            <button
              className={`waves-effect waves-light btn ${
                theme.theme === "dark" ? "dark" : "blue"
              }`}
              onClick={() => sendEmail()}
            >
              Получить ссылку на восстановление пароля
            </button>
            <Link href="/login">
              <a className={`btn-outline btn-reg ${theme.theme}`}>
                На страницу авторизации
              </a>
            </Link>
          </div>
        </form>
      )}
      {show && (
        <div className="alert-success">
          Письмо с ссылкой восстановления пароля была выслана на почту!
        </div>
      )}
    </div>
  );
});
