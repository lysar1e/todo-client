import {Navbar} from "../components/Navbar";
import {fireEvent, render} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import theme from "../store/theme";

test("header should render with correct brand name", () => {
    const component = render(<Navbar />);
    const headerEl = component.getByTestId("brand");
    expect(headerEl.textContent).toBe("MERN Todo App");
})

test("when clicking change theme button theme should be changed", () => {
   const initialTheme = theme.theme;
   const {queryByTestId} = render(<Navbar isLogin={true} />);
   const inputEl = queryByTestId("btn");
   expect(theme.theme).toBe("light");
   fireEvent.click(inputEl!);
   expect(theme.theme).not.toBe(initialTheme);
   fireEvent.click(inputEl!);
   expect(theme.theme).toBe("light");
});

test("initial theme should be light", () => {
    expect(theme.theme).not.toBeUndefined();
    expect(theme.theme).not.toBeNull();
    expect(theme.theme).toBe("light");
})

test("nav shoud be with class", () => {
    const {queryByTestId} = render(<Navbar/>);
    const nav = queryByTestId("nav");
    expect(nav!.className).toBe("light")
})