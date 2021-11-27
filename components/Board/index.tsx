import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./Board.module.scss";
import withReactContent from "sweetalert2-react-content";
import { BoardProps } from "../../pages/board/[id]";
import { useRouter } from "next/router";
import { axiosJWT } from "../../utils/axios/axios";
import { URL } from "../../constants/url";
import { Navbar } from "../Navbar";
import { Loader } from "../Loader";
import { observer } from "mobx-react-lite";
import theme from "../../store/theme";
export const BoardComponent: React.FC<BoardProps> = observer(({ board }) => {
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const id = router.query.id;
  const [text, setText] = useState("");
  const important = board.todos.filter((item) => item.important);
  const notImportant = board.todos.filter((item) => !item.important);
  const [clickedToEdit, setClickedToEdit] = useState(false);
  const [clickedEditId, setClickedEditId] = useState(0);
  const [textToEdit, setTextToEdit] = useState("");
  const [clickedToEditBoardName, setClickedToEditBoardName] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const handleEditClick = (todoId: number, todoText: string) => {
    setClickedToEdit(!clickedToEdit);
    setTextToEdit(todoText);
    setClickedEditId(todoId);
  };
  useEffect(() => {
    if (board.generatedLink) {
      setInviteLink(board.generatedLink);
    }
  }, [board.generatedLink]);
  const [inviteLink, setInviteLink] = useState("");
  const editTodoText = (todoId: number, newText: string) => {
    axiosJWT
      .post(
        `${URL}/board/todo/edit-text`,
        {
          boardId: board.id,
          todoId,
          newText,
        },
        { withCredentials: true }
      )
      .then(async () => {
        setClickedToEdit(false);
        await router.replace(router.asPath);
      });
  };
  const createTodo = async () => {
    try {
      if (text) {
        setIsLoading(true);
        axiosJWT
          .post(
            `${URL}/board/create-todo`,
            { boardId: id, text },
            { withCredentials: true }
          )
          .then(() => {
            router.replace(router.asPath);
            setIsLoading(false);
            setText("");
          });
      } else {
        await MySwal.fire({
          title: <strong>Ошибка при добавления задачи!</strong>,
          html: <i>Невозможно добавить пустую задачу.</i>,
          icon: "error",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const completeTodo = async (todoId: number) => {
    setIsLoading(true);
    await axiosJWT
      .patch(
        `${URL}/board/complete-todo/${todoId}`,
        { boardId: id },
        { withCredentials: true }
      )
      .then(() => {
        router.replace(`/board/${id}`);
        setIsLoading(false);
      });
  };
  const importantTodo = async (todoId: number) => {
    setIsLoading(true);
    await axiosJWT
      .patch(
        `${URL}/board/important-todo/${todoId}`,
        { boardId: id },
        { withCredentials: true }
      )
      .then(() => {
        router.replace(`/board/${id}`);
        setIsLoading(false);
      });
  };
  const removeTodo = async (todoId: number) => {
    setIsLoading(true);
    await axiosJWT
      .delete(`${URL}/board/remove-todo`, {
        withCredentials: true,
        params: { boardId: id, todoId },
      })
      .then(() => {
        router.replace(`/board/${id}`);
        setIsLoading(false);
      });
  };
  const generateLink = () => {
    axiosJWT
      .post(`${URL}/link/generate`, { boardId: id }, { withCredentials: true })
      .then((res) => {
        const { data } = res;
        setInviteLink(data.to);
      });
  };

  const editBoardName = () => {
    axiosJWT
      .post(
        `${URL}/board/edit-name`,
        { boardId: id, newBoardName },
        { withCredentials: true }
      )
      .then(async () => {
        setClickedToEditBoardName(false);
        await router.replace(router.asPath);
      });
  };

  return (
    <>
      <Navbar isLogin={true} />
      <div className="container">
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
        {!inviteLink && (
          <button
            className={`btn ${theme.theme}`}
            onClick={() => generateLink()}
          >
            Сгенерировать ссылку для других пользователей
          </button>
        )}
        {inviteLink && (
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
        <div className="main-page">
          <h4 className={theme.theme}>Добавить задачу:</h4>
          <form
            className="form form-login"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="text"
                  placeholder=""
                  name="input"
                  className={`validate ${theme.theme}`}
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
                {/*<label htmlFor="input">Задача</label>*/}
              </div>
            </div>
            <div className="row">
              <button
                className={`waves-effect waves-light btn ${
                  theme.theme === "dark" ? "dark" : "blue"
                }`}
                onClick={() => createTodo()}
              >
                Добавить
              </button>
            </div>
          </form>
          {!isLoading ? (
            <>
              <h3 className={`my-boards ${theme.theme}`}>
                Активные задачи {board.todos.length}
              </h3>
              <div className={styles.todos}>
                {board && board.todos ? (
                  [...important, ...notImportant].map((todo, index) => {
                    let cls = ["col todos-text"];

                    if (todo.completed) {
                      cls.push("completed");
                    }
                    if (todo.important) {
                      cls.push("important");
                    }
                    return (
                      <div className="row flex todos-item" key={index}>
                        <div className={`col todos-num ${theme.theme}`}>
                          {index + 1}
                        </div>
                        <div
                          className={`${cls.join(" ")} ${
                            !todo.important ? theme.theme : null
                          }`}
                        >
                          <span>{todo.text}</span>
                          {clickedToEdit && todo.id === clickedEditId && (
                            <>
                              <input
                                type="text"
                                className={theme.theme}
                                placeholder={todo.text}
                                value={textToEdit}
                                onChange={({ target }) =>
                                  setTextToEdit(target.value)
                                }
                              />
                              <button
                                className={`btn-small ${theme.theme}`}
                                disabled={
                                  todo.text === textToEdit || textToEdit === ""
                                }
                                onClick={() =>
                                  editTodoText(todo.id, textToEdit)
                                }
                              >
                                Изменить текст
                              </button>
                            </>
                          )}
                        </div>
                        <div className={`col ${styles.todosButtons}`}>
                          <i
                            className="material-icons blue-text"
                            onClick={() => completeTodo(todo.id)}
                          >
                            check
                          </i>
                          <i
                            className="material-icons orange-text"
                            onClick={() => importantTodo(todo.id)}
                          >
                            warning
                          </i>
                          <i
                            className="material-icons red-text"
                            onClick={() => removeTodo(todo.id)}
                          >
                            delete
                          </i>
                          <i
                            className="material-icons"
                            onClick={() => handleEditClick(todo.id, todo.text)}
                            data-testid="edit-btn"
                          >
                            edit
                          </i>
                        </div>
                      </div>
                    );
                  })
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
