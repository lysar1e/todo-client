import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { URL } from "../../constants/url";
import { useRouter } from "next/router";
import { Loader } from "../Loader";
import theme from "../../store/theme";

export const RegistrationComponent: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [regErrMessage, setRegErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const registerHandler = async () => {
    try {
      setIsLoading(true);
      setRegErrMessage("");
      await axios
        .post(
          `${URL}/auth/sign-up`,
          { ...form },
          {
            withCredentials: true,
          }
        )
        .then(async () => {
          await router.push("/login");
          setIsLoading(false);
        })
        .catch((err: any) => {
          setIsLoading(false);
          setRegErrMessage(err.response.data.message);
        });
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };
  return (
    <div className="container">
      <h3 className={`my-boards ${theme.theme}`}>Регистрация</h3>
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
                onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input
                type="password"
                name="password"
                className={`validate ${theme.theme}`}
                onChange={changeHandler}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            {regErrMessage && <div className="alert-red">{regErrMessage}</div>}
            <button
              className={`waves-effect waves-light btn ${
                theme.theme === "dark" ? "dark" : "blue"
              }`}
              onClick={() => registerHandler()}
            >
              Регистрация
            </button>
            <Link href="/login">
              <a className={`btn-outline btn-reg ${theme.theme}`}>
                Уже есть аккаунт ?
              </a>
            </Link>
            <Link href="/forgot-password">
              <a className={`btn-outline btn-reg ${theme.theme}`}>
                Забыли пароль ?
              </a>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};
