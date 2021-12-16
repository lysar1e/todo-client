import React, { useState } from "react";
import theme from "../../store/theme";
import styles from "../Board/Board.module.scss";
import { axiosJWT } from "../../utils/axios/axios";
import { URL } from "../../constants/url";
import { useRouter } from "next/router";

type Props = {
  todos: { id: number; text: string; completed: boolean; important: boolean }[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: number;
};

export const Todos: React.FC<Props> = ({ todos, setIsLoading, boardId }) => {
  const router = useRouter();
  let fromIndex = 0;
  let toIndex = 0;
  const important = todos.filter((item) => item.important);
  const notImportant = todos.filter((item) => !item.important);
  const [clickedToEdit, setClickedToEdit] = useState(false);
  const [clickedEditId, setClickedEditId] = useState(0);
  const [textToEdit, setTextToEdit] = useState("");
  function dragStartHandler(e: React.DragEvent<HTMLDivElement>, index: number) {
    fromIndex = index;
  }

  function dragEndHandler(e: any) {
    e.target.style.background = "";
  }

  function dragOverHandler(e: any) {
    e.preventDefault();
    if (!e.target.classList.contains("todos-item")) {
      e.target.style.background = "";
      return;
    }
    e.target.style.background = "lightgray";
  }

  function dropHandler(
    e: React.DragEvent<HTMLDivElement> | any,
    index: number
  ) {
    e.preventDefault();
    toIndex = index;
    if (fromIndex === toIndex) return;
    arrayMove();
    e.target.style.background = "";
  }

  function arrayMove() {
    changeTodoPosition();
  }

  const changeTodoPosition = () => {
    setIsLoading(true);
    axiosJWT
      .post(
        `${URL}/board/todo/change-position`,
        { boardId, fromIndex, toIndex },
        { withCredentials: true }
      )
      .then(async () => {
        await router.replace(router.asPath);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  const handleEditClick = (todoId: number, todoText: string) => {
    setClickedToEdit(!clickedToEdit);
    setTextToEdit(todoText);
    setClickedEditId(todoId);
  };

  const completeTodo = async (todoId: number) => {
    setIsLoading(true);
    await axiosJWT
      .patch(
        `${URL}/board/complete-todo/${todoId}`,
        { boardId },
        { withCredentials: true }
      )
      .then(() => {
        router.replace(`/board/${boardId}`);
        setIsLoading(false);
      });
  };
  const importantTodo = async (todoId: number) => {
    setIsLoading(true);
    await axiosJWT
      .patch(
        `${URL}/board/important-todo/${todoId}`,
        { boardId },
        { withCredentials: true }
      )
      .then(() => {
        router.replace(`/board/${boardId}`);
        setIsLoading(false);
      });
  };
  const removeTodo = async (todoId: number) => {
    setIsLoading(true);
    await axiosJWT
      .delete(`${URL}/board/remove-todo`, {
        withCredentials: true,
        params: { boardId, todoId },
      })
      .then(() => {
        router.replace(`/board/${boardId}`);
        setIsLoading(false);
      });
  };
  const editTodoText = (todoId: number, newText: string) => {
    setIsLoading(true);
    axiosJWT
      .post(
        `${URL}/board/todo/edit-text`,
        {
          boardId,
          todoId,
          newText,
        },
        { withCredentials: true }
      )
      .then(async () => {
        setClickedToEdit(false);
        await router.replace(router.asPath);
        setIsLoading(false);
      });
  };
  return (
    <>
      {[...important, ...notImportant].map((todo, index) => {
        let cls = ["col todos-text"];

        if (todo.completed) {
          cls.push("completed");
        }
        if (todo.important) {
          cls.push("important");
        }

        return (
          <div
            key={index}
            onDragStart={(e) => dragStartHandler(e, index)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, index)}
            draggable={true}
            className="row flex todos-item"
          >
            <div className={`col todos-num ${theme.theme}`}>{index + 1}</div>
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
                    onChange={({ target }) => setTextToEdit(target.value)}
                  />
                  <button
                    className={`btn-small ${theme.theme}`}
                    disabled={todo.text === textToEdit || textToEdit === ""}
                    onClick={() => editTodoText(todo.id, textToEdit)}
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
      })}
    </>
  );
};
