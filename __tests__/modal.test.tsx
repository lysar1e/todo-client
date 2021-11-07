import {AddBoardModal} from "../components/AddBoardModal";
import {fireEvent, render} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {expect} from "@jest/globals";

test("on click should open modal", () => {
   const {queryByTestId} = render(<AddBoardModal />);
   const btn = queryByTestId("add-board-modal");
   const modal = queryByTestId("my-modal");
   expect(modal!.classList.contains("show")).toBe(false);
   fireEvent.click(btn!);
   expect(modal!.classList.contains("show")).toBe(true);
});