import {GetServerSideProps, NextPage} from "next";
import {BuySubscriptionComponent} from "../components/BuySubscriptionComponent";
import {requireAuthentication} from "../HOC/requireAuthentication";
import axios from "axios";
import {URL} from "../constants/url";
export type BuySubscriptionProps = {
    sub: boolean;
}
const BuySubscription: NextPage<BuySubscriptionProps> = ({sub}) => {
    return (
        <BuySubscriptionComponent sub={sub}/>
    )
}
export default BuySubscription;
export const getServerSideProps: GetServerSideProps = requireAuthentication(
    async (ctx) => {
        const res = await axios.get(`${URL}/auth/check`, {withCredentials: true, headers: {
                Cookie: ctx.req.headers.cookie
            }});
        const data = await res.data;

        return {
            props: {sub: data.sub},
        };
    }
);
