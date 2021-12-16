import React, { useState } from "react";
import theme from "../../store/theme";
import { axiosJWT } from "../../utils/axios/axios";
import { URL } from "../../constants/url";
import { useRouter } from "next/router";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

type Props = {
  boardId: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddTodoForm: React.FC<Props> = ({ boardId, setIsLoading }) => {
  const MySwal = withReactContent(Swal);
  const [text, setText] = useState("");
  const router = useRouter();
  const createTodo = async () => {
    try {
      if (text) {
        setIsLoading(true);
        axiosJWT
          .post(
            `${URL}/board/create-todo`,
            { boardId, text },
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
  return (
    <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
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
  );
};
