import React, {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";
import {URL} from "../constants/url";
import {useRouter} from "next/router";
import theme from "../store/theme";
import {observer} from "mobx-react-lite";
type Props = {
    isLogin?: boolean;
}
export const Navbar: React.FC<Props> = observer(({isLogin}) => {
    const router = useRouter();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        if (theme.theme === "dark") {
            setChecked(true);
        }
    });
    const logout = async () => {
        try {
           await axios.post(`${URL}/auth/logout`, {}, {withCredentials: true});
           router.reload();
        } catch (e) {
            alert("Ошибка при выходе!");
        }
    }
    const changeTheme = () => {
        if (window.localStorage.getItem("theme") === "dark") {
            window.localStorage.setItem("theme", "light");
            theme.setTheme("light");
        } else {
            window.localStorage.setItem("theme", "dark");
            theme.setTheme("dark");
        }
    }
  return (
    <nav className={theme.theme}>
        <div className={`nav-wrapper navbar ${theme.theme === "dark" ? "dark" : "blue"} container`}>
        <Link href="/">
          <a className="brand-logo">MERN Todo App</a>
        </Link>
        {isLogin ? (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
                <div className="switch">
                    <label>
                        <span className={theme.theme === "light" ? "light-text switch-text" : "switch-text"}>Light theme</span>
                        <input type="checkbox" defaultChecked={checked} onClick={() => changeTheme()} />
                        <span className="lever"></span>
                        <span className={theme.theme === "light" ? "light-text switch-text" : "switch-text"}>Dark theme</span>
                    </label>
                </div>
              <Link href="/">
                <a onClick={() => logout()}>Выйти</a>
              </Link>
            </li>
          </ul>
        ) : (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
                <div className="switch">
                    <label>
                        <span className={theme.theme === "light" ? "light-text switch-text" : "switch-text"}>Light theme</span>
                        <input type="checkbox" defaultChecked={checked} onClick={() => changeTheme()} />
                        <span className="lever"></span>
                        <span className={theme.theme === "light" ? "light-text switch-text" : "switch-text"}>Dark theme</span>
                    </label>
                </div>
              <Link href="/">
                <a>Войти</a>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
});
