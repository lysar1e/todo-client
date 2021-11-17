import {AddBoardModal} from "../components/AddBoardModal";
import {fireEvent, render} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {expect} from "@jest/globals";
import user from "../store/user";

test("on click should open modal if user have subscription", () => {
   const {queryByTestId} = render(<AddBoardModal />);
   const btn = queryByTestId("add-board-modal");
   const modal = queryByTestId("my-modal");
   user.setHasSubscription(true)
   expect(modal!.classList.contains("show")).toBe(false);
   fireEvent.click(btn!);
   expect(modal!.classList.contains("show")).toBe(true);
});

test("on click modal should not open if user have no subscription", () => {
   const {queryByTestId} = render(<AddBoardModal />);
   const btn = queryByTestId("add-board-modal");
   const modal = queryByTestId("my-modal");
   user.setHasSubscription(false)
   expect(modal!.classList.contains("show")).toBe(false);
   fireEvent.click(btn!);
   expect(modal!.classList.contains("show")).toBe(false);
});

