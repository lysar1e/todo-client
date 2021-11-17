import {makeAutoObservable} from "mobx";
import {axiosJWT} from "../utils/axios/axios";
import {URL} from "../constants/url";
import {useRouter} from "next/router";

class User {
    role = "user"
    hasSubscription = false;

    constructor() {
        makeAutoObservable(this);
    }

    setRole(role: string) {
        this.role = role;
    }

    setHasSubscription(sub: boolean) {
        this.hasSubscription = sub;
    }


    getRole() {
        axiosJWT.get(`${URL}/auth/check`, {withCredentials: true}).then(({data}) => {
           this.role = data.role;
        });
    }
}
export default new User();
