import React, { useEffect, useState } from "react";
import styles from "./AddBoardModal.module.scss";
import { axiosJWT } from "../../utils/axios/axios";
import { URL } from "../../constants/url";
import { Loader } from "../Loader";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import theme from "../../store/theme";
import user from "../../store/user";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Link from "next/link";

export const AddBoardModal: React.FC = observer(() => {
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const openModal = async () => {
    if (user.hasSubscription) return setIsClicked(true);
    await MySwal.fire({
      title: <strong>Ошибка при добавления новой доски!</strong>,
      html: (
        <i>
          Нельзя добавить больше одной доски если нет подписки, нажмите ок чтобы
          купить подписку
        </i>
      ),
      icon: "error",
    });
    await router.push("/buy-subscription");
  };
  useEffect(() => {
    document.body.addEventListener("click", function (event) {
      const elem = event.target;
      //@ts-ignore
      if (elem.classList.contains(styles.modalka)) {
        closeModal();
      }
    });
  }, []);
  const closeModal = () => {
    setIsClicked(false);
  };
  const [name, setName] = useState("");
  const createBoard = () => {
    try {
      setIsLoading(true);
      axiosJWT
        .post(`${URL}/board/create`, { name }, { withCredentials: true })
        .then(async () => {
          setIsLoading(false);
          setIsClicked(false);
          await router.replace("/");
        })
        .catch(async (err) => {
          setIsLoading(false);
          setIsClicked(false);
          if (err.response.data.statusCode === 403) {
            await MySwal.fire({
              title: <strong>Ошибка при добавления новой доски!</strong>,
              html: (
                <i>
                  Нельзя добавить больше одной доски если нет подписки,{" "}
                  <Link href="/">
                    <a className="buy-sub">
                      <strong>купить подписку</strong>
                    </a>
                  </Link>
                </i>
              ),
              icon: "error",
            });
          }
        });
    } catch (e) {
      console.warn(e);
      setIsLoading(false);
      setIsClicked(false);
    }
  };
  return (
    <>
      <button
        className={`btn ${theme.theme}`}
        onClick={() => openModal()}
        data-testid="add-board-modal"
      >
        Добавить доску
      </button>
      <div
        id="myModal"
        className={
          isClicked ? `${styles.modalka} ${styles.show}` : `${styles.modalka}`
        }
        data-testid="my-modal"
      >
        <div
          className={`${styles.modalContent} ${
            theme.theme === "dark" && styles.dark
          }`}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <span className={styles.close} onClick={() => closeModal()}>
                &times;
              </span>
              <form onSubmit={(e) => e.preventDefault()}>
                <h5 className={`board-name ${theme.theme}`}>Название доски</h5>
                <input
                  type="text"
                  placeholder="Название доски..."
                  onChange={(e) => setName(e.target.value)}
                  className={theme.theme}
                />
                <button
                  type="submit"
                  className={`btn ${theme.theme}`}
                  onClick={() => createBoard()}
                >
                  Добавить
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
});
