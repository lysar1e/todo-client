import "@testing-library/jest-dom/extend-expect";
import {expect} from "@jest/globals";
import user from "../store/user";

test("Initially user role should be `user` ", () => {
    expect(user.role).toBe("user")
});
