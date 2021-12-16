import React from "react";
import styles from "./Boards.module.scss";
import theme from "../../store/theme";
import Link from "next/link";
import { axiosJWT } from "../../utils/axios/axios";
import { URL } from "../../constants/url";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
type BoardsComponentProps = {
  boards: { id: number; owner: number; name: string; contributors: number[] }[];
};
export const BoardsComponent: React.FC<BoardsComponentProps> = ({ boards }) => {
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const deleteBoard = (boardId: number) => {
    const consent = confirm("Точно удалxxить эту доску?");
    if (!consent) {
      return;
    }
    axiosJWT
      .delete(`${URL}/board/delete-board/${boardId}`, { withCredentials: true })
      .then(async ({ data }) => {
        await MySwal.fire({
          title: <strong>{data.message}</strong>,
          icon: "success",
        });
        await router.replace(router.asPath);
      });
  };
  return (
    <div className={styles.cards}>
      {boards && boards.length ? (
        boards.map((item) => {
          return (
            <div className="card horizontal" key={item.id} draggable={true}>
              <div className={`card-stacked ${theme.theme}`}>
                <span
                  className={styles.deleteBtn}
                  onClick={() => deleteBoard(item.id)}
                >
                  &times;
                </span>
                <div className="card-content">
                  <p>{item.name}</p>
                </div>
                <div className="card-action">
                  <Link href={`/board/${item.id}`}>
                    <a className={theme.theme}>Перейти к доске</a>
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h5>Досок нет</h5>
      )}
    </div>
  );
};
