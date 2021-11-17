import React, {useEffect} from "react";
import {Navbar} from "./Navbar";
import {BuySubscriptionProps} from "../pages/buy-subscription";
import {useRouter} from "next/router";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {observer} from "mobx-react-lite";
import theme from "../store/theme";
import {axiosJWT} from "../utils/axios/axios";
import {URL} from "../constants/url";

export const BuySubscriptionComponent: React.FC<BuySubscriptionProps> = observer(({sub}) => {
    const MySwal = withReactContent(Swal);
    const router = useRouter();
    useEffect(() => {
        const hasSub = async () => {
            await MySwal.fire({
                title: <strong>Ошибка при оформлении подписки</strong>,
                html: <i>Уже есть подписка</i>,
                icon: 'warning'
            })
            await router.push("/")
        }
        if (sub) {
            hasSub();
        }
    } ,[MySwal, router]);
    if (sub) {
        return (
            <div className='container'>
            <h1>Подписка уже куплена</h1>
            </div>
        )
    }
    const send = () => {
        axiosJWT.post(`${URL}/auth/buy-sub`, null, {withCredentials: true}).then(async () => {
            await MySwal.fire({
                title: <strong>Подписка оформлена!</strong>,
                html: <i>Успешно</i>,
                icon: 'success'
            })
            await router.replace("/")
        })
    }
    return (
        <>
            <Navbar isLogin={true} />
            <div className='container'>
                <h1>Оформить подписку</h1>
                <button className={`btn ${theme.theme}`} onClick={() => send()}>Оформить</button>
            </div>
        </>
    )
});