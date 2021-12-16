import React, { useEffect, useState } from "react";
import styles from "./Board.module.scss";
import { BoardProps } from "../../pages/board/[id]";
import { useRouter } from "next/router";
import { Navbar } from "../Navbar";
import { Loader } from "../Loader";
import { observer } from "mobx-react-lite";
import theme from "../../store/theme";
import { InviteLink } from "../InviteLink";
import { AddTodoForm } from "../AddTodoForm";
import { Todos } from "../Todos";
import { BoardName } from "../BoardName";
export const BoardComponent: React.FC<BoardProps> = observer(({ board }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const id = router.query.id;
  useEffect(() => {
    if (board.generatedLink) {
      setInviteLink(board.generatedLink);
    }
  }, [board.generatedLink]);
  const [inviteLink, setInviteLink] = useState("");

  return (
    <>
      <Navbar isLogin={true} />
      <div className="container">
        <BoardName board={board} boardId={Number(id as string)} />
        <InviteLink
          inviteLink={inviteLink}
          boardId={Number(id as string)}
          setInviteLink={setInviteLink}
        />
        <div className="main-page">
          <h4 className={theme.theme}>Добавить задачу:</h4>
          <AddTodoForm
            boardId={Number(id as string)}
            setIsLoading={setIsLoading}
          />
          {!isLoading ? (
            <>
              <h3 className={`my-boards ${theme.theme}`}>
                Активные задачи {board.todos.length}
              </h3>
              <div className={styles.todos}>
                {board && board.todos ? (
                  <Todos
                    todos={board.todos}
                    setIsLoading={setIsLoading}
                    boardId={Number(id as string)}
                  />
                ) : (
                  <h3>Задач нет</h3>
                )}
              </div>
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
});
