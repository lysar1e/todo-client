import {makeAutoObservable} from "mobx";

class Theme {
    theme = "light"
    constructor() {
        makeAutoObservable(this);
    }

    setTheme(theme: string) {
        this.theme = theme;
    }
}
export default new Theme();