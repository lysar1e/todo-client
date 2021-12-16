import React from "react";
import theme from "../../store/theme";
import styles from "../Board/Board.module.scss";
import { observer } from "mobx-react-lite";
import { axiosJWT } from "../../utils/axios/axios";
import { URL } from "../../constants/url";

type Props = {
  inviteLink: string;
  boardId: number;
  setInviteLink: React.Dispatch<React.SetStateAction<string>>;
};

export const InviteLink: React.FC<Props> = observer(
  ({ inviteLink, boardId, setInviteLink }) => {
    const generateLink = () => {
      axiosJWT
        .post(`${URL}/link/generate`, { boardId }, { withCredentials: true })
        .then((res) => {
          const { data } = res;
          setInviteLink(data.to);
        });
    };
    return (
      <>
        {!inviteLink ? (
          <button
            className={`btn ${theme.theme}`}
            onClick={() => generateLink()}
          >
            Сгенерировать ссылку для других пользователей
          </button>
        ) : (
          <>
            <br />
            <span
              className={`${styles.link} ${
                theme.theme === "dark" && styles.dark
              }`}
            >
              Сгенерированная ссылка для того чтобы другие пользователи могли
              использовать эту доску:
            </span>
            <br />
            <a
              href={inviteLink}
              className={`${styles.link} ${
                theme.theme === "dark" && styles.dark
              }`}
            >
              {inviteLink}
            </a>
          </>
        )}
      </>
    );
  }
);
