import React from "react";
import theme from "../../store/theme";
type Props = {
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
};
export const BurgerIcon: React.FC<Props> = ({ setClicked }) => {
  return (
    <svg
      fill={`${theme.theme === "dark" ? "#ffffff" : "#000000"}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="32px"
      height="32px"
      onClick={() => setClicked(true)}
    >
      <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" />
    </svg>
  );
};
