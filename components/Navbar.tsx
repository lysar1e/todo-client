import React, {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";
import {URL} from "../constants/url";
import {useRouter} from "next/router";
import theme from "../store/theme";
import {observer} from "mobx-react-lite";
import {BurgerIcon} from "./BurgerIcon";
import user from "../store/user";
type Props = {
    isLogin?: boolean;
}
export const Navbar: React.FC<Props> = observer(({isLogin}) => {
    const router = useRouter();
    const [checked, setChecked] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [role, setRole] = useState('user');
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
    <nav className={theme.theme} data-testid="nav">
        <div className={`nav-wrapper navbar ${theme.theme === "dark" ? "dark" : "blue"} container`}>
        <Link href="/">
          <a className="brand-logo" data-testid="brand">MERN Todo App</a>
        </Link>
        {isLogin ? (
            <>
                <div className="burger-icon right">
                    <BurgerIcon setClicked={setClicked} />
                </div>
                <div className={`mobile-modal ${theme.theme} ${clicked ? 'show-modal' : ""}`}>
                    <div className="mobile-modal__content">
                        <span className={`mobile-modal__close ${theme.theme}`} onClick={() => setClicked(false)}>×</span>
                        <div className="switch">
                            <label>
                                <span className={`mobile-text switch-text ${theme.theme}`}>Light theme</span>
                                <input type="checkbox" defaultChecked={checked} onClick={() => changeTheme()} data-testid="btn" />
                                <span className="lever"></span>
                                <span className={`mobile-text switch-text ${theme.theme}`}>Dark theme</span>
                            </label>
                        </div>
                        <Link href="/">
                            <a onClick={() => logout()} className={`quit ${theme.theme}`}>Выйти</a>
                        </Link>
                    </div>
                </div>
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
                              {
                                  user.role === "admin" &&
                                  <Link href="/admin">
                                      <a>Админ панель</a>
                                  </Link>
                              }
            </li>
          </ul>
            </>
        ) : (
            <>
                <div className="burger-icon right">
                    <BurgerIcon setClicked={setClicked} />
                </div>
                <div className={`mobile-modal ${theme.theme} ${clicked ? 'show-modal' : ""}`}>
                    <div className="mobile-modal__content">
                        <span className={`mobile-modal__close ${theme.theme}`} onClick={() => setClicked(false)}>×</span>
                        <div className="switch">
                            <label>
                                <span className={`mobile-text switch-text ${theme.theme}`}>Light theme</span>
                                <input type="checkbox" defaultChecked={checked} onClick={() => changeTheme()} />
                                <span className="lever"></span>
                                <span className={`mobile-text switch-text ${theme.theme}`}>Dark theme</span>
                            </label>
                        </div>
                        <Link href="/">
                            <a onClick={() => logout()} className={`quit ${theme.theme}`}>Выйти</a>
                        </Link>
                    </div>
                </div>
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
          </>
        )}
      </div>
    </nav>
  );
});
