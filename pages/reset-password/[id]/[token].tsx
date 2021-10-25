import {GetServerSideProps, NextPage} from "next";
import {notRequireAuthentication} from "../../../HOC/requireAuthentication";
import axios from "axios";
import {URL} from "../../../constants/url";
import {useRouter} from "next/router";
import React, {useState} from "react";
import theme from "../../../store/theme";
import {observer} from "mobx-react-lite";
import {Navbar} from "../../../components/Navbar";

const ResetPassword: NextPage<{expired?: boolean; email?: string}> = observer(({expired, email}) => {
    const router = useRouter();
    const {id, token} = router.query;
    const [firstPassword, setFirstPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    if (expired) {
        return (
            <h1 className={theme.theme}>Link has been expired</h1>
        )
    }

    const changePassword = () => {
        axios.post(`${URL}/auth/reset-password/${id}/${token}`, {password: firstPassword}).then(() => {
            router.replace("/login");
        });
    }
    return (
        <>
        <Navbar isLogin={false} />
        <div className='container'>
            <h1 className={theme.theme}>Новый пароль для {email}</h1>
            <form onSubmit={e => e.preventDefault()}>
                <input type="text" placeholder='password' onChange={e => setFirstPassword(e.target.value)} className={theme.theme}/>
                <input type="text" placeholder='confirm password' onChange={e => setSecondPassword(e.target.value)} className={theme.theme} />
                <button className={`btn ${theme.theme} get-link`} disabled={!firstPassword || !secondPassword || firstPassword !== secondPassword ? true : false} onClick={() => changePassword()}>Изменить пароль</button>
            </form>
        </div>
        </>
    )
})
export default ResetPassword;
export const getServerSideProps: GetServerSideProps = notRequireAuthentication(
    async (ctx) => {
        const {id, token} = ctx.query;

        try {
            const res = await axios.get(`${URL}/auth/reset-password/${id}/${token}`);
            const data = await res.data;
            return {
                props: {email: data.email},
            };
        } catch (e) {
            return {
                props: {expired: true},
            };
        }
        // console.log(data.boardId)
        return {
            props: {},
        };
    }
);