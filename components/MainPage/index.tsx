import React from "react";
import { AddBoardModal } from "../AddBoardModal";
import { MainPageProps } from "../../pages";
import { observer } from "mobx-react-lite";
import theme from "../../store/theme";
import { BoardsComponent } from "../Boards";
import { ContributorBoardsComponent } from "../ContributorBoards";

export const MainPage: React.FC<MainPageProps> = observer(
  ({ boards, contributorBoards }) => {
    return (
      <div className="container row">
        <h3 className={`my-boards ${theme.theme}`}>Мои доски</h3>
        <AddBoardModal />
        <BoardsComponent boards={boards} />
        <h3 className={`my-boards ${theme.theme}`}>
          Доски в которых участвуешь
        </h3>
        <ContributorBoardsComponent contributorBoards={contributorBoards} />
      </div>
    );
  }
);
