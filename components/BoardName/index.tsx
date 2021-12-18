import React, { useEffect, useState } from "react";
import theme from "../../store/theme";
import styles from "../Board/Board.module.scss";
import { BoardProps } from "../../pages/board/[id]";
import { axiosJWT } from "../../utils/axios/axios";
import { URL } from "../../constants/url";
import { useRouter } from "next/router";

type Props = {
  board: {
    id: number;
    owner: number;
    name: string;
    contributors: number[];
    generatedLink: string;
    todos: {
      id: number;
      text: string;
      completed: boolean;
      important: boolean;
    }[];
  };
  boardId: number;
};

export const BoardName: React.FC<Props> = ({ board, boardId }) => {
  const router = useRouter();
  const [clickedToEditBoardName, setClickedToEditBoardName] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const editBoardName = () => {
    axiosJWT
      .post(
        `${URL}/board/edit-name`,
        { boardId, newBoardName },
        { withCredentials: true }
      )
      .then(async () => {
        setClickedToEditBoardName(false);
        await router.replace(router.asPath);
      });
  };
  return (
    <h3 className={`my-boards ${theme.theme}`}>
      Доска {board && board.name}{" "}
      <i
        title="Изменить название доски"
        className={`material-icons ${styles.edit}`}
        onClick={() => setClickedToEditBoardName(!clickedToEditBoardName)}
        data-testid="edit-btn"
      >
        edit
      </i>
      {clickedToEditBoardName && (
        <>
          <input
            type="text"
            className={theme.theme}
            placeholder={board.name}
            onChange={({ target }) => setNewBoardName(target.value)}
          />
          <button
            className={`btn-small ${theme.theme}`}
            disabled={board.name === newBoardName || !newBoardName}
            onClick={() => editBoardName()}
          >
            Изменить название доски
          </button>
        </>
      )}
    </h3>
  );
};
