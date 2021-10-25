import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import {URL} from '../constants/url';
export function requireAuthentication(gssp: GetServerSideProps) {
    return async (ctx: GetServerSidePropsContext) => {
        const { req } = ctx;
        let logged = false;
        if (req.cookies) {
            try {
                const res = await axios.get(`${URL}/auth`, {
                    withCredentials: true,
                    headers: { cookie: ctx.req.headers.cookie },
                });
                const data = await res.data;
                logged = data.logged;
            } catch (e) {
                console.log(e);
            }
            if (!logged) {
                return {
                    redirect: {
                        permanent: false,
                        destination: "/login",
                    },
                };
            }
        }
        return await gssp(ctx);
    };
}
export function notRequireAuthentication(gssp: GetServerSideProps) {
    return async (ctx: GetServerSidePropsContext) => {
        const { req } = ctx;
        let logged = false;
        if (req.cookies) {
            try {
                const res = await axios.get(`${URL}/auth`, {
                    withCredentials: true,
                    headers: { cookie: ctx.req.headers.cookie },
                });
                const data = await res.data;
                logged = data.logged;
            } catch (e) {
                console.log(e);
            }
            if (logged) {
                return {
                    redirect: {
                        permanent: false,
                        destination: "/",
                    },
                };
            }
        }
        return await gssp(ctx);
    };
}
